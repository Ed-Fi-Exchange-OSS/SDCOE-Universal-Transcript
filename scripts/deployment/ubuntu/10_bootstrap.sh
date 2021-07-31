#!/bin/bash

# This step can be uncommented if you run this in non-vagrant.
# In vagrant we can simply mount this folder from the host to the gues
# Clone the repository and move it to /opt/sdcoe directory
# echo "Cloning the repository"
# git clone git@github.com:leapfrogtechnology/sdcoe-transcript.git

ln -s $MOUNT_PATH /opt/sdcoe-transcript
ln -s /opt/sdcoe-transcript/scripts/deployment /opt/deployment

cd /opt/sdcoe-transcript || exit

# Comment out the following or change according to your region
echo "Set to np repository"
sudo sed -i 's|http://archive|http://np.archive|g' /etc/apt/sources.list
sudo sed -i '/deb-src/d' /etc/apt/sources.list

echo "Updating package repositories"
apt-get update -y

echo "Download Node installer v14"
curl -sL https://deb.nodesource.com/setup_14.x -o nodesource_setup.sh
bash nodesource_setup.sh

echo "Installing curl, nodejs, build-essential, jq, nginx, postgresql, postgresql-contrib, postgresql-client, postgresql-client-common"
echo "build-essential will be used to run some npm packages"
apt-get install -y curl nodejs build-essential jq nginx postgresql postgresql-contrib postgresql-client postgresql-client-common

echo "Installing yarn"
npm i -g yarn

echo "Installing Ganache, pm2"
yarn global add ganache-cli pm2 rimraf babel-cli

echo "Bootstrap completed"



