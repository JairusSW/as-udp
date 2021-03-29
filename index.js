const fs = require("fs");
const loader = require("as-bind").AsBind;

let wasmModule

let sockets = []

const dgram = require('dgram');

const imports = {
    index: {
        sendPointer: (id, event, pointer) => {

            if (!sockets[id]) return
    
            sockets[id]['pointers'][event.toLowerCase().trim()] = wasmModule.exports.table.get(pointer)
    
        },
        initUDP: (type) => {
    
            console.log('(JS) Created New socket. Id: ', sockets.length)
    
            sockets.push({
                pointers: {
                    message: null,
                    error: null,
                    listening: null,
                    connect: null,
                    close: null
                },
                socket: dgram.createSocket(`udp${type}`)
            })
    
            let id = sockets.length - 1
    
            let socket = sockets[id]
    
            socket.socket.on('message', (data, info) => {
            
                // Only supports numbers :(
    
                const func = socket.pointers['message']
    
                if (isNaN(parseInt(data.toString()))) return
                // Only numbers are allowed.
    
                if (typeof func === 'function') func(parseInt(data.toString()))
                // Send if type is number
    
            })
    
            socket.socket.on('listening', () => {
            
                const func = socket.pointers['listening']
    
                if (typeof func === 'function') func()
    
            })
    
            socket.socket.on('close', () => {
            
                const func = socket.pointers['close']
    
                if (typeof func === 'function') func()
    
            })
    
            socket.socket.on('error', () => {
            
                const func = socket.pointers['error']
    
                if (typeof func === 'function') func()
    
            })
    
            socket.socket.on('connect', () => {
            
                const func = socket.pointers['connect']
    
                if (typeof func === 'function') func()
    
            })
            
            return id
    
        },
        sendUDP: (id, message, port, address) => {
    
            sockets[id]['socket'].send(message, port, address)
    
            return
    
        },
        closeUDP: (id) => {
    
            sockets[id]['socket'].close()
    
        },
        bindUDP: (id, port, address) => {
    
            sockets[id]['socket'].bind(port, address)
    
        }
    }
}

require('as-console/bind')(imports)

wasmModule = loader.instantiateSync(fs.readFileSync(__dirname + "/build/untouched.wasm"), imports);

module.exports = wasmModule.exports;