# PDF Signing and verification

## Prerequisite setup

The following instructions will help set up ganache,
private keys are all related configuration

1. Run ganache cli. The script to start ganache cli 
is `scripts/deployment/daemons/ganache.sh`. This can
be made to run in the background by running it using
pm2:

```
pm2 start "bash ganache.sh" --name ganache-server
pm2 status
```

2. Upon starting the ganache-server, the accounts created
are stored in `keys.json` file. Take a note of
the account address and the private keys

3. Configure the BLOCKCHAIN_ACCOUNT_ADDRESS and the BLOCKCHAIN_PRIVATE_KEY
int `security/.env`

4. Go to the security folder and deploy the smart contract used for registering
DIDs. Note the registry address

```
cd security
yarn deploy-contract --port 8545

```
5. Configure the registry address BLOCKCHAIN_DID_REGISTRY_ADDRESS in .env file

6. Create a private and public key pair

```
yarn security-utils new-rsa sdcoe
```

A json file with private and public keys will be created. Copy those and
place them in separate files for example. Take note of the file location

```
sdcoe_private.keys
sdcoe_public.keys      
```

7. Encode the content of the public key using base64 and use the following
command to add the public key to the blockchain

```
node ./cli/didFactory.js set-attribute did/pub/RSA/veriKey/base64 <base_64_public_key_here>
```

8. You can check if the public key was indeed inserted using the following

```
node ./cli/didFactory.js resolve-did "did:ethr:$BLOCKCHAIN_ACCOUNT_ADDRESS" | jq
```

9. In transcript-api .env set the path the private key in 
RSA_PRIVATE_KEY_FILE key and set the blockchain account address to
DID_KEY

10. Set the following keys in the verification-api .env

```
ETHEREUM_NODE_URL=${BLOCKCHAIN_NODE_URL}
DID_ADDRESS=${BLOCKCHAIN_DID_REGISTRY_ADDRESS}
DID_KEY=${BLOCKCHAIN_DID_DELEGATE_KEY}
```


## How does the PDF get signed

A PDF is signed using the following process

1. A PDF is signed during generation. A student's transcript
is saved to the database in a field called `mr-transcript` which
stands for machine readable transcript. At this stage the transcript
is in JSON format.
2. When a user hits download from the web-app, the transcript-api
retrieves the mr-transcript and renders the pdf 
(seen here `transcript-api/src/services/transcripts.js`)
3. The `pdf-util` library is then asked to secure the pdf
(seen here `pdf-utils/secure-pdf.js`)
4. First the `mr-transcript` metadata is added to the pdf
5. Then a checksum/hash of the pdf is generated
6. A JWT payload is created with the following 

```
{
    jti: trancript-table-request-id, // jwt unique identifier
    iss: a-did-containing-sdcoe-public-key, // issuer
    nbf: currentTimestamp, // not valid before
    iat: currentTimestamp, // issued at
    exp: 365-days, // jwt expiry date
    pdf_hash: checksum, // pdf hash
  };
```
7. A JWT signed using the SDCOE private key is now set as
metadata called `proof-metadata`


## How does the PDF verification work

The following are steps by which a PDF transcript is verified

1. The user uploads the transcript via the web app
2. The verification-api calls the verify function of pdf-utils (`verification-api\src\controllers\verify.js`)
3. The `pdf-utils\verify-pdf` function checks for metadata. If the pdf does
not contain `mr-transcript` and `proof-metadata` metadata, `False` is returned
4. The `security\jwt\verify` function checks if the `proof-metadata` can
be validated using the public key retrieved from the blockchain by
de-referencing the DID. 
5. The hash/checksum of the pdf is recomputed by `pdf-utils/utilities/hashing.js`.
The checksum should match the one that comes in with the payload in the 'proof-metadata'


