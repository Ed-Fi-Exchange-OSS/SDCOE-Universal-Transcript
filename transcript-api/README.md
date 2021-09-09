# Transcript API module

This module contains the code for REST API for transcript API.

```
transcript-api/
├── package.json
├── public
│   └── assets
├── README.md
├── src
│   ├── constants
│   ├── controllers
│   ├── db.js
│   ├── docs
│   ├── env.js
│   ├── index.js
│   ├── knexfile.js
│   ├── mappings
│   ├── middlewares
│   ├── migrations
│   ├── models
│   ├── routes
│   ├── scripts
│   ├── seeds
│   ├── serializer
│   ├── services
│   ├── stubs
│   ├── transcripts
│   └── utils
├── test
│   └── api.test.js
└── yarn.lock
```

In the directory structure shown above:

- The `src` directory contains all the major source code
- The `constants` folder contains all the constant values that we use in the application
- The `controllers` folder contains the code that handles the logic of the application
- The `middlewares` folder contains middlewares for various routes
- The `migrations` folder contains codes that map various fields to table columns
- The `models` folder contains database model of our application
- The `routes` folder contains code that routes to different endpoints of our application
- The `scripts` folder contains scripts to automate certain features like fetching data from ODS
- The `seeds` folder contains seed data for our database
- The `serializer` folder contains logic to map database fields to response format
- The `stubs` folder contains logic for stubbing our unit tests
- The `utils` folder contains all the utilities that we use throughout our application

## Setup

Clone the repository and run

    $ yarn   # or npm install

Make a copy of `.env.example` as `.env` and update your application details and database credentials. Now, run the migrations and seed the database.

    $ yarn migrate
    $ yarn seed

Finally, start the application.

    $ yarn start:dev (For development)
    $ NODE_ENV=production yarn start (For production)

## Creating new Migrations and Seeds

These are the commands to create a new migration and corresponding seed file.

    $ yarn make:migration <name>
    $ yarn make:seeder <name>

Example,

    $ yarn make:migration create_tags_table
    $ yarn make:seeder 02_insert_tags

## Adding new user

Simply run the INSERT query in the database console or any database management tool.

**Insert Query**

```sql
INSERT INTO users(first_name, last_name, email_address, role, CDS_code) VALUES(?,?,?,?,?);
```

**Example Query**

- Adding Staff User

```sql
INSERT INTO users(first_name, last_name, email_address, role) VALUES(‘John’, ‘Doe’, ‘johndoe@example.com’, ‘staff’);
```

- Adding District User (CDS Code is required)

```sql
INSERT INTO users(first_name, last_name, email_address, role, CDS_code) VALUES(‘John’, ‘Doe’, ‘johndoe@example.com’, ‘district’, ‘districtCDSCode’);
```

After adding a user to the database, we need to send the password reset link to change the password. Now, after resetting the password, the user can access the system.

In order to send the reset password link to the user’s email, run the following command in the transcript-api module

```sh
$ cd sdcoe-transcript/transcript-api
$ yarn send-reset-link --email useremail@example.com
```

- Example Script

```sh
$ cd sdcoe-transcript/transcript-api
$ yarn send-reset-link --email johndoe@example.com
```

Now, the user johndoe@example.com will receive an email with the password reset link. They can update the password and use it for new sessions.
