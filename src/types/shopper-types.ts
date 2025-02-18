import { CategoryType } from "./category-types";

export type ShopperFriendType = {
  id: string;
  name: string;
  mobile: string;
  cityId: string;
  description: string;
};

export type MediaType = {
  fileId: string;
  link: string;
  fileType: number;
};

export type ShopperType = {
  id: string;
  name: string;
  mobile: string;
  phone: string;
  personName: string;
  nationCode: string;
  birthDate: string;
  homeCity: string | null;
  homeProvince: string | null;
  homePostalCode: string;
  homeAddress: string;
  city: {
    key: string;
    value: string;
  };
  province: {
    key: string;
    value: string;
  };
  postalCode: string;
  address: string;
  isRent: boolean;
  hasLicense: boolean;
  isRetail: boolean;
  area: number;
  licenseImage: MediaType | null;
  bannerImages: MediaType[];
  docOrRentImages: MediaType[];
  brands: {
    id: string;
    logoFileGuid: string;
    logoFileLink: string;
    name: string;
  }[];
  categories: CategoryType[];
  friends: ShopperFriendType[];
};

export type ShopperCreateRequestType = {
  name: string;
  personName: string;
  phone: string;
  nationCode: string;
  categoryIds: string[];
  brandIds: string[];
  cityId: string;
  postalCode: string;
  address: string;
  isRent: boolean;
  hasLicense: boolean;
  isRetail: boolean;
  area: number;
  licenseImage: string;
  docOrRentImage: string;
  bannerImage: string;
  friends: ShopperFriendType[];
};

export type ShopperUpdateRequestType = {
  id: string;
  personName: string;
  phone: string;
  nationCode: string;
  birthDate: string;
  homeCityId: string | null;
  homePostalCode: string;
  homeAddress: string;
  name: string;
  cityId: string;
  postalCode: string;
  address: string;
  isRent: boolean;
  area: number;
  hasLicense: boolean;
  licenseCode: string;
  isRetail: boolean;
  licenseImage: string | null;
  docOrRentImagesEdited: boolean;
  docOrRentImages: string[];
  categoryIdsEdited: boolean;
  categoryIds: string[];
  brandIdsEdited: boolean;
  brandIds: string[];
};

export type ShopperGetListRequestType = {
  filter: {
    name: string;
  };
  pageSize: number;
  pageIndex: number;
  orderType: number;
  orderPropertyName: string;
};

export type ShopperToggleActiveRequestType = {
  id: string;
};

export type ShopperGetRequestType = {
  id: string;
};

export type ShopperAddFileRequestType = {
  shopperId: string;
  fileIds: string[];
};

export type ShopperRemoveFileRequestType = {
  shopperId: string;
  fileIds: string[];
};

export type ShopperUpdateMainFileRequestType = {
  shopperId: string;
  fileId: string;
  fileType: number;
};

export type ShopperGetFilesRequestType = {
  id: string;
};
