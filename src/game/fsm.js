/**
 * @typedef {'IDLE'|'SPINNING'|'RESOLVING'|'ERROR'} GameState
 */

/**
 * A custom error for illegal state transitions.
 */
export class FsmError extends Error {
  /**
   * @param {string} message The error message.
   */
  constructor(message) {
    super(message);
    this.name = 'FsmError';
  }
}

/**
 * Creates a finite-state machine for the game loop.
 *
 * @param {GameState} [initial='IDLE'] The initial state of the FSM.
 * @returns {{
 *   state: GameState;
 *   lastError: string | null;
 *   beginSpin: () => void;
 *   beginResolve: () => void;
 *   finishResolve: () => void;
 *   fail: (reason: string) => void;
 *   canModifyBet: () => boolean;
 * }}
 */
export function createFsm(initial = 'IDLE') {
  let currentState = initial;
  let errorReason = null;

  const transitions = {
    IDLE: ['SPINNING'],
    SPINNING: ['RESOLVING'],
    RESOLVING: ['IDLE'],
    ERROR: [],
  };

  /**
   * @param {GameState} newState
   */
  function transitionTo(newState) {
    if (currentState === 'ERROR') {
      throw new FsmError(`Cannot transition from ERROR state.`);
    }
    const allowed = transitions[currentState];
    if (!allowed || !allowed.includes(newState)) {
      throw new FsmError(`Invalid transition from ${currentState} to ${newState}.`);
    }
    currentState = newState;
  }

  return {
    get state() {
      return currentState;
    },
    get lastError() {
      return errorReason;
    },
    beginSpin() {
      transitionTo('SPINNING');
    },
    beginResolve() {
      transitionTo('RESOLVING');
    },
    finishResolve() {
      transitionTo('IDLE');
    },
    /**
     * @param {string} reason
     */
    fail(reason) {
      if (currentState === 'ERROR') {
        throw new FsmError('Cannot fail from ERROR state.');
      }
      currentState = 'ERROR';
      errorReason = reason;
    },
    canModifyBet() {
      return currentState === 'IDLE';
    },
  };
}
