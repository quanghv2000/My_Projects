import { Characters } from 'utils/constants';

export const checkStartWithSpace = value => {
  const isValueValid = value.length > 0 && !value.startsWith(Characters.SPACE);

  return isValueValid;
};
