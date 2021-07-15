FROM public.ecr.aws/lambda/nodejs:14

RUN yum install -y curl tar gzip

# This is necessary to get Lambda packages to run with --installroot=/opt
RUN curl -L "https://lambci.s3.amazonaws.com/fs/base-2.tgz" -o /root/base-2.tgz
RUN tar -xf /root/base-2.tgz -C /opt

RUN yum --installroot=/opt install -y tar xorg-x11-server-Xvfb gtk2-devel gtk3-devel libnotify-devel GConf2 nss libXScrnSaver alsa-lib

ENV npm_config_cache="/opt/nodejs/.npm"
ENV CYPRESS_CACHE_FOLDER="/opt/nodejs/.cache"
ENV LD_LIBRARY_PATH="$LAMBDA_TASK_ROOT/lib:$LAMBDA_TASK_ROOT/lib64:$LAMBDA_RUNTIME_DIR:$LAMBDA_RUNTIME_DIR/lib:$LAMBDA_TASK_ROOT:/opt/lib:/opt/lib64:/lib64:/usr/lib64"

RUN npm install cypress@7.7.0

#ENTRYPOINT ["npm", "run", "test:prod"]
ENTRYPOINT ["/bin/bash"]