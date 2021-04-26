export const paginateArray = (array: any[], page: number, pageSize: number) => {
  if (array) {
    return array.slice((page - 1) * pageSize, page * pageSize);
  }
  return undefined;
};
