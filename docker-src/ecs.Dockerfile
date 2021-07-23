FROM amazonlinux:latest

# Dependencies for Cypress
RUN yum install -y tar xorg-x11-server-Xvfb gtk2-devel gtk3-devel libnotify-devel GConf2 nss libXScrnSaver alsa-lib

# Dependencies for Brotli
RUN yum install -y curl git zip unzip tar gcc gcc-c++
RUN git clone https://github.com/Microsoft/vcpkg.git /opt/vcpkg

ENV CXX="g++"

ENV PATH="/opt/bin:${PATH}"

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

ENV NVM_VERSION 0.38.0
ENV NODE_VERSION 14.17.3
ENV NVM_DIR /usr/local/nvm

# Install nvm/npm/node
RUN mkdir $NVM_DIR
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v$NVM_VERSION/install.sh | bash
RUN source $NVM_DIR/nvm.sh \
    && nvm install v$NODE_VERSION \
    && nvm alias default v$NODE_VERSION \
    && nvm use default

# Override version with full version.
ENV NODE_PATH=$NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH=$NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

# Install Cypress
ENV npm_config_cache="/opt/nodejs/.npm"
ENV CYPRESS_CACHE_FOLDER="/opt/nodejs/.cypress"
ENV NODE_PATH="/var/lang/lib/node_modules/"

# Speed up builds by not having to redownload cypress
RUN npm install --unsafe-perm=true --allow-root -g cypress@7.7.0
RUN npm install --unsafe-perm=true --allow-root -g aws-sdk

# https://github.com/cypress-io/cypress/issues/4333
RUN npx cypress verify

# Install the app dependencies
RUN mkdir /app
COPY src/package.json /app/package.json
COPY src/package-lock.json /app/package-lock.json

RUN npm install --prefix /app

# Copy actual base cypress code
COPY src/cypress /app/cypress
COPY src/cypress.json /app/cypress.json

# clean up
RUN rm -rf /tmp/*

WORKDIR /app

CMD ["npm", "run", "test"]