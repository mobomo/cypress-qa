.PHONY: build build2 test

build:
	docker build -t stevenlafl/cypress-cucumber-lambda -f Dockerfile --progress=plain .
build2:
	docker build -t stevenlafl/cypress-cucumber-lambda2 -f Dockerfile2 --progress=plain .
test:
	docker run -it \
	    -v "${shell pwd}/src/layer/nodejs:/var/task" \
	    stevenlafl/cypress-cucumber-lambda
