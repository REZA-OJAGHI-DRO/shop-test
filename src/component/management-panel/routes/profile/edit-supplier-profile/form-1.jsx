import { Controller, useForm } from "react-hook-form";
import { useMutation } from '@tanstack/react-query';
import {
  React,
  useEffect,
  useState,
  Button,
  InputNumber,
  InputTextNoValid,
  convertToJalali,
  useSelector,
  GetCookie,
  profileSupplierUpdate,
  InputDate2,
  InputDate,
} from "@/component/management-panel/import-management.js";

const Form1 = ({ data , setLoad , setLoad2 , setCheck , setMessage , setUpdateTable , updateTable}) => {
    const token = useSelector((state) => state.product.token);
    const chabk = useSelector((state) => state.product.chabk);
  
  const [roleCookie, setRoleCookie] = useState(GetCookie("role"));

  const [isPerson, setIsPerson] = useState(data?.isPerson);
  const [name, setName] = useState("");
  const [codeNational, setCodeNational] = useState("");
  const [birthdayManager, setBirthdayManager] = useState(
    convertToJalali(
      data?.birthDate == "0001-01-01T00:00:00" ? "" : data?.birthDate
    )
  );
  const [codeCompany, setCodeCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [phone2, setPhone2] = useState("");
  const [accountantMobile, setAccountantMobile] = useState("");
  const [coordinatorMobile, setCoordinatorMobile] = useState('');

  // ********
  const [legalButton1, setLegalButton1] = useState(
    data?.isPerson == true ? 19 : 20
  );
  const [trueButton2, setTrueButton2] = useState(
    data?.isPerson == true ? 20 : 19
  );
  const clickLegal = (e) => {
    setLegalButton1(20);
    setTrueButton2(19);
    setIsPerson(false);
    setBirthdayManager(
      convertToJalali(
        data?.birthDate == "0001-01-01T00:00:00" ? "" : data?.birthDate
      )
    );
  };
  const clickTrue = (e) => {
    setLegalButton1(19);
    setTrueButton2(20);
    setCodeNational(data?.nationalId);
    setIsPerson(true);
  };

  // ********
  useEffect(() => {
    if (data) {
      setName(data?.name);
      setPhone(data?.phone);
      setPhone2(data?.phone2);
      setAccountantMobile(data?.accountantMobile);
      setCoordinatorMobile(data?.coordinatorMobile)
      setCodeCompany(data?.companyNationalId);
      setCodeNational(data?.nationalId);
      setIsPerson(data?.isPerson);
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
      name,
      codeNational,
      codeCompany,
      phone,
      phone2,
      accountantMobile,
      coordinatorMobile,
    },
  });

  useEffect(() => {
    reset({
      name,
      codeNational,
      codeCompany,
      phone,
      phone2,
      accountantMobile,
      coordinatorMobile,
    });
  }, [
    name,
    codeNational,
    codeCompany,
    phone,
    phone2,
    accountantMobile,
    coordinatorMobile,
    reset,
  ]);

  const[dataT,setDataT]=useState(data)
  
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
      dataT?.name !== dataAll?.name ||
      dataT?.phone !== dataAll?.phone ||
      dataT?.phone2 !== dataAll?.phone2 ||
      dataT?.accountantMobile !== dataAll?.accountantMobile ||
      dataT?.coordinatorMobile !== dataAll?.coordinatorMobile ||
      dataT?.nationalId !== dataAll?.codeNational ||
      dataT?.companyNationalId !== dataAll?.codeCompany ||
      Boolean(dataT?.isPerson) !== Boolean(isPerson);

    if (hasChanged) {
      const updatedData = {
        id: dataT?.id,
        name: dataT?.name !== dataAll?.name ? dataAll?.name : null,
        phone: dataT?.phone !== dataAll?.phone ? dataAll?.phone : null,
        phone2: dataT?.phone2 !== dataAll?.phone2 ? dataAll?.phone2 : null,
        accountantMobile: dataT?.accountantMobile !== dataAll?.accountantMobile ? dataAll?.accountantMobile : null,
        coordinatorMobile: dataT?.coordinatorMobile !== dataAll?.coordinatorMobile ? dataAll?.coordinatorMobile : null,
        description: null,
        cityId: null,
        address: null,
        postalCode: null,
        categoryIdsEdited: false,
        categoryIds: null,
        importBrandsEdited: false,
        importBrands: null,
        produceBrandsEdited: false,
        produceBrands: null,
        spreaderBrandsEdited: false,
        spreaderBrands: null,
        isPerson: isPerson,
        nationalId: dataT?.nationalId !== dataAll?.codeNational ? dataAll?.codeNational : null,
        companyNationalId: dataT?.companyNationalId !== dataAll?.codeCompany ? dataAll?.codeCompany : null,
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
              name="mobile"
              control={control}
              render={({ field }) => (
                <InputNumber
                  {...field}
                  type="number"
                  placeholder={"لطفا  تلفن همراه تامین کننده را وارد کنید ..."}
                  label={" تلفن همراه تامین کننده : "}
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
                  styleInput={"text-[1rem] xl:text-[1rem] h-[40px] xl:h-[35px]  cursor-no-drop"}
                  styleBox={"bg-[rgba(0,0,0,.1)]"}
                  disabled={true}
                />
              )}
            />
            {errors.mobile && (
              <p style={{ color: "red" }}>{errors.mobile.message}</p>
            )}
          </div>
        <div className="w-[100%] lg:w-[45%] xl:w-[23%]">
            <Controller
              name="mobile"
              control={control}
              render={({ field }) => (
                <InputNumber
                  {...field}
                  type="text"
                  label={" وضعیت دسترسی : "}
                  svg={false}
                  width={"w-[100%]"}
                  value={data?.isActive == true ? "فعال" : "غیر فعال"}
                  styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
                  styleInput={"text-[1rem] xl:text-[1rem] h-[40px] xl:h-[35px]  cursor-no-drop"}
                  styleBox={"bg-[rgba(0,0,0,.1)]"}
                  disabled={true}
                />
              )}
            />
            {errors.mobile && (
              <p style={{ color: "red" }}>{errors.mobile.message}</p>
            )}
          </div>
        {/* فیلد نام */}
        <div className="w-[100%] lg:w-[45%] xl:w-[23%] flex flex-wrap">
          <Controller
            name="name"
            control={control}
            rules={{
              required: "وارد کردن نام الزامی است",

              pattern: {
                value: /^[^\s].*$/,
                message: "نام نباید با اسپیس شروع شود",
              },
            }}
            render={({ field }) => (
              <InputTextNoValid
                {...field}
                type="text"
                placeholder={
                  isPerson == true
                    ? "نام خود را وارد کنید"
                    : "نام شرکت را وارد کنید"
                }
                label={isPerson == true ? "نام :" : "نام شرکت :"}
                svg={false}
                width={`w-[100%]`}
                value={name}
                onChange={(e) => {
                  const value = e.target.value;
                  if (!value.startsWith(" ")) {
                    setCodeCompany(value);
                    field.onChange(e);
                  }
                }}
                styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
                styleInput={
                  "text-[1rem] xl:text-[1rem] h-[40px] xl:h-[35px] placeholder:text-[1rem]"
                }
                styleBox={"bg-[#ffffff]"}
                disabled={roleCookie === "Supplier" ? true : false}
              />
            )}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        </div>
          <div className="w-[100%] lg:w-[45%] xl:w-[23%]">
            <Controller
              name="codeNational"
              control={control}
              rules={{
                required: "وارد کردن کد ملی الزامی است",
                minLength: {
                  value: 10,
                  message: "کد ملی باید 10 رقم باشد",
                },
                maxLength: {
                  value: 10,
                  message: "کد ملی نباید بیشتر از 10 رقم باشد",
                },
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "کد ملی فقط باید شامل اعداد باشد و 10 رقم باشد",
                },
              }}
              render={({ field }) => (
                <InputNumber
                  {...field}
                  type="text"
                  placeholder={"لطفا شناسه کد ملی را وارد کنید ..."}
                  label={
                    isPerson ? "شناسه کد / کد ملی :" : "شناسه ملی مدیر عامل :"
                  }
                  svg={false}
                  width={"w-[100%]"}
                  value={codeNational}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, "");
                    if (value.length <= 10) {
                      setCodeNational(value);
                      field.onChange(e);
                    }
                  }}
                  styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
                  styleInput={"text-[1rem] xl:text-[1rem] h-[40px] xl:h-[35px]"}
                  styleBox={"bg-[#ffffff]"}
                  disabled={roleCookie === "Supplier" ? true : false}
                />
              )}
            />
            {errors.codeNational && (
              <p style={{ color: "red" }}>{errors.codeNational.message}</p>
            )}
            </div>
        {/*فیلد حقیقی حقوقی*/}
        <div className="w-full flex flex-wrap gap-5 justify-center">
          <div className="w-[100%] lg:w-[50%] xl:w-[40%] justify-center flex gap-1">
            <p className="text-nowrap">نوع شخصیت :</p>
            <Button
              value={"حقیقی"}
              click={() => clickTrue(event)}
              styleButton={trueButton2}
            />
            <Button
              value={"حقوقی"}
              click={() => clickLegal(event)}
              styleButton={legalButton1}
            />
          </div>
        </div>
        {/*فیلد اینپوت های حقیقی حقوقی*/}
        <div className="w-full flex flex-wrap justify-between gap-5">

            {isPerson == true ? (
              <></>
            ) : (
              <>
                <div className="w-[100%] lg:w-[45%] xl:w-[23%] ">
                  <Controller
                    name="codeCompany"
                    control={control}
                    rules={{
                      pattern: {
                        value: /^[^\s].*$/,
                        message: "شناسه ملی شرکت نباید با اسپیس شروع شود",
                      },
                    }}
                    render={({ field }) => (
                      <InputTextNoValid
                        {...field}
                        type="text"
                        placeholder={"لطفا شناسه ملی شرکت را وارد کنید ..."}
                        label={"شناسه ملی شرکت :"}
                        svg={false}
                        width={"w-[100%]"}
                        value={codeCompany}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (!value.startsWith(" ")) {
                            setCodeCompany(value);
                            field.onChange(e);
                          }
                        }}
                        styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
                        styleInput={
                          "text-[1rem] xl:text-[1rem] h-[40px] xl:h-[35px]"
                        }
                        styleBox={"bg-[#ffffff]"}
                        disabled={roleCookie === "Supplier" ? true : false}
                      />
                    )}
                  />
                  {errors.codeCompany && (
                    <p style={{ color: "red" }}>{errors.codeCompany.message}</p>
                  )}
                </div>
                         {/* <div className="w-[50%] flex px-5">
                                    <InputDate2 dataDate={dataDate} setDataDate={setDataDate} disabled={roleCookie === "Supplier" ? true : false} placeholder={"انتخاب تاریخ ..."}/>
                                    </div> */}
                {/* <InputDate
            placeholder={"انتخاب تاریخ ..."}
            label={`تاریخ تولد مدیر عامل : ${convertToJalali(
              data?.birthDate == "0001-01-01T00:00:00"
                ? ""
                : data?.birthDate
            )}`}
            svg={false}
            width={"w-[100%] "}
            max={""}
            data={birthdayManager}
            setData={setBirthdayManager}
            styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
            styleInput={
              "text-[1rem] xl:text-[1rem] h-[40px] xl:h-[35px]"
            }
            styleError={''}
            styleBox={"bg-[#ffffff]"}
          /> */}
              </>
            )}
          </div>
        </div>

          <div className="w-[100%] lg:w-[45%] xl:w-[23%]">
            <Controller
              name="phone"
              control={control}
              rules={{
                required: "وارد کردن تلفن ثابت 1 الزامی است",
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
                  placeholder={"لطفا تلفن ثابت 1 را وارد کنید ..."}
                  label={"تلفن ثابت 1 :"}
                  svg={false}
                  width={"w-[100%]"}
                  value={phone}
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
                  disabled={roleCookie === "Supplier" ? true : false}
                />
              )}
            />
            {errors.phone && (
              <p style={{ color: "red" }}>{errors.phone.message}</p> 
            )}
          </div>
          {/* فیلد تلفن ثابت 2 */}
          <div className="w-[100%] lg:w-[45%] xl:w-[23%]">
            <Controller
              name="phone2"
              control={control}
              rules={{
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
                  placeholder={"لطفا تلفن ثابت 2 را وارد کنید ..."}
                  label={"تلفن ثابت 2 :"}
                  svg={false}
                  width={"w-[100%]"}
                  value={phone2}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9۰-۹]/g, ""); 
                    if (value.length <= 11) {
                      setPhone2(value);
                      field.onChange(e);
                    }
                  }}
                  styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
                  styleInput={"text-[1rem] xl:text-[1rem] h-[40px] xl:h-[35px]"}
                  styleBox={"bg-[#ffffff]"}
                  disabled={roleCookie === "Supplier" ? true : false}
                />
              )}
            />
            {errors.phone2 && (
              <p style={{ color: "red" }}>{errors.phone2.message}</p> 
            )}
          </div>
          {/* فیلد موبایل مدیر مجموعه */}
          <div className="w-[100%] lg:w-[45%] xl:w-[23%]">
            <Controller
              name="managerMobile"
              control={control}
              render={({ field }) => (
                <InputNumber
                  {...field}
                  type="number"
                  label={"تلفن همراه مدیر مجموعه : "}
                  svg={false}
                  width={"w-[100%]"}
                  value={data?.managerMobile}
                  styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
                  styleInput={"text-[1rem] xl:text-[1rem] h-[40px] xl:h-[35px]  cursor-no-drop"}
                  styleBox={"bg-[rgba(0,0,0,.1)]"}
                  disabled={true}
                />
              )}
            />
            {errors.managerMobile && (
              <p style={{ color: "red" }}>{errors.managerMobile.message}</p>
            )}
          </div>

          {/* فیلد موبایل حسابدار */}
          <div className="w-[100%] lg:w-[45%] xl:w-[23%]">
            <Controller
              name="accountantMobile"
              control={control}
              rules={{
                required: "وارد کردن تلفن همراه حسابدار الزامی است",
                minLength: {
                  value: 11,
                  message: "تلفن همراه حسابدار باید 11 رقم باشد",
                },
                maxLength: {
                  value: 11,
                  message: "تلفن همراه حسابدار نباید بیشتر از 11 رقم باشد",
                },
                pattern: {
                  value: /^09[0-9۰-۹]{9}$/, 
                  message: "تلفن باید با 09 شروع شود و فقط شامل 11 رقم باشد",
                },
              }}
              render={({ field }) => (
                <InputNumber
                  {...field}
                  type="text" 
                  placeholder={"لطفا تلفن همراه حسابدار را وارد کنید ..."}
                  label={"تلفن همراه حسابدار : "}
                  svg={false}
                  width={"w-[100%]"}
                  value={accountantMobile}
                  onChange={(e) => {
                    let value = e.target.value.replace(/[^0-9۰-۹]/g, ""); 
                    if (value.length <= 11) {
                      setAccountantMobile(value);
                      field.onChange(e);
                    }
                  }}
                  styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
                  styleInput={"text-[1rem] xl:text-[1rem] h-[40px] xl:h-[35px]"}
                  styleBox={"bg-[#ffffff]"}
                  disabled={roleCookie === "Supplier" ? true : false}
                />
              )}
            />
            {errors.accountantMobile && (
              <p style={{ color: "red" }}>{errors.accountantMobile.message}</p>
            )}
          </div>
       
          <div className="w-[100%] lg:w-[45%] xl:w-[23%]">
            <Controller
              name="coordinatorMobile"
              control={control}
              rules={{
                required: "وارد کردن تلفن همراه حسابدار الزامی است",
                minLength: {
                  value: 11,
                  message: "تلفن همراه حسابدار باید 11 رقم باشد",
                },
                maxLength: {
                  value: 11,
                  message: "تلفن همراه حسابدار نباید بیشتر از 11 رقم باشد",
                },
                pattern: {
                  value: /^09[0-9۰-۹]{9}$/,
                  message: "تلفن باید با 09 شروع شود و فقط شامل 11 رقم باشد",
                },
              }}
              render={({ field }) => (
                <InputNumber
                  {...field}
                  type="text"
                  placeholder={
                    "لطفا تلفن همراه مسئول هماهنگ کننده امور را وارد کنید ..."
                  }
                  label={"تلفن همراه مسئول هماهنگ کننده امور : "}
                  svg={false}
                  width={"w-[100%]"}
                  value={coordinatorMobile}
                  onChange={(e) => {
                    let value = e.target.value.replace(/[^0-9۰-۹]/g, "");

                    if (value.length <= 11) {
                      setCoordinatorMobile(value);
                      field.onChange(e);
                    }
                  }}
                  styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
                  styleInput={"text-[1rem] xl:text-[1rem] h-[40px] xl:h-[35px]"}
                  styleBox={"bg-[#ffffff]"}
                  disabled={roleCookie === "Supplier" ? true : false}
                />
              )}
            />
            {errors.coordinatorMobile && (
              <p style={{ color: "red" }}>{errors.coordinatorMobile.message}</p>
            )}
          </div>
     

      {/* دکمه ارسال */}
      <div className="w-full h-[100px] items-center xl:w-[60%] flex justify-center">
    <button type="submit" className={' w-[30%] h-[35px] bg-custom-green shadow-custom-6 px-2 hover:scale-95  transition-all duration-300 text-white rounded-2xl text-[1.1rem] flex justify-center items-center'}>ثبت ویرایش</button>
      </div>
    </form>
  );
};

export default Form1;
