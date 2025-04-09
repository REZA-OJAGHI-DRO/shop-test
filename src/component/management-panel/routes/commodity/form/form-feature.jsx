import { Controller, useForm } from "react-hook-form";

import {
  React,
  useEffect,
  useState,
  InputNumber,
  CheckBoxAccordion2,
  Price,
} from "@/component/management-panel/import-management.js";

const FormFeature = ({
  dataFeature,
  setDataFeature,
  setGoodCodes
}) => {

  const [extendedPropertyTitle, setExtendedPropertyTitle] = useState("");
  const [supplierCode, setSupplierCode] = useState("");
  const [countInBox, setCountInBox] = useState("");
  const [price, setPrice] = useState("");
  const [inStock, setInStock] = useState(true);
  const [inStockCount, setInStockCount] = useState("");
  //   ********

  //   ********
  // ********
  const [activeCheckbox1, setActiveCheckbox1] = useState(0);
  const [checked1, setChecked1] = useState(false);
  const [styleError1, setStyleError1] = useState(false);
  const [data1, setData1] = useState("");
  const handleCheck1 = (index) => {
    if (status == 1) {
      return;
    } else {
      if (index !== activeCheckbox1) {
        setActiveCheckbox1(index);
        setChecked1(true);
        setStyleError1(false);
        setData1(index === 0 ? 1 : 2);
      }
      if (index == 0) {
        setInStock(true);
      } else if (index == 1) {
        setInStock(false);
      }
    }
  };

  //   **********
  const {
    control,
    // register, // برای ثبت کردن فیلدها
    handleSubmit, // برای هندل کردن سابمیت فرم
    formState: { errors }, // برای مدیریت خطاها
    reset,
  } = useForm({
    defaultValues: {
        extendedPropertyTitle,
        supplierCode,
        countInBox,
        price,
        inStockCount,
    },
  });

  useEffect(() => {
    reset({
        extendedPropertyTitle,
        supplierCode,
        countInBox,
        price,
        inStockCount,
    });
  }, [
      extendedPropertyTitle,
      supplierCode,
      countInBox,
      price,
      inStockCount,
      reset,
  ]);

  const onSubmit = async (dataAll) => {
    const updatedData = {
      ...dataAll,
      inStock,
    };
    setDataFeature((r) => [...r, updatedData]);
    setGoodCodes(false)
  };
  
  return (
    <form
    //   onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-wrap gap-4"
    >
          <div className="w-full flex flex-wrap items-start justify-center gap-4">
            <div className="w-[100%] lg:w-[45%] xl:w-[23%]">
              <Controller
                name="extendedPropertyTitle"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "وارد کردن نام ویژگی الزامی است",
                  },
                }}
                render={({ field }) => (
                  <InputNumber
                    {...field}
                    type="text"
                    placeholder={"لطفا نام ویژگی را وارد کنید ..."}
                    label={"* نام ویژگی :"}
                    svg={false}
                    width={"w-[100%]"}
                    value={extendedPropertyTitle}
                    onChange={(e) => {
                      let value = e.target.value;
                      setExtendedPropertyTitle(value);
                      field.onChange(value);
                    }}
                    styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
                    styleInput={"text-[1rem] xl:text-[1rem] h-[35px]"}
                    styleBox={"bg-[#ffffff]"}
                    disabled={false}
                  />
                )}
              />
              {errors.extendedPropertyTitle && (
                <p style={{ color: "red" }}>
                  {errors.extendedPropertyTitle.message}
                </p>
              )}
            </div>
            <div className="w-[100%] lg:w-[45%] xl:w-[23%]">
              <Controller
                name="supplierCode"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "وارد کردن شناسه کد کالا تامین کننده الزامی است",
                  },
                }}
                render={({ field }) => (
                  <InputNumber
                    {...field}
                    type="text"
                    placeholder={
                      "لطفا شناسه کد کالا تامین کننده را وارد کنید ..."
                    }
                    label={"* شناسه کد کالا تامین کننده :"}
                    svg={false}
                    width={"w-[100%]"}
                    value={supplierCode}
                    onChange={(e) => {
                      let value = e.target.value;
                        setSupplierCode(value);
                        field.onChange(value);
                    }}
                    styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
                    styleInput={"text-[1rem] xl:text-[1rem] h-[35px]"}
                    styleBox={"bg-[#ffffff]"}
                    disabled={false}
                  />
                )}
              />
              {errors.supplierCode && (
                <p style={{ color: "red" }}>{errors.supplierCode.message}</p>
              )}
            </div>
            <div className="w-[100%] lg:w-[45%] xl:w-[23%]">
              <Controller
                name="countInBox"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "وارد کردن تعداد در کارتن یا عدل الزامی است",
                  },
                }}
                render={({ field }) => (
                  <InputNumber
                    {...field}
                    type="number"
                    placeholder={"لطفا تعداد در کارتن یا عدل را وارد کنید ..."}
                    label={"* تعداد در کارتن یا عدل :"}
                    svg={false}
                    width={"w-[100%]"}
                    value={countInBox}
                    onChange={(e) => {
                      let value = e.target.value;
                      const regex = /^[0-9\u0660-\u0669\u06F0-\u06F9]*$/;
                      if (regex.test(value)) {
                        setCountInBox(value);
                        field.onChange(value);
                      }
                    }}
                    styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
                    styleInput={"text-[1rem] xl:text-[1rem] h-[35px]"}
                    styleBox={"bg-[#ffffff]"}
                    disabled={false}
                  />
                )}
              />
              {errors.countInBox && (
                <p style={{ color: "red" }}>{errors.countInBox.message}</p>
              )}
            </div>
            <div className="w-[100%] lg:w-[45%] xl:w-[23%] flex flex-wrap">
              <Controller
                name="price"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "وارد کردن قیمت اصلی بدون تخفیف الزامی است",
                  },
                }}
                render={({ field }) => (
                  <Price
                    {...field}
                    placeholder={"لطفا مبلغ را وارد کنید ..."}
                    label={"قیمت اصلی بدون تخفیف :"}
                    svg={false}
                    width={"w-[100%]"}
                    max={""}
                    data={price}
                    setData={(value) => {
                      setPrice(value);
                      if (/^[0-9]*$/.test(value)) {
                        field.onChange(value);
                      }
                    }}
                    styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
                    styleInput={"text-[1rem] xl:text-[1rem] h-[35px]"}
                    styleBox={"bg-[#ffffff]"}
                    disabled={false}
                  />
                )}
              />

              {/* نمایش پیام خطا */}
              {errors.price && (
                <p style={{ color: "red" }}>{errors.price.message}</p>
              )}
            </div>
            <div className="w-[100%] lg:w-[45%]  xl:w-[30%] flex justify-around flex-wrap">
              <p className="w-[100%] flex justify-start px-3 text-black text-[1rem] lg:text-[1rem] mb-2">
                موجودی کالا :
              </p>
              <div className="w-[40%]">
                <CheckBoxAccordion2
                  label={"موجود"}
                  isChecked={activeCheckbox1 === 0}
                  onCheck={() => handleCheck1(0)}
                />
              </div>
              <div className="w-[40%]">
                <CheckBoxAccordion2
                  label={"ناموجود"}
                  isChecked={activeCheckbox1 === 1}
                  onCheck={() => handleCheck1(1)}
                />
              </div>
            </div>
            <div className="w-[100%] lg:w-[45%] xl:w-[23%]">
              <Controller
                name="inStockCount"
                control={control}
                rules={{
                  required: {
                    value: inStock,
                    message: "وارد کردن تعداد موجودی الزامی است",
                  },
                }}
                render={({ field }) => (
                  <InputNumber
                    {...field}
                    type="number"
                    placeholder={
                      inStock == true
                        ? "لطفا تعداد موجودی را وارد کنید ..."
                        : ""
                    }
                    label={"* تعداد موجودی :"}
                    svg={false}
                    width={"w-[100%]"}
                    value={inStock == true ? inStockCount : ""}
                    onChange={(e) => {
                      let value = e.target.value;
                      const regex = /^[0-9\u0660-\u0669\u06F0-\u06F9]*$/;
                      if (regex.test(value)) {
                        setInStockCount(value);
                        field.onChange(value);
                      }
                    }}
                    styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
                    styleInput={
                      inStock == true
                        ? "text-[1rem] xl:text-[1rem] h-[35px]"
                        : "text-[1rem] xl:text-[1rem] h-[35px] cursor-no-drop"
                    }
                    styleBox={
                      inStock == true ? "bg-[#ffffff]" : "bg-[rgba(0,0,0,.1)]"
                    }
                    disabled={inStock == true ? false : true}
                  />
                )}
              />
              {errors.inStockCount && (
                <p style={{ color: "red" }}>{errors.inStockCount.message}</p>
              )}
            </div>
          </div>
      {/* دکمه ارسال */}

      <div className="w-full h-[100px] items-center flex justify-center">
        <button
          type="button"
          onClick={handleSubmit(onSubmit)} 
          className={
            " w-[25%] h-[40px] bg-custom-green shadow-custom-6 px-2 hover:scale-95  transition-all duration-300 text-white rounded-2xl text-[1.1rem] flex justify-center items-center"
          }
        >
          ثبت ویژگی
        </button>
      </div>
    </form>
  );
};

export default FormFeature;
