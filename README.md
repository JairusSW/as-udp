# As-UDP
**UDP bindings for AssemblyScript**

## Setting up

1. Add --exportTable flag
2. Add --exportRuntime flag

## Usage

**AssemblyScript Socket**

```js
import { UDPSocket } from 'as-udp'

const socket = new UDPSocket('udp4')

socket.on('message', (data) => {
//--> Only supports incoming numbers
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