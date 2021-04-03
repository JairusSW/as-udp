let UDPsockets = []

const dgram = require('dgram');

class WakeImport {
    
    constructor() {
        
        this._exports = null

        this.wasmImports = {
            UDP: {
                sendPointer: (id, event, pointer) => {
        
                    if (!UDPsockets[id]) return
            
                    UDPsockets[id]['pointers'][this._exports.__getString(event).toLowerCase().trim()] = this._exports.table.get(pointer)
            
                },
                initUDP: (type) => {
            
                    UDPsockets.push({
                        pointers: {
                            message: null,
                            error: null,
                            listening: null,
                            connect: null,
                            close: null
                        },
                        socket: dgram.createSocket('udp' + type + '')
                    })
            
                    let id = UDPsockets.length - 1
            
                    let socket = UDPsockets[id]
            
                    socket.socket.on('message', (data, info) => {
        
                        const messagePtr = this._exports.__newString(data.toString('utf8'))
            
                        const func = socket.pointers['message']
            
                        if (typeof func === 'function') func(messagePtr)
            
                    })
            
                    socket.socket.on('listening', () => {
                    
                        const func = socket.pointers['listening']
            
                        if (typeof func === 'function') func()
            
                    })
            
                    socket.socket.on('close', () => {
                    
                        const func = socket.pointers['close']
            
                        if (typeof func === 'function') func()
            
                    })
            
                    socket.socket.on('error', (err) => {
                    
                        const func = socket.pointers['error']
            
                        if (typeof func === 'function') {
                            
                            if (err) return func(__newString(err.message))
        
                            func()
        
                        }
            
                    })
            
                    socket.socket.on('connect', () => {
                    
                        const func = socket.pointers['connect']
            
                        if (typeof func === 'function') func()
            
                    })
                    
                    return id
            
                },
                sendUDP: (id, message, port, address) => {
            
                    UDPsockets[id]['socket'].send(Buffer.from(this._exports.__getArray(message)), port, this._exports.__getString(address))
            
                    return
            
                },
                closeUDP: (id) => {
            
                    UDPsockets[id]['socket'].close()
            
                },
                bindUDP: (id, port, address) => {
            
                    UDPsockets[id]['socket'].bind(port, this._exports.__getString(address))
            
                }
            }
        }
    }

    get wasmExports() {
		return this._exports
	}
	set wasmExports(e) {
		this._exports = e
        this._exports.__getString = e.__getString
        this._exports.__newString = e.__newString
        this._exports.__newArray = e.__newArray
        this._exports.__getArray = e.__getArray
	}

	getFn(fnIndex) {
		if (!this.wasmExports)
			throw new Error(
				'Make sure you set .wasmExports after instantiating the Wasm module but before running the Wasm module.',
			)
		return this.table.get(fnIndex)
	}
}

module.exports = WakeImport