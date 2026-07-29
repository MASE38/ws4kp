import { DiscordSDK, patchUrlMappings } from '@discord/embedded-app-sdk';

const inDiscord = new URLSearchParams(window.location.search).has('frame_id')
  || window.location.hostname.endsWith('discordsays.com');

patchUrlMappings([
  { prefix: '/geocode', target: 'geocode.arcgis.com' },
  { prefix: '/weather-api', target: 'api.weather.gov' },
  { prefix: '/radar', target: 'mesonet.agron.iastate.edu' },
  { prefix: '/spc', target: 'www.spc.noaa.gov' },
]);

if (inDiscord) {
  const style = document.createElement('style');
  style.textContent = `
    .lower-flex-container,
    #divInfo,
    .content-wrapper > .heading { display: none !important; }
  `;
  document.head.appendChild(style);
}

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
