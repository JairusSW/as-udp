import { Bitray } from 'as-bitray'

import { console } from 'as-console'

// JS Imports
declare function sendUDP(data: Uint8Array, port: number, address: string): void
declare function initUDP(type: string): void
declare function closeUDP(): void
declare function bindUDP(port: number, address: string): void
declare function sendPointer(a: i32): void
// Miscellanious

export let callbackData = (data: Uint8Array): void => {

  console.log('Got CallbackData: ' + String.UTF8.decode(data.buffer))

}

export let callbackDataPointer = load<i32>(changetype<usize>(callbackData))

// API
export class UDPSocket {

  constructor(type: string) {

    initUDP(type)

  }
  send(data: Uint8Array, port: number, address: string): void {

    sendUDP(data, port, address)

  }
  close(): void {
    closeUDP()
  }
  bind(port: number, address: string): void {

    bindUDP(port, address)

  }

  // TODO: Callback

  on(event: string, callback: (data: string) => void): void {

    sendPointer(load<i32>(changetype<usize>(callback)))

    // Somehow call this callback when the ondata event is triggered (add onlistening/onerror/ect later). I'm stuck!

    // Usage like: 
    /* 
    const socket = new UDPSocket('udp4')

    socket.send(Uint8Array.wrap(String.UTF8.encode('Hello From AssemblyScript!')), 3000, 'localhost')
    
    socket.on('message', (data: string) => {

      console.log('Got Some Data: ' + data)

    })
    */
    
  }
}

// Listeners
export function ondata(data: Uint8Array, info: Array<string>): void {
  console.log(String.UTF8.decode(data.buffer) + ' from ' + info[0] + ':' + info[2])
  // Need to do Callback for the On Function
}

export function onerror(error: string): void {}

export function onlistening(address: string, port: string, family: string): void {

  console.log('Listening On: ' + address + ':' + port + ' (' + family + ')')

}

export function onclose(): void {

  console.log('Socket Closed.')

}

export function onconnect(): void {

  console.log('Socket Connected.')

}

// Client/Server Testing

export let cb = (data: string): void => {

  console.log('Got data: ' + data)
  
}

export function client(): void {

  const socket = new UDPSocket('udp4')

  console.log('Sending Message')

  socket.send(Uint8Array.wrap(String.UTF8.encode('Hello From AssemblyScript!')), 3000, 'localhost')

  socket.on('data', cb)
  
}

export function server(): void {

  const socket = new UDPSocket('udp4')

  socket.bind(3000, '127.0.0.1')

}