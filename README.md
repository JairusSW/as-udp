# As-UDP
**UDP bindings for AssemblyScript**

## Setting up

1. Enable As-bind
2. Add --exportTable flag

## Usage (wip)

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

socket.send('Hello From AssemblyScript!', 3000, 'localhost')

```