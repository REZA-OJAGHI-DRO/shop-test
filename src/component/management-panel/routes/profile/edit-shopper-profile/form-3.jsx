import { Controller, useForm } from "react-hook-form";
import { useMutation } from '@tanstack/react-query';
import {
  React,
  useEffect,
  useCallback,
  useState,
  CheckBoxAccordion2,
  useSelector,
  GetCookie,
  InputSelectAll,
  profileShopperUpdate,
  ImageUpload,
  InputTextNoValid,
  areArraysEqual,
  GetAllBrand,
  categoryGetAll,
  useRef,
} from "@/component/management-panel/import-management.js";

const Form1 = ({
  data,
  setLoad,
  setLoad2,
  setCheck,
  setMessage,
  setUpdateTable,
  updateTable,
  setImage2,
  image2,
  setDataImages2,
  dataImages2,
  setImagesEdited2,
  imagesEdited2,
  setShowDeleteModalImg2,
  setDataDeleteImg2,
  setIsLoading,
  setMessageData,
  setCheckData,
  setCheckDataAll,
}) => {
  const token = useSelector((state) => state.product.token);
  const chabk = useSelector((state) => state.product.chabk);

  const [roleCookie, setRoleCookie] = useState(GetCookie("role"));

  const [hasLicense, setHasLicense] = useState(null);
  const [licenseCode, setLicenseCode] = useState("");
  const [isRetail, setIsRetail] = useState(null);
  const [categories, setCategories] = useState();
  // ********
  const [activeCheckbox2, setActiveCheckbox2] = useState(0);
  const [checked2, setChecked2] = useState(false);
  const handleCheck2 = (index) => {
    if (index === activeCheckbox2 && checked2) {
      return;
    }
    setActiveCheckbox2(index);
    setChecked2(true);

    if (index === 0) {
      setHasLicense(true);
    } else {
      setHasLicense(false);
    }
  };

  const [activeCheckbox3, setActiveCheckbox3] = useState(0);
  const [checked3, setChecked3] = useState(false);
  const handleCheck3 = (index) => {
    if (index === activeCheckbox3 && checked3) {
      return;
    }
    setActiveCheckbox3(index);
    setChecked3(true);

    if (index === 0) {
      setIsRetail(false);
    } else {
      setIsRetail(true);
    }
  };
  // ********
  const brands = data?.brands || [];
  const brandArray = brands
    ? brands.map((brand) => ({
        key: brand.id.toString(),
        value: brand.name,
      }))
    : [];
  const [brand1, setBrand1] = useState(brandArray.map((opt) => opt.key));
  const [imagesEdited4, setImagesEdited4] = useState(false);
  const [options5, setOptions5] = useState([{ key: "0", value: "" }]);
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

  useEffect(() => {
    setImagesEdited4(
      areArraysEqual(
        data?.brands?.map((file) => file.id),
        brand1
      ) == true
        ? true
        : false
    );
  }, [brand1]);
  // *******
  const [options6, setOptions6] = useState([{ key: "0", value: "" }]);
    const [imagesEdited3, setImagesEdited3] = useState(false);
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
    setImagesEdited3(
      areArraysEqual(
        data?.categories?.map((file) => file.key),
        categories
      ) == true
        ? true
        : false
    );
  }, [categories]);
  // *******
  useEffect(() => {
    if (data) {
      setImagesEdited2(
        areArraysEqual(data?.licenseImage?.fileId, dataImages2) == true
          ? true
          : false
      );
      setDataImages2([data?.licenseImage?.fileId]);
      setImage2([data?.licenseImage?.link]);
     
      setActiveCheckbox2(data?.hasLicense == true ? 0 : 1);
      setActiveCheckbox2(data?.isRetail == true ? 0 : 1);
     
      setCategories(data?.categories?.map((opt) => opt.key));
      setLicenseCode(data?.licenseCode);
      setHasLicense(data?.hasLicense);
      setIsRetail(data?.isRetail);
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
      licenseCode,
      brand1,
      categories,
    },
  });

  useEffect(() => {
    reset({
      licenseCode,
      brand1,
      categories
    });
  }, [licenseCode, brand1, categories, reset]);

  const [dataT, setDataT] = useState(data);

  const mutation = useMutation({
    mutationFn: profileShopperUpdate,
    onMutate: () => {
      setLoad2(true);
    },
    onSuccess: (result) => {
      setLoad2(false);
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
      setLoad2(false);
      setMessage(error.message || 'عملیات با خطا مواجه شد');
      setCheck((prev) => ({ ...prev, check4: true }));
      setTimeout(() => {
        setMessage("");
        setCheck((prev) => ({ ...prev, check4: false }));
      }, 5000);
    },
    onSettled: () => {
      setLoad2(false);
      setTimeout(() => {
        setMessage("");
        setCheck((prev) => ({ ...prev, check4: false, check1: false }));
      }, 5000);
    }
  });

  const onSubmit = (dataAll) => {

   let hasChanged =
      Boolean(dataT?.hasLicense) !== Boolean(hasLicense) ||
      (dataT?.licenseCode === undefined ? (dataAll?.licenseCode === '' ? false : true) : dataT?.licenseCode !== dataAll?.licenseCode) ||
      Boolean(dataT?.isRetail) !== Boolean(isRetail) ||
      imagesEdited2 ||
      imagesEdited3 ||
      imagesEdited4;

    if (hasChanged) {
      const updatedData = {
        id: dataT?.id,
        personName: null,
        phone: null,
        nationCode: null,
        birthDate: null,
        homeCityId: null,
        homePostalCode: null,
        homeAddress: null,
        name: null,
        cityId: null,
        postalCode: null,
        address: null,
        isRent: null,
        area: null,
        hasLicense: hasLicense,
        licenseCode: dataT?.licenseCode !== dataAll?.licenseCode ? dataAll?.licenseCode : null,
        isRetail: isRetail,
        licenseImage: imagesEdited2 ? (dataImages2.length === 0 ? [] : dataImages2[0]) : null,
        docOrRentImagesEdited: false,
        docOrRentImages: null,
        categoryIdsEdited: imagesEdited3,
        categoryIds: imagesEdited3 ? categories : null,
        brandIdsEdited: imagesEdited4,
        brandIds: imagesEdited4 ? brand1 : null,
      };

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
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-wrap gap-4 justify-center"
      >
        <div className="w-[100%] lg:w-[45%]  flex flex-wrap gap-4 justify-center">
          <div className="w-[100%] xl:w-[60%] flex justify-around flex-wrap gap-1">
            <p className="w-[100%] flex justify-start px-3 text-[1rem] mb-2">
              نوع جواز کسب :
            </p>
            <div className="w-[45%] *:bg-white">
              <CheckBoxAccordion2
                label={"جواز رسمی"}
                isChecked={activeCheckbox2 === 0}
                onCheck={() => handleCheck2(0)}
              />
            </div>
            <div className="w-[45%] *:bg-white">
              <CheckBoxAccordion2
                label={"فاقد جواز"}
                isChecked={activeCheckbox2 === 1}
                onCheck={() => handleCheck2(1)}
              />
            </div>
          </div>
        </div>

        <div className="w-[100%] lg:w-[45%] xl:w-[23%] flex flex-wrap">
          <Controller
            name="licenseCode"
            control={control}
            rules={{
              pattern: {
                value: /^[^\s].*$/,
                message: "نام نباید با اسپیس شروع شود",
              },
            }}
            render={({ field }) => (
              <InputTextNoValid
                {...field}
                type="text"
                placeholder={"لطفا کد رهگیری را وارد کنید..."}
                label={"کد رهگیری جواز کسب :"}
                svg={false}
                width={`w-[100%]`}
                value={licenseCode}
                onChange={(e) => {
                  const value = e.target.value;
                  if (!value.startsWith(" ")) {
                    setLicenseCode(value);
                    field.onChange(e);
                  }
                }}
                styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
                styleInput={
                  "text-[1rem] xl:text-[1rem] h-[40px] xl:h-[35px] placeholder:text-[1rem]"
                }
                styleBox={"bg-[#ffffff]"}
              />
            )}
          />
          {errors.licenseCode && (
            <p style={{ color: "red" }}>{errors.licenseCode.message}</p>
          )}
        </div>

        <div className="w-full flex flex-wrap gap-4 justify-center">
          <ImageUpload
            width={"w-[100%] flex "}
            label={"بارگذاری یا نمایش جواز کسب :"}
            setData={setDataImages2}
            data={dataImages2}
            styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
            styleBox={"bg-[#ffffff] "}
            disabled={false}
            type={4}
            setLoad={setLoad}
            setCheck={setCheck}
            setMessage={setMessage}
            setShowDeleteModal={setShowDeleteModalImg2}
            setDataDelete={setDataDeleteImg2}
            setImage={setImage2}
            image={image2}
            maxFiles={1}
          />
        </div>

        <div className="w-full flex flex-wrap gap-4 justify-center">
          <div className="w-[100%] xl:w-[60%] flex justify-around flex-wrap gap-1">
            <p className="w-[100%] flex justify-start px-3 text-[1rem] mb-2">
              نوع جواز کسب :
            </p>
            <div className="w-[45%] *:bg-white">
              <CheckBoxAccordion2
                label={"خرده فروشی"}
                isChecked={activeCheckbox3 === 0}
                onCheck={() => handleCheck3(0)}
              />
            </div>
            <div className="w-[45%] *:bg-white">
              <CheckBoxAccordion2
                label={"پخش عمده"}
                isChecked={activeCheckbox3 === 1}
                onCheck={() => handleCheck3(1)}
              />
            </div>
          </div>
        </div>
        <div className="w-[100%] lg:w-[48%] xl:w-[40%]">
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
              />
            )}
          />
          {errors.brand1 && (
            <p style={{ color: "red" }}>{errors.brand1.message}</p>
          )}
        </div>

      <div className="w-[100%] lg:w-[48%] xl:w-[40%]">
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
            />
          )}
        />
        {/* نمایش خطای اعتبارسنجی */}
        {errors.categories && (
          <p style={{ color: "red" }}>{errors.categories.message}</p>
        )}
      </div>
      

        {/* دکمه ارسال */}
        <div className="w-full h-[100px] items-center flex justify-center">
          <button
            type="submit"
            className={
              " w-[25%] h-[35px] bg-custom-green shadow-custom-6 px-2 hover:scale-95  transition-all duration-300 text-white rounded-2xl text-[1.1rem] flex justify-center items-center"
            }
          >
            ثبت ویرایش
          </button>
        </div>
      </form>
    </>
  );
};

export default Form1;
