FROM public.ecr.aws/lambda/nodejs:14

# Dependencies for Cypress
RUN yum install -y tar xorg-x11-server-Xvfb gtk2-devel gtk3-devel libnotify-devel GConf2 nss libXScrnSaver alsa-lib

## Dependencies for Brotli
#RUN yum install -y curl git zip unzip tar gcc gcc-c++
#RUN git clone https://github.com/Microsoft/vcpkg.git /opt/vcpkg
#
#ENV CXX="g++"
#
#RUN /opt/vcpkg/bootstrap-vcpkg.sh \
#    && /opt/vcpkg/vcpkg integrate install \
#    && /opt/vcpkg/vcpkg install brotli \
#    && mkdir /opt/bin \
#    && ln -s /opt/vcpkg/packages/brotli_x64-linux/tools/brotli/brotli /opt/bin/brotli
#
## Install chromium from working lambda binary
#RUN curl -L "https://raw.githubusercontent.com/alixaxel/chrome-aws-lambda/master/bin/chromium.br" -o /opt/chromium.br
#RUN brotli --decompress /opt/chromium.br \
#   && chmod +x /opt/chromium \
#   && ln -s /opt/chromium /opt/bin/google-chrome

# Install Cypress
ENV npm_config_cache="/opt/nodejs/.npm"
ENV CYPRESS_CACHE_FOLDER="/opt/nodejs/.cache"

# Speed up builds by not having to redownload cypress
RUN npm install cypress@7.7.0

COPY src/package.json package.json
COPY src/package-lock.json package-lock.json

RUN npm install

# Copy actual code fast
COPY src/cypress cypress
COPY src/app.js app.js
RUN echo '{"projectID": "lambda"}' >> cypress.json
#COPY src/cypress.json cypress.json

CMD ["app.handler"]