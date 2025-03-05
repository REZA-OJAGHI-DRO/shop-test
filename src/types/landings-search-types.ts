import { CategoryType } from "./category-types";
import { MediaType } from "./shopper-types";

export type SearchGoodsRequestType = {
  keyword: string;
  categoryId?: string | null;
  categoryLevel?: number;
  paymentType?: number | null;
  paymentDurationDays?: number | null;
  supplierId?: string | null;
  supplyType?: number | null;
};

export type SearchSupplierRequestType = {
  keyword: string;
  cityId?: string | null;
  provinceId?: string | null;
  categoryId?: string | null;
  isImporter?: boolean | null;
  isProducer?: boolean | null;
  isSpreader?: boolean | null;
  cachePayment?: boolean | null;
  installmentPayment?: boolean | null;
  paymentDuration?: number | null;
};

export type SearchSupplierResponseType = {
  id: string;
  name: string;
  image: MediaType | null;
  cityName: string;
  provinceName: string;
  categories: CategoryType[];
  isImporter: boolean;
  isProducer: boolean;
  isSpreader: boolean;
  goodDiscounts: {
    key: number;
    value: string;
  }[];
};
