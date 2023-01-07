export const convertPrice = (value: any) => {
  return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
