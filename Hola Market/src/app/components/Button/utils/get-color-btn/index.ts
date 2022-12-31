import { ButtonType } from '../../types';

export const getColorBtn = (type: ButtonType) => {
  switch (type) {
    case 'view':
      return 'blue';
    case 'lock':
      return 'red';
    case 'unlock':
      return 'green';
    case 'verify':
      return 'gold';
    default:
      return '';
  }
};
