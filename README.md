# pam-auth-rest-api

REST api for authenticating via PAM - for use with Matrix mxisd rest authenticator.

WIP / Alpha

## Installation:

```npm install```

On ubuntu/debian building authenticate-pam requires dev package ```libpam0g-dev```

## Running

```node index.js```

For custom port, use env variable:

```PORT=4242 node index.js```

### Curl test command

```curl -X POST -d "{ \"auth\": { \"mxid\": \"@john.doe:example.org\", \"localpart\": \"john.doe\", \"domain\": \"example.org\", \"password\": \"passwordOfTheUser\" } }" -H "Content-Type: application/json" http://localhost:3000/_mxisd/backend/api/v1/auth/login```
