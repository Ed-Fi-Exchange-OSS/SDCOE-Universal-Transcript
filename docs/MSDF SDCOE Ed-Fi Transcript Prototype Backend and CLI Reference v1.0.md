# Transcript Backend Module

This module contains the code that can be used to demonstrate
the features of the sdcoe-transcript

```
transcript-backend/
├── cli
│   └── transcript-cli.js
├── composites
│   ├── api
│   └── mocker
├── converters
│   ├── composite-to-standard.js
│   └── mappers
├── index.js
├── package.json
├── package-lock.json
├── README.md
├── transcripts
│   ├── constants
│   ├── rop
│   └── standard
└── yarn.lock
```

In the directory structure shown above:

- The `cli` folder contains the code for the `transcript-cli` CLI accessed using
  `yarn transcript-cli`
- The `composites` folder contains the code for interfacing with the ODS composite API
- The `transcripts` folder contains the code for class representation of the standard and the ROP transcripts
- The `converters` folder contains the mapping between the composites and the standard transcript
- The `index.js` file contains the main methods that serve as the entry point for this library

# How to try out this module

## Install

```
yarn
```

## Set environment variables

```
cp .env.example .env
```

---

# Try the CLI

Welcome to the Transcript CLI. It provides a detail idea about how to use and perform the different
features that `transcript-backend` cli has offered. These features include information about ODS, Querying
the composite API for information, generating transcripts etc.

## How to use Transcript CLI

We need different resources directory and security sample key to try out for demo purposes only.

` Note that the security standards used by default for this CLI are weak and should only be used for demo purpose and is not suitable for production.`

```
$ yarn transcript-cli
```

```
Creating resource directory
Creating JSON directory
Creating PDF directory
Creating (not so) secret directory
Sample Key pair created
> Settings file is located at settings.json
Usage: transcript-cli [options] [command]

CLI for Standard Transcript Generator

Options:
  -V, --version                output the version number
  -h, --help                   display help for command

Commands:
  ods                          Information about ODS
  composite                   Query the composite API for information
  standard                     Query and create a standard JSON transcript
  pdf                          Generate a PDF transcript from a JSON one
  metadata                     Query a pdf transcript for information
  verify                       Verify that a PDF transcript is signed
  reset-config-file [options]  Resets configuration file
Done in 0.11s.
```

## Commands

### 1. ods

This command provides information about the ODS. We can use this command to list all the ODS endpoints and also to add a new ODS endpoint.

```
$ yarn transcript-cli ods
```

```
Usage: transcript-cli ods [options] [command]

Options:
  -h, --help              display help for command

Commands:
  list-endpoints          Lists the ods endpoints available for the CLI
  add-endpoint [options]  Adds an ods endpoint available for the CLI
Done in 0.15s.
```

#### Example usages

##### List endpoints

You can get all the information about ODS endpoints by running this command.

```
$ yarn transcript-cli ods list-endpoints
```

```
$ node ./cli/transcript-cli.js ods list-endpoints
You can change the ods endpoints by modifying: settings.json
[
  {
    clientId: 'THE_SECRET_CLIENT_KEY',
    clientSecret: 'THE_SECRET_CLIENT_SECRET',
    baseUrl: 'THE_ODS_BASE_URL'
  }
]
Done in 0.16s.
```

##### Add a new endpoint

You can add a new endpoint by passing ODS information as parameters. To know what parameters to pass you can simply run
help command.

```
yarn transcript-cli ods add-endpoint --help
```

```
$ node ./cli/transcript-cli.js ods add-endpoint --help
Usage: transcript-cli ods add-endpoint [options]

Adds an ods endpoint available for the CLI

Options:
  -k, --client-key <clientKey>        clientKey for the ods
  -s, --client-secret <clientSecret>  clientSecret for the ods
  -b, --base-url <baseUrl>            baseUrl for the ods endpoint
  -h, --help                          display help for command
Done in 0.16s.
```

```
$ yarn transcript-cli ods add-endpoint -k dx4jzkOUAlBExYyQuFz0s -s XtFsvNk5M2u6xyDdAzYLs -b https://mockapi.info.com
```

```
$ node ./cli/transcript-cli.js ods add-endpoint -k dK4jXkOUAlBExYyQuFz0s -s RtFWvNH5M2u6xyDdAzYLs -b https://sdcoeapi.nearshoredevs.com
ODS Endpoint was added to settings.json
Done in 0.16s.
```

