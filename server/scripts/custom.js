import { DiscordSDK } from '@discord/embedded-app-sdk';

console.log('WS4KP custom.js loaded');

async function start() {
  try {
    const sdk = new DiscordSDK('1532074059561439426');
    await sdk.ready();
    console.log('Discord handshake complete');
  } catch (e) {
    console.log('Not running inside Discord:', e.message);
  }
}

start();
