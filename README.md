# As-UDP
**UDP bindings for AssemblyScript**

## Testing (WIP)

1. Start the server (node server.js)

```bash
node server.js
```

2. Start the peer (client)

```bash
node test.js
```

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

# Todo
- Add Multiple Client Support ✅
- Add Socket.on(event, callback) function ✅
- Socket.on can be other than number ❌ (as-bind)
- Add Server Support ✅
- Add Multiple Server Support ✅
- Add Uint8Array Support? ✅
- Finish socket.on function ✅
- Add socket.on('data') ✅ (Can only pass numbers through rn. :P)
- Add socket.on('listening') ✅
- Add socket.on('connection') ✅
- Add socket.on('error') ✅ (Still need to add error data. Waiting for as-bind)
- Add socket.on('close') ✅