const valueExistInEnum = <T extends {}>(enumObj: T, value: string) => {
  return Object.values(enumObj).some((f) => f === value);
};

const keyExistInEnum = <T extends {}>(enumObj: T, key: string) => {
  return Object.keys(enumObj).some((f) => f === key);
};
export { valueExistInEnum, keyExistInEnum };
