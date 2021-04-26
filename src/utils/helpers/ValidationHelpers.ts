import { notification } from 'antd';
import * as yup from 'yup';

export const stringIsNullOrEmpty = (value: string | undefined | null) => {
  return value === undefined || value === null || value.length === 0;
};

export const validateYupObject = (yupObject: yup.ObjectSchema<any>, obj: any) => {
  try {
    return yupObject.validateSync(obj);
  } catch (reason) {
    notification.error({
      message: reason.errors,
    });
    return undefined;
  }

  // yupObject
  //   .validate(obj)
  //   .then(() => {
  //     return obj;
  //   })
  //   .catch((reason) => {
  //     notification.error({
  //       message: reason.errors,
  //     });
  //     return undefined;
  //   });
};
