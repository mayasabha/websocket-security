const express = require('express');
const app = express();
const https = require('https');
const sslOptions = require('./config/ssl');
const server = https.createServer(sslOptions, app);
const { Server } = require('socket.io');
const mysql = require('mysql');

const io = new Server(server);

const con = mysql.createConnection({
  host: 'localhost',
  database: 'sde_project',
  user: 'sde_project',
  password: 'sde_project_2022#',
});

con.connect((err) => {
  if (err) throw err;
  console.log('Connected to Database!');
});

function checkAuth(username, password, socket) {
  const authQuery = "SELECT username FROM users WHERE username = '" + username + "' AND password = '" + password + "' LIMIT 1;";
  con.query(authQuery, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      console.log("Auth passed");
      generateToken(username, socket);
      return true;
    } else {
      return false;
    }
  });
}

function checkToken(token, next) {
  const tokenExistsQuery = "SELECT username FROM tokens WHERE token = '" + token + "';";
  con.query(tokenExistsQuery, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      next();
    } else {
      console.log("Authentication Failed", token);
      next(new Error("Authentication Failed!"));
    }
  });
}

function generateToken(username, socket) {
  console.log("Generating Token", username);
  const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = ' ';
  const length = 10;
  const charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
    token += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  const tokenExistsQuery = "SELECT * FROM tokens WHERE token = '" + token + "';";
  con.query(tokenExistsQuery, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      return generateToken(username);
    } else {
      const createTokenQuery = "INSERT INTO tokens (username, token) VALUES ('" + username + "', '" + token + "');";
      con.query(createTokenQuery, (err, result) => {
        if (err) throw err;
        console.log("Token Generated", token);
        console.log("Sending Token", token);
        socket.emit('token', token);
        return token;
      });
    }
  });
}

const simplePasswordAuthentication = (packet, next) => {
    if (packet[0] !== 'login') {
      const token = packet[1].token;
      checkToken(token, next);
    } else {
      next();
    }
  }
  
  io.on("connection", (socket) => {
    console.log("New Client Connected");
    socket.use(simplePasswordAuthentication);
    
    socket.emit("welcome", {name: 'socketio-simple'});
  
    socket.on("message", (message) => {
        socket.send(message.data);
    });
  
    socket.on("login", async (message) => {
      const username = message.username;
      const password = message.password;
      checkAuth(username, password, socket);
    });
  });

server.listen(2096, () => {
    console.log("Listening on Port:2096");
});
