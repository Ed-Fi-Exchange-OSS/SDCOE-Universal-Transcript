# PDF utilities documentation

This module includes code for generating and verifying PDFs.

## Folder Structure

```
email-utils/
├── base64-utils.js
├── cli
├── constants
├── index.js
├── mocker
├── package.json
├── pdf
├── README.md
├── read-metadata.js
├── secure-pdf.js
├── templates
├── test-scripts
├── utilities
├── verify-pdf.js
├── write-metadata.js
└── yarn.lock
```

In the folder structure above,

- The `cli` includes code for accessing the functions of our applications through the Command Line Interface.
- The `constants` includes the constant values we use throughout our application.
- The `mocker` includes code to mock requests we make to Ed-Fi ODS.
- The `utilities` includes all the utilities that we use in this module.

## Link local dependency

1. First, go to the folder where your dependency is (for example: security).
2. Run `yarn link` on the folder. Then run `yarn link <package-name>` on your project directory.
3. The package will be available as <project-name> on your project
   ```js
   const blockchain = require('sdcoe-blockchain');
   ```

## Operations related to base64 conversion

```js
const { stringToBase64, base64ToString } = require('./base64-utils');

console.log(stringToBase64('apple')); // prints 'YXBwbGU='
console.log(base64ToString('YXBwbGU=')); // prints 'apple'
```

## PDF metadata writer and reader

The pdf metadata reader and writer functions return a Promise.

### Writing custom metadata

The function takes file path and key-value pair metadata and writes to the file metadata.

> Note: The metadata written can only be a string hence, if you want to pass in more complex values such as objects then using JSON.stringify(data) is the best way to achieve it.

```js
const { writeMetaData } = require('./write-metadata');

const metadata = {
  student: 'Ram',
  school: 'Everest',
};

writeMetaData('./sample.pdf', 'mr-data', JSON.stringify(metadata))
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error.message);
  });
```

- Using CLI

```bash
pdf-utils write-metadata <pdf-path> <key-to-write> <corresponding-value>
```

If successful the operation returns an object with, `message`, `filePath` and `key` as keys.

For example:

```js
{
  message: 'File written successfully',
  filePath: './sample.pdf',
  key: 'mr-data'
}
```

If failed, the function throws an exception which can be caught in the catch block while consuming the promise.

The `mesasge` property on error will contain one of the following,

```js
'File not found'; // if file path is invalid
'Could not write metadata'; // if any other error occurs

```

### Reading custom metadata

The function `readCustomMetaData` takes in the file path and returns the value as an array of objects assoicated with key & value. The value is in a string format.

```js
readCustomMetaData('./sample.pdf)
```

- Using CLI

```
pdf-utils read-metadata <pdf-path>

```

The function `readMetaData` takes in the file path and the key for metadata and returns the value associated with the key in a promise.

```js
readMetaData('./sample.pdf', 'mr-data')
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
```

- Using CLI

```bash
pdf-utils read-metadata <pdf-path> -k <key-to-read>
```

If successful, the data returned is a string.

If failed, the function throws an exception which can be caught in the catch block while consuming the promise.

The `mesasge` property on error will contain one of the following,

```js
'File not found'; // if file path is invalid
'Could not read metadata'; // if any other error occurs

```

## Secure PDF

To secure the PDF, securePdf utility should be used.

```js
const privateKey = `-----BEGIN RSA PRIVATE KEY-----\n......\n-----END RSA PRIVATE KEY-----`;
const mrTranscript = {
  test: 'hello',
};
const transcriptId = 12345678;

securePdf(
  'transcript.pdf',
  mrTranscript,
  'did:ethe:0s9d0nmv0ins0idnvin0sinv#keys-1',
  transcriptId,
  privateKey
).then((data) => console.log(data));
```

- using CLI

```bash
pdf-utils secure-pdf ./transcript.pdf '{ data: "transcript"}' did:ethe:0s9d0nmv0ins0idnvin0sinv#keys-1 12345678 '-----BEGIN RSA PRIVATE KEY----- .... -----END RSA PRIVATE KEY-----'
```

## Verify Pdf

To verify the pdf, using the public key stored in blockchain

```javascript
const isValid = await verifyPdf(
  './transcript.pdf',
  'HTTP://127.0.0.1:7545',
  '0x39fCFF2f8CD09e7e7705B39eC04AB03Bb2f4aA20',
  'did:ethe:0s9d0nmv0ins0idnvin0sinv#keys-1'
);
```

- using CLI

```bash
pdf-utils verify-pdf ./transcript.pdf HTTP://127.0.0.1:7545  0x39fCFF2f8CD09e7e7705B39eC04AB03Bb2f4aA20 did:ethe:0s9d0nmv0ins0idnvin0sinv#keys-1
```

To read the JWT, readMetadata utility should be used.

```js
readMetaData('transcript.pdf', 'proof-metadata').then((data) => {
  console.log(data);
});
```

## Generating and verifying PDF hash

PDF hash is generated to verify whether the pdf has been modified or not.

> Generating hash of the pdf should be carried out at last (after jwt hash been appended)
> so that jwt is also included in the hash.

> Also, hash-verification should be carried out first (before jwt verification)

### Generate hash

```javascript
const pdfPath = './transcript.pdf';
const hash = await generateFileHash(pdfPath);
console.log(hash);
```

#### Using CLI

```bash
pdf-utils generate-hash ./res.pdf
```

### Verify hash

```javascript
const pdfPath = './transcript.pdf';
const isVerified = await verifyFileHash(pdfPath);
console.log(isVerified);
```

#### Using CLI

```bash
pdf-utils verify-hash ./res.pdf
```
