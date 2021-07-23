.PHONY: build ecr-build ecr-login ecr-push test test2 test3 ssh deploy

build:
	sam build

ecr-build:
	docker build \
	--progress plain \
	-f ./docker-src/ecs.Dockerfile \
	-t mobomo/ecstest .

ecr-login:
	aws ecr get-login-password \
    --profile qa \
    --region us-east-1 | docker login \
    --username AWS \
    --password-stdin \
    834666424999.dkr.ecr.us-east-1.amazonaws.com/cypress-qa-ecsrepository-qxpw7ougd7qk

ecr-push:
	docker tag \
    mobomo/ecstest \
    834666424999.dkr.ecr.us-east-1.amazonaws.com/cypress-qa-ecsrepository-qxpw7ougd7qk:latest
	docker push \
	834666424999.dkr.ecr.us-east-1.amazonaws.com/cypress-qa-ecsrepository-qxpw7ougd7qk:latest

test:
	docker run -it \
        -v "${shell pwd}/src:/app" \
        -v "${shell pwd}/video:/video" \
        --entrypoint "/var/lang/bin/node" \
        getallitemsfunction:nodejs14.x.0 \
        -e 'require("./lambda").handler({"httpMethod":"GET"}, {"awsRequestId": "default"})'
test2:
	docker run -it \
        -v "${shell pwd}/video:/video" \
        --entrypoint "/var/lang/bin/node" \
        --user 1042 \
        getallitemsfunction:nodejs14.x.0 \
        -e 'require("./lambda").handler({"httpMethod":"GET"}, {"awsRequestId": "default"})'
ssh:
	docker run -it \
	    -v "${shell pwd}/src:/app" \
        --workdir "/app" \
	    --entrypoint "/bin/bash" \
	    getallitemsfunction:nodejs14.x.0
ssh2:
	docker exec -it \
    $(shell docker ps -q --filter="ancestor=getallitemsfunction:nodejs14.x.0") \
    /bin/bash

deploy:
	sam deploy --profile qa --config-env=qa
