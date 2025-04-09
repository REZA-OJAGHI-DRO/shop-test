import { Controller, useForm } from "react-hook-form";
import { useMutation } from '@tanstack/react-query';
import {
  React,
  useEffect,
  useState,
  useSelector,
  GetCookie,
  File,
  sendDataToServer,
} from "@/component/management-panel/import-management.js";

const FormUploadImage = ({
  setLoad2,
  setLoad,
  dataImage,
  setDataImage,
  setCheck,
  setMessage,
  setUpdateImage,
  updateImage,
  id,
  setShowViewModal2,
  setCheckAll,
  check,
  setCheckData,
  setMessageData,
  setCheckDataAll,
}) => {
  const token = useSelector((state) => state.product.token);
  const chabk = useSelector((state) => state.product.chabk);

  const [roleCookie, setRoleCookie] = useState(GetCookie("role"));

  //   **********
  const {
    control,
    // register, // برای ثبت کردن فیلدها
    handleSubmit, // برای هندل کردن سابمیت فرم
    formState: { errors }, // برای مدیریت خطاها
    reset,
  } = useForm({
    defaultValues: {
      dataImage,
    },
  });

  useEffect(() => {
    reset({
      dataImage,
    });
  }, [dataImage, reset]);

 const mutation = useMutation({
    mutationFn: sendDataToServer, 
    onMutate: () => {
      setLoad(true);
    },
    onSuccess: (result) => {
      setLoad(false); 
      if (result.isSuccess) {
        setMessage(result.message || 'عملیات با موفقیت انجام شد');
        setCheck((prev) => !prev);
        setCheckAll((r) => ({ ...r, check1: true }));
        setShowViewModal2(false)
        setTimeout(()=>{
            setUpdateImage(!updateImage)
        },1500)
        setTimeout(() => {
          setMessage('');
          setCheckAll((r) => ({ ...r, check4: false, check1: false }));
        }, 5000);
      }
    },
    onError: (error) => {
      setLoad(false);
      setMessage(error.message || 'درخواست شما ارسال نشد');
      setCheck((prev) => !prev);
      setCheckAll((r) => ({ ...r, check4: true }));

      setTimeout(() => {
        setMessage('');
        setCheckAll((r) => ({ ...r, check4: false, check1: false }));
      }, 5000);
    },
    onSettled: () => {
      setLoad(false); 
      setTimeout(() => {
        setMessage('');
        setCheckAll((r) => ({ ...r, check4: false, check1: false }));
      }, 5000);
    },
  });


  const onSubmit = async (dataAll) => {
    setLoad(true);
    const requestData = {
        supplierId: id,
        fileIds: [dataAll?.dataImage],
      token: token,
      chabk: chabk,
    };

    mutation.mutate(requestData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-wrap gap-4 justify-center"
    >
      <div className="w-[80%] lg:w-[70%] flex justify-center flex-wrap">
        <Controller
          name="dataImage"
          control={control}
          rules={{
            required: {
              value: true,
              message: "آپلود عکس الزامی است",
            },
          }}
          render={({ field }) => (
            <File
              {...field}
              width={"w-[100%] lg:w-[100%]"}
              setDataFile={(file) => {
                setDataImage(file);
                field.onChange(file);
              }}
              style2={"h-[40px]"}
              styleLabel={"text-black"}
              type={7}
              setLoad={setLoad}
              fileType={"image"}
              setCheck={setCheck}
              setMessage={setMessage}
              updateImage={updateImage}
            />
          )}
        />
        {errors.dataImage && (
          <p style={{ color: "red" }}>{errors.dataImage.message}</p>
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
          ثبت عکس
        </button>
      </div>
    </form>
  );
};

export default FormUploadImage;
