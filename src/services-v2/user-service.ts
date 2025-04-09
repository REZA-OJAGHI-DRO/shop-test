import {
  GetUserTokenRequestType,
  UserCreateType,
  UserGetListRequestType,
  UserLoginRequestType,
  UserPostionType,
  UserRegisterOrLoginRequestType,
  UserTokenType,
} from "@/types/user-types";
import api from "@/services-v2/api";
import { ApiResponse } from "@/types/common-types";

const userService = {
  create: async (params: UserCreateType): Promise<ApiResponse<UserTokenType>> =>
    api.post("/Identity/User/Create", params),

  registerOrLogin: async (
    params: UserRegisterOrLoginRequestType
  ): Promise<ApiResponse<UserTokenType>> =>
    api.post("/Identity/User/RegisterOrLogin", params),

  getToken: async (
    params: GetUserTokenRequestType
  ): Promise<ApiResponse<UserTokenType>> =>
    api.post("/Identity/User/Token", params),

  login: async (
    params: UserLoginRequestType
  ): Promise<ApiResponse<UserTokenType>> =>
    api.post("/Identity/User/Login", params),

  getList: async (
    params: UserGetListRequestType
  ): Promise<ApiResponse<UserTokenType>> =>
    api.post("/Identity/User/GetList", params),

  getAllPositions: async (): Promise<ApiResponse<UserPostionType>> =>
    api.post("/Identity/User/GetAllPosition", {}),
};

export default userService;
