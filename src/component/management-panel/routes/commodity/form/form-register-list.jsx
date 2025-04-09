import { Controller, useForm } from "react-hook-form";

import { useMutation } from "@tanstack/react-query";
import {
  React,
  useEffect,
  useState,
  InputNumber,
  useSelector,
  GetCookie,
  InputSelect,
  sendRegisterCreateGoodCode,
  CheckBoxAccordion2,
  Price,
} from "@/component/management-panel/import-management.js";

const FormRegisterList = ({
  setLoad3,
  setCheck,
  setMessage,
  setUpdateTable,
  updateTable,
  setCheckData,
  dataEditCheck,
  status,
  // setMessageData
  options,
}) => {
  const token = useSelector((state) => state.product.token);
  const chabk = useSelector((state) => state.product.chabk);

  const [roleCookie, setRoleCookie] = useState(GetCookie("role"));

  const [goodId, setGoodId] = useState("");
  const [supplierCode, setSupplierCode] = useState("");
  const [price, setPrice] = useState("");
  const [inStock, setInStock] = useState(true);
  const [inStockCount, setInStockCount] = useState("");
  //   ********
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
      goodId,
      supplierCode,
      price,
      inStockCount,
    },
  });

  useEffect(() => {
    reset({
      goodId,
      supplierCode,
      price,
      inStockCount,
    });
  }, [goodId, supplierCode, price, inStockCount, reset]);

  const mutation = useMutation({
    mutationFn: sendRegisterCreateGoodCode,
    onMutate: () => {
      setLoad3(true);
    },
    onSuccess: (result) => {
      setMessage(result.error ? result.error : result.message);
      if (result.isSuccess) {
        setTimeout(() => {
          setUpdateTable(!updateTable);
        }, 1500);
        setCheck((prev) => ({ ...prev, check1: true }));
        setGoodId("");
        setPrice("");
        setInStock(true);
        setInStockCount("");
        setSupplierCode("");
        setLoad3(false);
        setTimeout(() => {
          setMessage("");
          setCheck((prev) => ({ ...prev, check2: false }));
          setCheck((prev) => ({ ...prev, check1: false }));
        }, 5000);
      } else {
        setCheck((prev) => ({ ...prev, check1: true }));
        setLoad3(false);
        setTimeout(() => {
          setMessage("");
          setCheck((prev) => ({ ...prev, check2: false }));
          setCheck((prev) => ({ ...prev, check1: false }));
        }, 5000);
      }
    },
    onError: (error) => {
      setLoad3(false);
      setMessage(error.message || "عملیات با خطا مواجه شد");
      setCheck((prev) => ({ ...prev, check4: true }));
      setTimeout(() => {
        setMessage("");
        setCheck((prev) => ({ ...prev, check4: false }));
      }, 5000);
    },
    onSettled: () => {
      setLoad3(false);
    },
  });

  const onSubmit = async (dataAll) => {
    setCheck((prev) => ({
      ...prev,
      check1: false,
      check2: false,
      check3: false,
      check4: false,
    }));

    const updatedDataAll = {
      data: {
        goodId: dataAll?.goodId,
        supplierCode: dataAll?.supplierCode,
        price: dataAll?.price,
        inStock: inStock,
        inStockCount: dataAll?.inStockCount,
      },
      token,
      chabk,
      setCheckData,
      setMessage,
    };

    mutation.mutate({ updatedDataAll });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-wrap gap-4"
    >
      <article className="w-full px-4 py-2 flex gap-4 rounded-2xl shadow-custom-6 justify-around flex-wrap boxFilter ">
        <div className="w-full flex justify-center">
          <div className="w-[100%] lg:w-[45%] flex flex-wrap gap-1 items-center">
            <p className="w-full">* کالا های ثبت شده :</p>
            <Controller
              name="goodId"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "انتخاب کالا الزامی است",
                },
              }}
              render={({ field }) => (
                <InputSelect
                  options={options}
                  data={goodId}
                  setData={(selected) => {
                    setGoodId(selected);
                    field.onChange(selected);
                  }}
                />
              )}
            />
            {errors.goodId && (
              <p style={{ color: "red" }}>{errors.goodId.message}</p>
            )}
          </div>
        </div>
        <div className="w-full flex flex-wrap justify-between">
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
                    inStock == true ? "لطفا تعداد موجودی را وارد کنید ..." : ""
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
      </article>
      <div className="w-full h-[100px] items-center flex justify-center">
        <button
          type="submit"
          className={
            " w-[25%] h-[40px] bg-custom-green shadow-custom-6 px-2 hover:scale-95  transition-all duration-300 text-white rounded-2xl text-[1.1rem] flex justify-center items-center"
          }
        >
          ثبت
        </button>
      </div>
    </form>
  );
};

export default FormRegisterList;
