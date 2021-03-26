const fs = require("fs");
const loader = require("as-bind").AsBind;
const Bitray = require('bitray')
const dgram = require('dgram');

let socket

let wasmModule

let point

const imports = {
    index: {
        sendPointer: (pointer) => {

            point = pointer

            console.log('Got Pointer: ', pointer)

        },
        initUDP: (type) => {

            socket = dgram.createSocket(type)

            socket.on('message', (data, info) => {

                if (wasmModule.exports.ondata) wasmModule.exports.ondata(data, [info.address, info.family, info.port.toString(), info.size.toString()])
            
                const table = wasmModule.exports.table

                const callbackFunc = table.get(point)

               // callbackFunc()

                console.log('callback: ', callbackFunc)

            })
            
            socket.on('error', (err) => {
            
                if (wasmModule.exports.onerror) wasmModule.exports.onerror(err)
            
            })

            socket.on('close', () => {

                if (wasmModule.exports.onclose) wasmModule.exports.onclose()

            })            

            socket.on('listening', () => {

                const address = socket.address()

                if (wasmModule.exports.onlistening) wasmModule.exports.onlistening(address.address, address.port.toString(), address.family)

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

wasmModule = loader.instantiateSync(fs.readFileSync(__dirname + "/build/untouched.wasm"), imports);

console.log(wasmModule.exports.getDataCallbackPointer)
module.exports = wasmModule.exports;