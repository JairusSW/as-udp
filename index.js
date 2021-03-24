const fs = require("fs");
const loader = require("as-bind").AsBind;
const Bitray = require('bitray')
const dgram = require('dgram');

let socket = dgram.createSocket('udp4')
let wasmModule

const imports = {
    index: {
        initUDP: (type) => {

            socket = dgram.createSocket(type)

            socket.on('message', (data, info) => {

                if (wasmModule.exports.ondata) wasmModule.exports.ondata(data, [info.address, info.family, info.port.toString(), info.size.toString()])
            
            })
            
            socket.on('error', (err) => {
            
                if (wasmModule.exports.onerror) wasmModule.exports.onerror(err)
            
            })

            socket.on('close', () => {

                if (wasmModule.exports.onclose) wasmModule.exports.onclose()

            })            

            socket.on('listening', () => {

                if (wasmModule.exports.onlistening) wasmModule.exports.onlistening()

            })   

            socket.on('connect', () => {

                if (wasmModule.exports.onconnect) wasmModule.exports.onconnect()

            })   

        },
        sendUDP: (message, port, address) => {

            socket.send(message, port, address)

            return

        },
        closeUDP: () => {

            socket.close()

        },
        bindUDP: (port, address) => {

            socket.bind(port, address)

        }
    }
};

require('as-console/bind')(imports)

wasmModule = loader.instantiateSync(fs.readFileSync(__dirname + "/build/optimized.wasm"), imports);

module.exports = wasmModule.exports;

console.log(wasmModule.importObject.env)

wasmModule.exports.test()