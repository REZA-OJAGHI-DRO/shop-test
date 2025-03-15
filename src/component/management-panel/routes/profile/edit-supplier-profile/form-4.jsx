import { Controller, useForm } from "react-hook-form";
import { useMutation } from '@tanstack/react-query';
import {
  React,
  useEffect,
  useRef,
  useCallback,
  useState,
  useSelector,
  GetCookie,
  InputSelectAll,
  areArraysEqual,
  InputTextArea,
  profileSupplierUpdate,
  categoryGetAll,
  GetAllBrand,
} from "@/component/management-panel/import-management.js";

const Form4 = ({
  data,
  setLoad,
  setLoad2,
  setCheck,
  setMessage,
  setUpdateTable,
  updateTable,
  setCheckDataAll,
  setCheckData,
  setMessageData,
  setIsLoading,
}) => {
  const token = useSelector((state) => state.product.token);
  const chabk = useSelector((state) => state.product.chabk);

  const [roleCookie, setRoleCookie] = useState(GetCookie("role"));

  const [activity3, setActivity3] = useState("");

  // ********
  const [options6, setOptions6] = useState([{ key: "0", value: "" }]);
  const [categoriesEdited, setCategoriesEdited] = useState(false);
  const [categories, setCategories] = useState("");
  const GetCategory = useCallback(() => {
    setIsLoading(true);
    categoryGetAll(
      1,
      "",
      token,
      chabk,
      setCheckDataAll,
      setCheckData,
      setMessageData,
      setOptions6
    );
  }, [token, chabk]);
  const isFirstRender2 = useRef(true);
  useEffect(() => {
    if (isFirstRender2.current) {
      GetCategory();
      isFirstRender2.current = false;
    }
  }, [GetCategory]);

  useEffect(() => {
    setCategoriesEdited(
      areArraysEqual(
        data?.categories?.map((file) => file.key),
        categories
      ) == true
        ? true
        : false
    );
  }, [categories]);
  // ********
  useEffect(() => {
    if (data) {
      setCategories(data?.categories?.map((opt) => opt.key));
      setIsProducer(data?.isProducer);
      setIsImporter(data?.isImporter);
      setIsSpreader(data?.isSpreader);
    }
  }, [data]);

  //   **********
  const {
    control,
    // register, // برای ثبت کردن فیلدها
    handleSubmit, // برای هندل کردن سابمیت فرم
    formState: { errors }, // برای مدیریت خطاها
    reset,
  } = useForm({
    defaultValues: {
    //   activity3,
    //   activity,
    //   brand1,
    //   brand2,
    //   brand3,
    //   categories,
    //   produceDescriptionImport,
    //   produceDescriptionProduce,
    //   produceDescriptionSpread,
    },
  });

  useEffect(() => {
    reset({
    //   activity3,
    //   activity,
    //   brand1,
    //   brand2,
    //   brand3,
    //   categories,
    //   produceDescriptionImport,
    //   produceDescriptionProduce,
    //   produceDescriptionSpread,
    });
  }, [
    // activity3, activity, brand1, brand2, brand3, categories, produceDescriptionImport, produceDescriptionProduce, produceDescriptionSpread,
     reset]);

  //   *********
  const [options4, setOptions4] = useState([
    { key: "1", value: "تولید کننده" },
    { key: "2", value: "وارد کننده" },
    { key: "3", value: "پخش کننده" },
  ]);

  //   *********

  const [options5, setOptions5] = useState([{ key: "0", value: "شهر" }]);

  const [produceDescriptionProduce, setProduceDescriptionProduce] = useState(
    data?.produceDetails?.description || ""
  );
  const [produceDescriptionImport, setProduceDescriptionImport] = useState(
    data?.importDetails?.description || ""
  );
  const [produceDescriptionSpread, setProduceDescriptionSpread] = useState(
    data?.spreadDetails?.description || ""
  );

  const GetBrand = useCallback(() => {
    setIsLoading(true);
    GetAllBrand(token, chabk, setMessageData, setCheckData, (data) => {
      setOptions5(data);
      setCheckDataAll((r) => ({ ...r, check2: true }));
    });
  }, [token, chabk]);

  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      GetBrand();
      isFirstRender.current = false;
    }
  }, [GetBrand]);

//   *********
const result =
data?.isProducer === true ||
data?.isImporter === true ||
data?.isSpreader === true
  ? [
      data?.isProducer === true && { key: "1", value: "تولید کننده" },
      data?.isImporter === true && { key: "2", value: "وارد کننده" },
      data?.isSpreader === true && { key: "3", value: "پخش کننده" },
    ].filter(Boolean)
  : [];
