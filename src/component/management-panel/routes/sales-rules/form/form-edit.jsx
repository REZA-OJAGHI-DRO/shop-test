import { Controller, useForm } from "react-hook-form";

import { useMutation } from "@tanstack/react-query";
import {
  React,
  useEffect,
  useState,
  useCallback,
  InputNumber,
  useSelector,
  GetCookie,
  InputSelect,
  areArraysEqual,
  TransferList,
  InputTextArea,
  CheckBoxAccordion2,
  GoodDiscountGet,
  GetAllForSupplier,
  GoodDiscountUpdate,
} from "@/component/management-panel/import-management.js";

const FormEdit = ({
  id,
  setLoad4,
  setCheck,
  setMessage,
  setUpdateTable,
  updateTable,
  isLoading,
  setShowEditModal
}) => {

  const token = useSelector((state) => state.product.token);
  const chabk = useSelector((state) => state.product.chabk);

  const [checkData, setCheckData] = useState(false);
  const [messageData, setMessageData] = useState([]);
  const [checkDataAll, setCheckDataAll] = useState({
    check1: false,
  });
  const [data, setData] = useState([]);
  const [loading3, setLoading3] = useState(true)
  const MethodGet = useCallback(() => {
    setLoading3(true); 
    GoodDiscountGet({
      id,
      token,
      chabk,
      setData,
      setCheckDataAll,
      setCheckData,
      setMessageData,
    }).finally(() => setLoading3(false)); 
  }, [id, token, chabk]);

  useEffect(() => {
    MethodGet();
  }, [MethodGet]);
// *********

  const [options2, setOptions2] = useState([{ key: "", value: "" }]);
  const [options3, setOptions3] = useState([
    { key: "0", value: "کارتونی" },
    { key: "1", value: "زیر کارتونی" },
    { key: "2", value: "هر دو" },
  ]);
  const [options4, setOptions4] = useState([
    { key: "0", value: "نقدی" },
    { key: "1", value: "مدت دار" },
  ]);

    // ********GoodGetAll
  
    const [isLoading2, setIsLoading2] = useState(false); 
  
    const GoodGet = useCallback(() => {
        setIsLoading2(true); 
        GetAllForSupplier(token, chabk, setMessageData, setCheckData, setOptions2, setIsLoading2);
    }, [token, chabk]);
    
    useEffect(() => {
        GoodGet();
    }, [GoodGet]);

    // *********

  const [roleCookie, setRoleCookie] = useState(GetCookie("role"));

  const [name, setName] = useState("");
  const [shopperRankLimit, setShopperRankLimit] = useState('');
  const [saleType, setSaleType] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const [paymentDurationDays, setPaymentDurationDays] = useState('');
  const [amountMinLimit, setAmountMinLimit] = useState('');
  const [amountMaxLimit, setAmountMaxLimit] = useState('');
  const [costMinLimit, setCostMinLimit] = useState('');
  const [goodIds, setGoodIds] = useState([]);
  const [conditionDescription, setConditionDescription] = useState("");
  const [invoiceDiscountPercent, setInvoiceDiscountPercent] = useState("");
  const [goodDiscountPercent, setGoodDiscountPercent] = useState("");
  const [giftItem, setGiftItem] = useState("");
  const [resetTransferList, setResetTransferList] = useState(null);
  //   **********
  const [activeCheckbox1, setActiveCheckbox1] = useState(0);
  const [data1, setData1] = useState("");
  const [d1, setD1] = useState(false);
  const [d2, setD2] = useState(true);
  const [d3, setD3] = useState(true);
  const [checked1, setChecked1] = useState(false);
  const handleCheck1 = (index) => {
    if (index !== activeCheckbox1) {
      setActiveCheckbox1(index);
      setChecked1(true);
      setData1(index === 0 ? 1 : 2);
    }
    if (index == 0) {
      setD1(false);
      setD2(true);
      setD3(true);
      setGiftItem("");
      setGoodDiscountPercent("");
    } else if (index == 1) {
      setD1(true);
      setD2(false);
      setD3(true);
      setGiftItem("");
      setInvoiceDiscountPercent("");
    } else {
      setD1(true);
      setD2(true);
      setD3(false);
      setGoodDiscountPercent("");
      setInvoiceDiscountPercent("");
    }
  };
  //   **********

    useEffect(() => {
     setName(data?.name)
     setShopperRankLimit(data?.shopperRankLimit)
     setSaleType(String(data?.saleType))
     setPaymentType(String(data?.paymentType))
     setPaymentDurationDays(data?.paymentDurationDays)
     setAmountMinLimit(data?.amountMinLimit)
     setAmountMaxLimit(data?.amountMaxLimit)
     setCostMinLimit(data?.costMinLimit)
     setGoodIds(data?.goods?.map(item => item.key))
     setConditionDescription(data?.conditionDescription)
     setInvoiceDiscountPercent(data?.invoiceDiscountPercent)
     setGoodDiscountPercent(data?.goodDiscountPercent)
     setGiftItem(data?.giftItem)
    }, [data]);
   
    
    // ********
  const {
    control,
    // register, // برای ثبت کردن فیلدها
    handleSubmit, // برای هندل کردن سابمیت فرم
    formState: { errors }, // برای مدیریت خطاها
    reset,
  } = useForm({
    defaultValues: {
      name,
      shopperRankLimit,
      saleType,
      paymentType,
      paymentDurationDays,
      amountMinLimit,
      amountMaxLimit,
      costMinLimit,
      goodIds,
      conditionDescription,
      invoiceDiscountPercent,
      goodDiscountPercent,
      giftItem,
    },
  });

  useEffect(() => {
    reset({
      name,
      shopperRankLimit,
      saleType,
      paymentType,
      paymentDurationDays,
      amountMinLimit,
      amountMaxLimit,
      costMinLimit,
      goodIds,
      conditionDescription,
      invoiceDiscountPercent,
      goodDiscountPercent,
      giftItem,
    });
  }, [
    name,
    shopperRankLimit,
    saleType,
    paymentType,
    paymentDurationDays,
    amountMinLimit,
    amountMaxLimit,
    costMinLimit,
    goodIds,
    conditionDescription,
    invoiceDiscountPercent,
    goodDiscountPercent,
    giftItem,
    reset,
  ]);

  const mutation = useMutation({
    mutationFn: GoodDiscountUpdate,
    onMutate: () => {
      setLoad4(true);
    },
    onSuccess: (result) => {
      setMessage(result.error ? result.error : result.message);
      if (result.isSuccess) {
        setTimeout(() => {
          setUpdateTable(!updateTable);
        }, 1500);
        setCheck((prev) => ({ ...prev, check1: true }));
        setName("");
        setConditionDescription("");
        setGoodIds([]);
        setSaleType("");
        setPaymentType("");
        setPaymentDurationDays("");
        setAmountMaxLimit("");
        setAmountMinLimit("");
        setCostMinLimit("");
        setShopperRankLimit("");
        setInvoiceDiscountPercent("");
        setGoodDiscountPercent("");
        setShowEditModal(false)
        if (resetTransferList) {
          resetTransferList();
        }
        setGiftItem("");
        setLoad4(false);
        setTimeout(() => {
          setMessage("");
          setCheck((prev) => ({ ...prev, check2: false }));
          setCheck((prev) => ({ ...prev, check1: false }));
        }, 5000);
      } else {
        setCheck((prev) => ({ ...prev, check1: true }));
        setLoad4(false);
        setTimeout(() => {
          setMessage("");
          setCheck((prev) => ({ ...prev, check2: false }));
          setCheck((prev) => ({ ...prev, check1: false }));
        }, 5000);
      }
    },
    onError: (error) => {
      setLoad4(false);
      setMessage(error.message || "عملیات با خطا مواجه شد");
      setCheck((prev) => ({ ...prev, check4: true }));
      setTimeout(() => {
        setMessage("");
        setCheck((prev) => ({ ...prev, check4: false }));
      }, 5000);
    },
    onSettled: () => {
      setLoad4(false);
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


       let hasChanged =
            data?.name !== dataAll?.name ||
            data?.conditionDescription !== dataAll?.conditionDescription ||
            !areArraysEqual(data?.goods?.map(item => item.key), goodIds) ||
            data?.saleType !== Number(dataAll?.saleType) ||
            data?.paymentType !== Number(dataAll?.paymentType) ||
            data?.paymentDurationDays !== dataAll?.paymentDurationDays ||
            data?.amountMaxLimit !== dataAll?.amountMaxLimit ||
            data?.amountMinLimit !== dataAll?.amountMinLimit ||
            data?.costMinLimit !== dataAll?.costMinLimit ||
            data?.shopperRankLimit !== dataAll?.shopperRankLimit ||
            data?.invoiceDiscountPercent !== dataAll?.invoiceDiscountPercent ||
            data?.goodDiscountPercent !== dataAll?.goodDiscountPercent ||
            data?.giftItem !== dataAll?.giftItem ;

            if (hasChanged) {
                
                
    
            const updatedDataAll = {
              data: {
                goodDiscountId:id,
                name: data?.name == dataAll?.name ? null : dataAll?.name,
                conditionDescription: data?.conditionDescription == dataAll?.conditionDescription ? null : dataAll?.conditionDescription,
                goodsEdited:!areArraysEqual(data?.goods?.map(item => item.key), goodIds),
                goodIds: dataAll?.goodIds,
                saleType: data?.saleType == Number(dataAll?.saleType) ? null : dataAll?.saleType,
                paymentType: data?.paymentType == Number(dataAll?.paymentType) ? null : dataAll?.paymentType,
                paymentDurationDays: data?.paymentDurationDays == dataAll?.paymentDurationDays ? null : Number(dataAll?.paymentDurationDays) ,
                amountMaxLimit: data?.amountMaxLimit == dataAll?.amountMaxLimit ? null : Number(dataAll?.amountMaxLimit) ,
                amountMinLimit: data?.amountMinLimit == dataAll?.amountMinLimit ? null : Number(dataAll?.amountMinLimit) ,
                costMinLimit: data?.costMinLimit == dataAll?.costMinLimit ? null : Number(dataAll?.costMinLimit) ,
                shopperRankLimit: data?.shopperRankLimit == dataAll?.shopperRankLimit ? null : Number(dataAll?.shopperRankLimit) ,
                invoiceDiscountPercent: data?.invoiceDiscountPercent == dataAll?.invoiceDiscountPercent ? null : Number(dataAll?.invoiceDiscountPercent) ,
                goodDiscountPercent: data?.goodDiscountPercent == dataAll?.goodDiscountPercent ? null : Number(dataAll?.goodDiscountPercent) ,
                giftItem: data?.giftItem == dataAll?.giftItem ? null : dataAll?.giftItem,
              },
              token,
              chabk,
              setCheckData,
              setMessage,
            };
        
            mutation.mutate({ updatedDataAll });
          
          } else {
            setCheck((r) => ({ ...r, check3: true }));
            setMessage("هیچ تغییری صورت نگرفته");
            setTimeout(() => {
              setCheck((r) => ({ ...r, check3: false }));
              setMessage("");
            }, 5000);
          }
        }


  return (
    <>
      {loading3 ? (
      <p className="w-[80vw] text-center">در حال دریافت اطلاعات...</p>
    ) : (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[80vw] flex flex-wrap gap-4"
    >
      <article className="w-full px-4 py-2 flex gap-4 rounded-2xl shadow-custom-6 justify-around flex-wrap boxFilter ">
        <div className="w-full flex flex-wrap justify-between items-start">
          <div className="w-[100%] lg:w-[45%] xl:w-[23%]">
            <Controller
              name="name"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "وارد کردن نام قانون فروش الزامی است",
                },
              }}
              render={({ field }) => (
                <InputNumber
                  {...field}
                  type="text"
                  placeholder={"لطفا نام قانون فروش را وارد کنید ..."}
                  label={"* نام قانون فروش :"}
                  svg={false}
                  width={"w-[100%]"}
                  value={name}
                  onChange={(e) => {
                    let value = e.target.value;
                    setName(value);
                    field.onChange(value);
                  }}
                  styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
                  styleInput={"text-[1rem] xl:text-[1rem] h-[35px]"}
                  styleBox={"bg-[#ffffff]"}
                  disabled={false}
                />
              )}
            />
            {errors.name && (
              <p style={{ color: "red" }}>{errors.name.message}</p>
            )}
          </div>
          <div className="w-[100%] lg:w-[45%] xl:w-[23%]">
            <Controller
              name="shopperRankLimit"
              control={control}
              rules={{}}
              render={({ field }) => (
                <InputNumber
                  {...field}
                  type="number"
                  placeholder={"رتبه اعتباری خریدار را وارد کنید"}
                  label={"* رتبه اعتباری خریدار :"}
                  svg={false}
                  width={"w-[100%]"}
                  value={shopperRankLimit}
                  onChange={(e) => {
                    let value = e.target.value.trim();
                    const regex = /^[0-9\u0660-\u0669\u06F0-\u06F9]*$/;
                    if (regex.test(value)) {
                      setShopperRankLimit(value);
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
            {errors.shopperRankLimit && (
              <p style={{ color: "red" }}>{errors.shopperRankLimit.message}</p>
            )}
          </div>
          <div className="w-[100%] lg:w-[45%] xl:w-[23%] flex flex-wrap gap-1 items-center">
            <p className="w-full"> نوع فروش :</p>
            <Controller
              name="saleType"
              control={control}
              rules={{}}
              render={({ field }) => (
                <InputSelect
                  options={options3}
                  data={saleType}
                  setData={(selected) => {
                    setSaleType(selected);
                    field.onChange(selected);
                  }}
                />
              )}
            />
            {errors.saleType && (
              <p style={{ color: "red" }}>{errors.saleType.message}</p>
            )}
          </div>
          <div className="w-[100%] lg:w-[45%] xl:w-[23%] flex flex-wrap gap-1 items-end justify-between">
            <div className="w-[50%] flex flex-wrap gap-1 items-center">
              <p className="w-full"> نوع پرداخت :</p>
              <Controller
                name="paymentType"
                control={control}
                rules={{}}
                render={({ field }) => (
                  <InputSelect
                    options={options4}
                    data={paymentType}
                    setData={(selected) => {
                      setPaymentType(selected);
                      field.onChange(selected);
                    }}
                  />
                )}
              />
              {errors.paymentType && (
                <p style={{ color: "red" }}>{errors.paymentType.message}</p>
              )}
            </div>
            <div className="w-[45%] flex items-end">
              <div className="w-[70%]">
                <Controller
                  name="paymentDurationDays"
                  control={control}
                  rules={{}}
                  render={({ field }) => (
                    <InputNumber
                      {...field}
                      type="number"
                      placeholder={""}
                      label={""}
                      svg={false}
                      width={"w-[100%]"}
                      value={paymentDurationDays}
                      onChange={(e) => {
                        let value = e.target.value;
                        const regex = /^[0-9\u0660-\u0669\u06F0-\u06F9]*$/;
                        if (regex.test(value)) {
                          setPaymentDurationDays(value);
                          field.onChange(value);
                        }
                      }}
                      styleLabel={
                        "text-[1rem] xl:text-[1rem] text-black hidden"
                      }
                      styleInput={"text-[1rem] xl:text-[1rem] h-[35px]"}
                      styleBox={"bg-[#ffffff]"}
                      disabled={paymentType == 1 ? false : true}
                    />
                  )}
                />
                {errors.paymentDurationDays && (
                  <p style={{ color: "red" }}>
                    {errors.paymentDurationDays.message}
                  </p>
                )}
              </div>
              <p className="w-[30%] h-[35px] text-end text-[1.1rem]">روز</p>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-wrap justify-between items-start gap-2">
          <div className="w-[100%] xl:w-[70%]  flex flex-wrap ">
            <div className="w-full p-2 bg-[rgba(255,255,255,0.5)] rounded-2xl flex flex-wrap justify-between gap-2">
              <div className="w-[100%] lg:w-[48%] flex flex-wrap">
                <p className="w-full text-[1.1rem]">محدودیت مقداری :</p>
                <div className="w-full flex items-center">
                  <div className="w-[80%] flex flex-wrap gap-1">
                    <p className="w-[48%]  rounded-xl bg-[#ffffff] shadow-custom-6 flex gap-2 justify-between px-3 items-center">
                      بزرگتر از
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="16"
                        viewBox="0 0 15 16"
                        fill="none"
                      >
                        <rect
                          x="0.0361328"
                          y="0.785645"
                          width="14.9642"
                          height="15"
                          rx="7.4821"
                          fill="#969696"
                        />
                        <g clipPath="url(#clip0_2001_489)">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.13702 10.8727L4.11371 7.72989L4.86941 6.94434L7.51487 9.69434L10.1603 6.94434L10.916 7.72989L7.89271 10.8727C7.79249 10.9768 7.65658 11.0353 7.51487 11.0353C7.37315 11.0353 7.23724 10.9768 7.13702 10.8727Z"
                            fill="#E4E4E4"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_2001_489">
                            <rect
                              width="6.66667"
                              height="12.8265"
                              fill="white"
                              transform="translate(13.9307 5.22998) rotate(90)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </p>
                    <div className="w-[48%]">
                      <Controller
                        name="amountMinLimit"
                        control={control}
                        rules={{}}
                        render={({ field }) => (
                          <InputNumber
                            {...field}
                            type="number"
                            placeholder={""}
                            label={""}
                            svg={false}
                            width={"w-[100%]"}
                            value={amountMinLimit}
                            onChange={(e) => {
                              let value = e.target.value;
                              const regex =
                                /^[0-9\u0660-\u0669\u06F0-\u06F9]*$/;
                              if (regex.test(value)) {
                                setAmountMinLimit(value);
                                field.onChange(value);
                              }
                            }}
                            styleLabel={
                              "text-[1rem] xl:text-[1rem] text-black hidden"
                            }
                            styleInput={"text-[1rem] xl:text-[1rem] h-[35px]"}
                            styleBox={"bg-[#ffffff]"}
                            disabled={false}
                          />
                        )}
                      />
                      {errors.amountMinLimit && (
                        <p style={{ color: "red" }}>
                          {errors.amountMinLimit.message}
                        </p>
                      )}
                    </div>
                    <p className="w-[48%]  rounded-xl bg-[#ffffff] shadow-custom-6 flex gap-2 justify-between px-3 items-center">
                      کوچکتر از
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="16"
                        viewBox="0 0 15 16"
                        fill="none"
                      >
                        <rect
                          x="0.0361328"
                          y="0.785645"
                          width="14.9642"
                          height="15"
                          rx="7.4821"
                          fill="#969696"
                        />
                        <g clipPath="url(#clip0_2001_489)">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.13702 10.8727L4.11371 7.72989L4.86941 6.94434L7.51487 9.69434L10.1603 6.94434L10.916 7.72989L7.89271 10.8727C7.79249 10.9768 7.65658 11.0353 7.51487 11.0353C7.37315 11.0353 7.23724 10.9768 7.13702 10.8727Z"
                            fill="#E4E4E4"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_2001_489">
                            <rect
                              width="6.66667"
                              height="12.8265"
                              fill="white"
                              transform="translate(13.9307 5.22998) rotate(90)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </p>
                    <div className="w-[48%]">
                      <Controller
                        name="amountMaxLimit"
                        control={control}
                        rules={{}}
                        render={({ field }) => (
                          <InputNumber
                            {...field}
                            type="number"
                            placeholder={""}
                            label={""}
                            svg={false}
                            width={"w-[100%]"}
                            value={amountMaxLimit}
                            onChange={(e) => {
                              let value = e.target.value;
                              const regex =
                                /^[0-9\u0660-\u0669\u06F0-\u06F9]*$/;
                              if (regex.test(value)) {
                                setAmountMaxLimit(value);
                                field.onChange(value);
                              }
                            }}
                            styleLabel={
                              "text-[1rem] xl:text-[1rem] text-black hidden"
                            }
                            styleInput={"text-[1rem] xl:text-[1rem] h-[35px]"}
                            styleBox={"bg-[#ffffff]"}
                            disabled={false}
                          />
                        )}
                      />
                      {errors.amountMaxLimit && (
                        <p style={{ color: "red" }}>
                          {errors.amountMaxLimit.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="w-[20%] h-[40px] flex items-center">
                    <svg
                      className="cursor-pointer"
                      xmlns="http://www.w3.org/2000/svg"
                      width="70%"
                      height="70%"
                      viewBox="0 0 33 33"
                      fill="none"
                    >
                      <path
                        d="M4 16.7178C4 9.81421 9.59644 4.21777 16.5 4.21777C23.4036 4.21777 29 9.81421 29 16.7178C29 23.6213 23.4036 29.2178 16.5 29.2178C9.59644 29.2178 4 23.6213 4 16.7178Z"
                        fill="#969696"
                      />
                      <path d="M16 17.2178H11H16Z" fill="white" />
                      <path
                        d="M16 12.2178V17.2178M16 17.2178V22.2178M16 17.2178H21M16 17.2178H11"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="w-[100%] lg:w-[48%] flex flex-wrap">
                <p className="w-full text-[1.1rem]">محدودیت ریالی :</p>
                <div className="w-full flex gap-1">
                  <p className="w-[48%] h-[40px] rounded-full bg-[#ffffff] shadow-custom-6 flex gap-2 justify-center items-center">
                    بزرگتر از
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="16"
                      viewBox="0 0 15 16"
                      fill="none"
                    >
                      <rect
                        x="0.0361328"
                        y="0.785645"
                        width="14.9642"
                        height="15"
                        rx="7.4821"
                        fill="#969696"
                      />
                      <g clipPath="url(#clip0_2001_489)">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M7.13702 10.8727L4.11371 7.72989L4.86941 6.94434L7.51487 9.69434L10.1603 6.94434L10.916 7.72989L7.89271 10.8727C7.79249 10.9768 7.65658 11.0353 7.51487 11.0353C7.37315 11.0353 7.23724 10.9768 7.13702 10.8727Z"
                          fill="#E4E4E4"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_2001_489">
                          <rect
                            width="6.66667"
                            height="12.8265"
                            fill="white"
                            transform="translate(13.9307 5.22998) rotate(90)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </p>
                  <div className="w-[48%]">
                    <Controller
                      name="costMinLimit"
                      control={control}
                      rules={{}}
                      render={({ field }) => (
                        <InputNumber
                          {...field}
                          type="number"
                          placeholder={""}
                          label={""}
                          svg={false}
                          width={"w-[100%]"}
                          value={costMinLimit}
                          onChange={(e) => {
                            let value = e.target.value;
                            const regex = /^[0-9\u0660-\u0669\u06F0-\u06F9]*$/;
                            if (regex.test(value)) {
                              setCostMinLimit(value);
                              field.onChange(value);
                            }
                          }}
                          styleLabel={
                            "text-[1rem] xl:text-[1rem] text-black hidden"
                          }
                          styleInput={"text-[1rem] xl:text-[1rem] h-[35px]"}
                          styleBox={"bg-[#ffffff]"}
                          disabled={false}
                        />
                      )}
                    />
                    {errors.costMinLimit && (
                      <p style={{ color: "red" }}>
                        {errors.costMinLimit.message}
                      </p>
                    )}
                  </div>
                  <div className="w-[20%] h-[40px] flex items-center">
                    <svg
                      className="cursor-pointer"
                      xmlns="http://www.w3.org/2000/svg"
                      width="70%"
                      height="70%"
                      viewBox="0 0 33 33"
                      fill="none"
                    >
                      <path
                        d="M4 16.7178C4 9.81421 9.59644 4.21777 16.5 4.21777C23.4036 4.21777 29 9.81421 29 16.7178C29 23.6213 23.4036 29.2178 16.5 29.2178C9.59644 29.2178 4 23.6213 4 16.7178Z"
                        fill="#969696"
                      />
                      <path d="M16 17.2178H11H16Z" fill="white" />
                      <path
                        d="M16 12.2178V17.2178M16 17.2178V22.2178M16 17.2178H21M16 17.2178H11"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[100%]">
          <Controller
            name="goodIds"
            control={control}
            rules={{
              required: {
                value: true,
                message: "لطفاً یک گزینه انتخاب کنید",
              },
            }}
            render={({ field }) => (
              <>
                <TransferList
                  options={options2}
                  data={goodIds}
                  setData={setGoodIds}
                  onReset={setResetTransferList}
                  isLoading={isLoading2}
                />
                {errors.goodIds && (
                  <p style={{ color: "red" }}>{errors.goodIds.message}</p>
                )}
              </>
            )}
          />
        </div>

        <div className="w-full flex flex-wrap justify-between items-start">
          <div className="w-[100%] xl:w-[74%] rounded-none">
            <Controller
              name="conditionDescription"
              control={control}
              rules={{}}
              render={({ field }) => (
                <InputTextArea
                  {...field}
                  type="text"
                  label={"توضیح شرط :"}
                  width={"w-[100%] rounded-none"}
                  placeholder={"توضیحات خود را وارد کنید"}
                  styleLabel={"black"}
                  value={conditionDescription}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length <= 200) {
                      setConditionDescription(value);
                      field.onChange(e);
                    }
                  }}
                  styleTextarea={"bg-white h-[100px]"}
                  disabled={false}
                />
              )}
            />
            {errors.conditionDescription && (
              <p style={{ color: "red" }}>
                {errors.conditionDescription.message}
              </p>
            )}
          </div>
        </div>
        <div className="w-full flex flex-wrap justify-between items-start">
          <p className="w-full">
            نتیجه{" "}
            <span className="text-red-600 ">
              *در این بخش فقط می توان یکی را انتخاب کرد*
            </span>
          </p>
          <div className="w-full flex">
            <div className="w-[100%] bg-[rgba(255,255,255,0.5)] rounded-xl flex flex-wrap justify-around items-center p-2">
              <div className="w-[100%] lg:w-[45%] xl:w-[30%] flex flex-wrap justify-between">
                <div className="w-full flex flex-wrap justify-between items-end">
                  <div className="w-[10%] lg:w-[18%] h-[40px]">
                    <CheckBoxAccordion2
                      label={""}
                      isChecked={activeCheckbox1 === 0}
                      onCheck={() => handleCheck1(0)}
                    />
                  </div>
                  <div className="w-[85%] lg:w-[80%] flex items-end">
                    <div className="w-[90%]">
                      <Controller
                        name="invoiceDiscountPercent"
                        control={control}
                        rules={{
                          required: {
                            value: d1 == true ? false : true,
                            message: "وارد کردن درصد زیر فاکتور الزامی است",
                          },
                        }}
                        render={({ field }) => (
                          <InputNumber
                            {...field}
                            type="number"
                            placeholder={""}
                            label={"درصد کسر زیر فاکتور :"}
                            svg={false}
                            width={"w-[100%]"}
                            value={invoiceDiscountPercent}
                            onChange={(e) => {
                              let value = e.target.value;
                              const regex =
                                /^[0-9\u0660-\u0669\u06F0-\u06F9]*$/;
                              if (regex.test(value)) {
                                setInvoiceDiscountPercent(value);
                                field.onChange(value);
                              }
                            }}
                            styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
                            styleInput={
                              d1 == false
                                ? "text-[1rem] xl:text-[1rem] h-[35px]"
                                : "text-[1rem] xl:text-[1rem] h-[35px] cursor-no-drop"
                            }
                            styleBox={
                              d1 == false
                                ? "bg-[#ffffff]"
                                : "bg-[rgba(0,0,0,.1)]"
                            }
                            disabled={d1}
                          />
                        )}
                      />
                    </div>
                    <p className="w-[10%] h-[35px] text-end text-[1.1rem]">%</p>
                  </div>
                </div>
                <div className="w-full">
                  {errors.invoiceDiscountPercent && (
                    <p style={{ color: "red" }}>
                      {errors.invoiceDiscountPercent.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="w-[100%] lg:w-[45%] xl:w-[30%] flex flex-wrap justify-between">
                <div className="w-full flex flex-wrap justify-between items-end">
                  <div className="w-[10%] lg:w-[18%] h-[40px]">
                    <CheckBoxAccordion2
                      label={""}
                      isChecked={activeCheckbox1 === 1}
                      onCheck={() => handleCheck1(1)}
                    />
                  </div>
                  <div className="w-[85%] lg:w-[80%] flex items-end">
                    <div className="w-[90%]">
                      <Controller
                        name="goodDiscountPercent"
                        control={control}
                        rules={{
                          required: {
                            value: d2 == true ? false : true,
                            message: "وارد کردن درصد تخفیف کالایی الزامی است",
                          },
                        }}
                        render={({ field }) => (
                          <InputNumber
                            {...field}
                            type="number"
                            placeholder={""}
                            label={"درصد تخفیف کالایی :"}
                            svg={false}
                            width={"w-[100%]"}
                            value={goodDiscountPercent}
                            onChange={(e) => {
                              let value = e.target.value;
                              const regex =
                                /^[0-9\u0660-\u0669\u06F0-\u06F9]*$/;
                              if (regex.test(value)) {
                                setGoodDiscountPercent(value);
                                field.onChange(value);
                              }
                            }}
                            styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
                            styleInput={
                              d2 == false
                                ? "text-[1rem] xl:text-[1rem] h-[35px]"
                                : "text-[1rem] xl:text-[1rem] h-[35px] cursor-no-drop"
                            }
                            styleBox={
                              d2 == false
                                ? "bg-[#ffffff]"
                                : "bg-[rgba(0,0,0,.1)]"
                            }
                            disabled={d2}
                          />
                        )}
                      />
                    </div>
                    <p className="w-[10%] h-[35px] text-end text-[1.1rem]">%</p>
                  </div>
                </div>
                <div className="w-full">
                  {errors.goodDiscountPercent && (
                    <p style={{ color: "red" }}>
                      {errors.goodDiscountPercent.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="w-[100%] lg:w-[45%] xl:w-[30%] flex flex-wrap justify-between">
                <div className="w-full flex flex-wrap justify-between items-end">
                  <div className="w-[10%] lg:w-[18%] h-[40px]">
                    <CheckBoxAccordion2
                      label={""}
                      isChecked={activeCheckbox1 === 2}
                      onCheck={() => handleCheck1(2)}
                    />
                  </div>
                  <div className="w-[85%] lg:w-[80%] flex items-end">
                    <div className="w-[90%]">
                      <Controller
                        name="giftItem"
                        control={control}
                        rules={{
                          required: {
                            value: d3 == true ? false : true,
                            message: "وارد کردن کالای هدیه الزامی است",
                          },
                        }}
                        render={({ field }) => (
                          <InputNumber
                            {...field}
                            type="text"
                            placeholder={"کالای هدیه را وارد کنید"}
                            label={"کالای هدیه :"}
                            svg={false}
                            width={"w-[100%]"}
                            value={giftItem}
                            onChange={(e) => {
                              let value = e.target.value;
                              setGiftItem(value);
                              field.onChange(value);
                            }}
                            styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
                            styleInput={
                              d3 == false
                                ? "text-[1rem] xl:text-[1rem] h-[35px]"
                                : "text-[1rem] xl:text-[1rem] h-[35px] cursor-no-drop"
                            }
                            styleBox={
                              d3 == false
                                ? "bg-[#ffffff]"
                                : "bg-[rgba(0,0,0,.1)]"
                            }
                            disabled={d3}
                          />
                        )}
                      />
                    </div>
                    <p className="w-[10%] h-[35px] text-end text-[1.1rem]">%</p>
                  </div>
                </div>
                <div className="w-full">
                  {errors.giftItem && (
                    <p style={{ color: "red" }}>{errors.giftItem.message}</p>
                  )}
                </div>
              </div>
            </div>
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
    </form> )}
    </>
  );
};

export default FormEdit;
