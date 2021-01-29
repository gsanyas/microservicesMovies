# mainInterface

Handle connection to all the components, and security.

## Install

`npm install`

## Define environment variables

Replace the URIs and the PORT by your configuration
```[Text]
CRYPTO_COMPONENT_URI=http://localhost:8001
USER_COMPONENT_URI=http://localhost:8002
CATALOG_COMPONENT_URI=http://localhost:8003
EXPRESS_PORT=8000
```

In local environments, write it in a local .env file.

## Run

`npm run start`

## Test

Automated testing with jest

`npm run test`
