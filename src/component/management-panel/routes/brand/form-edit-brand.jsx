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
  InputTextNoValid,
  File,
  supplierNameGetAll,
  InputSelect,
  postPackageTypeUpdateBrand,
} from "@/component/management-panel/import-management.js";

const FormBrandEdit = ({
    data,
  setLoad,
  setLoad2,
  
  setCheckData,
  setCheckDataAll,
  setMessageData,

  setUpdateTable,
  updateTable,
  setCheck,
  setMessage,
  closeModal,
  setIsLoading,
}) => {
  const token = useSelector((state) => state.product.token);
  const chabk = useSelector((state) => state.product.chabk);

  const [roleCookie, setRoleCookie] = useState(GetCookie("role"));
  //   ********
  const [options4, setOptions4] = useState([{ key: "", value: "" }]);
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [dataFile, setDataFile] = useState("");
  const [dataFile2, setDataFile2] = useState('');

  //   **********

  const GetSupplier = useCallback(() => {
    const keyword = "";
    supplierNameGetAll(
      keyword,
      token,
      chabk,
      setMessageData,
      setCheckData,
      (data) => {
        setOptions4(data);
        setCheckDataAll((r) => ({ ...r, check1: true }));
      }
    );
  }, [token, chabk]);
  const isFirstRender1 = useRef(true);
  useEffect(() => {
    if (isFirstRender1.current) {
      GetSupplier();
      isFirstRender1.current = false;
    }
  }, [GetSupplier]);
  //   **********
const [dataT, setDataT] = useState(data);
  useEffect(() => {
    if (data) {
      setName1(data?.name);
      setName2(data?.enName);
      setDataFile(data?.logoFileGuid);
      setDataFile2(data?.priceListGuid);
      setOwnerId(data?.ownerId)
    }
  }, [data]);


  const {
    control,
    // register, // برای ثبت کردن فیلدها
    handleSubmit, // برای هندل کردن سابمیت فرم
    formState: { errors }, // برای مدیریت خطاها
    reset,
  } = useForm({
    defaultValues: {
      name1,
      name2,
      ownerId,
      dataFile,
      dataFile2,
    },
  });

  useEffect(() => {
    reset({
      name1,
      name2,
      ownerId,
      dataFile,
      dataFile2,
    });
  }, [name1, name2, ownerId, dataFile, dataFile2, reset]);

  const mutation = useMutation({
    mutationFn: postPackageTypeUpdateBrand,
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (result) => {
      setIsLoading(false);
      if (result.isSuccess) {
        setMessage(result.error ? result.error : result.message);
        setTimeout(()=>{
          setUpdateTable(!updateTable);
        },1500)
        setCheck((prev) => ({ ...prev, check1: true }));
        closeModal();
        setTimeout(() => {
          setMessage('');
          setCheck((prev) => ({ ...prev, check2: false }));
          setCheck((prev) => ({ ...prev, check1: false }));
        }, 5000);
      } else {
        setMessage(result.error ? result.error : result.message);
        setCheck((prev) => ({ ...prev, check1: true }));
        closeModal();
        setTimeout(() => {
          setMessage('');
          setCheck((prev) => ({ ...prev, check2: false }));
          setCheck((prev) => ({ ...prev, check1: false }));
        }, 5000);
      }
    },
    onError: (error) => {
      setIsLoading(false);
      setMessage(error.message || 'عملیات با خطا مواجه شد');
      setCheck((prev) => ({ ...prev, check4: true }));
      setUpdateTable((prev) => !prev);
      setTimeout(() => {
        setMessage('');
        setCheck((prev) => ({ ...prev, check4: false }));
      }, 5000);
    },
    onSettled: () => {
      setIsLoading(false);
    }
  });

  const onSubmit = (dataAll) => {
    let hasChanged = false;
    
    hasChanged =
    dataT?.name !== dataAll?.name1 ||
    dataT?.enName !== dataAll?.name2 ||
    dataT?.logoFileGuid !== dataAll?.dataFile ||
    dataT?.priceListGuid !== dataAll?.dataFile2 ||
    dataT?.ownerId !== dataAll?.ownerId;
    
    if (hasChanged) {
      const updatedDataAll = {
        data:{
        id:dataT?.id,
        name: dataAll?.name1,
        enName: dataAll?.name2,
        ownerId: dataAll?.ownerId,
        logoFileGuid: dataFile || dataT?.logoFileGuid, 
        priceListGuid: dataFile2 || dataT?.priceListGuid,
        },
        token,
        chabk,
        setMessage,
      };
      
      // فراخوانی `mutation.mutate` برای ارسال داده‌ها
      mutation.mutate({
        updatedDataAll,
       
      });
    } else {
      setName1(dataT?.name);
      setName2(dataT?.enName);
      setDataFile(dataT?.logoFileGuid);
      setDataFile2(dataT?.priceListGuid);
      setOwnerId(dataT?.ownerId);
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
    className="w-full flex flex-wrap gap-4 justify-center"
    >
      <div
        dir="rtl"
        className="w-[100%] rounded-3xl px-4 py-7 flex gap-5 shadow-custom-6 justify-around flex-wrap boxFilter"
        >
        <div className="w-[100%] lg:w-[45%] flex flex-wrap">
          <Controller
            name="name1"
            control={control}
            rules={{
              required: {
                value: true,
                message: "وارد کردن نام برند به فارسی الزامی است",
              },
              pattern: {
                value: /^[\u0600-\u06FF\s0-9]+$/,
                message: "فقط حروف فارسی و اعداد مجاز هستند",
              },
            }}
            render={({ field }) => (
              <InputTextNoValid
              {...field}
                type="text"
                placeholder={"نام برند"}
                label={"نام برند به فارسی :"}
                svg={false}
                width={`w-[100%]`}
                value={field.value || name1}
                onChange={(e) => {
                  const value = e.target.value;
                  if (
                    !value.startsWith(" ") &&
                    /^[\u0600-\u06FF\s0-9]*$/.test(value)
                  ) {
                    setName1(value);
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

          {errors.name1 && (
            <p style={{ color: "red" }}>{errors.name1.message}</p>
          )}
        </div>

        <div className="w-[100%] lg:w-[45%] flex flex-wrap">
          <Controller
            name="name2"
            control={control}
            rules={{
              required: {
                value: true,
                message: "وارد کردن نام برند به انگلیسی الزامی است",
              },
              pattern: {
                value: /^[A-Za-z0-9\s]+$/,
                message: "فقط حروف انگلیسی و اعداد مجاز هستند",
              },
            }}
            render={({ field }) => (
              <InputTextNoValid
                {...field}
                type="text"
                placeholder={"name"}
                label={"نام برند به لاتین:"}
                svg={false}
                value={name2}
                width={`w-[100%]`}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^[A-Za-z0-9\s]*$/.test(value)) { 
                    if (!value.startsWith(" ")) { 
                      setName2(value);
                      field.onChange(e);
                    }
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
          {errors.name2 && (
            <p style={{ color: "red" }}>{errors.name2.message}</p>
          )}
        </div>

        <div className="w-[100%] lg:w-[45%] flex flex-wrap">
          <p className="w-full">
            <span className="text-red-500">*</span> نوع بسته مالک برند :
          </p>
          <Controller
            name="ownerId"
            control={control}
            rules={{
              required: {
                value: true,
                message: "انتخاب برند الزامی است",
              },
            }}
            render={({ field }) => (
              <InputSelect
                options={options4}
                data={data?.ownerName}
                setData={(selected) => {
                  field.onChange(selected);
                }}
              />
            )}
          />
          {errors.ownerId && (
            <p style={{ color: "red" }}>{errors.ownerId.message}</p>
          )}
        </div>
        <div className="w-full flex justify-around flex-wrap gap-5">
          <div className="w-[100%] lg:w-[45%] flex flex-wrap">
            <Controller
              name="dataFile"
              control={control}
              // rules={{
              //   required: {
              //     value: true,
              //     message: "آپلود آرم برند الزامی است",
              //   },
              // }}
              render={({ field }) => (
                <File
                  {...field}
                  width={"w-[100%] h-[60px]"}
                  label={"آرم برند را آپلود کنید :"}
                  setDataFile={(file) => {
                    field.onChange(file);
                    setDataFile(file)
                  }}
                  style2={"h-[40px]"}
                  styleLabel={"text-black"}
                  type={1}
                  setLoad={setLoad}
                  fileType={"image"}
                  setCheck={setCheck}
                  setMessage={setMessage}
                  updateTable={updateTable}
                />
              )}
            />
            {errors.dataFile && (
              <p style={{ color: "red" }}>{errors.dataFile.message}</p>
            )}
          </div>

          <div className="w-[100%] lg:w-[45%] flex flex-wrap">
            <Controller
              name="dataFile2"
              control={control}
              render={({ field }) => (
                <File
                  {...field}
                  width={"w-[100%] h-[60px]"}
                  label={"لیست قیمتی برند را آپلود کنید :"}
                  setDataFile={(file) => {
                    field.onChange(file);
                    setDataFile2(file)
                  }}
                  style2={"h-[40px]"}
                  styleLabel={"text-black"}
                  type={2}
                  setLoad={setLoad2}
                  fileType={"image"}
                  setCheck={setCheck}
                  setMessage={setMessage}
                  updateTable={updateTable}
                />
              )}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <button
          type="submit"
          className={
            " w-[30%] h-[35px] bg-custom-green shadow-custom-6 px-2 hover:scale-95  transition-all duration-300 text-white rounded-2xl text-[1.1rem] flex justify-center items-center"
          }
        >
          ثبت ویرایش برند
        </button>
      </div>
    </form>
  );
};

export default FormBrandEdit;
