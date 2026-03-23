import { sanitize, buildGreeting, formatTime } from '../src/js/main.js';

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
  it('returns plain strings unchanged', () => {
    expect(sanitize('hello world')).toBe('hello world');
  });
  it('coerces non-strings', () => {
    expect(sanitize(42)).toBe('42');
  });
});

describe('buildGreeting()', () => {
  it('returns a string containing the name', () => {
    const result = buildGreeting('Alice');
    expect(typeof result).toBe('string');
    expect(result).toContain('Alice');
  });
  it('throws TypeError for empty string', () => {
    expect(() => buildGreeting('')).toThrow(TypeError);
  });
  it('throws TypeError for null', () => {
    expect(() => buildGreeting(null)).toThrow(TypeError);
  });
  it('sanitizes HTML in name', () => {
    const result = buildGreeting('<b>Bob</b>');
    expect(result).not.toContain('<b>');
  });
});

describe('formatTime()', () => {
  it('returns a non-empty string', () => {
    const result = formatTime(new Date());
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });
  it('includes a colon separator', () => {
    const result = formatTime(new Date('2024-01-01T14:30:00'));
    expect(result).toMatch(/:/);
  });
});
