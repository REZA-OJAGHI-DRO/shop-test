import { Controller, useForm } from "react-hook-form";
import { useMutation } from '@tanstack/react-query';
import {
  React,
  useEffect,
  useState,
  City,
  CheckBoxAccordion2,
  InputNumber,
  useSelector,
  GetCookie,
  InputTextArea,
  profileShopperUpdate,
  ImageUpload,
  areArraysEqual,
} from "@/component/management-panel/import-management.js";

const Form1 = ({
  data,
  setLoad,
  setLoad2,
  setCheck,
  setMessage,
  setUpdateTable,
  updateTable,
  setImage1,
  image1,
  setDataImages1,
  dataImages1,
  setImagesEdited1,
  imagesEdited1,
  setShowDeleteModalImg,
  setDataDeleteImg,
}) => {
  const token = useSelector((state) => state.product.token);
  const chabk = useSelector((state) => state.product.chabk);

  const [roleCookie, setRoleCookie] = useState(GetCookie("role"));

  const [isRent, setIsRent] = useState(null);
  const [area, setArea] = useState("");
  const [shopName, setShopName] = useState("");
  const [codePost, setCodePost] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");

  // ********
  const [activeCheckbox1, setActiveCheckbox1] = useState(0);
  const [checked1, setChecked1] = useState(false);
  const handleCheck1 = (index) => {
    if (index === activeCheckbox1 && checked1) {
      return;
    }
    setActiveCheckbox1(index);
    setChecked1(true);

    if (index === 0) {
      setIsRent(true);
    } else {
      setIsRent(false);
    }
  };
  // ********

  // *******
  useEffect(() => {
    if (data) {
      setImage1(data.docOrRentImages.map((file) => file.link));
      setDataImages1(data.docOrRentImages.map((file) => file.fileId));
      setImagesEdited1(
        areArraysEqual(
          data?.docOrRentImages.map((file) => file.fileId),
          dataImages1
        ) == true
          ? true
          : false
      );
      setActiveCheckbox1(data?.isRent == true ? 0 : 1);
      setShopName(data?.name);
      setArea(data?.area);
      setIsRent(data?.isRent);
      setCity(data?.city?.key || "");
      setProvince(data?.province?.key);
      setCodePost(data?.postalCode);
      setAddress(data?.address);
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
      shopName,
      city,
      codePost,
      address,
      area,
    },
  });

  useEffect(() => {
    reset({
      shopName,
      city,
      codePost,
      address,
      area,
    });
  }, [shopName, city, codePost, address, area, reset]);

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
    let hasChanged = false;

    hasChanged =
      dataT?.name !== dataAll?.shopName ||
      dataT?.city?.key !== dataAll?.city ||
      dataT?.postalCode !== dataAll?.codePost ||
      dataT?.address !== dataAll?.address ||
      Boolean(dataT?.isRent) !== Boolean(isRent) ||
      dataT?.area !== Number(dataAll?.area) ||
      imagesEdited1;

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
        name: dataT?.name !== dataAll?.shopName ? dataAll?.shopName : null,
        cityId: dataT?.city?.key !== dataAll?.city ? dataAll?.city : null,
        postalCode:
          dataT?.postalCode !== dataAll?.codePost ? dataAll?.codePost : null,
        address: dataT?.address !== dataAll?.address ? dataAll?.address : null,
        isRent: isRent,
        area:
          dataT?.area !== Number(dataAll?.area) ? Number(dataAll?.area) : null,
        hasLicense: null,
        licenseCode: null,
        isRetail: null,
        licenseImage: null,
        docOrRentImagesEdited: imagesEdited1,
        docOrRentImages: imagesEdited1 ? dataImages1 : null,
        categoryIdsEdited: false,
        categoryIds: null,
        brandIdsEdited: false,
        brandIds: null,
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
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-wrap gap-1"
      >
        <div
          dir="rtl"
          className="w-[100%] rounded-3xl  py-2 flex gap-5 justify-between flex-wrap boxFilter18"
        >
          <div className="w-[100%]  flex justify-around flex-wrap gap-1">
            <div
              className="w-[100%] lg:w-[45%] flex items-end 
             "
            >
              <p className=" text-nowrap flex justify-start px-3 text-[1rem] mb-2 ">
                نوع مالکیت :
              </p>
              <div className="w-[30%] *:bg-white">
                <CheckBoxAccordion2
                  label={"استیجاری"}
                  isChecked={activeCheckbox1 === 0}
                  onCheck={() => handleCheck1(0)}
                />
              </div>
              <div className="w-[30%] *:bg-white">
                <CheckBoxAccordion2
                  label={"مالک"}
                  isChecked={activeCheckbox1 === 1}
                  onCheck={() => handleCheck1(1)}
                />
              </div>
            </div>
            <div className="w-[100%] lg:w-[45%] xl:w-[23%]">
              <Controller
                name="area"
                control={control}
                rules={{
                  pattern: {
                    value: /^0$|^(?!0[1-9])[0-9۰-۹]+$/,
                    message: "متراژ محل کسب نباید با صفر شروع شود",
                  },
                }}
                render={({ field }) => (
                  <InputNumber
                    {...field}
                    type="text"
                    placeholder={"لطفا متراژ محل کسب وارد کنید ..."}
                    label={"متراژ محل کسب :"}
                    svg={false}
                    width={"w-[100%]"}
                    value={area}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9۰-۹]/g, ""); // فقط اعداد
                      if (value.length <= 11) {
                        setArea(value);
                        field.onChange(e);
                      }
                    }}
                    styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
                    styleInput={
                      "text-[1rem] xl:text-[1rem] h-[40px] xl:h-[35px]"
                    }
                    styleBox={"bg-[#ffffff]"}
                  />
                )}
              />
              {errors.area && (
                <p style={{ color: "red" }}>{errors.area.message}</p>
              )}
            </div>
            <div className="w-[100%] lg:w-[45%] xl:w-[23%]">
              <Controller
                name="shopName"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "وارد کردن اسم مغازه الزامی است",
                  },
                }}
                render={({ field }) => (
                  <InputNumber
                    {...field}
                    type="text"
                    placeholder={"لطفا اسم مغازه را وارد کنید..."}
                    label={"* اسم مغازه :"}
                    svg={false}
                    width={"w-[100%]"}
                    value={field?.value || shopName}
                    onChange={(e) => {
                      const value = e.target.value;
                      setShopName(value);
                      field.onChange(e);
                    }}
                    styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
                    styleInput={
                      "text-[1rem] xl:text-[1rem] h-[40px] xl:h-[35px]"
                    }
                    styleBox={"bg-[#ffffff]"}
                  />
                )}
              />
              {errors.shopName && (
                <p style={{ color: "red" }}>{errors.shopName.message}</p>
              )}
            </div>

            <div className="w-full xl:w-[50%] flex flex-wrap gap-4 justify-between">
              <ImageUpload
                width={"w-[100%] flex "}
                label={"بارگذاری و نمایش سند / اجاره نامه ملک :"}
                setData={setDataImages1}
                data={dataImages1}
                styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
                styleBox={"bg-[#ffffff] "}
                disabled={false}
                type={6}
                setLoad={setLoad}
                setCheck={setCheck}
                setMessage={setMessage}
                setShowDeleteModal={setShowDeleteModalImg}
                setDataDelete={setDataDeleteImg}
                setImage={setImage1}
                image={image1}
              />
            </div>
            <div className="w-[100%] lg:w-[45%] ">
              <Controller
                name="address"
                control={control}
                rules={{
                  required: {
                    value: false,
                    message: "لطفاً آدرس خود را وارد کنید",
                  },
                }}
                render={({ field }) => (
                  <InputTextArea
                    {...field}
                    type="text"
                    label={"جزئیات آدرس :"}
                    width={"w-[100%] h-[190px] mt-6"}
                    placeholder={"توضیحات خود را وارد کنید"}
                    styleTextarea={"bg-white h-[150px]"}
                    styleLabel={"black"}
                    value={address}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.length <= 200) {
                        setAddress(value);
                        field.onChange(e);
                      }
                    }}
                  />
                )}
              />
              {errors.address && (
                <p style={{ color: "red" }}>{errors.address.message}</p>
              )}
            </div>

            <div className="w-[100%] lg:w-[45%]">
              <Controller
                name="city"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "لطفاً شهر خود را انتخاب کنید",
                  },
                }}
                render={({ field }) => (
                  <City
                    {...field}
                    control={control}
                    name="city"
                    dataCityId={province}
                    setDataCityId={setProvince}
                    dataCityId2={city}
                    setDataCityId2={setCity}
                    selectedProvinceData={dataT?.province?.value}
                    selectedCityData={dataT?.city?.value}
                    styleLabel={"text-[1.2rem] xl:text-[1rem] text-black"}
                  />
                )}
              />
              {errors.city && (
                <p style={{ color: "red" }}>{errors.city.message}</p>
              )}
            </div>
            <div className="w-[100%] lg:w-[30%] flex flex-wrap items-start pb-3">
              <Controller
                name="codePost"
                control={control}
                rules={{
                  minLength: {
                    value: 10,
                    message: "کد پستی باید 10 رقم باشد",
                  },
                  maxLength: {
                    value: 10,
                    message: "کد پستی نباید بیشتر از 10 رقم باشد",
                  },
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "کد پستی فقط باید شامل اعداد باشد و 10 رقم باشد",
                  },
                }}
                render={({ field }) => (
                  <InputNumber
                    {...field}
                    type="text"
                    placeholder={"لطفا کد پستی را وارد کنید ..."}
                    label={"کد پستی :"}
                    svg={false}
                    svg2={false}
                    width={"w-[100%]"}
                    value={codePost}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, "");
                      if (value.length <= 10) {
                        setCodePost(value);
                        field.onChange(e);
                      }
                    }}
                    styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
                    styleInput={
                      "text-[1rem] xl:text-[1rem] h-[40px] xl:h-[35px]"
                    }
                    styleBox={"bg-[#ffffff]"}
                  />
                )}
              />
              {errors.codePost && (
                <p className="w-full text-red-500 text-sm mt-2">
                  {errors.codePost.message}
                </p>
              )}
            </div>
          </div>
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
