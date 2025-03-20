import { Controller, useForm } from "react-hook-form";
import { useMutation } from '@tanstack/react-query';
import {
  React,
  useEffect,
  useState,
  InputNumber,
  useSelector,
  GetCookie,
  InputTextArea,
  profileShopperUpdate,
  City,
} from "@/component/management-panel/import-management.js";

const Form1 = ({
  data,
  setLoad,
  setLoad2,
  setCheck,
  setMessage,
  setUpdateTable,
  updateTable,
}) => {
  const token = useSelector((state) => state.product.token);
  const chabk = useSelector((state) => state.product.chabk);

  const [roleCookie, setRoleCookie] = useState(GetCookie("role"));

  const [phone, setPhone] = useState("");
  const [homeCityId, setHomeCityId] = useState("");
  const [homeProvinceId, setHomeProvinceId] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [homePostalCode, setHomePostalCode] = useState("");
  
  // ********

  // ********
  useEffect(() => {
    if (data) {
      setPhone(data?.phone);
      setHomeCityId(data?.homeCity?.key || "");
      setHomeProvinceId(data?.homeProvince?.key);
      setHomePostalCode(data?.homePostalCode);
      setHomeAddress(data?.homeAddress);
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
      homeCityId,
      phone,
      homePostalCode,
      homeAddress,
    },
  });

  useEffect(() => {
    reset({
      homeCityId,
      phone,
      homePostalCode,
      homeAddress,
    });
  }, [homeCityId, phone, homePostalCode, homeAddress, reset]);

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
      dataT?.phone !== dataAll?.phone ||
      dataT?.homeCity?.key !== homeCityId ||
      dataT?.homePostalCode !== dataAll?.homePostalCode ||
      dataT?.homeAddress !== dataAll?.homeAddress;

    if (hasChanged) {
      const updatedData = {
        id: dataT?.id,
        personName: null,
        phone: dataT?.phone !== dataAll?.phone ? dataAll?.phone : null,
        nationCode: null,
        birthDate: null,
        homeCityId:
          dataT?.homeCity?.key !== homeCityId ? homeCityId : null,
        homePostalCode:
          dataT?.homePostalCode !== dataAll?.homePostalCode
            ? dataAll?.homePostalCode
            : null,
        homeAddress:
          dataT?.homeAddress !== dataAll?.homeAddress
            ? dataAll?.homeAddress
            : null,
        name: null,
        cityId: null,
        postalCode: null,
        address: null,
        isRent: null,
        area: null,
        hasLicense: null,
        licenseCode: null,
        isRetail: null,
        licenseImage: null,
        docOrRentImagesEdited: false,
        docOrRentImages: null,
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-wrap gap-4"
    >
      <div
        dir="rtl"
        className="w-[100%] rounded-3xl px-4 py-2 flex gap-5 justify-between flex-wrap boxFilter18"
      >
        <div className="w-[100%] lg:w-[45%] xl:w-[23%]">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <InputNumber
                {...field}
                type="text"
                placeholder={"ندارد"}
                label={" نام و نام خانوادگی :"}
                svg={false}
                width={"w-[100%]"}
                value={data?.personName}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 11) {
                    field.onChange(e);
                  }
                }}
                styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
                styleInput={
                  "text-[1rem] xl:text-[1rem] h-[40px] xl:h-[35px]  cursor-no-drop"
                }
                styleBox={"bg-[rgba(0,0,0,.1)]"}
                disabled={true}
              />
            )}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        </div>
        <div className="w-[100%] lg:w-[45%] xl:w-[23%]">
          <Controller
            name="nationCode"
            control={control}
            render={({ field }) => (
              <InputNumber
                {...field}
                type="number"
                placeholder={"ندارد"}
                label={" کد ملی :"}
                svg={false}
                width={"w-[100%]"}
                value={data?.nationCode}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 11) {
                    field.onChange(e);
                  }
                }}
                styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
                styleInput={
                  "text-[1rem] xl:text-[1rem] h-[40px] xl:h-[35px]  cursor-no-drop"
                }
                styleBox={"bg-[rgba(0,0,0,.1)]"}
                disabled={true}
              />
            )}
          />
          {errors.nationCode && (
            <p style={{ color: "red" }}>{errors.nationCode.message}</p>
          )}
        </div>
        <div className="w-[100%] lg:w-[45%] xl:w-[23%]">
          <Controller
            name="nationCode"
            control={control}
            render={({ field }) => (
              <InputNumber
                {...field}
                type="number"
                placeholder={"ندارد"}
                label={" تلفن همراه :"}
                svg={false}
                width={"w-[100%]"}
                value={data?.mobile}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 11) {
                    field.onChange(e);
                  }
                }}
                styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
                styleInput={
                  "text-[1rem] xl:text-[1rem] h-[40px] xl:h-[35px]  cursor-no-drop"
                }
                styleBox={"bg-[rgba(0,0,0,.1)]"}
                disabled={true}
              />
            )}
          />
          {errors.nationCode && (
            <p style={{ color: "red" }}>{errors.nationCode.message}</p>
          )}
        </div>
        <div className="w-[100%] lg:w-[45%] xl:w-[23%]">
          <Controller
            name="phone"
            control={control}
            rules={{
              required: "وارد کردن تلفن ثابت الزامی است",
              minLength: {
                value: 11,
                message: "تلفن ثابت باید 11 رقم باشد",
              },
              maxLength: {
                value: 11,
                message: "تلفن ثابت نباید بیشتر از 11 رقم باشد",
              },
              pattern: {
                value: /^0[0-9۰-۹]{10}$/,
                message: "تلفن باید با 0 شروع شود و فقط شامل 11 رقم باشد",
              },
            }}
            render={({ field }) => (
              <InputNumber
                {...field}
                type="text"
                placeholder={"لطفا تلفن ثابت را وارد کنید ..."}
                label={"تلفن ثابت :"}
                svg={false}
                width={"w-[100%]"}
                value={field?.value || phone}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9۰-۹]/g, "");
                  if (value.length <= 11) {
                    setPhone(value);
                    field.onChange(e);
                  }
                }}
                styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
                styleInput={"text-[1rem] xl:text-[1rem] h-[40px] xl:h-[35px]"}
                styleBox={"bg-[#ffffff]"}
              />
            )}
          />
          {errors.phone && (
            <p style={{ color: "red" }}>{errors.phone.message}</p>
          )}
        </div>
        <p className="w-[100%] xl:w-[100%] text-[1.3rem]">
          <span className="text-red-600 ">*</span> آدرس منزل
        </p>
        <div className="w-full lg:w-[45%] flex flex-wrap">
          <div className="w-[100%] ">
            <Controller
              name="homeCityId"
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
                  name="homeCityId"
                  dataCityId={homeProvinceId}
                  setDataCityId={setHomeProvinceId}
                  dataCityId2={homeCityId}
                  setDataCityId2={setHomeCityId}
                  selectedProvinceData={dataT?.homeProvince?.value}
                  selectedCityData={dataT?.homeCity?.value}
                  styleLabel={"text-[1.2rem] xl:text-[1rem] text-black"}
                />
              )}
            />
            {errors.homeCityId && (
              <p style={{ color: "red" }}>{errors.homeCityId.message}</p>
            )}
          </div>

          <div className="w-full lg:w-[50%] ">
            <Controller
              name="homePostalCode"
              control={control}
              rules={{
                minLength: {
                  value: 10,
                  message: "کد پستی باید 10 رقم باشد",
                },
                maxLength: {
                  value: 10,
                  message: "کد ملی نباید بیشتر از 10 رقم باشد",
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
                  value={homePostalCode}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, "");
                    if (value.length <= 10) {
                      setHomePostalCode(value);
                      field.onChange(e);
                    }
                  }}
                  styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
                  styleInput={"text-[1rem] xl:text-[1rem] h-[40px] xl:h-[35px]"}
                  styleBox={"bg-[#ffffff]"}
                />
              )}
            />
            {errors.homePostalCode && (
              <p style={{ color: "red" }}>{errors.homePostalCode.message}</p>
            )}
          </div>
        </div>
        <div className="w-[100%] lg:w-[45%] ">
          <Controller
            name="homeAddress"
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
                value={homeAddress}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 200) {
                    setHomeAddress(value);
                    field.onChange(e);
                  }
                }}
              />
            )}
          />
          {errors.homeAddress && (
            <p style={{ color: "red" }}>{errors.homeAddress.message}</p>
          )}
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
  );
};

export default Form1;
