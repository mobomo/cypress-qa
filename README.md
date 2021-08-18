# Cypress QA

## Requirements
- Docker https://docs.docker.com/get-docker/


## Building
- `git clone https://github.com/mobomo/cypress-qa`
- `cd cypress-qa`
- `make local-build`
- `make xpra-build` (optional, used for visually testing integrations without a local X server)

Now a mobomo/cypress image is ready for you to use. Test it to be sure it works.
- `make local-test`

## Testing

### Project directory structure

Anything inside your `tests` folder will follow the same structure as here https://github.com/mobomo/cypress-qa/tree/master/cypress

```
test/
  fixtures/
    *.*
  integration/
    *.js
    *.feature
  pages/
    *.js
  plugins/
    *.js
  support/
    *.js
  cypress.json
```

`cypress.json` looks like this:
```
{
  "baseUrl": "https://www.google.com",
  "ignoreTestFiles": ["*.js", "*.md"],
  "reporter": "junit",
  "reporterOptions": {
    "mochaFile": "test-results/test-output-[hash].xml"
  },
  "chromeWebSecurity": false,
  "defaultCommandTimeout": 10000,
  "record": true
}
```

All subfolders are optional and are additive to the base functionality listed in these docs.
- Your `.feature` files should exist under the `integration` folder.
- All files you want to use in your tests (uploads, etc.) should go under `fixtures`.

### Running tests

You'll want to mount any directories as subfolders under your project's `tests` individually, to avoid losing base functionality. If you wanted to use a separate `cypress.json` for your local URLs than your CI process, just create and mount a different one.

This will run `npm run test` local to the container:
```
docker run -it \
  -v $(pwd)/tests/integration:/app/cypress/integration/custom \
  -v $(pwd)/tests/cypress.json:/app/cypress.json \
  mobomo/cypress
```

This will give you more control over cypress command (such as using tags) you want to run with:
```
docker run -it \
  -v $(pwd)/tests/integration:/app/cypress/integration/custom \
  -v $(pwd)/tests/cypress.json:/app/cypress.json \
  --entrypoint npx \
  mobomo/cypress \
  cypress run --env TAGS='@e2e-test'
```

If you're using a local X server, you can specify those details (example: `host.docker.internal:0`) here and see it running visually.

```
docker run -it \
  -v $(pwd)/tests/integration:/app/cypress/integration/custom \
  -v $(pwd)/tests/cypress.json:/app/cypress.json \
  -e DISPLAY="host.docker.internal:0" \
  --entrypoint npx \
  mobomo/cypress \
  cypress open --env TAGS='@e2e-test'
```

**NOTE**: It must be accessible over host networking, so use your external or docker IP for the display (e.g. `172.17.0.1:0`)

Otherwise, if you want to view it using the browser in XPRA, run
```
docker run -it \
  -v $(pwd)/tests/integration:/app/cypress/integration/custom \
  -v $(pwd)/tests/cypress.json:/app/cypress.json \
  -p 10000:10000 \
  mobomo/cypress:xpra
```
And visit http://localhost:10000. You'll see a terminal window, where you can enter `npm run test:debug` (or other cypress command) and it will run visually for you in your browser tab.

### Credentials

If you have some special credentials you want to pass in to use with the `When I log in with test credentials` step, use the environment variables (which you can set with the `docker run` argument `-e` and CircleCI settings).
```
CYPRESS_DRUPAL_USER="<username>"
CYPRESS_DRUPAL_PASS="<password>"
```

### CircleCI

The following snippet can be inserted into your `.circleci/config.yml` which defines your custom test runner.
It will run the scenarios tagged with `@e2e-test` your `.feature` files.

```
  test:
    working_directory: /app
    docker:
      - image: mobomo/cypress
        auth:
          username: $DOCKERHUB_USERNAME
          password: $DOCKERHUB_ACCESS_TOKEN
    steps:
      - checkout:
          path: ~/project
      - run:
          name: Prepare for testing
          command: |
            cp -r ~/project/tests/* /app/cypress
            cp ~/project/tests/cypress.json /app
      - run:
          name: Testing
          command: |
            cypress run --env TAGS='@e2e-test'
      - store_artifacts:
          path:
            /app/cypress/videos
      - store_artifacts:
          path:
            /app/cypress/screenshots
```

## Warning

In cypress.json you can check the "chromeWebSecurity" property disabled. Please, do not use it
unless you know what it does. This is done right now to make the "feel-lucky" feature to work.

## Serverless (Lambda + ECS Task)

### Requirements
- Docker https://docs.docker.com/get-docker/
- AWS CLI https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html
- SAM CLI https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html

### Installing

- `git clone https://github.com/mobomo/cypress-qa`
- `cd cypress-qa`
- `sam build`
- `sam local start-api`

### Testing CLI

You can test the CLI by running `npm run test:prod` inside the container SAM builds. I overwrite the `--entrypoint` with `/bin/bash` and run it there.

### Deploying
- Create an ECR in AWS
- `make ecr-build`
- `make ecr-login`
- `make ecr-push`
- `sam deploy --guided --profile qa --config-env=qa`
  - Enter the ECR ARN when prompted

Now you can run `make deploy` whenever you want to deploy it again.

