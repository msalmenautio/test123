const express = require('express')
const socketIO = require('socket.io');
const app = express();
var client = require('heroku-redis').createClient(process.env.REDIS_URL);

const PORT = process.env.PORT ||8080;



const server = express()
  .use((req, res) =>  res.sendFile(__dirname + '/softphone.html')) 
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);



io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('make_a_call', function (data) {
	 console.log(data); });
  socket.on('disconnect', () => console.log('Client disconnected'));
});



