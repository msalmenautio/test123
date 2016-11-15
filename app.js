var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const bodyParser = require('body-parser');
var client = require('redis').createClient(process.env.REDIS_URL);
const PORT = process.env.PORT ||8080;
app.use(bodyParser.urlencoded({ extended: false }));
var jsonParser = bodyParser.json();





app.get('/', function(req, res) {
  res.sendFile(__dirname + '/softphone.html');
});

app.post('/voice',jsonParser, function(req, res) {
	
  if (!req.body) return res.sendStatus(400);
  
  client.get(req.body.FederatedID, function (err, socketId) {
    console.log(socketId.toString());  
	
	if (io.sockets.connected[socketId]) {
    io.sockets.connected[socketId].emit('Phonecall', + req.body.PhoneNumber);
}
	

});
	  
  res.send('Ok' );
});



  


 




io.on('connection', function(socket) {
  console.log('Client connected');
  client.set("msalmenautio",socket.id, function(err) {
	  console.log('Socket Id: ' + socket.id);
        if (err) {
           // Something went wrong
           console.error("error");
        }
  });
  
  socket.on('make_a_call', function (data) {
	 console.log(data); });
  
  socket.on('disconnect', () => console.log('Client disconnected'));
});

server.listen(PORT, function(){
  console.log('listening on *: ' + PORT);
});