const [activity, setActivity] = useState(result.map((opt) => opt.key));

const [isProducer, setIsProducer] = useState(false);
const [isImporter, setIsImporter] = useState(false);
const [isSpreader, setIsSpreader] = useState(false);

// به‌روزرسانی وضعیت‌ها با توجه به activity
useEffect(() => {
setIsProducer(activity.includes("1"));
setIsImporter(activity.includes("2"));
setIsSpreader(activity.includes("3"));
}, [activity]);

//    برند ها
const brands = data?.produceDetails?.brands || [];
const brandArray = brands
? brands.map((brand) => ({
    key: brand.id.toString(),
    value: brand.name,
  }))
: [];
const [brand1, setBrand1] = useState(brandArray.map((opt) => opt.key));
const [brand1Edited, setBrand1Edited] = useState(false);

useEffect(() => {
setBrand1Edited(
  areArraysEqual(
    data?.produceDetails?.brands?.map((file) => file.id),
    brand1
  ) == true
    ? true
    : false
);
}, [brand1]);

const brands2 = data?.importDetails?.brands || [];
const brandArray2 = brands2
? brands2.map((brand) => ({
    key: brand.id.toString(),
    value: brand.name,
  }))
: [];
const [brand2, setBrand2] = useState(brandArray2.map((opt) => opt.key));
const [brand2Edited, setBrand2Edited] = useState(false);

useEffect(() => {
setBrand2Edited(
  areArraysEqual(
    data?.importDetails?.brands?.map((file) => file.id),
    brand2
  ) == true
    ? true
    : false
);
}, [brand2]);

const brands3 = data?.spreadDetails?.brands || [];
const brandArray3 = brands3
? brands3.map((brand) => ({
    key: brand.id.toString(),
    value: brand.name,
  }))
: [];
const [brand3, setBrand3] = useState(brandArray3.map((opt) => opt.key));
const [brand3Edited, setBrand3Edited] = useState(false);

