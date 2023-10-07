/**
 * Represents the checked state.
 */
export const CheckedState = 'checked';

/**
 * Represents the unchecked state.
 */
export const UncheckedState = 'unchecked';

/**
 * Represents the indeterminate state.
 */
export const IndeterminateState = 'indeterminate';

export type CheckboxState = typeof CheckedState | typeof UncheckedState | typeof IndeterminateState;