var express = require("express");
var bodyParser = require('body-parser')
var pam = require('authenticate-pam');
var app = express();
app.use( bodyParser.json() );

const port = process.env.PORT ? process.env.PORT : 3000;

app.post("/_matrix-internal/identity/v1/check_credentials", (req, res, next) => {
  var id = req.body.user.id
  var password = req.body.user.password
  var username = id.slice(1, id.indexOf(':'))

  console.log("Authenticating user", username, "mxid", id)
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
      resobject["auth"]["mxid"] = id
    }
    res.json(resobject);
  });
});

app.listen(port, () => {
  console.log("pam-auth-rest-api server running on port", port);
});
