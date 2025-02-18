export enum FileTypeEnum {
  BrandLogo = "1",
  BrandPriceList = "2",
  Good = "3",
  ShopperLicense = "4",
  // ShopperBanner = "5",
  ShopperDocOrRent = "6",
  SupplierImage = "7",
  SupplierVideo = "8",
  SupplierMainImage = "9",
  SupplierMainVideo = "10",
  ShopperImage = "11",
  ShopperVideo = "12",
  ShopperMainImage = "13",
  ShopperMainVideo = "14",
  ChequeImage = "15",
  ChatAttachment = "16",
  ShopperProfile = "17",
  SupplierProfile = "18",
}

export type UploadFileRequestType = {
  file: File;
  type: FileTypeEnum;
};

export type getLinksRequestType = {
  id: string;
  type: FileTypeEnum;
};
