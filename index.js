var express = require("express");
var bodyParser = require('body-parser')
var pam = require('authenticate-pam');
var app = express();
app.use( bodyParser.json() );

const port = process.env.PORT ? process.env.PORT : 3000;

app.post("/_mxisd/backend/api/v1/auth/login", (req, res, next) => {
    var username = req.body.auth.localpart
    var password = req.body.auth.password

    pam.authenticate(username, password, function(err) {
        var resobject = { 
            "auth": {
                "success": false
            }
        }
        if(err) {
          console.log("PAM authentication failed:", err);
        } else {
          resobject["auth"]["success"] = true
          resobject["auth"]["id"] = {
            "type": "localpart",
            "value": username
          }
        }
        res.json(resobject);
    });
});

app.listen(port, () => {
 console.log("pam-auth-rest-api server running on port", port);
});
