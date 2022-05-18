#!/bin/sh

set -ex

CELO_DIR=./celo-blockchain
NODE_DIR=$1
IMAGE_TAG=$2
TARGET_CELO_REPO=$3
TARGET_CELO_REPO_BRANCH=$4
MNEMONIC=$5

if [ ! -d $CELO_DIR ] 
then
  # clone celo-blockchain
  git clone -b $TARGET_CELO_REPO_BRANCH $TARGET_CELO_REPO
fi

# build docker image for mycelo
docker build --rm --no-cache --pull \
  --build-arg NODE_DIR=$NODE_DIR \
  --build-arg MNEMONIC="$MNEMONIC" \
  --tag celo-localnet:$IMAGE_TAG .
