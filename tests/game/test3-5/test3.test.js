import { describe, it, expect } from 'vitest';

/**
 * Test for state persistance, if we refresh the page during a spin the state 
 * will be saved upon refresh and tokens lost or gained will not be incorrect
 */