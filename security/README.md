# SDCOE blockchain module

## module: DIDFactory

Class containing methods to generate DID, set attributes, sign and verify data.

### Setup
**Install Ganache/Ganache CLI**  
Ganache is a personal blockchain for rapid Ethereum and Corda distributed application development. Ganache is used in the development cycle to develop, deploy, and test your SDCOE app.

- **Ganache** 
Ganache UI is desktop application supporting both Ethereum and Corda technology. Install the Ganache for your operating system. Click [here](https://www.trufflesuite.com/ganache) to download the latest version.

- **Ganache CLI**
 Ganache CLI, part of the Truffle suite of Ethereum development tools, is the command line version of Ganache, your personal blockchain for Ethereum development.  

 ```shell
 $ yarn global add ganache-cli
 ``` 
and run the ganache instance. 

0. Deploy smart contract to a ganache instance.
  - Start Ganache Server 
  ```shell
  $ yarn start-ganache --port <port>
  ```

  - Deploy the smart contract to Ganache instance
  ```shell
  $ yarn deploy-smart-contract --port <port>
  ```

1. Create a new object of DIDFactory class. Provide ganache URL and registry address

```
const url = "http://localhost:6545"
const registry = "0xf5fe34b0ab30d90e68665999cb67ababda36a2f5"
const didFactory = new DIDFactory(url, registry);
```

2. Create a new DID using the method createDID(address, privateKey)

```
const ethrDid = didFactory.createDID(
  "0x86B52e3446354c6C09A6FEBC63B189E41768AFf9",
  "6bee80b643c23c16c7c7fd242632c4a30e9b15a8221f55b784ef375ee5f9494a"
);
```

3. Set a new Attribute

```
didFactory.setAttribute(
    'did/pub/Ed25519/veriKey/base64',
    'Arl8MN52fwhM4wgBaO4pMFO6M7I11xFqMmPSnxRQk2tx'
).then((transaction) => console.log);
```

4. Revoke an attribute

```
didFactory.revokeAttribute(
    'did/pub/Ed25519/veriKey/base64',
    'Arl8MN52fwhM4wgBaO4pMFO6M7I11xFqMmPSnxRQk2tx'
  ).then((transaction) => console.log);
```

5. Resolve a DID

```
didFactory.resolveDID("did:ethr:0x86B52e3446354c6C09A6FEBC63B189E41768AFf9")
  .then((didDoc) => console.log)
```

5. Sign data using the DID

```
didFactory.signJWT({ test: "hello" }).then((jwt) => console.log)
```

6. Verify signed jwt using the DID

```
didFactory.verifyJWT(jwt).then((payload, issuer) => console.log)
```

7. Create a RSA pair and store in the file 
will create a separate file for public and private keys
```
const security = require('./security');

security.createRsaKeyPair(label);
```

1. List all the labels available
will list all the available  in secured folder
```
const security = require('./security');

security.listAllLabels();
```

9. Get the RSA keypairs
return the RSA keypair for the particular label
```
const security = require('./security');

security.getRsaKeyPair('label');
```

10. Sign the payload
return the JWT token for proof data 
```
const signature = require('./sign');

signature.sign('algorithm', 'payload', 'privateKey');

```

11. Verify the JWT token
check the validity and return the status of the JWT token provided
```
const signature = require('./sign');

signature.verify('jwt', 'publicKey');

```

12. Verify the PDF proof metadata
check the validity of the proof metadata and return the status of the JWT token provided  
```
const verification = require('./verify');

verification.verify('jwt', 'ethereumNodeURL', 'DIDRegistryAddress' ,'publicKey');
```
### CLI usage

Copy .env.example and create .env file

```
cp .env.example .env
vim .env
```

Install module

```
npm install ./
```

#### DID CLI 

Resolve DID document from DID

```
did-factory resolve-did [did]
did-factory resolve-did did:ethr:0x86B52e3446354c6C09A6FEBC63B189E41768AFf9
```

Set a new attribute to the DID

```
    did-factory set-attribute <attribute-key> <attribute-value>
did-factory set-attribute did/pub/Ed25519/veriKey/base64 Arl8MN52fwhM4wgBaO4pMFO6M7I11xFqMmPSnxRQk2ty
```

Revoke an attribute from the DID

```
did-factory revoke-attribute <attribute-key> <attribute-value>
did-factory revoke-attribute did/pub/Ed25519/veriKey/base64 Arl8MN52fwhM4wgBaO4pMFO6M7I11xFqMmPSnxRQk2ty
```

#### Security CLI 

Create a new RSA keypair
will create a separate file for public and private keys
```
security-utils new-rsa <label>
security-utils new-rsa sdcoe
```

Get a RSA keypair

```
security-utils get-rsa <label>
security-utils get-rsa sdcoe
```

Get account information
will display the account info

```
security-utils account-info 
```

Get list of available label 

```
security-utils list-labels
```

Sign the payload 

```
security-utils sign <algorithm> <payload> <privateKey>
security-utils sign RS512 { message: 'The work in progress'} ---BEGIN RSA PRIVATE KEY ... --- END RSA PRIVATE KEY ---
```

Verify the jwt token 

```
security-utils verify <jwt> <publicKey> 
security-utils verify eymluMHNpbnYja2V5cy0xIn0.Im154U_0Grr_.044nkPbW6XkDsQg1vikKanilreRSImPTnP8Fo986CQIn8wvaIXgnd9uxkiBTtCy6ozg ---BEGIN PUBLIC KEY ... --- END PUBLIC KEY ---
```

Verify the pdf proof data
```
security-utils verify-pdf <jwt> <ethereumNodeURL> <DIDRegistryAddress> <DID>
security-utils verify-pdf eyJhbGciOiJSUzI1NiIsInR5cGUiOiJKV1QiLCJraWQiOiJkaWQ6ZXRoZTowczlkMG5tdjBpbnMwaWRudmluMHNpbnYja2V5cy0xIn0.eyJtZXNzYWdlIjoiSGVsbG8gZXZlcnlvbmUgLi4gaG93IGFyZSB5b3U_ICJ9.cCLycyGvCpWPzEus4jRxg-lT7B_SQ2ssIvFRqxxJvc_w4WLYEy0EhTOXSWLQyk9x1kdmwpwh3jch-NqPKs-zUKdjtSZa68AAxY7PPYojFfkHxaZr-PxhjyzTXu8CHFdGk77W23Yq3nyRhrugvNDIUNKbHqc2Lm-Y67YWud8nA8CurpBONUtK5zIUrcEKRW_z2P0ZCxqIVi0cPw6jX5q-EjyYG26dQ0t0NPFxcmuPJAjvZRlGIgsLHNI9aH3aSQl9C3PGfPYSvb0lyi-sh474POcvAKbm56oHBTNqXDS4rJ87RFzPOS821hWnswmcpOeIxidL9BoGgD2B16Sl5CGKQg HTTP://127.0.0.1:7545 0x39fCFF2f8CD09e7e7705B39eC04AB03Bb2f4aA20 did:ethr:0xeadce9c0134dfae27d511d74ca6b88c964d43564#delegate-1
```
