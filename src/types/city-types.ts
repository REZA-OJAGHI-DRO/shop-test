export type CityType = {
  key: string;
  value: string;
};

export type GetCityByProvinceIdRequestType = {
  keyword: string;
  data: {
    id: string;
  };
};
