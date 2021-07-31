# Verification API Module

This module contains the webapi that allows verification of a PDF
transcript uploaded by the user. For the verification, this module
uses the pdf-utils library. The follows steps are covered during
verification

1. Check if the PDF contains metadata and the JWS proof
2. Check if the checksum of (PDF content + metadata) matches the
   checksum mentioned in teh JWS
3. Check if the DID of the issuer mentioned in the JWS is known to
   SDCOE. (Basically checking if we had generated the JWS)
4. Check if the JWS signature is valid by first retrieving the public
   key of the DID from the blockchain, then checking if the JWS header+payload
   can be verified as untampered by using the public key and the JWS signature

## Prerequisites

- [Node.js](https://yarnpkg.com/en/docs/install)
- [Yarn](https://yarnpkg.com/en/docs/install)
- [NPM](https://docs.npmjs.com/getting-started/installing-node)

## Setup

Clone the repository and run

    $ yarn   # or npm install

Finally, start the application.

    $ yarn start:dev (For development)
    $ NODE_ENV=production yarn start (For production)
