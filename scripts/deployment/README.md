# Deployment

This folder contains a vagrant file and other scripts used for 
deployment

## Vagrantfile

Vagrant is a tool used for imitating a production
 environment in a developer's own machine. Vagrant
 automates the provisioning of a virtual box.
 It allows checking if the deployment scripts
 actually work without deploying to the actual server.

Prerequisites for using this file are as follows

1. Install Virtual box
2. Install Vagrant
3. The box is configured to take up 2 CPUs and 4 GB of memory.
Your system should have at least twice that

## How to start a vagrant box

> Note: You must be in the same folder as the Vagrantfile

```
cd scripts/deployment
vagrant up

# This will take a while

# Login to the vagrant machine

vagrant ssh

```

After the vagrant file is up, you can view the application
by visiting `sdcoe.localhost:9080`

## The ubuntu installation steps

```
cd scripts/deployment/ubuntu
ls -al
```

The ubuntu folder contains a series of bash command
 to setup the sdcoe-transcript project on a ubuntu machine.
 This is to provide guidance and instructions for future 
 developers who want to install the project somewhere else

> Note to future developers: 
> Do not simply run the scripts. The scripts are custom
> to a vagrant box. 
> Instead copy and paste the steps one by one. This will also
> give you a good idea on how things are set up. This way, you
> will be able to make debug issues if they occur more easily

## Background Daemons/Processes that run on the server

### Cronjob

The scripts that run using cronjob are in `scripts/schedules/`

### Nginx

The script is located here `scripts/deployment/ubuntu/nginx-template.conf`

This acts as reverse proxy for a few things:

1. React JS build
2. The transcript api
3. The verification api

### pm2 processes

The pm2 is a nodejs based process manager suitable for running
long-running tasks such as apis and server scripts. The following
processes run using pm2

1. transcript-api

Here's how to add transcript-api to pm2
```
cd transcript-api
yarn
pm2 start "yarn start" --name "transcript-api"
```

2. verification-api

Here's how to add verification-api to pm2
```
cd verification-api
yarn
pm2 start "yarn start" --name "verification-api"
```

3. ganache-cli

```
cd scripts/deployment/ubuntu/daemons
pm2 start "bash ganache.sh" --name "ganache-server"
```

To view the status of the pm2 processes run

```
pm2 status

```


## Installing on windows

We haven't tried to install this on Windows. However I thought
 that I would point out a few places you will have to make changes

You will probably not have to make any modifications to the following
packages are they are written in node js

1. email-utils
2. pdf-utils
3. security
4. transcript-api
5. transcript-backend
6. verification-api
7. web-client (ReactJS)

> Note that there may be few places where the developer used
> "/" for path. This may cause problems.

Here's where changes will be necessary

- You will have to make changes to `scripts`.
 Maybe make a copy of the `ubuntu` folder within `scripts`
 and call it `windows`. Replace the scripts one by one
 with batch/powershell files
- We are using nginx for serving web apis. You may want to use
  IIS instead. The nginx configuration is available in
  `scripts/deployment/ubuntu/nginx-template.conf`
- You will have to replace the scheduling cron mechanism with something else.
  The cron files are here `scripts/schedules/`

 
 

