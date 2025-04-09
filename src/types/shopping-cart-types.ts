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
  goodDiscountPercent: number;
};

export type ShoppingCartGetAllResponseType = {
  id: string;
  paymentDurationDays: number;
  supplierId: string;
  supplierName: string;
  sendToSupplier: boolean;
  discreption: string;
  paymentType: number;
  createdAt: string;
  calculatedFinalAmount: number;
  shopperId: string;
  shopperName: string | null;
  code: string;
  items: ShoppingCartGetAllResponseItemType[];
  supplierDiscounts: ShoppingCartSupplierDiscountsType[];
  transactions: ShoppingCartTransactionsType[];
  supplierUserId: string;
};

export type ShoppingCartSupplierDiscountsType = {
  id: number;
  title: string;
  amount: number;
  type: SupplierDiscountTypeEnum;
};

export type ShoppingCartTransactionsType = {
  id: number;
  status: ShoppingCartStatusEnum;
  createdAt: string;
};

export enum SupplierDiscountTypeEnum {
  Increase = 1,
  Decrease = 2,
}

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

export type ShoppingCartChangeStatusRequestType = {
  id: string;
  description: string | null;
  status: ShoppingCartStatusEnum;
};

export enum ShoppingCartStatusEnum {
  Init = 1,
  SendToSupplier = 2,
  ReviewBySupplier = 3,
  EditBySupplier = 4,
  RejectBySupplier = 5,
  CancelByShopper = 6,
  AcceptBySupplier = 7,
  DeleteByShopper = 8,
  SendForSelectFinancingByShopper = 9,
  SendForProvidingFinancing = 10,
  ApproveFinancingBySupplier = 11,
  RejectFinancingBySupplier = 12,
}
