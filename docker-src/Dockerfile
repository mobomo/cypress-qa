FROM cypress/included:9.5.0 as base

ENV XDG_CONFIG_HOME="/tmp"
ENV XDG_RUNTIME_DIR="/tmp"

# Install the app dependencies
RUN mkdir /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm install --prefix /app

# clean up
RUN rm -rf /tmp/*

WORKDIR /app

FROM base as release

# Copy actual base cypress code
COPY cypress /app/cypress
COPY cypress.json /app/cypress.json

FROM base as xpra

# Install Xpra
RUN wget -q https://xpra.org/gpg.asc -O- | apt-key add -
RUN wget https://xpra.org/repos/buster/xpra.list -O /etc/apt/sources.list.d/xpra.list
RUN apt-get update

ENV DEBIAN_FRONTEND noninteractive
RUN apt-get install -y xpra xpra-html5

RUN echo "set bell-style none" >> /etc/inputrc

ENTRYPOINT ["xpra"]
CMD ["start", "--bind-tcp=0.0.0.0:10000", "--start-child=xterm", "--html=on", "--daemon=no", "--modal-windows=true", "--video-encoders=nvenc", "--min-quality=100", "--video-scaling=off", "--desktop-scaling=off"]

# clean up
RUN rm -rf /tmp/*

# Copy actual base cypress code
COPY cypress /app/cypress
COPY cypress.json /app/cypress.json