`You can verify by again fetching all ODS endpoints.`

---

### 2. composite

This command is used to query the composite API for information such as listing the available composites, fetching educational organization information etc.

```
$ yarn transcript-cli composite --help
```

```
node ./cli/transcript-cli.js composite
Usage: transcript-cli composite [options] [command]

Options:
  -h, --help                          display help for command

Commands:
  list-composite-end-points           List the available composites
  get-composite-ed-org [options]      Fetches Educational Organization
  get-composite-transcript [options]  Fetches Composite Transcripts
Done in 0.18s.
```

#### Example usages

##### List the available composites

```
$ yarn transcript-cli composite list-composite-end-points
```

```
$ node ./cli/transcript-cli.js composite list-composite-end-points
educationOrganizationHierarchy
studentTranscript
Done in 0.17s.
```

##### Fetches Education Organization

This `get-composite-ed-org` command takes parameters as an option.

```
$ yarn transcript-cli composite get-composite-ed-org --help
```

```
$ node ./cli/transcript-cli.js composite get-composite-ed-org --help
Usage: transcript-cli composite get-composite-ed-org [options]

Fetches Educational Organization

Options:
  -s,--schoolId <schoolId>  id of the school
  -h, --help                display help for command
Done in 0.17s.
```

```
$ yarn transcript-cli composite get-composite-ed-org -s 255901107
```

```
$ node ./cli/transcript-cli.js composite get-composite-ed-org -s 255901107
Authorizing to https://sdcoeapi.nearshoredevs.com
Authorized to https://sdcoeapi.nearshoredevs.com
Fetching https://sdcoeapi.nearshoredevs.com/composites/v1/SDCOE/Transcript/EducationOrganizationHierarchies?schoolId=255901107
{
  schoolResourceId: '461bf6cbf8834ed0bd76670f40790bd0',
  schoolId: 255901107,
  nameOfSchool: 'Grand Bend Elementary School',
  localEducationAgencyResourceId: '922d768f6b3f4ed78ce77d13e44b505a',
  localEducationAgencyId: 255901,
  nameOfLocalEducationAgency: 'Grand Bend ISD',
  addresses: [
    {
      addressTypeDescriptor: 'uri://ed-fi.org/AddressTypeDescriptor#Mailing',
      streetNumberName: 'P.O. Box 9991',
      city: 'Grand Bend',
      stateAbbreviationDescriptor: 'uri://ed-fi.org/StateAbbreviationDescriptor#TX',
      postalCode: '73334-9991',
      nameOfCounty: 'Williston'
    },
    {
      addressTypeDescriptor: 'uri://ed-fi.org/AddressTypeDescriptor#Physical',
      streetNumberName: '52 Halsey Ave.',
      city: 'Grand Bend',
      stateAbbreviationDescriptor: 'uri://ed-fi.org/StateAbbreviationDescriptor#TX',
      postalCode: '73334',
      nameOfCounty: 'Williston'
    }
  ]
}
Done in 44.49s.
```

##### Fetches composite transcripts

This `get-composite-transcript` fetches all the composite transcripts from ODS server. By default, it fetches all the available composite transcripts, but you can also pass parameters such as `student id`, `first name`, `last name`, `date of birth` etc. as an option.

```
$ yarn transcript-cli composite get-composite-transcript --help
```

```
$ node ./cli/transcript-cli.js composite get-composite-transcript --help
Usage: transcript-cli composite get-composite-transcript [options]

Fetches Composite Transcripts

Options:
  -s,--studentId [studentId]        id of the student to fetch transcript record
  -fn,--firstName [firstName]       first name of the sutdent to filter by student's first name
  -ln,--lastName [lastName]         last name of the sutdent to filter by student's last name
  -dob,--dateOfBirth [dateOfBirth]  Date of Birth of the sutdent to filter by student's date of birth
  -h, --help                        display help for command
Done in 0.18s.
```

###### Using student id

```
$ yarn transcript-cli composite get-composite-transcript -s 604842
```

