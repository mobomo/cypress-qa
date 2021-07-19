.PHONY: build test ssh

build:
	sam --profile labs build
test:
	docker run -it \
            -v "${shell pwd}/src:/var/task" \
            --entrypoint "/var/lang/bin/node" \
            getallitemsfunction:nodejs14.x.0 \
            -e 'require("./app").handler({"httpMethod":"GET"})'
ssh:
	docker run -it \
	    -v "${shell pwd}/src:/var/task" \
	    --entrypoint "/bin/bash" \
	    getallitemsfunction:nodejs14.x.0
deploy:
	sam deploy --profile labs --config-env=labs
