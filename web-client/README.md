# SDCOE Transcript Project Frontend

This module includes code for frontend application built with react.

```
web-client
├── jsconfig.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── README.md
├── src
│   ├── App.js
│   ├── assets
│   │   ├── fonts
│   │   ├── icons
│   │   ├── images
│   │   ├── images.js
│   │   └── sass
│   ├── components
│   │   ├── common
│   │   ├── district
│   │   ├── form
│   │   ├── home
│   │   ├── staff
│   │   ├── student
│   │   └── validate
│   ├── config.js
│   ├── constants
│   ├── hooks
│   ├── index.js
│   ├── mappings
│   │   └── orderMapper.js
│   ├── public.js
│   ├── Router.js
│   ├── services
│   └── utils
└── yarn.lock
```

In the directory structure given above, `src` includes most of the code of our application. The `public` directory includes favicon and manifest.json file.

- The `assets` include our applications assets such as stylesheets and images.
- The `components` include our applications react components.
  - The `common` directory includes common components that we use throughout the application such as buttons and links.
  - The `district` directory includes component/pages that can be viewed by district only.
  - The `form` directory includes code for handling form and the validation of the form.
  - The `home` directory includes home page which routes to different page depending on the user.
  - The `staff` directory includes component/pages that can only be viewed by staff users.
  - The `student` directory includes component/pages that can be viewed by unauthenticated user who we assume to be students.
  - The `validate` directory includes component for transcript validation page.
- The `constants` directory includes all the constant values that we use in our application.
- The `hooks` directory includes all the custom hooks we use in our application.
- The `services` directory includes the code to handle logic like sending requests to the backend of our application
- The `utils` directory includes the utility functions that we use in our application.

## Instruction to develop and run the application

1. Copy the content of `.env.example` file to `.env` file and edit necessary values.

```sh
cp .env.example .env
```

2. To run the application

```sh
yarn dev:start

# For https
yarn secure:dev
```

3. Build a production bundle

```sh
yarn build
```
