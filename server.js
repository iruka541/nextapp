const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors()); // CORSミドルウェアを適用
app.use(express.static(path.join(__dirname, 'build'))); // ビルドディレクトリを静的ファイルとして使用

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // どこからでも通信を許可
    methods: ["GET", "POST"] // 許可するHTTPメソッド
  }
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('message', (data) => {
    console.log('Message received: ' + data.message);
    io.emit('message', data); // すべてのクライアントにメッセージを送信
  });
});

server.listen(() => {
  console.log(`Server running`);
});
