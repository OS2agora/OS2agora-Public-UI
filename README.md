# OS2AGORA - Hearing Portal Public UI

This repository contains the public UI for the Hearing Portal. The repository is part of the overall solution, which also consists of another frontend and a backend. 

Hearing Portal Internal UI is located here: ([Github](https://github.com/OS2agora/Agora-Internal-UI)  
Hearing Portal API is located here: [Github](https://github.com/OS2agora/Agora-Api)


## Technologies
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting started
The solution can be run locally both inside a Docker container and in regular fashion using Node. For local development, it is recommended that the solution is executed using Node. Both guides assume that the tools from the `Required tools` section are installed on the machine.

### Configuration

The applications requires a little configuration, mostly to find the api endpoint. These are delivered through environment variables that are either placed in `.env.local` for local development or passed as variables to the docker container. 

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

# Version of the build running. Relevant for CI-produced builds
NEXT_PUBLIC_BUILD_VERSION=development-101

NODE_TLS_REJECT_UNAUTHORIZED=0 # For development / test with no valid HTTPS certificate only
```

#### To configure the application for local development

Create a `.env.local` file with variable with the appropriate values for your setup and place the file in the `src` folder.

### Running locally using Node

1. Download solution from [Github](https://github.com/OS2agora/Agora-Public-UI)

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

1. Download solution from [Github](https://github.com/OS2agora/Agora-Public-UI)

2. Add required environment variables to `.env.local` located in the /src folder. The required environment variables can be found in `.env.example`

3. In the /docker folder, run the following command in to build a docker image of the solution.

    ``` bash
    $ docker-compose -f docker-compose.development.yml build
    ```

    *Starting this solution in Docker requires the backend project to be up and running, as this uses a shared network that is defined in the backend Docker setup.

4. In the /docker folder, run the following command in to start the docker container of the solution.

    ``` bash
    $ docker-compose -f docker-compose.development.yml up
    ```
5. Using a browser, navigate to [http://localhost:3000](http://localhost:3000) and validate that the site is up and running

6. If your API is running in Docker you will need to alter you `.env.local` file. It is located in your root folder if you've created it, and if not, you should create it and copy the content from the `.env.example` file. Your `NEXT_PUBLIC_API_URL` should be `https://localhost:8080/api/`, if you have the api proxy running on port 8080.

## Useful commands

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Run Storybook

```bash
npm run storybook
# or
yarn storybook
```

## Build Static Storybook

```bash
npm run build-storybook
# or
yarn build-storybook
```

## Clean SVGS

```bash
npm run clean-svgs
# or
yarn clean-svgs
```

## Build SVG components

```bash
npm run build:icons
# or
yarn build:icons
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