```
{
  resourceId: 'ef57644387354811a09ae128d99227ac',
  studentUniqueId: '604842',
  firstName: 'Frederick',
  lastSurname: 'Munoz',
  birthDate: '2004-12-02T00:00:00',
  demographics: [
    {
      gender: 'uri://ed-fi.org/SexDescriptor#Male',
      hispanicLatinoEthnicity: true,
      oldEthnicityDescriptor: 'uri://ed-fi.org/OldEthnicityDescriptor#White, Not Of Hispanic Origin',
      educationOrganizationId: 255901,
      educationOrganizationType: 'edfi.LocalEducationAgency',
      races: [Array]
    }
  ],
  alternateIds: [
    {
      educationOrganizationId: 255901,
      educationOrganizationType: 'edfi.LocalEducationAgency',
      alternateIdentificationCodes: [Array]
    }
  ],
  guardians: [
    {
      relationDescriptor: 'uri://ed-fi.org/RelationDescriptor#Mother',
      livesWith: true,
      resourceId: '0d351d7b2b64421f836a94937046a788',
      parentUniqueId: '777969',
      firstName: 'Laverne',
      lastSurname: 'Munoz',
      addresses: [Array],
      telephones: [Array]
    },
    {
      relationDescriptor: 'uri://ed-fi.org/RelationDescriptor#Father',
      livesWith: true,
      resourceId: '4d6ae893864c46c7aec3df42ff370b28',
      parentUniqueId: '778593',
      firstName: 'Seth',
      lastSurname: 'Munoz',
      addresses: [Array],
      telephones: [Array]
    }
  ],
  enrollment: [
    {
      entryDate: '2010-08-23T00:00:00',
      entryGradeLevelDescriptor: 'uri://ed-fi.org/GradeLevelDescriptor#Second grade',
      schoolId: 255901107,
      nameOfInstitution: 'Grand Bend Elementary School',
      graduationPlan: [Object]
    }
  ],
  academicRecord: [
    {
      schoolYear: 2012,
      termDescriptor: 'uri://ed-fi.org/TermDescriptor#Fall Semester',
      cumulativeEarnedCredits: 7,
      educationOrganizationId: 255901107,
      educationOrganizationType: 'edfi.School',
      diplomas: [],
      studentAcademicRecordAcademicHonors: [],
      studentAcademicRecordRecognitions: [],
      transcript: [Array]
    },
    {
      schoolYear: 2012,
      termDescriptor: 'uri://ed-fi.org/TermDescriptor#Spring Semester',
      cumulativeEarnedCredits: 13,
      educationOrganizationId: 255901107,
      educationOrganizationType: 'edfi.School',
      diplomas: [],
      studentAcademicRecordAcademicHonors: [],
      studentAcademicRecordRecognitions: [],
      transcript: [Array]
    }
  ],
  assessments: []
}
Done in 28.02s.
```

###### Using student demographics

```
$ yarn transcript-cli composite get-composite-transcript -fn Frederick -ln Munoz -dob 2004-12-02
```

```
[
  {
    resourceId: 'ef57644387354811a09ae128d99227ac',
    studentUniqueId: '604842',
    firstName: 'Frederick',
    lastSurname: 'Munoz',
    birthDate: '2004-12-02T00:00:00',
    demographics: [ [Object] ],
    alternateIds: [ [Object] ],
    guardians: [ [Object], [Object] ],
    enrollment: [ [Object] ],
    academicRecord: [ [Object], [Object] ],
    assessments: []
  }
]
```

---

### 3. json

This command is used to query, create & validate the standard JSON transcript.

```
yarn transcript-cli json --help
```

```
Usage: transcript-cli json [options] [command]

Options:
  -h, --help                                                                              display help for command

Commands:
  list                                                                                    List the available standard JSON files
  create [options]                                                                        Query ODS for composites and create a JSON transcript
  validate <fileName>                                                                     Validates whether a json file fits a standard transcript
                                                                                          requirements
  composite-to-standard [transcriptFile] [enrollmentsFile] [educationalOrganizationFile]  Prints standard JSON for the given composite files

```

##### list

This command lists the available standard JSON files in our resource directory.

```
$ yarn transcript-cli json list
```

##### create

This command queries the ODS for composites and create a JSON transcript.We can query and create transcript by providing the student id or student demographics information. It takes the parameter such as `studentId`, `firstName`, `lastName`, `dateOfBirth` as an option.

```
$ yarn transcript-cli json create --help
```

