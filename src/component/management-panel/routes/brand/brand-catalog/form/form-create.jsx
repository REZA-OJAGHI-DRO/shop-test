import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import {
  React,
  useEffect,
  useState,
  InputNumber,
  File,
  InputTextArea,
  ImageUpload,
  useSelector,
  PriceListCreate,
} from "@/component/management-panel/import-management.js";

const FormCreate = ({
  setLoad,
  setLoad3,
  setIsLoading,
  setMessage,
  setCheck,
  setShowCreateModal,
  setUpdateTable,
  setCheckDataAll,
  updateTable,
  setCheckData,
  setMessageData,
  brandId,
  dataImages,
  setDataImages,
  setShowDeleteModal,
  setDataDelete,
  setImage,
  image,
}) => {
  const token = useSelector((state) => state.product.token);
  const chabk = useSelector((state) => state.product.chabk);

  // Form control using react-hook-form
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      dataImages: null,  // null because it is a file
      description: "",
    },
  });

  // Update form fields if needed
  useEffect(() => {
    reset({
      title: "",
      dataImages: null,
      description: "",
    });
  }, [reset]);


   const mutation = useMutation({
      mutationFn: PriceListCreate,
      onMutate: () => {
        //   setIsLoading(true);
        setLoad3(true);
      },
      onSuccess: (result) => {
        //   setIsLoading(false);
        setMessage(result.error ? result.error : result.message);
        if (result.isSuccess) {
          setTimeout(() => {
            setUpdateTable(!updateTable);
            setShowCreateModal(false);
            reset({
              title: "",
              dataImages: null,
              description: "",
            });
            setImage([])
            setLoad3(false);
          }, 1500);
          setCheck((prev) => ({ ...prev, check1: true }));
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
        //   setIsLoading(false);
        setLoad3(false);
        setMessage(error.message || "عملیات با خطا مواجه شد");
        setCheck((prev) => ({ ...prev, check4: true }));
        setTimeout(() => {
          setMessage("");
          setCheck((prev) => ({ ...prev, check4: false }));
        }, 5000);
      },
      onSettled: () => {
        //   setIsLoading(false);
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
        brandId:brandId,
        title: dataAll?.title,
        priceFiles: dataAll?.dataImages,
        description: dataAll?.description,
      },
      token,
      chabk,
      setCheckData,
      setMessage,
    };

    mutation.mutate({updatedDataAll});
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-wrap gap-4 justify-center "
    >
      <div className="w-[100%] lg:w-[350px] h-[120px] ">
        <Controller
          name="title"
          control={control}
          rules={{
            required: { value: true, message: "عنوان لیست قیمت الزامی است" },
          }}
          render={({ field }) => (
            <InputNumber
              {...field}
              type="text"
              placeholder={"عنوان لیست قیمت را وارد کنید"}
              label={"عنوان لیست قیمت :"}
              svg={false}
              width={"w-[100%]"}
              styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
              styleInput={"text-[1rem] xl:text-[1rem] h-[40px] xl:h-[35px]"}
              styleBox={"bg-[#ffffff]"}
              disabled={false}
            />
          )}
        />
        {errors.title && <p className="w-[100%]" style={{ color: "red" }}>{errors.title.message}</p>}
      </div> 
      <div className="w-[100%] lg:w-[50%] rounded-none flex flex-col">
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <InputTextArea
              {...field}
              type="text"
              label={"توضیحات :"}
              width={"w-[100%] rounded-none"}
              placeholder={"توضیحات خود را وارد کنید"}
              styleLabel={"black"}
              styleTextarea={"bg-white h-[130px]"}
            />
          )}
        />
      </div>
      <div className="w-[100%] lg:w-[70%] flex flex-wrap gap-1 items-center">
            <Controller
              name="dataImages"
              control={control}
              rules={{
                required: { value: true, message: "آپلود فایل لیست قیمت برند الزامی است" }
              }}
              render={({ field }) => (
                <ImageUpload
                  width={"w-[100%] "}
                  label={"فایل لیست قیمت را آپلود کنید :"}
                  setData={(uploadedImages) => {
                    setDataImages(uploadedImages);
                    field.onChange(uploadedImages);
                  }}
                  data={dataImages}
                  styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
                  styleBox={" boxFilter"}
                  disabled={false}
                  type={2}
                  setLoad={setLoad}
                  fileType={"image"}
                  setCheck={setCheck}
                  setMessage={setMessage}
                  setShowDeleteModal={setShowDeleteModal}
                  setDataDelete={setDataDelete}
                  setImage={setImage}
                  image={image}
                />
              )}
            />
            {errors.dataImages && (
              <p className="w-[100%]" style={{ color: "red" }}>{errors.dataImages.message}</p>
            )}
          </div>

   

      <div className="w-full h-[100px] items-center flex justify-center">
        <button
          type="submit"
          className="w-[25%] h-[35px] bg-custom-green shadow-custom-6 px-2 hover:scale-95 transition-all duration-300 text-white rounded-2xl text-[1.1rem] flex justify-center items-center"
        >
          ثبت
        </button>
      </div>
    </form>
  );
};

export default FormCreate;