useEffect(() => {
setBrand3Edited(
  areArraysEqual(
    data?.spreadDetails?.brands?.map((file) => file.id),
    brand3
  ) == true
    ? true
    : false
);
}, [brand3]);
//   ___________
// *********
  const [dataT, setDataT] = useState(data);

  const mutation = useMutation({
    mutationFn: profileSupplierUpdate,
    onMutate: () => {
      setLoad(true);
    },
    onSuccess: (result) => {
      setLoad(false);
      if (result.isSuccess) {
        setMessage(result.error ? result.error : result.message);
        setCheck((prev) => ({ ...prev, check1: true }));
        setTimeout(()=>{
          setUpdateTable(!updateTable);
        },1500)
        setTimeout(() => {
          setMessage("");
          setCheck((prev) => ({ ...prev, check2: false, check1: false }));
        }, 5000);
      } else {
        setMessage(result.error ? result.error : result.message);
        setCheck((prev) => ({ ...prev, check1: true }));
        setTimeout(() => {
          setMessage("");
          setCheck((prev) => ({ ...prev, check2: false, check1: false }));
        }, 5000);
      }
    },
    onError: (error) => {
      setLoad(false);
      setMessage(error.message || 'عملیات با خطا مواجه شد');
      setCheck((prev) => ({ ...prev, check4: true }));
      setTimeout(() => {
        setMessage("");
        setCheck((prev) => ({ ...prev, check4: false }));
      }, 5000);
    },
    onSettled: () => {
      setLoad(false);
      setTimeout(() => {
        setMessage("");
        setCheck((prev) => ({ ...prev, check4: false, check1: false }));
      }, 5000);
    }
  });

  const onSubmit = (dataAll) => {
    let hasChanged = false;
    hasChanged =
      dataT?.importDetails?.description !== produceDescriptionImport ||
      dataT?.produceDetails?.description !== produceDescriptionProduce ||
      dataT?.spreadDetails?.description !== produceDescriptionSpread ||
      Boolean(dataT?.isImporter) !== Boolean(isImporter) ||
      Boolean(dataT?.isProducer) !== Boolean(isProducer) ||
      Boolean(dataT?.isSpreader) !== Boolean(isSpreader) ||
      categoriesEdited ||
      brand3Edited ||
      brand2Edited ||
      brand1Edited;

    if (hasChanged) {
      const updatedData = {
        id: data?.id,
        name: null,
        phone: null,
        phone2: null,
        accountantMobile: null,
        coordinatorMobile: null,
        description: null,
        cityId: null,
        address: null,
        postalCode: null,
        categoryIdsEdited: categoriesEdited,
        categoryIds: categoriesEdited ? categories : null,
        importBrandsEdited: brand2Edited,
        importBrands: isImporter ? (brand2Edited ? brand2 : null) : [],
        produceBrandsEdited: brand1Edited,
        produceBrands: isProducer ? (brand1Edited ? brand1 : null) : [],
        spreaderBrandsEdited: brand3Edited,
        spreaderBrands: isSpreader ? (brand3Edited ? brand3 : null) : [],
        isPerson: null,
        birthDate: null,
        importDescription: isImporter ? (dataT?.importDetails?.description !== produceDescriptionImport ? produceDescriptionImport : null) : '',
        produceDescription: isProducer ? (dataT?.produceDetails?.description !== produceDescriptionProduce ? produceDescriptionProduce : null) : '',
        spreaderDescription: isSpreader ? (dataT?.spreadDetails?.description !== produceDescriptionSpread ? produceDescriptionSpread : null) : '',
        hasImport: isImporter,
        hasProduce: isProducer,
        hasSpread: isSpreader,
        installments: null,
        cash: null,
        preOrder: null,
        nationalId: null,
        companyNationalId: null,
      };

      // Trigger the mutation
      mutation.mutate({
        updatedData,
        token,
        chabk
      });
    } else {
      setLoad2(false);
      setCheck((prev) => ({ ...prev, check3: true }));
      setMessage("هیچ تغییری صورت نگرفته");
      setTimeout(() => {
        setCheck((prev) => ({ ...prev, check3: false }));
        setMessage("");
      }, 5000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-wrap gap-4 justify-around"
    >
      <div className="w-[100%] md:w-[48%] xl:w-[40%]">
        <label className="w-full"> رسته کالایی :</label>
        <Controller
          name="categories"
          control={control}
          rules={{
            required: {
              value: false,
              message: "لطفاً یک گزینه انتخاب کنید",
            },
          }}
          render={({ field }) => (
            <InputSelectAll
              options={options6}
              data={categories}
              setData={(value) => {
                setCategories(value);
                field.onChange(value);
              }}
              disabled={roleCookie === "Supplier"}
            />
          )}
        />
        {/* نمایش خطای اعتبارسنجی */}
        {errors.categories && (
          <p style={{ color: "red" }}>{errors.categories.message}</p>
        )}
      </div>
      <div className="w-[100%] md:w-[48%] xl:w-[40%]">
        <label className="w-full"> نوع فعالیت :</label>
        <Controller
          name="activity"
          control={control}
          rules={{
            required: {
              value: isImporter == false && isProducer == false && isSpreader == false &&  true,
              message: "لطفاً یک گزینه انتخاب کنید",
            },
            validate: (value) => value !== "" || "این فیلد نمی‌تواند خالی باشد", 
          }}
          render={({ field }) => (
            <InputSelectAll
              options={options4}
              data={activity}
              setData={(value) => {
                setActivity(value);
                field.onChange(value);
              }}
              disabled={roleCookie === "Supplier"}
            />
          )}
        />
        {/* نمایش خطای اعتبارسنجی */}
        {errors.activity && (
          <p style={{ color: "red" }}>{errors.activity.message}</p>
        )}
      </div>
      {isProducer == true && (
        <>
          <hr className="w-full border-gray-400" />
          <div className="w-[100%]  md:w-[48%] xl:w-[30%] flex-wrap flex justify-center content-center gap-2">
            <div className="w-[100%]">
              <label className="w-full"> برند تولیدی :</label>
              <Controller
                name="brand1"
                control={control}
                rules={{
                  required: {
                    value: false,
                    message: "لطفاً یک گزینه انتخاب کنید",
                  },
                }}
                render={({ field }) => (
                  <InputSelectAll
                    options={options5}
                    data={brand1}
                    setData={(value) => {
                      setBrand1(value);
                      field.onChange(value);
                    }}
                    disabled={roleCookie === "Supplier"}
                  />
                )}
              />  
                 {errors.brand1 && (
            <p style={{ color: "red" }}>{errors.brand1.message}</p>
          )}
                </div>
              <div className="w-[100%]  ">
                <Controller
                  name="produceDescriptionProduce"
                  control={control}
                  rules={{
                    required: {
                      value: false,
                      message: "",
                    },
                  }}
                  render={({ field }) => (
                    <InputTextArea
                      {...field}
                      type="text"
                      label={"توضیحات برند تولیدی :"}
                      width={"w-[100%] h-[140px]  rounded-none"}
                      placeholder={"توضیحات خود را وارد کنید"}
                      disabled={roleCookie == "Supplier" ? false : true}
                      styleTextarea={"bg-white h-[100px]"}
                      styleLabel={"black"}
                      value={produceDescriptionProduce}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value.length <= 200) {
                          setProduceDescriptionProduce(value);
                          field.onChange(e);
                        }
                      }}
                    />
                  )}
                />
                {errors.produceDescriptionProduce && (
                  <p style={{ color: "red" }}>
                    {errors.produceDescriptionProduce.message}
                  </p>
                )}
              </div>
            </div>
      
       
        </>
      )}

      {/* ********* */}
      {isImporter == true && (
        <>
          <div className="w-[100%]  md:w-[48%] xl:w-[30%] flex-wrap flex justify-center content-center gap-2">
            <div className="w-[100%]">
              <label className="w-full"> برند وارداتی :</label>
              <Controller
                name="brand2"
                control={control}
                rules={{
                  required: {
                    value: false,
                    message: "لطفاً یک گزینه انتخاب کنید",
                  },
                }}
                render={({ field }) => (
                  <InputSelectAll
                    options={options5}
                    data={brand2}
                    setData={(value) => {
                      setBrand2(value);
                      field.onChange(value);
                    }}
                    disabled={roleCookie === "Supplier"}
                    />
                )}
                />
                {errors.brand2 && (
                  <p style={{ color: "red" }}>{errors.brand2.message}</p>
                )}
                 </div>
              <div className="w-[100%]  ">
                <Controller
                  name="produceDescriptionImport"
                  control={control}
                  rules={{
                    required: {
                      value: false,
                      message: "",
                    },
                  }}
                  render={({ field }) => (
                    <InputTextArea
                      {...field}
                      type="text"
                      label={"توضیحات برند وارداتی :"}
                      width={"w-[100%] h-[140px]  rounded-none"}
                      placeholder={"توضیحات خود را وارد کنید"}
                      disabled={roleCookie == "Supplier" ? false : true}
                      styleTextarea={"bg-white h-[100px]"}
                      styleLabel={"black"}
                      value={produceDescriptionImport}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value.length <= 200) {
                            setProduceDescriptionImport(value);
                          field.onChange(e);
                        }
                      }}
                    />
                  )}
                />
                {errors.produceDescriptionImport && (
                  <p style={{ color: "red" }}>
                    {errors.produceDescriptionImport.message}
                  </p>
                )}
             
            </div>
          </div>
        </>
      )}

  
      {/* ********* */}
      {isSpreader == true && (
        <>
          <div className="w-[100%] md:w-[48%] xl:w-[30%] flex-wrap flex justify-center content-center gap-2">
            <div className="w-[100%]">
              <label className="w-full"> برند پخشی :</label>
              <Controller
                name="brand3"
                control={control}
                rules={{
                  required: {
                    value: false,
                    message: "لطفاً یک گزینه انتخاب کنید",
                  },
                }}
                render={({ field }) => (
                  <InputSelectAll
                    options={options5}
                    data={brand3}
                    setData={(value) => {
                      setBrand3(value);
                      field.onChange(value);
                    }}
                    disabled={roleCookie === "Supplier"}
                    />
                )}
                />
                {errors.brand3 && (
                  <p style={{ color: "red" }}>{errors.brand3.message}</p>
                )}
              </div>

              <div className="w-[100%]  ">
                <Controller
                  name="produceDescriptionSpread"
                  control={control}
                  rules={{
                    required: {
                      value: false,
                      message: "",
                    },
                  }}
                  render={({ field }) => (
                    <InputTextArea
                      {...field}
                      type="text"
                      label={"توضیحات برند پخشی :"}
                      width={"w-[100%] h-[140px]  rounded-none"}
                      placeholder={"توضیحات خود را وارد کنید"}
                      disabled={roleCookie == "Supplier" ? false : true}
                      styleTextarea={"bg-white h-[100px]"}
                      styleLabel={"black"}
                      value={produceDescriptionSpread}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value.length <= 200) {
                            setProduceDescriptionSpread(value);
                          field.onChange(e);
                        }
                      }}
                    />
                  )}
                />
                {errors.produceDescriptionSpread && (
                  <p style={{ color: "red" }}>
                    {errors.produceDescriptionSpread.message}
                  </p>
                )}
              </div>
            </div>
        </>
      )}

      {/* دکمه ارسال */}
      <div className="w-full h-[100px] items-center  flex justify-center">
        <button
          type="submit"
          className={
            " w-[40%] xl:w-[20%] h-[35px] bg-custom-green shadow-custom-6 px-2 hover:scale-95  transition-all duration-300 text-white rounded-2xl text-[1.1rem] flex justify-center items-center"
          }
        >
          ثبت ویرایش
        </button>
      </div>
    </form>
  );
};

export default Form4;
