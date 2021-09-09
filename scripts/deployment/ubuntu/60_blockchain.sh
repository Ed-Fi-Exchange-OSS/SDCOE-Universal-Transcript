#!/bin/bash

cd /opt/sdcoe-transcript/security || exit

BLOCKCHAIN_DATA_PATH=/opt/sdcoe/ganache
export BLOCKCHAIN_DATA_PATH

mkdir -p $BLOCKCHAIN_DATA_PATH

echo "Setup blockchain utilities"

BLOCKCHAIN_NODE_PORT=8545
BLOCKCHAIN_NODE_URL=http://127.0.0.1:$BLOCKCHAIN_NODE_PORT
[ -z "$BLOCKCHAIN_MNEMONIC" ] && BLOCKCHAIN_MNEMONIC='hello sdcoe transcript project'

export BLOCKCHAIN_NODE_PORT
export BLOCKCHAIN_NODE_URL
export BLOCKCHAIN_MNEMONIC

pushd /opt/deployment/ubuntu/daemons || exit

# Refer to these for explanation
# https://github.com/trufflesuite/ganache-cli
# https://www.youtube.com/watch?v=AS2_uPSTk5E
chmod +x ganache.sh

echo "Using pm2 to start the ganache-server"
pm2 start "ganache.sh --yes" --name "ganache-server"

sleep 5
popd || exit

# Use jq to read json values
BLOCKCHAIN_ACCOUNT_ADDRESS=$(jq '.private_keys | keys | .[0]' </opt/sdcoe/ganache/keys.json | tr -d \")
BLOCKCHAIN_PRIVATE_KEY=$(jq '.private_keys."'"${BLOCKCHAIN_ACCOUNT_ADDRESS}"'"' </opt/sdcoe/ganache/keys.json | tr -d \")

export BLOCKCHAIN_ACCOUNT_ADDRESS
export BLOCKCHAIN_PRIVATE_KEY

pushd /opt/sdcoe-transcript/security || exit
envsubst <.env.example >.env

echo "Deploy DID registry contract to Ganache"
BLOCKCHAIN_DID_REGISTRY_ADDRESS=$(yarn deploy-contract --port 8545 | grep "registryAddress" | jq .registryAddress | tr -d \")
export BLOCKCHAIN_DID_REGISTRY_ADDRESS
envsubst <.env.example >.env

popd || exit

echo "Set public key as attribute of the DID"
node ./cli/didFactory.js set-attribute did/pub/RSA/veriKey/base64 "$SDCOE_VERIFIER_PUBLIC_KEY_BASE_64"

echo "You DID it:"
node ./cli/didFactory.js resolve-did "did:ethr:$BLOCKCHAIN_ACCOUNT_ADDRESS" | jq

# todo how to get read this from the DID. Hard problem
BLOCKCHAIN_DID_DELEGATE_KEY="did:ethr:$BLOCKCHAIN_ACCOUNT_ADDRESS#delegate-1"

echo "BLOCKCHAIN_NODE_URL: " $BLOCKCHAIN_NODE_URL
echo "BLOCKCHAIN_MNEMONIC: " "$BLOCKCHAIN_MNEMONIC"
echo "BLOCKCHAIN_ADDRESS: " "$BLOCKCHAIN_ACCOUNT_ADDRESS"
echo "BLOCKCHAIN_PRIVATE_KEY: " "$BLOCKCHAIN_PRIVATE_KEY"
echo "BLOCKCHAIN_DID_REGISTRY_ADDRESS: " "$BLOCKCHAIN_DID_REGISTRY_ADDRESS"
echo "BLOCKCHAIN_DID_DELEGATE_KEY": "$BLOCKCHAIN_DID_DELEGATE_KEY"

rm -f /etc/profile.d/sdcoe-blockchain.sh || true
echo "export BLOCKCHAIN_MNEMONIC='$BLOCKCHAIN_MNEMONIC'" >>/etc/profile.d/sdcoe-blockchain.sh
echo "export BLOCKCHAIN_NODE_URL='$BLOCKCHAIN_NODE_URL'" >>/etc/profile.d/sdcoe-blockchain.sh
echo "export BLOCKCHAIN_ACCOUNT_ADDRESS='$BLOCKCHAIN_ACCOUNT_ADDRESS'" >>/etc/profile.d/sdcoe-blockchain.sh
echo "export BLOCKCHAIN_PRIVATE_KEY='$BLOCKCHAIN_PRIVATE_KEY'" >>/etc/profile.d/sdcoe-blockchain.sh
echo "export BLOCKCHAIN_DID_REGISTRY_ADDRESS='$BLOCKCHAIN_DID_REGISTRY_ADDRESS'" >>/etc/profile.d/sdcoe-blockchain.sh
echo "export BLOCKCHAIN_DID_DELEGATE_KEY='$BLOCKCHAIN_DID_DELEGATE_KEY'" >>/etc/profile.d/sdcoe-blockchain.sh

echo "Blockchain utilities were setup - completed"
