# As-UDP
**UDP bindings for AssemblyScript**

## Setting up

**Add --exportTable and --exportRuntime flags**

**Edit main file**

```js
// main.js

+ const udp = require('as-udp')

const imports = {
    ...udp.wasmImports
}

const wasmModule = loader.instantaniateSync()

+ udp.wasmExports = wasmModule.exports

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