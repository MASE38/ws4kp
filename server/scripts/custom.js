import { DiscordSDK, patchUrlMappings } from '@discord/embedded-app-sdk';

const params = new URLSearchParams(window.location.search);
if (!params.has('latLonQuery')) {
  params.set('latLonQuery', 'Portland, OR, USA');
  params.set('kiosk', 'true');
  params.set('wide', 'true');
  params.set('mediaPlaying', 'true');
  params.set('mediaVolume', '0.25');
  window.location.replace(`${window.location.pathname}?${params}`);
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
