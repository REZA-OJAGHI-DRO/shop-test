export type GetUserTokenRequestType = {
  mobile: string;
  loginCode: string;
};

export type UserRelatedType = {
  mobile: string;
  isNewUser: boolean;
  isActive: boolean;
  isAdmin: boolean;
  userId: string;
  roles: string[];
  shoppers: {
    key: string;
    value: string;
  }[];
  suppliers: {
    key: string;
    value: string;
  }[];
};

export type UserTokenType = {
  access_token: string;
  refresh_token: null;
  token_type: string;
  expires_in: number;
  roles: string[];
  userId: string;
  isNewUser: boolean;
  isActive: boolean;
};

export type UserPostionType = {
  isAdmin: boolean;
  shoppers: {
    key: string;
    value: string;
  }[];
  suppliers: {
    key: string;
    value: string;
  }[];
};

export type UserRegisterOrLoginRequestType = {
  mobile: string;
};

export type UserLoginRequestType = {
  userName: string;
  password: string;
};

export type UserGetListRequestType = {
  filter?: {
    mobile: string;
  };
  pageSize?: number;
  pageIndex?: number;
  orderType?: number;
  orderPropertyName?: string;
};

export type UserCreateType = {
  userName: string;
  password: string;
};
