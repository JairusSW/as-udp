const dgram = require('dgram');
const server = dgram.createSocket('udp4');
server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, info) => {
    
  console.log(`server got: ${msg} from ${info.address}:${info.port}`);

  server.send('Hey, Client!', info.port, info.address)

  server.send('Hola, Client!', info.port, info.address)

  server.send('So Long, Client!', info.port, info.address)

  server.send('Bye, Client!', info.port, info.address)

});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(3000)