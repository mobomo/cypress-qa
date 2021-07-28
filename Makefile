.PHONY: build ecr-build ecr-login ecr-push test test2 test3 ssh deploy local-test local-build local-debug local-ssh

build:
	sam build

deploy:
	sam deploy --profile qa --config-env=qa

local-build:
	docker build \
        --progress plain \
        -f ./docker-src/Dockerfile \
        -t mobomo/cypress .

local-test:
	docker run -it \
        -v "${shell pwd}/src:/app" \
        mobomo/cypress

local-debug:
	docker run -it \
        -v "${shell pwd}/src:/app" \
        -e DISPLAY=host.docker.internal:0 \
        mobomo/cypress \
        npm run test:debug

local-xpra:
	docker run -it \
        -v "${shell pwd}/src:/app" \
        -p 10000:10000 \
        mobomo/cypress \
        xpra start \
        --bind-tcp=0.0.0.0:10000 \
        --start-child=xterm \
        --html=on \
        --daemon=no \
        --modal-windows=true \
        --video-encoders=nvenc \
        --min-quality=100 \
        --video-scaling=off \
        --desktop-scaling=off

local-example:
	docker run -it \
        -v "${shell pwd}/example/integration:/app/cypress/integration/prac" \
        -v "${shell pwd}/example/pages:/app/cypress/pages/prac" \
        -v "${shell pwd}/example/cypress.json:/app/cypress.json" \
        -p 10000:10000 \
        mobomo/cypress \
        npm run test:debug

local-ssh:
	docker run -it \
        -v "${shell pwd}/src:/app" \
        --entrypoint "/bin/bash" \
        mobomo/cypress

ecr-build:
	docker build \
        --progress plain \
        -f ./docker-src/ecs.Dockerfile \
        -t mobomo/ecstest .

ecr-test:
	docker run -it \
        mobomo/ecstest

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

lambda-test:
	docker run -it \
        -v "${shell pwd}/src:/app" \
        -v "${shell pwd}/video:/video" \
        --entrypoint "/var/lang/bin/node" \
        cypresslambdafunction:cypress-lambda \
        -e 'require("./lambda").handler({"httpMethod":"GET"}, {"awsRequestId": "default"})'

lambda-test2:
	docker run -it \
        -v "${shell pwd}/video:/video" \
        --entrypoint "/var/lang/bin/node" \
        --user 1042 \
        cypresslambdafunction:cypress-lambda \
        -e 'require("./lambda").handler({"httpMethod":"GET"}, {"awsRequestId": "default"})'

lambda-ssh:
	docker run -it \
	    -v "${shell pwd}/src:/app" \
        --workdir "/app" \
	    --entrypoint "/bin/bash" \
	    cypresslambdafunction:cypress-lambda

lambda-ssh2:
	docker exec -it \
    $(shell docker ps -q --filter="ancestor=cypresslambdafunction:cypress-lambda") \
    /bin/bash
