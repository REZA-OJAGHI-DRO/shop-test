import { GoodDiscountType } from "./good-discout-types";
import { MediaType } from "./shopper-types";

export type GoodType = {
  goodId: string;
  goodCodeId: string;
  name: string;
  description: string;
  supplierCode: string;
  supplierId: string;
  supplierName: string;
  price: number;
  countInBox: number;
  packageType: string;
  goodDiscounts: GoodDiscountType[];
  file: MediaType | null;
};
