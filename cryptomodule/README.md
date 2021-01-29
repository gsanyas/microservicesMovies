# Crypto module

## Install

`npm install`

`openssl rand 128 > sym_keyfile.key`

## Define environment variables

Replace values according to your configuration
```[Text]
ORIGIN=http://localhost:8000
EXPRESS_PORT=8001
```

In local installation, write it in a .env file.

## Start

`npm start`

## Endpoints

- encryptUser : GET(params: {user: Text} , out: {secret: Text})

- decryptUser : GET(params: {secret: Text} ,out: {user: Text})
