import { CategoryType } from "./category-types";
import { FileTypeEnum } from "./file-types";
import { MediaType } from "./shopper-types";

export type SupplierTypeDetailsType = {
  categories: CategoryType[];
  brands: {
    id: string;
    name: string;
    logoFileGuid: string;
    logoFileLink: string;
  }[];
  goodDiscounts: {
    id: string;
    name: string;
    discountResult: string;
  }[];
  description: string;
};

export type SupplierType = {
  id: string;
  name: string;
  cityId: string;
  cityName: string;
  provinceId: string;
  provinceName: string;
  categories: CategoryType[];
  attachments: MediaType[];
  isImporter: boolean;
  isProducer: boolean;
  isSpreader: boolean;
  importDetails: SupplierTypeDetailsType;
  produceDetails: SupplierTypeDetailsType;
  spreadDetails: SupplierTypeDetailsType;
  phone: string;
  phone2: string;
  mobile: string;
  managerMobile: string;
  accountantMobile: string;
  coordinatorMobile: string;
  nationalId: string;
  companyNationalId: string;
  description: string;
  address: string;
  postalCode: string;
  isPerson: boolean;
  birthDate: string;
  installments: boolean;
  cash: boolean;
  preOrder: boolean;
  isActive: boolean;
  paymentDurationDaysList: number[];
  profilePhoto: MediaType;
};

export type SupplierUpdateProfilePhotoRequestType = {
  supplierId: string;
  fileId: string;
  fileType: FileTypeEnum;
};

export type SupplierGetAllFilterType = {
  keyword: string;
};
