#!/bin/bash

cd /opt/sdcoe-transcript || exit

echo "Setup postgres"

adduser postgres

# Set password here
db_password=$DATABASE_PASSWORD

echo "Enable postgres"
systemctl enable postgresql

echo "Changing database password for the default user 'postgres'"
# sudo -i -u postgres
sudo -u postgres psql -U postgres -c "ALTER USER postgres WITH PASSWORD '$db_password';"
sudo -u postgres psql -U postgres -c "CREATE DATABASE sdcoe;"

echo "Postgres setup completed"


