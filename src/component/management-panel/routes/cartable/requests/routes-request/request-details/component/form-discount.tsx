import { Controller, useForm, SubmitHandler } from "react-hook-form";
import {
  React,
  useEffect,
  useState,
  Price,
  InputNumber,
  CheckBoxAccordion2,
} from "@/component/management-panel/import-management.js";

// تعریف نوع برای Props کامپوننت
interface FormDiscountProps {
  setAmount: (amount: string) => void;
  amount: string;
  setTitle: (title: string) => void;
  title: string;
  setType: (type: number) => void;
  type: number;
  setShowDiscount: (show: boolean) => void;
  setShowDiscount2: (show: boolean) => void;
}

interface FormValues {
  title: string;
  amount: string;
  discountType: number; 
}

const FormDiscount: React.FC<FormDiscountProps> = ({
  setAmount,
  amount,
  setTitle,
  title,
  setType,
  type,
  setShowDiscount,
  setShowDiscount2,
}) => {
  const [discountType, setDiscountType] = useState<number | undefined>(type); 

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      title: title || "",
      amount: amount || "",
      discountType: discountType, 
    },
  });

  useEffect(() => {
    reset({
      title,
      amount,
      discountType,
    });
  }, [title, amount, discountType, reset]);

  const onSubmit: SubmitHandler<FormValues> = (dataAll) => {
    setTitle(dataAll.title);
    setAmount(dataAll.amount);
    setDiscountType(dataAll.discountType);
    setType(dataAll.discountType == 0 ? 2 : 1);
    setShowDiscount(false);
    setShowDiscount2(true);
    
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-wrap gap-4 justify-center"
    >
      <div className="w-full flex justify-center gap-5">
        {/* فیلد عنوان */}
        <div className="w-[100%] lg:w-[45%] xl:w-[30%]">
          <Controller
            name="title"
            control={control}
            rules={{
              required: {
                value: true,
                message: "وارد کردن عنوان الزامی است",
              },
            }}
            render={({ field }) => (
              <InputNumber
                {...field}
                type="text"
                placeholder={"عنوان"}
                label={""}
                svg={false}
                width={"w-[100%]"}
                styleLabel={"text-[1rem] xl:text-[1rem] text-black hidden"}
                styleInput={"text-[1rem] xl:text-[1rem] h-[35px]"}
                styleBox={"bg-[#ffffff]"}
                disabled={false}
              />
            )}
          />
          {errors.title && (
            <p style={{ color: "red" }}>{errors.title.message}</p>
          )}
        </div>

        {/* فیلد مبلغ */}
        <div className="w-[100%] lg:w-[45%] xl:w-[30%] flex flex-wrap">
          <Controller
            name="amount"
            control={control}
            rules={{
              required: {
                value: true,
                message: "وارد کردن مبلغ الزامی است",
              },
            }}
            render={({ field }) => (
              <Price
                {...field}
                placeholder={"مبلغ"}
                label={""}
                svg={false}
                width={"w-[100%]"}
                max={""}
                data={field.value}
                setData={(value) => {
                  if (/^[0-9]*$/.test(value)) {
                    field.onChange(value);
                  }
                }}
                styleLabel={"text-[1rem] xl:text-[1rem] text-black hidden"}
                styleInput={"text-[1rem] xl:text-[1rem] h-[35px]"}
                styleBox={"bg-[#ffffff]"}
                disabled={false}
              />
            )}
          />
          {errors.amount && (
            <p style={{ color: "red" }}>{errors.amount.message}</p>
          )}
        </div>
      </div>

      {/* فیلد نوع تخفیف (چک‌باکس‌ها) */}
      <div className="w-[100%] flex flex-wrap justify-center items-center gap-1">
        <Controller
          name="discountType"
          control={control}
          rules={{
            required: "انتخاب یکی از گزینه‌ها الزامی است",
            validate: (value) =>
              value === 0 || value === 1 || "انتخاب یکی از گزینه‌ها الزامی است",
          }}
          render={({ field }) => (
            <div className="w-[100%] flex justify-center items-center gap-1">
              <div className="w-[30%]">
                <CheckBoxAccordion2
                  label={"اضافه کردن تخفیف"}
                  isChecked={field.value === 0}
                  onCheck={() => field.onChange(0)} // تنظیم مقدار به 0
                />
              </div>
              <div className="w-[30%]">
                <CheckBoxAccordion2
                  label={"اضافه کردن اضافات"}
                  isChecked={field.value === 1}
                  onCheck={() => field.onChange(1)} // تنظیم مقدار به 1
                />
              </div>
            </div>
          )}
        />
        {errors.discountType && (
          <p style={{ color: "red" }}>{errors.discountType.message}</p>
        )}
      </div>

      {/* دکمه تایید */}
      <div className="w-full flex justify-center">
        <button
          type="submit"
          className={
            "w-[25%] h-[35px] bg-custom-green shadow-custom-6 px-2 hover:scale-95 transition-all duration-300 text-white rounded-2xl text-[1.1rem] flex justify-center items-center"
          }
        >
          تایید
        </button>
      </div>
    </form>
  );
};

export default FormDiscount;
