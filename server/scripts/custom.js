import { DiscordSDK, patchUrlMappings } from '@discord/embedded-app-sdk';

const VOLUME = 0.25;

const params = new URLSearchParams(window.location.search);
const inDiscord = params.has('frame_id')
  || window.location.hostname.endsWith('discordsays.com');

if (inDiscord && !params.has('latLonQuery')) {
  params.set('latLonQuery', 'Portland, OR, USA');
  params.set('kiosk', 'true');
  params.set('wide', 'true');
  params.set('mediaPlaying', 'true');
  params.set('mediaVolume', String(VOLUME));
  window.location.replace(`${window.location.pathname}?${params}`);
}

patchUrlMappings([
  { prefix: '/geocode', target: 'geocode.arcgis.com' },
  { prefix: '/weather-api', target: 'api.weather.gov' },
  { prefix: '/radar', target: 'mesonet.agron.iastate.edu' },
  { prefix: '/spc', target: 'www.spc.noaa.gov' },
]);

function unlockAudio() {
  const media = document.querySelectorAll('audio, video');
  if (media.length === 0) return;
  media.forEach((el) => {
    el.muted = false;
    el.volume = VOLUME;
    el.play().catch(() => {});
  });
  window.removeEventListener('pointerdown', unlockAudio);
  window.removeEventListener('keydown', unlockAudio);
  console.log('Audio unlocked');
}

window.addEventListener('pointerdown', unlockAudio);
window.addEventListener('keydown', unlockAudio);

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
