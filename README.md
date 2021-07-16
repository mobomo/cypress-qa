# Cypress QA

## Requirements
SAM CLI https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html

## Installing

- Clone repo
- sam build
- sam local start-api

## Testing CLI

You can test the CLI by running `npm run test:prod` inside the container SAM builds. I overwrite the `--entrypoint` with `/bin/bash` and run it there.

## Warning

In cypress.json you can check the "chromeWebSecurity" property disabled. Please, do not use it
unless you know what it does. This is done right now to make the "feel-lucky" feature to work.

