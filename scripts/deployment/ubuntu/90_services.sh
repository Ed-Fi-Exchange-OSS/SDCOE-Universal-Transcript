#!/bin/bash

cd /opt/sdcoe-transcript || exit
mkdir -p /var/logs/sdcoe/

echo "Transcript API"
pushd transcript-api || exit
echo "Migrate all the tables and Seed the default entries"

# Adding this because for some reason even though this is included in
# package.json it's showing as missing in vagrant environment
yarn add babel-node "@babel/preset-env"
yarn migrate && yarn seed

echo "Building Transcript API"
yarn build

pm2 start dist/ --name "transcript-api"
sleep 5
popd || exit

echo "Verification API"

pushd verification-api || exit

echo "Building Verification API"

yarn add babel-node "@babel/preset-env"
yarn build

pm2 start dist/ --name "verification-api"
sleep 5

popd || exit



