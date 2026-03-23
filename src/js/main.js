/**
 * main.js — Hello World UI
 * Pure JavaScript, no frameworks, no dependencies.
 */

// ─── Utilities (exported for testing) ─────────────────────────────────────

/**
 * Sanitize a string against XSS by escaping HTML entities.
 * @param {string} input
 * @returns {string}
 */
export function sanitize(input) {
  return String(input)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Generate a greeting string for a given name.
 * @param {string} name
 * @returns {string}
 */
export function buildGreeting(name) {
  if (!name || typeof name !== 'string') throw new TypeError('name must be a non-empty string');
  const clean = sanitize(name.trim());
  const greetings = [
    `Hello, ${clean}! 👋`,
    `Hey there, ${clean}! ✨`,
    `Welcome, ${clean}! 🚀`,
    `Greetings, ${clean}! 🌟`,
    `Howdy, ${clean}! 🤠`,
  ];
  return greetings[Math.floor(Math.random() * greetings.length)];
}

/**
 * Format a Date object into HH:MM string.
 * @param {Date} date
 * @returns {string}
 */
export function formatTime(date) {
  return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

// ─── Grid Canvas Background ────────────────────────────────────────────────

/* istanbul ignore next */
function initGrid() {
  const canvas = document.getElementById('grid-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const CELL = 48;

  // draw() defined before resize() — satisfies no-use-before-define
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 1;

    for (let x = 0; x < canvas.width; x += CELL) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += CELL) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  }

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw();
  }

  window.addEventListener('resize', resize);
  resize();
}

// ─── App State ─────────────────────────────────────────────────────────────

const state = {
  greetCount: 0,
  totalChars: 0,
};

// ─── DOM Binding ───────────────────────────────────────────────────────────

/* istanbul ignore next */
function init() {
  initGrid();

  const input = document.getElementById('name-input');
  const btn = document.getElementById('greet-btn');
  const output = document.getElementById('greeting-output');
  const countEl = document.getElementById('greet-count');
  const charEl = document.getElementById('char-count');
  const timeEl = document.getElementById('time-display');

  function tickClock() {
    timeEl.textContent = formatTime(new Date());
  }
  tickClock();
  setInterval(tickClock, 1000);

  input.addEventListener('input', () => {
    state.totalChars += 1;
    charEl.textContent = state.totalChars;
  });

  btn.addEventListener('click', () => {
    const name = input.value.trim();
    if (!name) {
      input.focus();
      input.style.borderColor = 'rgba(255,80,80,0.6)';
      setTimeout(() => {
        input.style.borderColor = '';
      }, 800);
      return;
    }

    const greeting = buildGreeting(name);
    output.classList.remove('visible');

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        output.textContent = greeting;
        output.classList.add('visible');
      });
    });

    state.greetCount += 1;
    countEl.textContent = state.greetCount;
    input.value = '';
    input.focus();
  });

  // arrow-parens: wrap single arg in parens
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') btn.click();
  });
}

// Boot
/* istanbul ignore next */
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', init);
}
