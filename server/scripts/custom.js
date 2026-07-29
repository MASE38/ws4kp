import { DiscordSDK, patchUrlMappings } from '@discord/embedded-app-sdk';

const params = new URLSearchParams(window.location.search);
const inDiscord = params.has('frame_id')
  || window.location.hostname.endsWith('discordsays.com')
  || window.self !== window.top;
const platform = (params.get('platform') || '').toLowerCase();
const isMobile = ['mobile', 'android', 'ios'].includes(platform);

if (inDiscord) {
  patchUrlMappings([
    { prefix: '/geocode', target: 'geocode.arcgis.com' },
    { prefix: '/weather-api', target: 'api.weather.gov' },
    { prefix: '/radar', target: 'mesonet.agron.iastate.edu' },
    { prefix: '/spc', target: 'www.spc.noaa.gov' },
  ]);

const rules = [
  'a[href*="github.com"] { display: none !important; }',
  '#divInfo, .content-wrapper > .heading { display: none !important; }',
  '#settings-kiosk-label, #settings-stickyKiosk-label { display: none !important; }',
  'img[src*="fullscreen"] { display: none !important; }',
];
if (isMobile) rules.push('.lower-flex-container { display: none !important; }');

  const style = document.createElement('style');
  style.textContent = rules.join('\n');
  document.head.appendChild(style);
}

async function start() {
  try {
    const sdk = new DiscordSDK('1532074059561439426');
    await sdk.ready();
    console.log('Discord handshake complete');
  } catch (e) {
    console.log('Not running inside Discord:', e.message);
  }
}

function setViewMode() {
  const sel = document.getElementById('settings-viewMode-select');
  if (!sel) return;
  const opt = [...sel.options].find(
    (o) => /wide/i.test(o.text) && /enhanced/i.test(o.text)
  );
  if (!opt || sel.value === opt.value) return;
  sel.value = opt.value;
  sel.dispatchEvent(new Event('change', { bubbles: true }));
}

setViewMode();

start();