```
$ node ./cli/transcript-cli.js json create --help
Usage: transcript-cli json create [options]

Query ODS for composites and create a JSON transcript

Options:
  -s,--studentId <studentId>        id of the student
  -fn,--firstName <firstName>       first name of the student
  -ln,--lastName <lastName>         last name of the student (yyyy-mm-dd)
  -dob,--dateOfBirth <dateOfBirth>  Date of Birth of the student
  -des,--destination <destination>  Destination of the output (default: "")
  -h, --help                        display help for command
Done in 0.27s.
```

###### Using student id

```
$ yarn transcript-cli json create -s 604842
```

```
MainTranscript {
  studentTranscript: StudentTranscript {
    resourceId: 'ef57644387354811a09ae128d99227ac',
    transcriptRunDate: '07/15/2021',
    studentUniqueId: '604842',
    studentUniqueIdType: 'SIS',
    firstName: 'Frederick',
    lastSurname: 'Munoz',
    birthDate: '2004-12-02T00:00:00',
    birthSexDescriptor: null,
    studentLocalId: '842',
    studentIdentificationSystemDescriptor: 'uri://ed-fi.org/StudentIdentificationSystemDescriptor#Local',
    demographics: [ [Demographics] ],
    guardians: [ [Guardian], [Guardian] ],
    studentAcademicRecords: [ [AcademicRecord], [AcademicRecord] ],
    programs: [],
    studentAssessments: [],
    awardsAchievements: []
  }
}
frederick_munoz_2004-12-02.json saved
Done in 59.74s.
```

###### Using student's demographics

```
$ yarn transcript-cli json create -fn Frederick -ln Munoz -dob 2004-12-02
```

```
MainTranscript {
  studentTranscript: StudentTranscript {
    resourceId: 'ef57644387354811a09ae128d99227ac',
    transcriptRunDate: '07/15/2021',
    studentUniqueId: '604842',
    studentUniqueIdType: 'SIS',
    firstName: 'Frederick',
    lastSurname: 'Munoz',
    birthDate: '2004-12-02T00:00:00',
    birthSexDescriptor: null,
    studentLocalId: '842',
    studentIdentificationSystemDescriptor: 'uri://ed-fi.org/StudentIdentificationSystemDescriptor#Local',
    demographics: [ [Demographics] ],
    guardians: [ [Guardian], [Guardian] ],
    studentAcademicRecords: [ [AcademicRecord], [AcademicRecord] ],
    programs: [],
    studentAssessments: [],
    awardsAchievements: []
  }
}
frederick_munoz_2004-12-02.json saved
Done in 21.42s.
```

#### validate

This command is used to validate whether a JSON file fits a standard transcript or not. It takes the `filepath` as an argument.

```
$ yarn transcript-cli json validate ./savedData/json/frederick_munoz_2004-12-02.json
```

```
yarn run v1.22.4
$ node ./cli/transcript-cli.js json validate ./savedData/json/frederick_munoz_2004-12-02.json
Invalid value in nameOfInstitution of AcademicRecord. (Is Null or Undefined)
Invalid value in nameOfInstitution of AcademicRecord. (Is Null or Undefined)
Done in 0.25s.
```

#### composite to standard

This command `composite-to-standard` prints standard JSON for the given composite files. It takes composite-to-standard `transcriptFile`, `enrollmentsFile` & `educationalOrganizationFile` as an argument.

```
$ yarn transcript-cli standard composite-to-standard [transcriptFile] [enrollmentsFile] [educationalOrganizationFile]
```

```
yarn transcript-cli standard composite-to-standard ./composites/mocker/resources/composite-transcript.json ./composites/mocker/resources/composite-enrollments.json ./composites/mocker/resources/composite-educational-organization.json
```

```
$ node ./cli/transcript-cli.js standard composite-to-standard ./composites/mocker/resources/composite-transcript.json ./composites/mocker/resources/composite-enrollments.json ./composites/mocker/resources/composite-educational-organization.json
MainTranscript {
  studentTranscript: StudentTranscript {
    resourceId: 'a46168c9fb094172a23fdb9ab2ce9177',
    transcriptRunDate: '07/15/2021',
    studentUniqueId: '604821',
    studentUniqueIdType: 'SIS',
    firstName: 'Tyrone',
    lastSurname: 'Dyer',
    birthDate: '2003-11-13T00:00:00',
    birthSexDescriptor: null,
    studentLocalId: '821',
    studentIdentificationSystemDescriptor: 'uri://ed-fi.org/StudentIdentificationSystemDescriptor#Local',
    demographics: [ [Demographics] ],
    guardians: [ [Guardian], [Guardian] ],
    studentAcademicRecords: [ [AcademicRecord], [AcademicRecord] ],
    programs: [],
    studentAssessments: [],
    awardsAchievements: [ [Achievements] ]
  }
}
Done in 0.27s.
```

