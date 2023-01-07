export const data: any = () => {
  let newArr: any = [];
  for (let i = 1; i <= 12; i++) {
    const item: any = {
      month: i,
      numOfPost: 0,
      numOfUser: 0,
    };
    newArr.push(item);
  }
  return newArr;
};
