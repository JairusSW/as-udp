const dgram = require('dgram');
const client = dgram.createSocket('udp4');
const Bitray = require('bitray')
const message = new Bitray('Hello, Server!');
client.send(message, 3000, 'localhost', (err) => {})
client.on('message', (data, info) => {

    console.log(`Recieved Message From ${info.address}:${info.port}:`, data.toString())

})