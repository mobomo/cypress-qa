FROM public.ecr.aws/lambda/nodejs:14 as base

# Dependencies for Cypress
RUN yum install -y xorg-x11-server-Xvfb gtk2-devel gtk3-devel libnotify-devel GConf2 nss libXScrnSaver alsa-lib binutils

# Install Cypress
ENV npm_config_cache="/opt/nodejs/.npm"
ENV CYPRESS_CACHE_FOLDER="/opt/nodejs/.cypress"
ENV XDG_CONFIG_HOME="/tmp"
ENV NODE_PATH="/var/lang/lib/node_modules/"

# Speed up builds by not having to redownload cypress
RUN npm install --unsafe-perm=true --allow-root -g cypress@8.0.0
RUN npm install --unsafe-perm=true --allow-root -g aws-sdk

# Patch Cypress binary to not use /dev/shm
RUN echo $'#!/bin/bash \n\
position=$(strings -t d /opt/nodejs/.cypress/7.7.0/Cypress/Cypress | grep "/dev/shm" | cut -d" " -f1) \n\
for i in $position; do \n\
    echo -n "/tmp/shm/" | dd bs=1 of=/opt/nodejs/.cypress/7.7.0/Cypress/Cypress seek="$i" conv=notrunc \n\
done' >> /opt/patch.sh
RUN chmod +x /opt/patch.sh
RUN /opt/patch.sh

# https://github.com/cypress-io/cypress/issues/4333
RUN npx cypress verify

# Install the app dependencies
RUN mkdir /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm install --prefix /app

# Copy actual base cypress code
COPY cypress /app/cypress
RUN echo '{"projectID": "lambda"}' >> /app/cypress.json

# Copy lambda function handler
COPY functions/cypress.js lambda.js

# clean up
RUN rm -rf /tmp/*

CMD ["lambda.handler"]

FROM public.ecr.aws/lambda/nodejs:14 as builder
# Dependencies for Brotli
RUN yum install -y git zip unzip tar gcc gcc-c++ pkgconfig curl
RUN git clone https://github.com/Microsoft/vcpkg.git /opt/vcpkg

ENV CXX="g++"

RUN /opt/vcpkg/bootstrap-vcpkg.sh \
    && /opt/vcpkg/vcpkg integrate install \
    && /opt/vcpkg/vcpkg install brotli \
    && mkdir /opt/bin \
    && ln -s /opt/vcpkg/packages/brotli_x64-linux/tools/brotli/brotli /opt/bin/brotli

# Install chromium from working lambda binary
RUN curl -L "https://raw.githubusercontent.com/alixaxel/chrome-aws-lambda/master/bin/chromium.br" -o /opt/chromium.br \
    && brotli --decompress /opt/chromium.br \
    && rm /opt/chromium.br \
    && chmod +x /opt/chromium \
    && echo $'#!/bin/bash \n\
       if [ "$1" == "--version" ]; then \n\
         echo "Chromium 64.0.3282.119 built on Debian 9.3, running on Debian 9.4"; \n\
       else \n\
         /opt/chromium $@ \n\
       fi' >> /opt/bin/chromium \
    && chmod +x /opt/bin/chromium

RUN mkdir /opt/swiftshader \
    && curl -L "https://raw.githubusercontent.com/alixaxel/chrome-aws-lambda/master/bin/swiftshader.tar.br" -o /opt/swiftshader/swiftshader.tar.br \
    && brotli --decompress /opt/swiftshader/swiftshader.tar.br \
    && rm /opt/swiftshader/swiftshader.tar.br \
    && tar -xf /opt/swiftshader/swiftshader.tar -C /opt/swiftshader \
    && rm /opt/swiftshader/swiftshader.tar

## Install chromium from headless repo
#RUN yum install -y unzip curl \
#  && curl -L https://github.com/adieuadieu/serverless-chrome/releases/download/v1.0.0-57/stable-headless-chromium-amazonlinux-2.zip -o /opt/stable-headless-chromium.zip \
#  && unzip /opt/stable-headless-chromium.zip -d /opt/chrome \
#  && mkdir /opt/bin/ \
#  && rm /opt/stable-headless-chromium.zip \
#  && echo $'#!/bin/bash \n\
#if [ "$1" == "--version" ]; then \n\
#  echo "Chromium 64.0.3282.119 built on Debian 9.3, running on Debian 9.4"; \n\
#else \n\
#  /opt/chrome/headless-chromium $@ \n\
#fi' >> /opt/bin/chromium \
#  && chmod +x /opt/bin/chromium

FROM base as browser

RUN mkdir /opt/bin
COPY --from=builder /opt/bin/chromium /opt/bin/chromium
COPY --from=builder /opt/chromium /opt/chromium
COPY --from=builder /opt/swiftshader /opt/swiftshader