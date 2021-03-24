const dgram = require('dgram');
const server = dgram.createSocket('udp4');
server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, info) => {
    
  console.log(`${msg} from ${info.address}:${info.port}`);

  server.send('Hello, AssemblyScript!', info.port, info.address)

});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(3000, '127.0.0.1')