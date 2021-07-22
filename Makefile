.PHONY: build test ssh

build:
	sam build
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
	sam deploy --profile labs --config-env=labs
