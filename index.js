const fs = require("fs");
const loader = require("as-bind").AsBind;
const Bitray = require('bitray')
const dgram = require('dgram');

let wasmModule

let point

let clients = []

const imports = {
    index: {
        sendPointer: (pointer) => {

            point = pointer

            console.log('Got Pointer (JS): ', pointer)

        },
        initUDP: (type) => {

            console.log('(JS) Created New Client. Id: ', clients.length)

            clients.push(dgram.createSocket(type))

            let id = clients.length - 1

            clients[id].on('message', (data, info) => {

                if (wasmModule.exports.ondata) wasmModule.exports.ondata(data, [info.address, info.family, info.port.toString(), info.size.toString()])
            
                const table = wasmModule.exports.table

                const callbackFunc = table.get(point)

                callbackFunc(12345)

                console.log('callback (JS): ', callbackFunc)

            })
            
            clients[id].on('error', (err) => {
            
                if (wasmModule.exports.onerror) wasmModule.exports.onerror(err)
            
            })

            clients[id].on('close', () => {

                if (wasmModule.exports.onclose) wasmModule.exports.onclose()

            })            

            clients[id].on('listening', () => {

                const address = clients[id].address()

                if (wasmModule.exports.onlistening) wasmModule.exports.onlistening(address.address, address.port.toString(), address.family)

            })   

            clients[id].on('connect', () => {

                if (wasmModule.exports.onconnect) wasmModule.exports.onconnect()

            })   

            return id

        },
        sendUDP: (id, message, port, address) => {

            clients[id].send(message, port, address)

            return

        },
        closeUDP: (id) => {

            clients[id].close()

        },
        bindUDP: (id, port, address) => {

            clients[id].bind(port, address)

        }
    }
};

require('as-console/bind')(imports)

wasmModule = loader.instantiateSync(fs.readFileSync(__dirname + "/build/untouched.wasm"), imports);

console.log(wasmModule.exports.getDataCallbackPointer)
module.exports = wasmModule.exports;