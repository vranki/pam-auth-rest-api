# pam-auth-rest-api

REST api for authenticating via PAM - for use with Synapse rest authenticator 
found at https://github.com/kamax-matrix/matrix-synapse-rest-password-provider 

Note: this started as mxisd rest api implementation - see git tag "mxisd" for
mxisd version. mxisd is not maintained anymore.

Uses username part of matrix id and password for authentication.

Alpha, not tested properly yet but feedback is welcome. Please create github
issues or pull requests.

## Installation:

```npm install```

On ubuntu/debian building authenticate-pam requires dev package ```libpam0g-dev```

## Running

```node index.js```

For custom port, use env variable:

```PORT=4242 node index.js```

### Curl test command

```curl -X POST -d '{ "user": { "id": "@john.doe:example.org", "password": "passwordOfTheUser" } }' -H "Content-Type: application/json" http://localhost:3000/_matrix-internal/identity/v1/check_credentials```
