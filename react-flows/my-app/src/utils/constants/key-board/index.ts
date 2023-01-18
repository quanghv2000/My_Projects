export const KEY_BOARD = {
  Enter: 'Enter',
  Tab: 'Tab',
  Shift: 'Shift',
  ArrowUp: 'ArrowUp',
  ArrowDown: 'ArrowDown',
  ArrowRight: 'ArrowRight',
  ArrowLeft: 'ArrowLeft'
};

export const FOCUS_KEY_BOARD = {
  Next: {
    Enter: KEY_BOARD.Enter,
    Tab: KEY_BOARD.Tab,
    ArrowDown: KEY_BOARD.ArrowDown,
    // ArrowRight: KEY_BOARD.ArrowRight
  },
  Prev: {
    ArrowUp: KEY_BOARD.ArrowUp,
    // ArrowLeft: KEY_BOARD.ArrowLeft
  }
};
