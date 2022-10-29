import { ButtonType } from '../../types';

export const getColorBtn = (type: ButtonType) => {
  switch (type) {
    case 'view':
      return 'blue';
    case 'update':
      return 'blue';
    case 'delete':
      return 'red';
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
