const fs = require("fs");
const loader = require("as-bind").AsBind;
const Bitray = require('bitray')
const dgram = require('dgram');

let wasmModule

let point

let pointerFunctions = {
    message: null,
    error: null,
    listening: null,
    connect: null,
    close: null
}

let clients = []

const imports = {
    index: {
        sendPointer: (event, pointer) => {

            point = pointer

            pointerFunctions[event.toLowerCase().trim()] = wasmModule.exports.table.get(pointer)

        },
        initUDP: (type) => {

            console.log('(JS) Created New Client. Id: ', clients.length)

            clients.push(dgram.createSocket(type))

            let id = clients.length - 1

            clients[id].on('message', (data, info) => {
            
                // Only supports numbers :(

                const func = pointerFunctions['message']

                if (isNaN(parseInt(data.toString()))) return
                // Only numbers are allowed.

                if (typeof func === 'function') func(parseInt(data.toString()))
                // Send if type is number

            })

            clients[id].on('listening', () => {
            
                const func = pointerFunctions['listening']

                if (typeof func === 'function') func()

            })

            clients[id].on('close', () => {
            
                const func = pointerFunctions['close']

                if (typeof func === 'function') func()

            })

            clients[id].on('error', () => {
            
                const func = pointerFunctions['error']

                if (typeof func === 'function') func()

            })

            clients[id].on('connect', () => {
            
                const func = pointerFunctions['connect']

                if (typeof func === 'function') func()

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