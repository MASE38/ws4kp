import { DiscordSDK, patchUrlMappings } from '@discord/embedded-app-sdk';

if (!window.location.search) {
  window.location.replace('/?latLonQuery=Portland%2C+OR%2C+USA&kiosk=true&wide=true');
}

patchUrlMappings([
  { prefix: '/geocode', target: 'geocode.arcgis.com' },
  { prefix: '/weather-api', target: 'api.weather.gov' },
  { prefix: '/radar', target: 'mesonet.agron.iastate.edu' },
  { prefix: '/spc', target: 'www.spc.noaa.gov' },
]);

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
