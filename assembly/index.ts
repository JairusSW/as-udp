import { Bitray } from 'as-bitray'

import { console } from 'as-console'

// JS Imports
declare function sendUDP(id: i32, data: Uint8Array, port: number, address: string): void
declare function initUDP(type: number): i32
declare function closeUDP(id: i32): void
declare function bindUDP(id: i32, port: number, address: string): void
declare function sendPointer(id: number, event: string, pointer: i32): void
// Miscellanious

// API
export class UDPSocket {

  private id: i32 = 0

  constructor(type: string) {

    let id = initUDP(parseInt(type.replace('udp', '')))

    this.id = id

  }

  sendBinary(data: Uint8Array, port: number, address: string): void {

    sendUDP(this.id, data, port, address)

  }
  send(data: string, port: number, address: string): void {

    sendUDP(this.id, Uint8Array.wrap(String.UTF8.encode(data)), port, address)

  }
  close(): void {

    closeUDP(this.id)

  }
  bind(port: number, address: string): void {

    bindUDP(this.id, port, address)

  }

  // WIP: Add string support for as-bind
  on(event: string, callback: (data: number) => void): void {

    sendPointer(this.id, event, load<i32>(changetype<usize>(callback)))
    // NOTE: Does not call every time! Only calls if once.
  }
  
}

// Socket Testing

export function test(): void {

  const socket = new UDPSocket('udp4')

  console.log('Sending Message (AS)...')

  socket.on('message', (data) => {

    console.log('Response (AS): ' + data.toString())
    
  })

  socket.on('listening', () => {

    console.log('Listening (AS)')
    
  })

  socket.send('Hello From AssemblyScript!', 3000, 'localhost')
  
  
}