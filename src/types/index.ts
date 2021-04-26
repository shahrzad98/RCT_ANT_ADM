import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelTokenSource } from 'axios';
import { History } from 'history';

export interface ApiDataItem {
  cancelTokenSource?: CancelTokenSource;
}

export type AxiosInstanceData = {
  instance: AxiosInstance;
  DataMap: {
    MapObject: Map<string, ApiDataItem>;
    Urls: { [key: string]: string };
  };
};

export type AppError = {
  message: string;
  validationErrors?: {
    message: string;
    //Relate invalid members (fields/properties).
    members: string[];
  }[];
};

export type AppResponse<T = any> = {
  error: AppError;
  data: T;
};

export type ApiResponse<T> = AxiosResponse<AppResponse<T>> | AxiosError<AppResponse<T>>;

export type PayloadWithHistory<T> = T & { history: History };

export type DefinedRoute = DefinedRouteRoute | DefinedRouteRedirect | DefinedRouteBuilder;
export type DefinedRouteRoute = {
  type: 'Route';
  path: string;
  exact?: boolean;
  children: any;
  childrenProps?: { [key: string]: any };
};
export type DefinedRouteRedirect = { type: 'Redirect'; from?: string; exact?: boolean; path: string };
export type DefinedRouteBuilder = { type: 'Builder'; children: any };

export type ApiReduxState = {
  pending?: boolean;
  success?: boolean;
  error?: AppError;
};

export type CreaDitMode = 'Create' | 'Edit' | 'AddSub';
export interface CreaDitBase {
  creaDitMode: CreaDitMode;
}

export type GetAllRequestBase = {
  PageSize: number;
  PageNumber: number;
  Sort?: string;
  Order?: string;
};

export type GetAllRequestBaseOptional = Partial<GetAllRequestBase>;

export type IndeterminateUnion = '' | 'true' | 'false';

export type RouteFilterObject = {
  key: string;
  value: string | undefined;
  type: 'string' | 'number' | 'boolean';
};

export type ClientFramework = 'Bootstrap' | 'Antd';

export type CurrencyDisplay = 'symbol' | 'code' | 'name';

export type ApiCoordinates = {
  latitude: number;
  longitude: number;
};

export type SortOrder = 'Ascending' | 'Descending' | undefined;

export type AgeCategory = 'Adult' | 'Child' | 'Infant';

export type ApiErrorStorage = { response: any; message: string; config: AxiosRequestConfig };
