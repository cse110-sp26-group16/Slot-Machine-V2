import { describe, it, expect } from 'vitest';
import { togglePreference } from '../../../src/game/logic.js';

describe('User Preference Toggles', () => {
  it('correctly toggles the animation state from ON to OFF', () => {
    expect(togglePreference(true)).toBe(false);
  });

  it('correctly toggles the mute state from OFF to ON', () => {
    expect(togglePreference(false)).toBe(true);
  });
});