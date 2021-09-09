# SDCOE-Universal-Transcript

The SDCOE Universal Transcript Initiative is an exploration into the potential of digital learner records. Our concept was to build a working prototype transcript technology around the ODS, essentially around the idea of reading data from multiple ODS’s using Ed-Fi Composites, assembling student transcript data into an electronic document (JSON file), leveraging blockchain technology for validating a transcript and identify document tampering, and generating printable transcripts.

Scope:  The scope of this project defines a primary goal of producing a digital printable student transcript (PDF) with data drawn from one or more ODS’s in an electronic form that can be validated using blockchain technology.

## Application Notes

The front facing packages of the sdcoe-transcript project 
are the `transcript-api`, the `verification-api` and the `web-client`
packages. Other utilities exist in this git repository to
facilitate the backend work of these front facing packages.

The headings below describe each of the packages in brief:

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

## Legal Information

Copyright (c) 2021 Ed-Fi Alliance, LLC and contributors.

Licensed under the [Apache License, Version 2.0](LICENSE) (the "License").

Unless required by applicable law or agreed to in writing, software distributed
under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
CONDITIONS OF ANY KIND, either express or implied. See the License for the
specific language governing permissions and limitations under the License.

See [NOTICES](NOTICES.md) for additional copyright and license notifications.