####

---

### 4. pdf

This command is used to generate PDF from the JSON data.

```
$ yarn transcript-cli pdf --help
```

```
Usage: transcript-cli pdf [options] [command]

Options:
  -h, --help                 display help for command

Commands:
  create-rop [options]       Creates a ROP PDF from a standard JSON file
  create-standard [options]  Creates a standard transcript PDF from a standard JSON file
  list                       List the available composites
Done in 0.33s.

```

##### Create ROP PDF

This command `create-rop` creates a ROP PDF from the standard JSON file. It takes JSON file and destination path as a parameter.

```
$ yarn transcript-cli pdf create-rop --help
```

```
$ node ./cli/transcript-cli.js pdf create-rop --help
Usage: transcript-cli pdf create-rop [options]

Creates a ROP PDF from a standard JSON file

Options:
  -j,--json <sourceFile>              source JSON/ standard JSON file
  -d,--destination <destinationFile>  destination  path to save/store transcript
  -h, --help                          display help for command
Done in 0.24s.

```

To create the ROP transcript & certificate the SDCOE staff should select specific subjects from the available ROP courses. For this example purpose, We have selected few courses in settings.json from that JSON file.

```
"rop": [
    {
      "courseCode": "ART-02",
      "courseTerm": "Fall_2012",
      "requestedROPCertificate": true,
      "requestedROPTranscript": false
    },
    {
      "courseCode": "SCI-02",
      "courseTerm": "Fall_2012",
      "requestedROPCertificate": false,
      "requestedROPTranscript": true
    }
  ],
```

```
$yarn transcript-cli pdf create-rop -j savedData/json/frederick_munoz_2004-12-02.json
```

```
yarn run v1.22.4
$ node ./cli/transcript-cli.js pdf create-rop -j savedData/json/frederick_munoz_2004-12-02.json
PDF Rendered : savedData/pdf/rop_frederick_munoz_2004-12-02.pdf
Successfully created standard PDF: savedData/pdf/rop_frederick_munoz_2004-12-02.pdf
Done in 1.02s.
```

##### Create STANDARD PDF

This command `create-standard` creates a STANDARD PDF from the standard JSON file. It takes source JSON file and destination path as a parameter.

```
$ yarn transcript-cli pdf create-standard --help
```

```
yarn run v1.22.4
$ node ./cli/transcript-cli.js pdf create-standard --help
Usage: transcript-cli-pdf create-standard [options]

Creates a standard transcript PDF from a standard JSON file

Options:
  -j,--json <sourceFile>              source JSON/ standard JSON file
  -d,--destination <destinationFile>  destination  path to save/store transcript
  -h, --help                          display help for command
Done in 0.24s.
```

```
$ yarn transcript-cli pdf create-standard -j savedData/json/frederick_munoz_2004-12-02.json
```

```
yarn run v1.22.4
$ node ./cli/transcript-cli.js pdf create-rop -j savedData/json/frederick_munoz_2004-12-02.json
PDF Rendered : savedData/pdf/rop_frederick_munoz_2004-12-02.pdf
Successfully created standard PDF: savedData/pdf/rop_frederick_munoz_2004-12-02.pdf
Done in 1.02s.
```

---

### 5. metadata

This command is used to query a PDF transcript for information i.e. metadata information.
To see more details about this command, see the help option.

```
yarn transcript-cli metadata --help
```

```
$ node ./cli/transcript-cli.js metadata
Usage: transcript-cli-metadata [options] [command]

Options:
  -h, --help                      display help for command

Commands:
  add <pdfPath> <jsonPath>        Sets specified json file as metadata for a given pdf. The metadata is added to "mr-transcript" key
  secure-pdf [options] <pdfPath>  Secures a pdf adding proof-metadata
  show-mr-transcript <pdfPath>    Prints "mr-transcript" metadata for a given pdf
  show-proof-metadata <pdfPath>   Prints "proof-metadata" metadata for a given pdf
  show [options] <pdfPath>        Read the metadata with given key from pdf path passed as argument.The list of metadata keys that is currently available are
                                  mr-transcript, proof-metadata and ModDate.
Done in 1.04s.
```

