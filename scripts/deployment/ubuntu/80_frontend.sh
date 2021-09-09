#!/bin/bash

cd /opt/sdcoe-transcript || exit

echo "Deploying Frontend"
pushd /opt/sdcoe-transcript/web-client || exit
yarn build

ln -s /opt/sdcoe-transcript/web-client/build /var/www/html/build

popd || exit
