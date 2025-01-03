import { GoodType } from "./good-types";

export type ShoppingCartCreateRequestType = {
  goodCodeId: string;
  paymentType: PaymentTypeEnum;
  paymentDurationDays: number;
  packageCount: number;
  subPackageCount: number;
};

export type ShoppingCartType = {
  id: string;
  goodCodeId: string;
  goodName: string;
  supplierName: string;
  paymentType: PaymentTypeEnum;
  paymentDurationDays: number;
  packageCount: number;
  subPackageCount: number;
};

export type ShoppingCartGetAllResponseItemType = {
  id: string;
  goodName: string;
  priceAmount: number;
  packageCount: number;
  subPackageCount: number;
  goodCode: string;
  countInBox: number;
  unit: string;
  packageType: string;
  goodDiscountPercent:number;
};

export type ShoppingCartGetAllResponseType = {
  id: string;
  paymentDurationDays: number;
  supplierId: string;
  supplierName: string;
  sendToSupplier: true;
  discreption: string;
  paymentType: number;
  createdAt: string;
  calculatedFinalAmount: number;
  shopperId: number;
  shopperName: string;
  code: string;
  items: ShoppingCartGetAllResponseItemType[];
};

export type TempShoppingCartGetAllResponseType = {
  id: string;
  goodCodeId: string;
  goodName: string;
  supplierName: string;
  supplierId: string;
  imageUrl?: string;
  paymentType: PaymentTypeEnum;
  paymentDurationDays: number;
  packageCount: number;
  subPackageCount: number;
  price: number;
  goodCode: string;
  countInBox: number;
  unit: string;
  packageType: string;
};

export type LocalShoppingCartItemType = {
  id?: string;
  goodCodeId: string;
  paymentType: PaymentTypeEnum;
  paymentDurationDays: number;
  packageCount: number;
  subPackageCount: number;
  good: GoodType;
};

export enum PaymentTypeEnum {
  Cash,
  NonCash,
}

// *****

export type SupplierDiscount = {
  title: string;
  amount: number;
  type: number;
};

export type ShoppingCartEditRequestType = {
  id: number;
  description: string;
  supplierDiscounts: SupplierDiscount[];
  items: {
    id: number;
    packageCount: number;
    subPackageCount: number;
    goodDiscountPercent: number;
  }[];
};