##### add

This command sets the specified JSON file as metadata for a given PDF. The metadata is added to `mr-transrcipt` key.

```
yarn transcript-cli metadata  add ./savedData/pdf/standard_frederick_munoz_2004-12-02.pdf ./savedData/json/frederick_munoz_2004-12-02.json
```

```
yarn run v1.22.4
$ node ./cli/transcript-cli.js metadata add ./savedData/pdf/standard_frederick_munoz_2004-12-02.pdf ./savedData/json/frederick_munoz_2004-12-02.json
Metadata "mr-transcript" has been added
Done in 0.83s.
```

##### show-mr-transcript

This command prints "mr-transcript" metadata for a given PDF.

```
yarn transcript-cli metadata show-mr-transcript ./savedData/pdf/standard_frederick_munoz_2004-12-02.pdf
```

```
yarn run v1.22.4
$ node ./cli/transcript-cli.js metadata show-mr-transcript ./savedData/pdf/standard_frederick_munoz_2004-12-02.pdf
{
  "studentTranscript": {
    "resourceId": "ef57644387354811a09ae128d99227ac",
    "transcriptRunDate": "07/15/2021",
    "studentUniqueId": "604842",
    "studentUniqueIdType": "SIS",
    "firstName": "Frederick",
    "lastSurname": "Munoz",
    "birthDate": "2004-12-02T00:00:00",
    "birthSexDescriptor": null,
    "studentLocalId": "842",
    "studentIdentificationSystemDescriptor": "uri://ed-fi.org/StudentIdentificationSystemDescriptor#Local",
    "demographics": [
      {
        "gender": "uri://ed-fi.org/SexDescriptor#Male",
        "hispanicLatinoEthnicity": true,
        "races": [
          {
            "raceDescriptor": "uri://ed-fi.org/RaceDescriptor#Native Hawaiian - Pacific Islander"
          }
        ]
      }
    ],
    "guardians": [
      {
        "relationToStudent": "uri://ed-fi.org/RelationDescriptor#Mother",
        "livesWith": true,
        "firstName": "Laverne",
        "lastSurname": "Munoz",
        "addresses": [
          {
            "addressType": "uri://ed-fi.org/AddressTypeDescriptor#Home",
            "streetNumberName": "16 Green Fabien St.",
            "city": "Grand Bend",
            "state": "uri://ed-fi.org/StateAbbreviationDescriptor#TX",
            "postalCode": "78834",
            "nameOfCounty": "WILLISTON"
          }
        ],
        "telephones": [
          {
            "telephoneNumber": "(950) 346 6664",
            "telephoneNumberType": "uri://ed-fi.org/TelephoneNumberTypeDescriptor#Emergency 2"
          }
        ]
      },
      {
        "relationToStudent": "uri://ed-fi.org/RelationDescriptor#Father",
        "livesWith": true,
        "firstName": "Seth",
        "lastSurname": "Munoz",
        "addresses": [
          {
            "addressType": "uri://ed-fi.org/AddressTypeDescriptor#Home",
            "streetNumberName": "16 Green Fabien St.",
            "city": "Grand Bend",
            "state": "uri://ed-fi.org/StateAbbreviationDescriptor#TX",
            "postalCode": "78834",
            "nameOfCounty": "WILLISTON"
          }
        ],
        "telephones": [
          {
            "telephoneNumber": "(950) 434 2462",
            "telephoneNumberType": "uri://ed-fi.org/TelephoneNumberTypeDescriptor#Mobile"
          }
        ]
      }
    ],
    "studentAcademicRecords": [
      {
        "studentUniqueId": "604842",
        "gradeLevel": null,
        "studentCounselorName": null,
        "educationOrganizationId": 255901107,
        "schoolId": 255901107,
        "nameOfCounty": null,
        "nameOfState": null,
        "schoolYear": 2012,
        "termDescriptor": "uri://ed-fi.org/TermDescriptor#Fall Semester",
        "cumulativeEarnedCredits": 7,
        "courseTranscript": [
          [Object],
          [Object],
          [Object],
        ]
      },
      {
        "studentUniqueId": "604842",
        "gradeLevel": null,
        "studentCounselorName": null,
        "educationOrganizationId": 255901107,
        "schoolId": 255901107,
        "nameOfCounty": null,
        "nameOfState": null,
        "schoolYear": 2012,
        "termDescriptor": "uri://ed-fi.org/TermDescriptor#Spring Semester",
        "cumulativeEarnedCredits": 13,
        "courseTranscript": [
          [Object],
          [Object]
        ]
      }
    ],
    "programs": [],
    "studentAssessments": [],
    "awardsAchievements": []
  }
}
Done in 0.77s.
```

