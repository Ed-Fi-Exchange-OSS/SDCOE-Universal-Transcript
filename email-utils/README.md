# SDCOE Email module

This module includes code for sending email.

## Folder Structure

```
email-utils/
├── cli
│   └── index.js
├── email
│   ├── constants
│   ├── index.js
│   ├── templates
│   └── utils
├── index.js
├── package.json
├── README.md
└── yarn.lock
```

In the directory structure given above,

- The `cli` includes code for sending email through the command line.
- The `email` includes code that facilitate sending email.

## module: sendEmail

a function that is used to send an email templates using nodemailer package

### CLI usage

Copy .env.example and create .env file

```
cp .env.example .env
vim .env
```

update the .env

#### Email CLI

- **Send Email CLI**

send an email templates after resolving the handlebar files

```
email-utils send-email <templateName> <subject> <email> <download>

email-utils send-email --template=REQUEST_APPROVED_STUDENT --subject='Hello John' --email='gayada4258@lovomon.com' --download='https://[YOURDOMAIN]/api/transcript?requestId=076c414b-0094-4a9b-a64f-db0617faa9d9&type=standard%20pdf'
```
