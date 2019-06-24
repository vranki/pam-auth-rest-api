# pam-auth-rest-api

REST api for authenticating via PAM - for use with Synapse rest authenticator 
found at https://github.com/kamax-matrix/matrix-synapse-rest-password-provider 

Note: this started as mxisd rest api implementation - see git tag "mxisd" for
mxisd version. mxisd is not maintained anymore.

Uses username part of matrix id and password for authentication.

Status is working - it seems to work for us. Please create github
issues or pull requests if needed.

## Installation

```npm install```

On ubuntu/debian building authenticate-pam requires dev package ```libpam0g-dev```

### Systemd unit file

Systemd unit file can be used to start the server automatically.

Copy the unit file to correct location:
```bash
sudo cp pam-auth-rest-api.service /etc/systemd/system/
sudo chmod 664 /etc/systemd/system/pam-auth-rest-api.service
```

Now you need to modify the file. Change /path/to/index.js to point to the index.js
file found in this directory:

```bash
sudo nano /etc/systemd/system/pam-auth-rest-api.service
```

Enable and start the server:
```bash
sudo systemctl daemon-reload
sudo systemctl enable pam-auth-rest-api
sudo systemctl start pam-auth-rest-api
```

Check it's started successfully:
```bash
$ sudo systemctl status pam-auth-rest-api
● pam-auth-rest-api.service - PAM auth REST API
   Loaded: loaded (/etc/systemd/system/pam-auth-rest-api.service; enabled; vendor preset: enabled)
   Active: active (running) since Mon 2019-06-24 12:14:13 EEST; 5s ago
 Main PID: 25702 (node)
    Tasks: 7 (limit: 4915)
   Memory: 36.7M
   CGroup: /system.slice/pam-auth-rest-api.service
           └─25702 /usr/bin/node /home/user/src/pam-auth-rest-api/index.js

kesä 24 12:14:13 trabant systemd[1]: Started PAM auth REST API.
kesä 24 12:14:14 trabant node[25702]: pam-auth-rest-api server running on port 3000
```

## Running manually

You most probably need to run this as root:

```sudo node index.js```

For custom port, use env variable:

```PORT=4242 sudo node index.js```

### Curl test command

```curl -X POST -d '{ "user": { "id": "@john.doe:example.org", "password": "passwordOfTheUser" } }' -H "Content-Type: application/json" http://localhost:3000/_matrix-internal/identity/v1/check_credentials```
