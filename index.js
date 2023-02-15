var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

let messages = [];
let history = 5;

io.on("connection", (socket) => {
  for (let k in messages) {
    socket.emit("chat message", messages[k]);
  }
  socket.on("chat message", (msg) => {
    messages.push(msg);
    if (messages.length > history) {
      messages.shift();
      // console.log(messages);
    }
    io.emit("chat message", msg);
  });
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
