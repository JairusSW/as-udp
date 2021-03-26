# As-UDP
**A Experimental UDP Server Running In AssemblyScript**

## Usage (WIP)

1. Start the server (node server.js)

```bash
node server.js
```

2. Start the peer (client)

```bash
node test.js
```

# Todo
- Add Multiple Client Support ✅
- Add Socket.on(event, callback) function ✅
- Socket.on can be other than number ❌ (as-bind)
- Add Multicast ❌
- Add Server Support ✅
- Add Multiple Server Support ✅
- Add Bitray/Buffer Support? ❌
- Finish socket.on function ✅
- Add socket.on('data') ✅
- Add socket.on('listening') ✅
- Add socket.on('connection') ✅
- Add socket.on('error') 🌓
- Add socket.on('close') ✅
- Bring Nodejs dgram (udp) api to AS? (possible) ❌

# Next projects
- Bring WebSocket to AS. (npm ws api? Or browser version.)
- Bring nodejs 'net' module to AS (TCP?)