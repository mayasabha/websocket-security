const fs = require('fs');

const sslOptions = {
    key: fs.readFileSync('/etc/ssl/private/apoorvpal.in.key'),
    cert: fs.readFileSync('/etc/ssl/certs/apoorvpal.in.pem'),

    requestCert: false,
    rejectUnauthorized: false,
};

module.exports = sslOptions;