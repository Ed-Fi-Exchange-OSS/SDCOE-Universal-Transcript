#!/bin/bash

# Thanks to https://askubuntu.com/a/15856
if [[ $EUID -eq 0 ]]; then
   echo "You are running this as root. Maybe you consider using non-root"
fi


# Thanks to https://stackoverflow.com/a/1885534
read -p "Are you sure? " -n 1 -r
echo    # (optional) move to a new line
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    [[ "$0" = "$BASH_SOURCE" ]] && exit 1 || return 1 # handle exits from shell or function but don't exit interactive shell
fi


pushd /opt/sdcoe-transcript || exit

echo "Build transcript api"
pushd transcript-api || exit

rm -rf node_modules
yarn
yarn build

popd  || exit

echo "Build verification api"
pushd verification-api  || exit

rm -rf node_modules
yarn
yarn build

popd  || exit

echo "Build web-client"
pushd web-client  || exit

rm -rf node_modules
yarn
yarn build

popd  || exit

echo "Restart verification api"
pm2 restart verification-api

echo "Restart transcript api"
pm2 restart transcript-api

popd || exit

echo "Please restart nginx"