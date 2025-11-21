# OS2agora - Hearing Portal Public UI

This repository contains the public frontend for OS2agora.  
The repository is part of the overall solution, which also consists of an internal frontend used by employees to manage hearings and an API/backend.

The internal frontend is located in [OS2agora-Internal-UI](https://github.com/OS2agora/OS2agora-Internal-UI)

The Api and backend is located in [OS2agora-API](https://github.com/OS2agora/OS2agora-API)

Technical documentation is located in [OS2agora-docs](https://github.com/OS2agora/OS2agora-docs)

A complete setup for running the entire solution on your local machine is provided in [OS2agora-Infrastructure](https://github.com/OS2agora/OS2agora-Infrastructure)

## Technologies
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Required Tools

## Getting started
The solution can be run locally both inside a Docker container and in regular fashion using Node. For local development, it is recommended that the solution is executed using Node. Both guides assume that the tools from the `Required tools` section are installed on the machine.

### Running locally using Node

1. Download solution from [GitHub](https://github.com/OS2agora/OS2agora-Public-UI)
2. In the project /src folder, run one of the following commands to install the required dependencies
    ``` cmd
    yarn 
    yarn install
    ```
3. Add required environment variables to `.env.local` located in the root folder. The required environment variables can be found in `.env.example`
4. Start the application using the following command
    ``` cmd
    yarn dev
    ```
5. Using a browser, navigate to [http://localhost:3000](http://localhost:3000) and validate that the site is up and running

### Running locally using Docker

To run the entire OS2Agora solution in Docker, follow the instructions provided in the [OS2agora-Infrastructure](https://github.com/OS2agora/OS2agora-Infrastructure) repository.

### Building the _agora-fe\_public_ Docker Image

To run the entire OS2Agora solution, you need to build the _agora-fe\_public_ Docker Image from this repository. To build the image, follow these steps:

1. From the project root, navigate to `/docker`
2. In the `/docker` folder, run the following command to build a docker image of the solution

    ``` bash
    $ docker-compose -f docker-compose.build.yml build
    ```

The Dockerfile is located in the `/docker/image/app`

## Configuration

The applications requires some configuration, mostly to find the api endpoint. These are delivered through environment variables that are either placed in `.env.local` for local development or passed as variables to the docker container. 

NextJS is [opinionated](https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables) about environment variables, however, NextJS lacks the capability of providing dynamic runtime environment variables to the browser environment. This capability is alleviated in the solution using `@beam-australia/react-env`. Furthermore, the application has been configured for the following practice

1. Variable names with prefix `NEXT_PUBLIC` are available in the server code at runtime and in the client at build time. This aligns with how NextJS works.
2. Variable names with prefix `NEXT_PUBLIC_EXT` are available in the server code at runtime and in the client code at runtime. It works by creating an export of the environment when starting the application into a `__ENV.js` file, which is then pushed to the browser and placed in `window.__ENV`.
3. Variables not with the above mentioned prefixes are only available on the server at runtime.

Mind that no sensitive information can be placed in any variable that has a name prefixed with `NEXT_PUBLIC`!

Variables the application expects to be present are as follows

```.env
# Base url of the server API, as it would be seen from the browser
NEXT_PUBLIC_EXT_API_URL=http://localhost:5000/api

# Base url of the server API, as it would be seen from the NextJS server
SERVER_ONLY_API_URL=http://api:5000/api

# If running without the proxy (outside docker) the x-api-header is necessary for the backend to validate the client application
NEXT_PUBLIC_EXT_X_API_HEADER=GUID_HERE

# Set theme, must be either *os2* or *novataris*
NEXT_PUBLIC_EXT_THEME=os2

# Version of the build running. Relevant for CI-produced builds
NEXT_PUBLIC_BUILD_VERSION=development-101

NODE_TLS_REJECT_UNAUTHORIZED=0 # For development / test with no valid HTTPS certificate only
```

### Theme

The application can run with several themes. Themes consist of configurations, images, texts, fonts. etc. Theme configurations are located in `src/themes`. Theme images are located in `/src/app/public/images/<theme>` and texts in the `/src/app/public/locales/<lng>/<theme>.json`

Current themes:

- `os2` (default)
- `novataris`

#### Adding a new theme

To add a new theme, add a `.env.<theme name>` file in `/src/themes` and add relevant configurations. Add a folder with the name of the theme in `/src/app/public/images` - make sure to update the configurations with the correct filenames. Lastly add a `.json` file with the theme name in each language folder in `/src/app/public/locales`, containing all the text overrides you wish to use.

### Configuring for local development

Create a `.env.local` file with variable with the appropriate values for your setup and place the file in the `src` folder.
