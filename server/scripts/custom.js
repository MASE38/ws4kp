import { DiscordSDK, patchUrlMappings } from '@discord/embedded-app-sdk';

const inDiscord = new URLSearchParams(window.location.search).has('frame_id')
  || window.location.hostname.endsWith('discordsays.com');

if (inDiscord) {
  patchUrlMappings([
    { prefix: '/geocode', target: 'geocode.arcgis.com' },
    { prefix: '/weather-api', target: 'api.weather.gov' },
    { prefix: '/radar', target: 'mesonet.agron.iastate.edu' },
    { prefix: '/spc', target: 'www.spc.noaa.gov' },
  ]);

  const style = document.createElement('style');
  style.textContent = `
    a[href*="github.com"] { display: none !important; }
    #divInfo,
    .content-wrapper > .heading { display: none !important; }
  `;
  document.head.appendChild(style);
}

if (window.__ws4kpDebug) {
  setTimeout(() => {
    const d = window.__ws4kpDebug;
    const box = document.createElement('div');
    box.style.cssText = 'position:fixed;top:0;left:0;z-index:99999;background:#000;'
      + 'color:#0f0;font:12px monospace;padding:6px;max-width:100%;white-space:pre-wrap';
    box.textContent = 'inDiscord: ' + d.inDiscord
      + '\nplatform: ' + d.platform
      + '\ninnerWidth: ' + d.innerWidth
      + '\nisMobile: ' + d.isMobile
      + '\nclamp: ' + d.clamp
      + '\nvolume calls: ' + (d.volumeRequests.join(', ') || 'none');
    document.body.appendChild(box);
  }, 6000);
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
