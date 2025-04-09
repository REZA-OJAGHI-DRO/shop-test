import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  timerSideBar: true,
  token: null,
  numberPhone: "0000",
  chabk: "test.dvst.ir",
  dataBuy: [],
  productFilter: {
    filterHadProduct: "",
    filterCategoryIdLanding: null,
    filterLevelLanding: 1,
    filterClickLevel3: false,
    filterLevel1Value: "",
    filterBackLevel3Landing: "",
    filterBackLevel2Landing: "",
  },
  dataManufacturers: [],
  manufacturersFilter: {},
  dataSupplierProfile: [],
  dataSupplierProduct: [],
  backSupplierFilter: {
    backSupplier1: [],
    id: "",
    supplyType: 0,
  },
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setTimerSide: (state, action) => {
      state.timerSideBar = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setNumberPhone: (state, action) => {
      state.numberPhone = action.payload;
    },
    setAuth: (state, action) => {
      state.auth = action.payload;
    },
    setChabk: (state, action) => {
      state.chabk = action.payload;
    },
    setDataBuy: (state, action) => {
      state.dataBuy = action.payload;
    },
    setProductFilter: (state, action) => {
      state.productFilter = {
        ...state.productFilter,
        ...action.payload,
      };
    },
    setDataManufacturers: (state, action) => {
      state.dataManufacturers = action.payload;
    },
    setManufacturersFilter: (state, action) => {
      state.manufacturersFilter = {
        ...state.manufacturersFilter,
        ...action.payload,
      };
    },
    setDataSupplierProfile: (state, action) => {
      state.dataSupplierProfile = action.payload;
    },
    setDataSupplierProduct: (state, action) => {
      state.dataSupplierProduct = action.payload;
    },
    setBackSupplierFilter: (state, action) => {
      state.backSupplierFilter = {
        ...state.backSupplierFilter,
        ...action.payload,
      };
    },
  },
});

export const {
  setTimerSide,
  setToken,
  setNumberPhone,
  setAuth,
  setChabk,
  setDataBuy,
  setProductFilter,
  setDataManufacturers,
  setManufacturersFilter,
  setDataSupplierProfile,
  setDataSupplierProduct,
  setBackSupplierFilter,
} = productSlice.actions;

export const store = configureStore({
  reducer: {
    product: productSlice.reducer,
  },
});
