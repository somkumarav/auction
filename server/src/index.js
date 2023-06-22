const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const { Server } = require('socket.io');

const user = require('./Routes/User');
const product = require('./Routes/Product');

app.use(express.json());
app.use(cors());
app.use(user);
app.use(product);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => console.log('user disconnected'));

  socket.on('place_bid', (data) => {
    socket.broadcast.emit('rec_bid', data);
  });
});

server.listen(4000, () => {
  console.log('listening on http://localhost:4000');
});
