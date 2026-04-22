import { describe, it, expect } from 'vitest';
import { createFsm, FsmError } from '../../src/game/fsm';

describe('createFsm', () => {
  it('1. Happy path: IDLE -> SPINNING -> RESOLVING -> IDLE', () => {
    const fsm = createFsm();
    expect(fsm.state).toBe('IDLE');

    fsm.beginSpin();
    expect(fsm.state).toBe('SPINNING');

    fsm.beginResolve();
    expect(fsm.state).toBe('RESOLVING');

    fsm.finishResolve();
    expect(fsm.state).toBe('IDLE');
  });

  it('2. Double spin: calling beginSpin twice in a row throws FsmError', () => {
    const fsm = createFsm();
    fsm.beginSpin();
    expect(() => fsm.beginSpin()).toThrow(FsmError);
  });

  it('3. Skipping RESOLVING: calling finishResolve from SPINNING throws FsmError', () => {
    const fsm = createFsm();
    fsm.beginSpin();
    expect(() => fsm.finishResolve()).toThrow(FsmError);
  });

  it('4. finishResolve from IDLE throws FsmError', () => {
    const fsm = createFsm();
    expect(() => fsm.finishResolve()).toThrow(FsmError);
  });

  it('5. fail() from IDLE, SPINNING, and RESOLVING each transition to ERROR', () => {
    const fsmIdle = createFsm('IDLE');
    fsmIdle.fail('rng');
    expect(fsmIdle.state).toBe('ERROR');
    expect(fsmIdle.lastError).toBe('rng');

    const fsmSpinning = createFsm('IDLE');
    fsmSpinning.beginSpin();
    fsmSpinning.fail('rng');
    expect(fsmSpinning.state).toBe('ERROR');
    expect(fsmSpinning.lastError).toBe('rng');

    const fsmResolving = createFsm('IDLE');
    fsmResolving.beginSpin();
    fsmResolving.beginResolve();
    fsmResolving.fail('rng');
    expect(fsmResolving.state).toBe('ERROR');
    expect(fsmResolving.lastError).toBe('rng');
  });

  it('6. From ERROR, every method throws FsmError', () => {
    const fsm = createFsm();
    fsm.fail('test');

    expect(fsm.state).toBe('ERROR');
    expect(() => fsm.beginSpin()).toThrow(FsmError);
    expect(() => fsm.beginResolve()).toThrow(FsmError);
    expect(() => fsm.finishResolve()).toThrow(FsmError);
    expect(() => fsm.fail('another')).toThrow(FsmError);
  });

  it('7. canModifyBet() returns true in IDLE, false otherwise', () => {
    const fsm = createFsm();
    expect(fsm.canModifyBet()).toBe(true); // IDLE

    fsm.beginSpin();
    expect(fsm.canModifyBet()).toBe(false); // SPINNING

    fsm.beginResolve();
    expect(fsm.canModifyBet()).toBe(false); // RESOLVING

    const fsmIdleAgain = createFsm();
    fsmIdleAgain.beginSpin();
    fsmIdleAgain.beginResolve();
    fsmIdleAgain.finishResolve();
    expect(fsmIdleAgain.canModifyBet()).toBe(true); // Back to IDLE

    const fsmError = createFsm();
    fsmError.fail('test');
    expect(fsmError.canModifyBet()).toBe(false); // ERROR
  });

  it('8. The `state` getter reflects the current state after each transition', () => {
    const fsm = createFsm();
    expect(fsm.state).toBe('IDLE');
    fsm.beginSpin();
    expect(fsm.state).toBe('SPINNING');
    fsm.beginResolve();
    expect(fsm.state).toBe('RESOLVING');
    fsm.finishResolve();
    expect(fsm.state).toBe('IDLE');
    fsm.fail('test');
    expect(fsm.state).toBe('ERROR');
  });

  it('9. fail() records the reason readable via lastError getter', () => {
    const fsm = createFsm();
    expect(fsm.lastError).toBe(null);
    fsm.fail('Something bad happened');
    expect(fsm.lastError).toBe('Something bad happened');
  });
});
