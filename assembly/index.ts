import { Bitray } from 'as-bitray'

import { console } from 'as-console'

// JS Imports
declare function sendUDP(id: i32, data: Uint8Array, port: number, address: string): void
declare function initUDP(type: string): i32
declare function closeUDP(id: i32): void
declare function bindUDP(id: i32, port: number, address: string): void
declare function sendPointer(a: i32): void
// Miscellanious

// API
export class UDPSocket {

  private id: i32 = 0

  constructor(type: string) {

    let id = initUDP(type)

    this.id = id

  }
  send(data: Uint8Array, port: number, address: string): void {

    sendUDP(this.id, data, port, address)

  }
  close(): void {
    closeUDP(this.id)
  }
  bind(port: number, address: string): void {

    bindUDP(this.id, port, address)

  }

  // WIP: Callback
  on(event: string, callback: (data: number) => void): void {
// Add selectable events. Rn, it defaults to socket.on('message', ...
    sendPointer(load<i32>(changetype<usize>(callback)))
    
  }
}

// Client/Server Testing

export function client1(): void {

  const socket = new UDPSocket('udp4')

  console.log('Client1 Sending Message (AS)...')

  socket.send(Uint8Array.wrap(String.UTF8.encode('Client1, Hello From AssemblyScript!')), 3000, 'localhost')

  socket.on('data', (data) => {

    console.log('Client1 Data from Callback Func (AS): ' + data.toString())
    
  })
  
}
// Test for multiple Clients ✅
export function client2(): void {

  const socket = new UDPSocket('udp4')

  console.log('Client2 Sending Message (AS)...')

  socket.send(Uint8Array.wrap(String.UTF8.encode('Client2, Hello From AssemblyScript!')), 3000, 'localhost')

  socket.on('data', (data) => {

    console.log('Client2 Data from Callback Func (AS): ' + data.toString())

    // Send Response back to server. Need closures? Got an error.
    //socket.send(Uint8Array.wrap(String.UTF8.encode('Hey, Server! Got the message!')), 3000, 'localhost')
    
  })
  
}

// Test Server ✅
export function server(): void {

  const socket = new UDPSocket('udp4')

  socket.bind(3000, '127.0.0.1')

}