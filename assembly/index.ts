import { Bitray } from 'as-bitray'

import { console } from 'as-console'

// JS Imports
declare function sendUDP(data: Uint8Array, port: number, address: string): void
declare function initUDP(type: string): void
declare function closeUDP(): void

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
}

// TODO: Callback

export function on(callback: (data: string, info: Array<string>) => {}): void {

  // Somehow call this callback when the ondata event is triggered. I'm stuck!
  
}

// Listeners
export function ondata(data: Uint8Array, info: Array<string>): void {
  console.log(String.UTF8.decode(data.buffer) + info[0] + ':' + info[2])
  // Need to do Callback for the On Function
}

export function onerror(error: string): void {}

export function onlistening(): void {}

export function onclose(): void {}

export function onconnect(): void {}

// Testing

export function test(): void {

  const socket = new UDPSocket('udp4')

  socket.send(new Bitray('Hello From AssemblyScript Client!', 'utf8').binary, 3000, 'localhost')

}