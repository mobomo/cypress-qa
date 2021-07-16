FROM public.ecr.aws/lambda/nodejs:14

RUN yum install -y tar xorg-x11-server-Xvfb gtk2-devel gtk3-devel libnotify-devel GConf2 nss libXScrnSaver alsa-lib

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