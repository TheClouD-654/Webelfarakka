(() => {
  const SHOW_DEV_NOTICE = true;
  if (!SHOW_DEV_NOTICE) return;
/// <reference path="./dev-notice.js" />
  const style = document.createElement('style');
  style.textContent = `
    .dev-hover-wrap {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 9999;
      overflow: hidden;
    }

    .dev-hover-ticker {
      position: absolute;
      top: 80px;
      left: 0;
      width: 100%;
      border-top: 1px solid rgba(255, 0, 0, 0.22);
      border-bottom: 1px solid rgba(255, 0, 0, 0.22);
      background: linear-gradient(90deg, rgba(255, 0, 0, 0.22), rgba(255, 0, 0, 0.22), rgba(255, 0, 0, 0.22));
      box-shadow: 0 0 24px rgba(255, 0, 0, 0.22);
      backdrop-filter: blur(3px);
    }

    .dev-hover-track {
      display: flex;
      width: max-content;
      white-space: nowrap;
      animation: devTickerMove 24s linear infinite;
      font: 700 0.84rem/1 "Inter", sans-serif;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: yellow;
      padding: 9px 0;
    }

    .dev-hover-track span {
      margin-right: 44px;
      text-shadow: 0 0 10px rgba(255, 0, 0, 0.22);
    }

    .dev-hover-watermark {
      position: absolute;
      left: 50%;
      top: 52%;
      transform: translate(-50%, -50%) rotate(-16deg);
      font: 800 clamp(2rem, 7vw, 6rem)/1 "Inter", sans-serif;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: rgba(221, 209, 39, 0.22);
      text-shadow: 0 0 24px rgba(0, 0, 0, 0.22);
      animation: devPulse 2.8s ease-in-out infinite;
    }

    @keyframes devTickerMove {
      from { transform: translateX(0); }
      to { transform: translateX(-50%); }
    }

    @keyframes devPulse {
      0%, 100% { opacity: 0.46; }
      50% { opacity: 0.9; }
    }
  `;

  const wrap = document.createElement('div');
  wrap.className = 'dev-hover-wrap';
  wrap.setAttribute('aria-hidden', 'true');

  const ticker = document.createElement('div');
  ticker.className = 'dev-hover-ticker';

  const track = document.createElement('div');
  track.className = 'dev-hover-track';
  const text = 'SITE UNDER DEVELOPMENT - CONTENT, FEATURES, AND PRICING MAY CHANGE';
  track.innerHTML = `<span>${text}</span><span>${text}</span><span>${text}</span><span>${text}</span>`;

  const watermark = document.createElement('div');
  watermark.className = 'dev-hover-watermark';
  watermark.textContent = 'Under Development';

  ticker.appendChild(track);
  wrap.appendChild(ticker);
  wrap.appendChild(watermark);

  document.head.appendChild(style);
  document.body.appendChild(wrap);
})();
