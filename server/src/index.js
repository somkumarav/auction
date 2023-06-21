const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const { Server } = require('socket.io');

const user = require('./Routes/User');

app.use(express.json());
app.use(cors());
app.use(user);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

server.listen(4000, () => {
  console.log('listening on http://localhost:4000');
});
