# Crypto module

## Install

`npm install`

`openssl rand 128 > sym_keyfile.key`

## Start

`npm start`

## Endpoints

- encryptUser : GET(params: {user: Text} , out: {secret: Text})

- decryptUser : GET(params: {secret: Text} ,out: {user: Text})