##### show-proof-metadata

This command prints "proof-metadata" metadata for a given PDF.

```
yarn transcript-cli metadata show-proof-metadata ~/Downloads/aprilshelton_1620210048.pdf
```

```
yarn run v1.22.4
$ node ./cli/transcript-cli.js metadata show-proof-metadata /home/user/Downloads/aprilshelton_1620210048.pdf
eyJhbGciOiJSUzUxMiIsInR5cGUiOiJKV1QiLCJraWQiOiJkaWQ6ZXRocjoweGQyOTgzZDE3MjgxZjQ2YWM4Mzk1NjhiYjk0MGRjODg3YzBiYzQ4N2MifQ.eyJqdGkiOiI1NDA1ODAzMC0xOWVmLTQyNmQtODkxZS00MjA2YThjZGE3MTMiLCJpc3MiOiJkaWQ6ZXRocjoweGQyOTgzZDE3MjgxZjQ2YWM4Mzk1NjhiYjk0MGRjODg3YzBiYzQ4N2MiLCJuYmYiOjE2MjAyMTAwNDgsImlhdCI6MTYyMDIxMDA0OCwiZXhwIjoxNjUxNzQ2MDQ4LCJwZGZfaGFzaCI6ImMwNDJmODQyM2MxMDljYTY2YTY3NDJhODljMGI1Mzc0YzFhMTU4MDcwY2RkMDlhNDAzZjMzNzYxMDhhODIyOTEifQ.xGL3Xp1jAflEKD5AvNIJaT8qRq5DSDhBVIie7rfjuxNpf6ZLSBJOxUxrqHPn7UDSHEFouiHHq1ki1h4W4bMSL5tEV_Hzg8cYVmp8uLRGtqLEFkKllxTW_Ezy4gO_MXOc6EHoZHM2E7PgzuIO0TTDuef2onQOS9cpPevSCQMZrSGt5VzQP2MlldKpx8KQbaXLSILiqlGWJJo2bbZXdpz7C30fuwx5WljwFe_GCLaFCLmn3HydWnXBqrCqelxW-HazOg76jywdMTGD1GruMncLDMLl5bTfwEmEvMUVF3YlzW8rMxxj1OfgVeoZx6kr9tb0wn2lSv8pfLJgcPuQ_bpqHQ
Done in 0.66s.
```

##### show

This command read the metadata with given key from PDF path passed as argument. The list of metadata keys that currently available are mr-transcript, proof-metadata and ModDate.
This command takes options as a parameter. To show the details try `--help` command.

```
yarn transcript-cli metadata show --help
```

```
$ node ./cli/transcript-cli.js metadata show --help
Usage: transcript-cli-metadata show [options] <pdfPath>

Read the metadata with given key from pdf path passed as argument.The list of metadata keys that is currently available are mr-transcript, proof-metadata and ModDate.

Options:
  -k,--key <key>  returns the metadata information of the provided key from the pdf
  -h, --help      display help for command
Done in 0.65s
```

###### Example:

```
$ yarn transcript-cli metadata show -k CreationDate ./savedData/pdf/standard_frederick_munoz_2004-12-02.pdf
```

```
$ node ./cli/transcript-cli.js metadata show -k CreationDate ./savedData/pdf/standard_frederick_munoz_2004-12-02.pdf
D:20210716072838+00'00'
Done in 0.68s.
```

---

### 6. signing

This command is used to secure/sign the PDF either using blockchain or file-based and also to verify whether its secured/signed or not. This command has two options.

```
$ yarn transcript-cli signing --help
```

```
$ node ./cli/transcript-cli.js signing
Usage: transcript-cli-signing [options] [command]

Options:
  -h, --help                      display help for command

Commands:
  secure-pdf [options] <pdfPath>  Secures a pdf adding proof-metadata
  verify-pdf <pdfPath>            Verify a given tamper-evident pdf. The pdf must have "proof-metadata"
Done in 0.98s.
```

##### secure-pdf

