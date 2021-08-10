FROM mobomo/cypress as base
# Install Xpra
RUN wget -q https://xpra.org/gpg.asc -O- | apt-key add -
RUN wget https://xpra.org/repos/buster/xpra.list -O /etc/apt/sources.list.d/xpra.list
RUN apt-get update

ENV DEBIAN_FRONTEND noninteractive
RUN apt-get install -y xpra xpra-html5