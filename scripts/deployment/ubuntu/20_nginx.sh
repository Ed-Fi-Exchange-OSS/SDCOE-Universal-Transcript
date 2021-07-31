#!/bin/bash

cd /opt/sdcoe-transcript || exit

echo "Setup Nginx"

# Enable this in server environment. Not necessary in Vagrant
#echo "Allowing firewall to Nginx"
#ufw allow 80,443/tcp
#ufw enable

mkdir -p /etc/nginx/sites-available/
mkdir -p /etc/nginx/sites-enabled/
cp $MOUNT_PATH/scripts/deployment/ubuntu/nginx-template.conf /etc/nginx/sites-available/sdcoe.conf
ln -s /etc/nginx/sites-available/sdcoe.conf /etc/nginx/sites-enabled/sdcoe.conf
rm /etc/nginx/sites-enabled/default

echo "Nginx setup completed"

systemctl restart nginx.service