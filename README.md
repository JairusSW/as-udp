# As-UDP
**UDP bindings for AssemblyScript**

## Setting up

**Add --exportTable and --exportRuntime flags**

**Edit main file**

```js
// main.js

+ let wasmModule

+ const udpImports = require('as-udp')

const imports = {
    ...eval(udpImports)
}

- const wasmModule = loader.instantaniateSync()

+ wasmModule = loader.instantaniateSync()

```

## Usage

**UDP Socket**

```js
import { UDPSocket } from 'as-udp'

const socket = new UDPSocket('udp4')

socket.on('message', (data) => {

    console.log('Message: ' + data)

})

socket.on('listening', () => {

    console.log('Listening')

})

socket.on('error', (err) => {

    console.log('Error: ' + err)
    
})

socket.send('Hello From AssemblyScript!', 3000, 'localhost')

```