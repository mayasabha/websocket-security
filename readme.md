# Testing WebSocket Security Implementations

Project for the Course, Software and Data Engineering (CSL7090) at Indian Institute of Technology Jodhpur

By Apoorv Pal (B19CSE102) and Anmol Romley (B19CSE011)

## Variants
### Simple Websockets Implementation
In the `1_simple` directory, run the command, `npm install` and then the server can be run by the command `node index.js` and the client can be run by `node client.js` .

### SocketIO Simple Implementation
In the `2_socketio-simple` directory, run the command, `npm install` and then the server can be run by the command `node index.js` and the client can be run by the command `node client.js` .

### SocketIO Implementation with Static Password
In the `3_socketio-password` directory, run the command, `npm install` and then the server can be run by the command `node index.js` and the client can be run by the command `node client.js` .

### SocketIO Implementation with Username, Password and Token Authentication
In the `4_socketio-db` directory, run the command, `npm install` and then the server can be run by the command `node index.js` and the client can be run by the command `node client.js` .

This implementation requires a MySQL/MariaDB server with the name `sde_project` along with a user `sde_project` identified by the password `sde_project_2022#` running on port `3033` of the localhost.


### SocketIO Implementation with SSL security and Username, Password and Token Authentication
In the `5_socketio-db-ssl` directory, run the command, `npm install` and then the server can be run by the command `node index.js` and the client can be run by the command `node client.js` .

This implementation requires a MySQL/MariaDB server with the name `sde_project` along with a user `sde_project` identified by the password `sde_project_2022#` running on port `3033` of the localhost.

This implementation requires an FQDN (Fully Qualified Domain Name) and SSL certificates issued for the domain. They can be setup in the `./config/ssl.js` with the certificate and key paths.

This implementation of the client requires it to be executed on a browser. Hence, it must be run via the EpressJS server provided in the `index.js` file. When the server is run, the site can be accessed at the specified port `2053` of the FQDN.


### SocketIO Implementation with SSL security and Username, Password and Token Authentication
In the `6_socketio-db-ssl-cors` directory, run the command, `npm install` and then the server can be run by the command `node index.js` and the client can be run by the command `node client.js` .

This implementation requires a MySQL/MariaDB server with the name `sde_project` along with a user `sde_project` identified by the password `sde_project_2022#` running on port `3033` of the localhost.

This implementation requires an FQDN (Fully Qualified Domain Name) and SSL certificates issued for the domain. They can be setup in the `./config/ssl.js` with the certificate and key paths.

This implementation requires a CORS policy which can be defined in `./config/cors.js` by specifying the domains that can be allowed to access the websocket server.

This implementation of the client requires it to be executed on a browser. Hence, it must be run via the EpressJS server provided in the `index.js` file. When the server is run, the site can be accessed at the specified port `2053` of the FQDN.