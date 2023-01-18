import React from 'react';
import useFocusManager from 'hooks/useFocusManager';
import { Button } from 'react-bootstrap';
import { useForm, useWatch } from 'react-hook-form';
import { showNotification } from 'helpers';
import { KEY_BOARD } from 'utils/constants/key-board';

type IProps = {
  formManager?: ReturnType<typeof useForm | any>;
  focus?: ReturnType<typeof useFocusManager>;
  id?: string;
  tabIndex?: number;
  onSave?: () => void;
};

export const SaveDraftButton: React.FC<IProps> = (props) => {
  /** @Props_Value */
  const { formManager, onSave = () => {}, focus, id = '', tabIndex } = props;
  const { control } = formManager;

  /** @Declare */
  const formWatching = useWatch({ control });
  const enabled = Object.values(formWatching).some((value) => !!value);
  focus?.setFocusable(id, enabled);

  /** @Logic_Handler */
  const handleSaveDraft = () => {
    onSave();
    showNotification('success', 'Form data saved successfully!');
  };

  const handleOnkeyDown = (e: React.KeyboardEvent<Element>) => {
    if (focus?.isFocusKeyBoard(e.key)) {
      e.preventDefault();
    }
  };

  const handleOnkeyUp = (e: React.KeyboardEvent<Element>) => {
    focus?.moveByKeyUp(e);
  };

  return (
    <Button
      tabIndex={tabIndex}
      id={id}
      onFocus={() => {
        focus?.setActive(id);
      }}
      onKeyUp={(e) => {
        if (e.key === KEY_BOARD.Enter) {
          e.preventDefault();
          handleSaveDraft();
          return;
        }
        handleOnkeyUp(e);
      }}
      onKeyDown={handleOnkeyDown}
      disabled={!enabled}
      variant="primary"
      type="button"
      className={`${enabled ? 'bg-warning border-warning' : 'btn-disabled'} me-3 h-38`}
      onClick={handleSaveDraft}
    >
      Save Draft
    </Button>
  );
};
