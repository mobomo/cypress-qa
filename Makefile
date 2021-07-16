.PHONY: build test

build:
	docker build -t stevenlafl/cypress-cucumber-lambda -f Dockerfile --progress=plain .
test:
	docker run -it \
	    -v "${shell pwd}/src:/var/task" \
	    --entrypoint "/bin/bash" \
	    stevenlafl/cypress-cucumber-lambda
