.PHONY: build test ssh

build:
	sam --profile labs build
test:
	docker run -it \
            -v "${shell pwd}/src:/var/task:ro" \
            --entrypoint "/var/lang/bin/node" \
            getallitemsfunction:nodejs14.x.0 \
            -e 'require("./app").handler({"httpMethod":"GET"})'
test2:
	docker run -it \
            --entrypoint "/var/lang/bin/node" \
            --user 1042 \
            getallitemsfunction:nodejs14.x.0 \
            -e 'require("./app").handler({"httpMethod":"GET"})'
ssh:
	docker run -it \
	    -v "${shell pwd}/src:/var/task:ro" \
	    --entrypoint "/bin/bash" \
	    getallitemsfunction:nodejs14.x.0
deploy:
	sam deploy --profile labs --config-env=labs
