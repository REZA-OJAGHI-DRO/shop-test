import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import {
  React,
  useEffect,
  useState,
  useSelector,
  UploadIceCertificate,
  File,
  InputDate2,
  convertToJalali,
} from "@/component/management-panel/import-management.js";

const FormIssuanceOfCertificate = ({
  selectedId,
  setSelectedId,
  setOpenModal,
  setLoad,
  setMessage,
  setCheck,
  setCheckData,
}) => {
  const token = useSelector((state) => state.product.token);
  const chabk = useSelector((state) => state.product.chabk);

  const [shopperLicense, setShopperLicense] = useState("");
  const [date, setDate] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      shopperLicense: "",
      date: "",
    },
  });

  useEffect(() => {
    reset({ shopperLicense, date });
  }, [shopperLicense, date, reset]);

  const mutation = useMutation({
    mutationFn: UploadIceCertificate,
    onMutate: () => setLoad(true),
    onSuccess: (result) => {
      setMessage(result.error ? result.error : result.message);
      if (result.isSuccess) {

        reset({ shopperLicense: "", date: "" });
        setShopperLicense("");
        setDate("");
        setSelectedId("");
        setOpenModal(false);
        setTimeout(() => setLoad(false), 1500);

        reset({shopperLicense});
        setSelectedId('')
        setShopperLicense('')
        setOpenModal(false)
        setTimeout(() => {
          
          setLoad(false);
        }, 1500);

        setCheck((prev) => ({ ...prev, check1: true }));
        setTimeout(() => setCheck({ check1: false, check2: false }), 5000);
      } else {
        setCheck((prev) => ({ ...prev, check1: true }));
        setLoad(false);
        setTimeout(() => setCheck({ check1: false, check2: false }), 5000);
      }
    },
    onError: (error) => {
      setLoad(false);
      setMessage(error.message || "عملیات با خطا مواجه شد");
      setCheck((prev) => ({ ...prev, check4: true }));
      setTimeout(() => setCheck((prev) => ({ ...prev, check4: false })), 5000);
    },
    onSettled: () => setLoad(false),
  });

  const onSubmit = async (dataAll) => {
    setCheck({ check1: false, check2: false, check3: false, check4: false });

    const updatedDataAll = {
      data: {
        shopperId: selectedId,
        iceCertificate: dataAll?.shopperLicense,
        certificateDate: dataAll?.date,
      },
      token,
      chabk,
      setCheckData,
      setMessage,
    };
    console.log(dataAll);

    mutation.mutate({updatedDataAll});
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" flex flex-wrap gap-2 justify-center"
    >
      <div className="w-[250px] flex flex-wrap">
        <Controller
          name="shopperLicense"
          control={control}
          rules={{ required: "آپلود گواهی اعتبار الزامی است" }}
          render={({ field: { onChange, value } }) => (
            <File
              width="w-[100%] h-[60px]"
              label="گواهی اعتبار را آپلود کنید :"
              setDataFile={onChange} 
              style2="h-[40px]"
              styleLabel="text-black"
              type={19}
              setLoad={setLoad}
              fileType="image"
              setCheck={setCheck}
              setMessage={setMessage}
            />
          )}
        />

        {errors.shopperLicense && (
          <p style={{ color: "red" }}>{errors.shopperLicense.message}</p>
        )}
      </div>
      <div className="w-[250px] flex justify-center flex-wrap">
        <Controller
          name="date"
          control={control}
          rules={{ required: "انتخاب تاریخ تولد الزامی است" }}
          render={({ field }) => (
            <InputDate2
              dataDate={field.value}
              setDataDate={field.onChange}
              placeholder="انتخاب تاریخ ..."
            />
          )}
        />

        {errors.date && <p style={{ color: "red" }}>{errors.date.message}</p>}
      </div>
      <div className="w-full h-[100px] flex justify-center items-center">
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

export default FormIssuanceOfCertificate;
