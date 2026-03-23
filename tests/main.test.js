import { sanitize, buildGreeting, formatTime } from '../src/js/main.js';

// ─── sanitize() ────────────────────────────────────────────────────────────

describe('sanitize()', () => {
  it('escapes < and > characters', () => {
    expect(sanitize('<script>')).toBe('&lt;script&gt;');
  });
  it('escapes & character', () => {
    expect(sanitize('a & b')).toBe('a &amp; b');
  });
  it('escapes double quotes', () => {
    expect(sanitize('"hello"')).toBe('&quot;hello&quot;');
  });
  it('escapes single quotes', () => {
    expect(sanitize("it's")).toBe('it&#039;s');
  });
  it('returns plain strings unchanged', () => {
    expect(sanitize('hello world')).toBe('hello world');
  });
  it('coerces numbers to string', () => {
    expect(sanitize(42)).toBe('42');
  });
  it('coerces null to string', () => {
    expect(sanitize(null)).toBe('null');
  });
  it('handles empty string', () => {
    expect(sanitize('')).toBe('');
  });
  it('handles combined special chars', () => {
    expect(sanitize('<a href="test">link</a>')).not.toContain('<');
    expect(sanitize('<a href="test">link</a>')).not.toContain('>');
  });
});

// ─── buildGreeting() ───────────────────────────────────────────────────────

describe('buildGreeting()', () => {
  it('returns a string containing the name', () => {
    const result = buildGreeting('Alice');
    expect(typeof result).toBe('string');
    expect(result).toContain('Alice');
  });
  it('returns one of the known greeting patterns', () => {
    const result = buildGreeting('Bob');
    expect(result).toMatch(/^(Hello|Hey there|Welcome|Greetings|Howdy), Bob!/);
  });
  it('throws TypeError for empty string', () => {
    expect(() => buildGreeting('')).toThrow(TypeError);
  });
  it('throws TypeError for null', () => {
    expect(() => buildGreeting(null)).toThrow(TypeError);
  });
  it('throws TypeError for undefined', () => {
    expect(() => buildGreeting(undefined)).toThrow(TypeError);
  });
  it('throws TypeError for a number', () => {
    expect(() => buildGreeting(123)).toThrow(TypeError);
  });
  it('sanitizes HTML in name', () => {
    const result = buildGreeting('<b>Bob</b>');
    expect(result).not.toContain('<b>');
    expect(result).not.toContain('</b>');
  });
  it('trims whitespace from name', () => {
    const result = buildGreeting('  Alice  ');
    expect(result).toContain('Alice');
    expect(result).not.toContain('  Alice  ');
  });
});

// ─── formatTime() ──────────────────────────────────────────────────────────

describe('formatTime()', () => {
  it('returns a non-empty string', () => {
    expect(typeof formatTime(new Date())).toBe('string');
    expect(formatTime(new Date()).length).toBeGreaterThan(0);
  });
  it('includes a colon separator', () => {
    expect(formatTime(new Date('2024-01-01T14:30:00'))).toMatch(/:/);
  });
  it('handles midnight', () => {
    expect(formatTime(new Date('2024-01-01T00:00:00'))).toMatch(/:/);
  });
  it('handles noon', () => {
    expect(formatTime(new Date('2024-01-01T12:00:00'))).toMatch(/:/);
  });
});
