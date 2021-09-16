.PHONY: test test-debug test-mac

test:
	docker run -it \
  -v $(shell pwd)/tests/integration:/app/cypress/integration/custom \
  -v $(shell pwd)/tests/cypress.local.json:/app/cypress.json \
  -e CYPRESS_DRUPAL_USER="admin" \
  -e CYPRESS_DRUPAL_PASS="admin" \
  --entrypoint npx \
  mobomo/cypress \
  cypress run --env TAGS='@e2e-test'

test-debug:
	docker run -it \
  -v $(shell pwd)/tests/integration:/app/cypress/integration/custom \
  -v $(shell pwd)/tests/cypress.local.json:/app/cypress.json \
  -e DISPLAY="host.docker.internal:0" \
  -e CYPRESS_DRUPAL_USER="admin" \
  -e CYPRESS_DRUPAL_PASS="admin" \
  --entrypoint npx \
  mobomo/cypress \
  cypress open --env TAGS='@e2e-test'

test-mac:
	docker run -it \
  -v $(shell pwd)/tests/integration:/app/cypress/integration/custom \
  -v $(shell pwd)/tests/cypress.local.json:/app/cypress.json \
  -p 10000:10000 \
  -e CYPRESS_DRUPAL_USER="admin" \
  -e CYPRESS_DRUPAL_PASS="admin" \
  mobomo/cypress:xpra