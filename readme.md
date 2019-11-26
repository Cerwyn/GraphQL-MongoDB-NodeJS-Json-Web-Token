# NodeJS-GraphQL-MongoDB-Json Web Token

## Description

An example of how integrating GraphQL with MongoDB in NodeJS server and create a secure transmitting information between parties with [Json Web Token](https://jwt.io).  
What this project API can do? Then import this postman collection [https://www.getpostman.com/collections/f92c45e59e68aae35fcf](https://www.getpostman.com/collections/f92c45e59e68aae35fcf)


## Installation
1. `npm install` to install the dependencies
2.  Change/create the nodemon.json in root folder with these MongoDB configurations:
```bash
{
    "env":{
        "MONGO_USER": "userdb",
        "MONGO_PASSWORD": "passworddb",
        "MONGO_DB": "dbname",
        "MONGO_HOST" : "host:27017",
        "PORT" : 3003
    }
}
```
3. Start the server with `npm start`

## Usage

In this project, the server is listening in localhost:3003.  
You can access the graphql in http://localhost:3003/graphql.  
For this project, I created a dummy server at https://ver-dnu.studio7.id/graphql and Flutter Web APP at https://ver-dnu.studio7.id/web


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

