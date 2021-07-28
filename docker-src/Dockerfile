FROM node:latest as base

# Dependencies for Cypress
RUN apt-get update
RUN apt-get install -y libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb dbus-x11

# Install Xpra
RUN wget -q https://xpra.org/gpg.asc -O- | apt-key add -
RUN wget https://xpra.org/repos/buster/xpra.list -O /etc/apt/sources.list.d/xpra.list
RUN apt-get update

ENV DEBIAN_FRONTEND noninteractive
RUN apt-get install -y xpra xpra-html5

# Install Cypress
ENV npm_config_cache=/opt/nodejs/.npm
ENV CYPRESS_CACHE_FOLDER=/usr/lib/.cypress
ENV NODE_PATH=/var/lang/lib/node_modules/

## Speed up builds by not having to redownload cypress
RUN npm install --unsafe-perm=true --allow-root -g cypress@8.0.0
#RUN npm install --unsafe-perm=true --allow-root -g aws-sdk

## https://github.com/cypress-io/cypress/issues/4333

RUN npx cypress verify

ENV XDG_CONFIG_HOME="/tmp"
ENV XDG_RUNTIME_DIR="/tmp"

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

CMD ["npm", "run", "test:debug"]

FROM base as browsers

# Install browsers
RUN apt-get install -y fonts-liberation xdg-utils
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN dpkg -i google-chrome-stable_current_amd64.deb