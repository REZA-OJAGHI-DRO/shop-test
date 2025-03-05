import { Controller, useForm } from "react-hook-form";

import { useMutation } from "@tanstack/react-query";
import {
  React,
  useEffect,
  useState,
  InputNumber,
  useSelector,
  GetCookie,
  InputSelect,
  InputTextArea,
  InputMultipleChoiceSelection,
  Price,
  LedgerAccountCreateCredit,
} from "@/component/management-panel/import-management.js";

const IncreaseCredit = ({
  setTypeModal,
  order,
  setLoad3,
  setCheck,
  setMessage,
  setUpdateTable,
  updateTable,
  setCheckData,
}) => {
  const token = useSelector((state) => state.product.token);
  const chabk = useSelector((state) => state.product.chabk);

  const [roleCookie, setRoleCookie] = useState(GetCookie("role"));

  const [type, setType] = useState();
  const [options, setOptions] = useState([
    { key: "1", value: "اعتبار با حساب دفتری" },
    //   { key: "2", value: "اعتبار با چک ضمانت" },
  ]);

  const [limit, setLimit] = useState();
  //   **********

  //   *********
  const {
    control,
    // register, // برای ثبت کردن فیلدها
    handleSubmit, // برای هندل کردن سابمیت فرم
    formState: { errors }, // برای مدیریت خطاها
    reset,
  } = useForm({
    defaultValues: {
      type,
      limit,
    },
  });

  useEffect(() => {
    reset({
      type,
      limit,
    });
  }, [type, limit, reset]);

    const mutation = useMutation({
      mutationFn: LedgerAccountCreateCredit,
      onMutate: () => {
        setLoad3(true);
      },
      onSuccess: (result) => {
        setMessage(result.error ? result.error : result.message);
        if (result.isSuccess) {
            setUpdateTable(!updateTable);
            setTypeModal(1)
          setCheck((prev) => ({ ...prev, check1: true }));

          setLoad3(false);
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
        setLoad3(false);
        setMessage(error.message || "عملیات با خطا مواجه شد");
        setCheck((prev) => ({ ...prev, check4: true }));
        setTimeout(() => {
          setMessage("");
          setCheck((prev) => ({ ...prev, check4: false }));
        }, 5000);
      },
      onSettled: () => {
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
        currentUserType: 0,
        receiverUserId: order?.shopperUserId,
        receiverType: 1,
        type: dataAll?.type,
        documentId: null,
        limit: dataAll?.limit,
      },
      token,
      chabk,
      setCheckData,
      setMessage,
    };
    mutation.mutate({ updatedDataAll });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-wrap gap-4 p-4 rounded-t-lg justify-center"
    >
      <div
        className={`w-[100%] lg:w-[45%] xl:w-[30%] flex flex-wrap gap-1 items-center`}
      >
        <p className="w-full">روش پرداخت فاکتور :</p>
        <Controller
          name="type"
          control={control}
          rules={{
            required: {
              value: true,
              message: " انتخاب روش پرداخت الزامی است",
            },
          }}
          render={({ field }) => (
            <InputSelect
              options={options}
              data={type}
              setData={(selected) => {
                setType(selected);
                field.onChange(selected);
              }}
            />
          )}
        />
        {errors.type && <p style={{ color: "red" }}>{errors.type.message}</p>}
      </div>
      <div className={`w-[100%] lg:w-[45%] xl:w-[30%] flex flex-wrap`}>
        <Controller
          name="limit"
          control={control}
          rules={{
            required: {
              value: true,
              message: " انتخاب مبلغ الزامی است",
            },
          }}
          render={({ field }) => (
            <Price
              {...field}
              placeholder={"مبلغ"}
              label={`میزان مبلغ اعتبار اعطایی - تومان`}
              svg={false}
              width={"w-[100%]"}
              max={""}
              data={limit}
              setData={(value) => {
                if (/^[0-9]*$/.test(value)) {
                  field.onChange(value);
                  setLimit(value);
                }
              }}
              styleLabel={"text-[1rem] xl:text-[1rem] text-black "}
              styleInput={"text-[1rem] xl:text-[1rem] h-[35px] "}
              styleBox={"bg-[#ffffff]"}
              disabled={false}
            />
          )}
        />
        {errors.limit && <p style={{ color: "red" }}>{errors.limit.message}</p>}
      </div>
      <div className="w-full flex justify-center">
        <button
          type="submit"
          className={
            "w-[25%] h-[35px] bg-[#23405de3] shadow-custom-6 px-2 hover:scale-95 transition-all duration-300 text-white rounded-lg text-[1.1rem] flex justify-center items-center"
          }
        >
          تایید تغییرات
        </button>
      </div>
    </form>
  );
};

export default IncreaseCredit;
