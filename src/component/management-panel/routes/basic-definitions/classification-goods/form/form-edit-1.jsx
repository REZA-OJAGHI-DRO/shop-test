import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import {
  React,
  useEffect,
  useState,
  InputNumber,
  useSelector,
  GetCookie,
  categoryUpdate
} from "@/component/management-panel/import-management.js";

const FormEdit1 = ({
  data,
  setLoad,
  setIsLoading,
  setMessage,
  setCheck,
  setShowEditModal,
  setUpdateTable,
  updateTable,
  setCheckData
}) => {
  const token = useSelector((state) => state.product.token);
  const chabk = useSelector((state) => state.product.chabk);

  const [roleCookie, setRoleCookie] = useState(GetCookie("role"));
  const [name,setName]=useState('')
  const [code,setCode]=useState('')
  
  // ********

  // ********
  const [dataT, setDataT] = useState();

  useEffect(() => {
       setName(data?.name)
       setCode(data?.code)
       setDataT(data)
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
    code
    },
  });

  useEffect(() => {
    reset({
     name,
     code     
    });
  }, [
   name,
   code,
    reset,
  ]);

  const mutation = useMutation({
    mutationFn: categoryUpdate,
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (result) => {
      setIsLoading(false);
      setMessage(result.error ? result.error : result.message);
      if (result.isSuccess) {
        setTimeout(() => {
          setUpdateTable(!updateTable);
        }, 1500);
        setCheck((prev) => ({ ...prev, check1: true }));
        // setData({});
        setName('')
        setCode('')
        setShowEditModal(false)
        // setReset(true);
        setTimeout(() => {
          setMessage("");
          setCheck((prev) => ({ ...prev, check2: false }));
          setCheck((prev) => ({ ...prev, check1: false }));
        }, 5000);
      } else {
        setCheck((prev) => ({ ...prev, check1: true }));
        setTimeout(() => {
          setMessage("");
          setCheck((prev) => ({ ...prev, check2: false }));
          setCheck((prev) => ({ ...prev, check1: false }));
        }, 5000);
      }
    },
    onError: (error) => {
      setIsLoading(false);
      setMessage(error.message || "عملیات با خطا مواجه شد");
      setCheck((prev) => ({ ...prev, check4: true }));
      setTimeout(() => {
        setMessage("");
        setCheck((prev) => ({ ...prev, check4: false }));
      }, 5000);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const onSubmit = async (dataAll) => {
    setCheck((r) => ({ ...r, check1: false }));
    setCheck((r) => ({ ...r, check2: false }));
    setCheck((r) => ({ ...r, check3: false }));
    setCheck((r) => ({ ...r, check4: false }));

    if (!dataT) {
      setMessage("لطفا از جدول پایین کالا خود را برای ویرایش انتخاب کنید");
      setCheck((r) => ({ ...r, check3: true }));
      setTimeout(() => {
        setCheck((r) => ({ ...r, check3: false }));
      }, 5000);
    } else {
      let hasChanged =
        dataT?.name !== dataAll?.name ||
        dataT?.code !== dataAll?.code 

      if (hasChanged) {

        const updatedDataAll = {
          dataEdit: {
            id: dataT?.id,
            name: dataAll?.name,
            code: dataAll?.code,
            level:dataT?.level
          },
          token,
          chabk,
          setCheckData,
          setMessage,
        };
  
        mutation.mutate({updatedDataAll});
      } else {
        setCheck((r) => ({ ...r, check3: true }));
        setMessage("هیچ تغییری صورت نگرفته");
        setTimeout(() => {
          setCheck((r) => ({ ...r, check3: false }));
          setMessage("");
        }, 5000);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-wrap gap-4 justify-center"
    >
    
        <div className="w-[100%] lg:w-[45%]">
          <Controller
            name="name"
            control={control}
            rules={{
                required: {
                  value: true,
                  message: "نوع دسته بندی الزامی است",
                },
              }}
            render={({ field }) => (
              <InputNumber
                {...field}
                type="text"
                placeholder={"نوع دسته بندی را وارد کنید"}
                label={"نوع دسته بندی :"}
                svg={false}
                width={"w-[100%]"}
                value={name}
                onChange={(e) => {
                  const value = e.target.value;
                    setName(value);
                    field.onChange(e);
                }}
                styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
                styleInput={
                  "text-[1rem] xl:text-[1rem] h-[40px] xl:h-[35px] "
                }
                styleBox={"bg-[#ffffff]"}
                disabled={false}
              />
            )}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        </div>
        <div className="w-[100%] lg:w-[45%]">
          <Controller
            name="code"
            control={control}
            rules={{
                required: {
                  value: true,
                  message: "کد الزامی است",
                },
              }}
            render={({ field }) => (
              <InputNumber
                {...field}
                type="text"
                placeholder={"کد را وارد کنید"}
                label={"کد :"}
                svg={false}
                width={"w-[100%]"}
                value={code}
                onChange={(e) => {
                  const value = e.target.value;
                    setCode(value);
                    field.onChange(e);
                }}
                styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
                styleInput={
                  "text-[1rem] xl:text-[1rem] h-[40px] xl:h-[35px] "
                }
                styleBox={"bg-[#ffffff]"}
                disabled={false}
              />
            )}
          />
          {errors.code && <p style={{ color: "red" }}>{errors.code.message}</p>}
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

export default FormEdit1;
