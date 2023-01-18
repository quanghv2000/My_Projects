import React from 'react';
import { FOCUS_KEY_BOARD } from 'utils/constants/key-board';

type IId = string;
type IFocusItem = {
  id: string;
  index: number;
  focusable: boolean;
};
type IParams = {
  focusOrderIds: IId[];
  defaultFocusingId?: string;
};

const getFocusDirection = (e: React.KeyboardEvent<Element>) => {
  if ((e.shiftKey && e.key === 'Tab') || Object.values(FOCUS_KEY_BOARD.Prev).includes(e.key)) {
    return 'Previous';
  }

  if (Object.values(FOCUS_KEY_BOARD.Next).includes(e.key)) {
    return 'Next';
  }

  return 'None';
};

const findNextFocusItem = (focusOrders: IFocusItem[], activeItem: IFocusItem) => {
  for (let i = activeItem.index + 1; i < focusOrders.length; i++) {
    if (focusOrders[i].focusable) {
      return focusOrders[i];
    }
  }

  for (let i = 0; i < activeItem.index; i++) {
    if (focusOrders[i].focusable) {
      return focusOrders[i];
    }
  }

  return activeItem;
};

const findPrevFocusItem = (focusOrders: IFocusItem[], activeItem: IFocusItem) => {
  for (let i = activeItem.index - 1; i >= 0; i--) {
    if (focusOrders[i].focusable) {
      return focusOrders[i];
    }
  }

  for (let i = focusOrders.length - 1; i > activeItem.index; i--) {
    if (focusOrders[i].focusable) {
      return focusOrders[i];
    }
  }

  return activeItem;
};

const useFocusManager = (params: IParams) => {
  const { focusOrderIds } = params;

  const focusOrders = React.useRef<IFocusItem[]>(focusOrderIds.map((id, index) => ({ id, index, focusable: true })));
  const activeItem = React.useRef<IFocusItem>(focusOrders.current[0]);

  const indexOfFirstItem = 0;
  const indexOfLastItem = focusOrders.current.length - 1;
  const firstItem = focusOrders.current[indexOfFirstItem];
  const lastItem = focusOrders.current[indexOfLastItem];

  const getIndexOfFocusItemById = (elementId: string) =>
    focusOrders.current.findIndex((focusItem) => focusItem.id === elementId);

  const setActive = (elementId: string) => {
    const focusingItem = focusOrders.current[getIndexOfFocusItemById(elementId)];

    if (focusingItem) {
      activeItem.current = focusingItem;
      console.log('focusing item: ', focusingItem);
    }
  };

  const focusOn = (elementId: string) => {
    document.getElementById(elementId)?.focus();
  };

  const focusNext = () => {
    const nextItem = findNextFocusItem(focusOrders.current, activeItem.current);
    const isLastItemFocusing = activeItem.current.index === indexOfLastItem;

    if (isLastItemFocusing) {
      focusOn(firstItem.id);
      return;
    }

    focusOn(nextItem.id);
  };

  const focusPrev = () => {
    const prevItem = findPrevFocusItem(focusOrders.current, activeItem.current);
    const isFirstItemFocusing = activeItem.current.index === indexOfFirstItem;

    if (isFirstItemFocusing) {
      focusOn(lastItem.id);
      return;
    }

    focusOn(prevItem.id);
  };

  const isFocusKeyBoard = (key: string) => {
    const focusKeyBorads = [...Object.values(FOCUS_KEY_BOARD.Next), ...Object.values(FOCUS_KEY_BOARD.Prev)];

    return focusKeyBorads.includes(key);
  };

  const moveByKeyDown = (e: React.KeyboardEvent<Element>) => {
    if (!isFocusKeyBoard(e.key)) {
      return;
    }

    e.preventDefault();
    const focusDirection = getFocusDirection(e);

    switch (focusDirection) {
      case 'Next': {
        focusNext();
        break;
      }
      case 'Previous': {
        focusPrev();
        break;
      }
      default:
        break;
    }
  };

  const moveByKeyUp = (e: React.KeyboardEvent<Element>) => {
    if (!isFocusKeyBoard(e.key)) {
      return;
    }

    e.preventDefault();
    const focusDirection = getFocusDirection(e);

    switch (focusDirection) {
      case 'Next': {
        focusNext();
        break;
      }
      case 'Previous': {
        focusPrev();
        break;
      }
      default:
        break;
    }
  };

  const setFocusable = (elemnetId: string, focusable: boolean) => {
    const indexOfFocusItem = getIndexOfFocusItemById(elemnetId);
    focusOrders.current[indexOfFocusItem].focusable = focusable;
  };

  return {
    setActive,
    setFocusable,
    focusOn,
    moveByKeyDown,
    moveByKeyUp,
    isFocusKeyBoard
  };
};

export default useFocusManager;
