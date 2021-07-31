# SDCOE-transcript

The front facing packages of the sdcoe-transcript project 
are the `transcript-api`, the `verification-api` and the `web-client`
packages. Other utilities exist in this git repository to
facilitate the backend work of these front facing packages.

The headings below describe each of the packages in brief:


## [Design](design/README.md)

This folder contains the main design elements
that have been used for the SDCOE front end.

> Contains static HTML, CSS, JS, Images, Fonts 

## [Docs](docs/README.md)

This folder is the main documentation module

> Contains Markdown files

## [Email Utils](email-utils/README.md)

This folder contains libraries and templates 
for sending out SDCOE emails

> Is a node package with handlebar templates

## [PDF Utils](pdf-utils/README.md)

This folder contains libraries to modify a PDF
and its metadata

> Is a node package for with code mainly used for handling pdf metadata

## [Scripts](scripts/README.md)

This folder contains scripts for deployment,
creating services and for running background schedules

> bash scripts for deployment; cron files for scheduling

## [Security](security/README.md)

This folder contains utilities for transcript security
such as key generation and blockchain

> Node package with libraries for DID management, key generation, blockchain interaction, JWT Signing

## [Transcript API](transcript-api/README.md)

This is the express api module for requesting transcripts

> Model View Controller express app; Knex based migration scripts

## [Transcript Backend](transcript-backend/README.md)

This is the module that deals with interaction with ODS and
for creating standard JSON and pdf files

>  Node package with JS and handlebar files

## [Verification API](verification-api/README.md)

This is the express api module for verifying transcripts

> Node express related code

## [Web Client](web-client/README.md)

This is the React JS web application

> Contains JSX, Js and static files

