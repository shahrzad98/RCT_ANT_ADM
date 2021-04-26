export type User = {
  userName: string;
  emailAddress: string;
  displayName: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  gender: boolean;
  birthDay: Date;
  isEmailConfirmed: boolean;
  nationalityId: string;
  phoneNumber: string;
  roleNames: string[];
  id: number;
};

export type AppListBaseResponse<TItem> = {
  pageNumber: number;
  pageSize: number;
  pageCount: number;
  totalCount: number;
  list: TItem[];
};

export type FileType = {
  source: 'string';
  fileName: 'string';
  fileExtension: 'string';
};
