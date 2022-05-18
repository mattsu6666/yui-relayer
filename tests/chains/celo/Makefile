NODE_DIR=localnet
TARGET_CELO_REPO=https://github.com/datachainlab/celo-blockchain.git
TARGET_CELO_REPO_BRANCH=customized-mycelo
CONTAINER_NAME=celo-node
include ../../docker.mk

# FIXME remove secret information
MNEMONIC="cradle update plug wolf soup unhappy asset elbow play stereo genuine wise"

.PHONY: build-celo-image
build-celo-image:
	./scripts/build-image.sh $(NODE_DIR) $(DOCKER_TAG) $(TARGET_CELO_REPO) $(TARGET_CELO_REPO_BRANCH) $(MNEMONIC)

.PHONY: deploy-contract
deploy-contract:
	make wait-for-launch ATTEMPT=30 CONTAINER=celo-node
	cd yui-ibc-solidity && yarn run migrate

# run after yui-ibc-solidity deployed on celo node
.PHONY: create-dev-image
create-dev-image:
	docker commit $(CONTAINER_NAME) celo-localnet:dev

run-based-cointaienr:export DOCKER_TAG:=$(DOCKER_TAG)
run-based-cointaienr:
	docker compose up

run-dev-cointaienr:export DOCKER_TAG:=dev
run-dev-cointaienr:
	docker compose up

.PHONY: clean-celo-image
clean-celo-image:
	rm -rf celo-blockchain 2>/dev/null
	docker rmi -f $(IMAGE_NAME):$(DOCKER_TAG)
	docker image prune