This command secures a PDF by adding proof-metadata in the file. This command takes `mode` as a parameter to specify whether to sign the PDF for verification using blockchain or using a file. By default, the mode is set to `file`.

We can configure all signing attributes by configuring `settings.json` file and in a `signing` key.

`signingKeyId` - reference of the private key

`issuerId` - random issuer id for the PDF signing

`jwtIdentifier` - random id that is used as transcript id

```JSON
 "digitalSigning": {
    "verification": {
      "did": {
        "nodeUrl": "127.0.0.1",
        "nodePort": 8545,
        "didRegistryAddress": "0x77777777788888889999999",
        "verificationKeyId": "did:ethr:0x000011112222333344445555EEEE#delegate-1"
      },
      "file": {
        "verificationKeyId": "urn:sdcoe-keypair:Li9zYXZlZERhdGEvc2VjcmV0L3B1YmxpYy5rZXk=#autocreated_sample"
      }
    },
    "signing": {
      "signingKeyId": "urn:sdcoe-keypair:Li9zYXZlZERhdGEvc2VjcmV0L3ByaXZhdGUua2V5#autocreated_sample",
      "issuerId": "urn:sdcoe:transcript-project-2021",
      "jwtIdentifier": "urn:sdcoe-request:xyz"
    }
  },
```

```
$ yarn transcript-cli signing secure-pdf --help
```

```
$ node ./cli/transcript-cli.js signing secure-pdf --help
Usage: transcript-cli-signing secure-pdf [options] <pdfPath>

Secures a pdf adding proof-metadata

Options:
  -m, --mode <mode>  Pass either "file" or "did"
  -h, --help         display help for command
Done in 0.64s.
```

###### Using File Mode

```
yarn transcript-cli signing secure-pdf ~/Downloads/tyronedyer_1626087629.pdf -m file
```

```
yarn run v1.22.10
$ node ./cli/transcript-cli.js signing secure-pdf /home/aakritsubedi/Downloads/tyronedyer_1626087629.pdf -m file
PDF was secured
```

###### Using Blockchain/DID

```
$ yarn transcript-cli signing secure-pdf ~/Downloads/tyronedyer_1626087629.pdf -m did
```

```
yarn run v1.22.10
$ node ./cli/transcript-cli.js signing secure-pdf /home/aakritsubedi/Downloads/tyronedyer_1626087629.pdf -m did
PDF was secured
Done in 1.52s.
```

`Note: You can not verify PDF file using blockchain if you did not setup the ganache, blockchain correctly.`

#### verify-pdf

This command verifies a given tamper-evident PDF and ensures it must have "proof-metadata".

```
yarn transcript-cli signing verify-pdf ~/Downloads/tyronedyer_1626087629.pdf
```

```
yarn run v1.22.10
$ node ./cli/transcript-cli.js signing verify-pdf /home/aakritsubedi/Downloads/tyronedyer_1626087629.pdf
Was proof-metadata present? true
Was public key found? true
Was signature valid? true
Was Hash found? true
Was Hash valid? true
PDF was verified as un-tampered
Done in 1.98s.

```

---

### 7. reset-config-file

This command resets the configuration file. This command takes a flag or option for confirmation.

```
$ yarn transcript-cli reset-config-file --help
```

```
$ node ./cli/transcript-cli.js reset-config-file --help
Usage: transcript-cli reset-config-file [options]

Resets configuration file

Options:
  -y, --yes   Are you sure
  -h, --help  display help for command
Done in 0.10s.
```

---

# Running tests

We set up the unit tests with the help of the mocha(testing tool) & mocha(assertion) library.

Installing dependencies

```
$ yarn
```

#### Run tests

```
$ yarn test
example:
compositeToStandard
✔ should throw an an error if no parameter is provided
✔ should throw an an error if empty transcript data is provided
✔ should throw an an error if empty organizations or no is provided
✔ should convert the transcript data to standarad format

4 passing (3ms)

```

# Using as a library

This module can be used as a library as follows

```javascript
const backend = require('./transcript-backend')

const odsConfig = { // define ODS config here }
const studentId = '111222333'

backend.searchTranscriptByStudentId(odsConfig, studentId)
.then(console.log)
.catch(error_handler)

const firstName = 'Ram'
const lastName = 'Sharma'
const dob = '1990-01-01'

backend.searchTranscriptByStudentDemographics(odsConfig,
firstName, lastName, dob)
.then(console.log)
.catch(error_handler)

```

