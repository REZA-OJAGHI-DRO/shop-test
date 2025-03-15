import { Controller, useForm } from "react-hook-form";
import { useMutation } from '@tanstack/react-query';
import {
  React,
  useEffect,
  useState,
  useSelector,
  GetCookie,
  InputSelectAll,
  profileSupplierUpdate,
} from "@/component/management-panel/import-management.js";

const Form3 = ({
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

 
  // ********
  const [options7, setOptions7] = useState([
    { key: "1", value: "نقدی" },
    { key: "2", value: "چکی" },
    { key: "3", value: "پیش فروش" },
  ]);
  const result3 =
    data?.cash === true ||
    data?.installments === true ||
    data?.preOrder === true
      ? [
          data?.cash === true && { key: "1", value: "نقدی" },
          data?.installments === true && { key: "2", value: "چکی" },
          data?.preOrder === true && { key: "3", value: "پیش فروش" },
        ].filter(Boolean)
      : [];
  const [activity3, setActivity3] = useState(result3.map((opt) => opt.key));
  const [cash, setCash] = useState(false);
  const [installments, setInstallments] = useState(false);
  const [preOrder, setPreOrder] = useState(false);

  // به‌روزرسانی وضعیت‌ها با توجه به activity
  useEffect(() => {
    setCash(activity3.includes("1"));
    setInstallments(activity3.includes("2"));
    setPreOrder(activity3.includes("3"));
  }, [activity3]);
  // ********
  useEffect(() => {
    if (data) {
      setCash(data?.cash);
      setInstallments(data?.installments);
      setPreOrder(data?.preOrder);
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
        activity3
    },
  });

  useEffect(() => {
    reset({
        activity3
    });
  }, [activity3 , reset]);

  const [dataT, setDataT] = useState(data);

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
      Boolean(dataT?.installments) !== Boolean(installments) ||
      Boolean(dataT?.cash) !== Boolean(cash) ||
      Boolean(dataT?.preOrder) !== Boolean(preOrder);

    if (hasChanged) {
      const updatedData = {
        id: dataT?.id,
        name: null,
        phone: null,
        phone2: null,
        accountantMobile: null,
        coordinatorMobile: null,
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
        isPerson: null,
        birthDate: null,
        importDescription: null,
        produceDescription: null,
        spreaderDescription: null,
        hasImport: null,
        hasProduce: null,
        hasSpread: null,
        installments: installments,
        cash: cash,
        preOrder: preOrder,
        nationalId: null,
        companyNationalId: null,
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
   <div className="w-[100%]">
   <label className="w-full"> نوع فروش :</label>
        <Controller
          name="activity3" 
          control={control}
          rules={{
            required: {
              value: false, 
              message: "لطفاً یک گزینه انتخاب کنید",
            },
          }}
          render={({ field }) => (
            <InputSelectAll
              options={options7}
              data={activity3}
              setData={(value) => {
                setActivity3(value);
                field.onChange(value); 
              }}
              disabled={roleCookie === "Supplier"}
            />
          )}
        />
        {/* نمایش خطای اعتبارسنجی */}
        {errors.activity3 && (
          <p style={{ color: "red" }}>{errors.activity3.message}</p>
        )}
      </div>

      {/* دکمه ارسال */}
      <div className="w-full h-[100px] items-center  flex justify-center">
        <button
          type="submit"
          className={
            " w-[40%] h-[35px] bg-custom-green shadow-custom-6 px-2 hover:scale-95  transition-all duration-300 text-white rounded-2xl text-[1.1rem] flex justify-center items-center"
          }
        >
          ثبت ویرایش
        </button>
      </div>
    </form>
  );
};

export default Form3;
