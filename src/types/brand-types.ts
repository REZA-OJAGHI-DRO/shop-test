export type BrandGetAllResponseType = {
  key: string;
  value: string;
};

export type BrandGetListResponseType = {
  id: string;
  name: string;
  enName: string;
  ownerName: string | null;
  ownerId: string | null;
  logo: string | null; // file id
  logoLink: string | null;
  enabled: boolean;
};

export type BrandGetResponseType = {
  id: string;
  name: string;
  enName: string;
  ownerId: string | null;
  ownerName: string | null;
  logoFileGuid: string | null;
  priceListGuid: string | null;
  logoFileLink: string | null;
  priceListLink: string | null;
};

export enum BrandActiveStatusFilterEnum {
  All,
  Active,
  NotActive,
}

export type BrandFiltersType = {
  activeStatus?: BrandActiveStatusFilterEnum;
  name?: string;
  enName?: string;
};
