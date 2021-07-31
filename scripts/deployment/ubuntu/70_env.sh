#!/bin/bash

echo "Setting up .env files in all the packages"

# These env values for email don't work and are for example purpose
export SDCOE_SMTP_HOST=vagrant.localhost.example
export SDCOE_SMTP_PORT=8888
export SDCOE_SMTP_AUTH_USER=vagrant
export SDCOE_SMTP_AUTH_PASSWORD=vagrant
export SDCOE_SMTP_FROM=vagrant@localhost.example

export SDCOE_LOGO_URI=[YOURLOGOURL]
export SDCOE_MAIL_TO=[YOUREMAIL]

# These should work
export SDCOE_LOG_DIR=/var/log/sdcoe
export SDCOE_REQUEST_API_APP_HOST=sdcoe.localhost
export SDCOE_REQUEST_API_APP_PORT=3000
export SDCOE_REQUEST_API_APP_BASE_URL=http://sdcoe.localhost/api
export SDCOE_DB_PORT=5432
export SDCOE_DB_HOST=localhost
export SDCOE_DB_USER=postgres
export SDCOE_DB_PASSWORD=vagrant
export SDCOE_DB_NAME=sdcoe
export SDCOE_DB_CLIENT=postgres
export SDCOE_VERIFICATION_API_APP_NAME=Verification API
export SDCOE_VERIFICATION_API_APP_PORT=5000
export SDCOE_VERIFICATION_API_APP_HOST=sdcoe.localhost
export SDCOE_SERVER_LOG_LEVEL=info
export SDCOE_TEMPORARY_UPLOAD_DIRECTORY=/tmp/sdcoe/uploads
export SDCOE_JWKS_URI=login.microsoft/key?appid

# These env values for ODS don't work
export SDCOE_ODS_CLIENT_ID=ods.example.value
export SDCOE_ODS_CLIENT_SECRET=ods.example.value
export SDCOE_ODS_BASE_URL=ods.example.value


# Web app envs
export SDCOE_REACT_APP_BASE_NAME=/
export SDCOE_REACT_APP_ENV=.
export SDCOE_REACT_APP_API_BASE_URI=http://sdcoe.localhost:9080/api
export SDCOE_REACT_APP_VERIFICATION_API_URI=http://sdcoe.localhost:9080/api
export SDCOE_REACT_APP_REDIRECT_URI=https://sdcoe.localhost:9080/

mkdir -p $SDCOE_TEMPORARY_UPLOAD_DIRECTORY
mkdir -p $SDCOE_LOG_DIR


cd /opt/sdcoe-transcript || exit

echo "Email Utilities .env file"
pushd email-utils || exit

envsubst < .env.example > .env
popd || exit

echo "PDF Utils .env file"
pushd pdf-utils || exit
envsubst < .env.example > .env
popd || exit

echo "Securities Utils .env file"
pushd security || exit
envsubst < .env.example > .env
popd || exit

echo "Transcript Backend .env file"
pushd transcript-backend || exit
envsubst < .env.example > .env
popd || exit

echo "Transcript API .env file"
pushd transcript-api || exit
envsubst < .env.example > .env
popd || exit

echo "Verification API .env file"
pushd verification-api || exit
envsubst < .env.example > .env
popd || exit

echo "Web Client .env file"
pushd web-client || exit
envsubst < .env.example > .env
popd || exit

echo "You need to manually set the values in each .env file created."

