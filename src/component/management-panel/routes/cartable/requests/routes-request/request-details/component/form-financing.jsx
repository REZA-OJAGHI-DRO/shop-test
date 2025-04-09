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
  GeneralTable,
} from "@/component/management-panel/import-management.js";

const FormFinancing = ({
  setDeterminingCredit,
  remainder,
  dataTable,
  setSendData,
  sendData,
  setMessage,
  setCheck
}) => {
  const token = useSelector((state) => state.product.token);
  const chabk = useSelector((state) => state.product.chabk);

  const [roleCookie, setRoleCookie] = useState(GetCookie("role"));

  const [amount, setAmount] = useState(0);
  useEffect(()=>{
    setAmount(remainder)
  },[remainder])
  const [settlementType, setSettlementType] = useState();
  const [options, setOptions] = useState([
    { key: "1", value: "نقدی - ارسال کالا پس از واریز وجه" },
    { key: "2", value: "مدت دار - ارسال کالا پس از پرداخت چک" },
    { key: "3", value: "مدت دار -  به صورت حساب دفتری" },
    { key: "4", value: "مدت دار - حساب دفتری با چک ضمانت" },
  ]);

  const [settlementDueDate, setSettlementDueDate] = useState();
  const [submitDocsDueDate, setSubmitDocsDueDate] = useState();
  
  const [submitDocsMethods, setSubmitDocsMethods] = useState();
  const [options2, setOptions2] = useState([
      { key: "1", value: "بارگزاری در دفتر چک اپلیکیشن" },
      { key: "2", value: "بارگزاری در دفتر حساب اپلیکیشن" },
      { key: "3", value: "ارسال اسناد به صورت پرداخت آنلاین" },
      { key: "4", value: "ارسال اسناد در چت با تامین کننده" },
    ]);
    
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
      settlementType,
      amount,
      settlementDueDate,
      submitDocsMethods,
      submitDocsDueDate,
    },
  });

  useEffect(() => {
    reset({
      settlementType,
      amount,
      settlementDueDate,
      submitDocsMethods,
      submitDocsDueDate,
    });
  }, [
    settlementType,
    amount,
    settlementDueDate,
    submitDocsMethods,
    submitDocsDueDate,
    reset,
  ]);

  const onSubmit = async (dataAll) => {
    setCheck((prev) => ({
        ...prev,
        check1: false,
        check2: false,
        check3: false,
        check4: false,
      }));

    const newAmount = parseInt(dataAll?.amount || 0);
    const totalUsed = sendData.reduce((sum, item) => sum + parseInt(item.amount || 0), 0);
    const updatedRemaining = remainder - (totalUsed + newAmount);
  
    if (updatedRemaining < 0) {
      setCheck((prev) => ({ ...prev, check3: true }));
      setMessage("مقدار وارد شده بیشتر از حد مجاز است!");
      setTimeout(() => {
        setMessage('')
        setCheck((prev) => ({ ...prev, check3: false }));
        setCheck((prev) => ({ ...prev, check1: false }));
      }, 5000);
      reset({
        settlementType: "",
        amount: "",
        settlementDueDate: "",
        submitDocsMethods: "",
        submitDocsDueDate: "",
      });
      setSettlementType("");
      setAmount("");
      setSettlementDueDate("");
      setSubmitDocsMethods("");
      setSubmitDocsDueDate("");
      return;
    }
  
    const data = {
      amount: newAmount,
      settlementDueDate: dataAll?.settlementDueDate,
      settlementType: dataAll?.settlementType,
      submitDocsDueDate: dataAll.settlementType == 1 ? 0 : dataAll.settlementType == 2 ? 0 :  dataAll?.submitDocsDueDate,
      submitDocsMethods: dataAll?.submitDocsMethods,
    };
  
    setSendData((prev) => [...prev, data]);
  
    reset({
      settlementType: "",
      amount: "",
      settlementDueDate: "",
      submitDocsMethods: "",
      submitDocsDueDate: "",
    });
  
    setSettlementType("");
    setAmount(updatedRemaining);
    setSettlementDueDate("");
    setSubmitDocsMethods("");
    setSubmitDocsDueDate("");
  };
  
  
    
  
  
  

  function openModal() {
    setDeterminingCredit(true);
  }
  

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [totalItems, setTotalItems] = useState(1);
  const [filter, setFilter] = useState("");


  const handleDelete = (id) => {
    const itemToDelete = sendData[id]; 
    const updatedData = sendData.filter((item, index) => index !== id);
    setSendData(updatedData);
    const totalUsedAfterDeletion = updatedData.reduce(
      (sum, item) => sum + parseInt(item.amount || 0),
      0
    );
    setAmount(priceAll - totalUsedAfterDeletion); 
  
    setSendData(updatedData);
  };

  const handleEdit = (index) => {
    const itemToEdit = sendData[index];
    setSettlementType(itemToEdit.settlementType);
    setAmount(itemToEdit.amount);
    setSettlementDueDate(itemToEdit.settlementDueDate);
    setSubmitDocsMethods(itemToEdit.submitDocsMethods);
    setSubmitDocsDueDate(itemToEdit.submitDocsDueDate);
    handleDelete(index)
  };
  
  
  

  // تعریف ساختار داده‌ها برای نمایش در جدول
  const items = sendData.map((item, i) => ({
      id: i, // استفاده از index برای شناسایی هر آیتم
      settlementType:
          item.settlementType == 1
              ? "نقدی - ارسال کالا پس از واریز وجه"
              : item.settlementType == 2
              ? "مدت دار - ارسال کالا پس از پرداخت چک"
              : item.settlementType == 3
              ? "مدت دار -  به صورت حساب دفتری"
              : item.settlementType == 4
              ? "مدت دار - حساب دفتری با چک ضمانت"
              : "",
      amount: item.amount,
      settlementDueDate: item.settlementDueDate,
      submitDocsDueDate: item.submitDocsDueDate,
      submitDocsMethods: Array.isArray(item.submitDocsMethods)
      ? item.submitDocsMethods
          .map((method) => options2.find((opt) => opt.key == method)?.value)
          .filter(Boolean)
          .join("  /  ")
      : "",
  }));

  // تعریف ساختار هدر جدول
  const headers = [
      { key: "settlementType", title: "نوع تسویه", style: "w-[20%] border-l text-center" },
      { key: "amount", title: "مبلغ", style: "w-[15%] border-l text-center" },
      { key: "settlementDueDate", title: "تاریخ سررسید", style: "w-[15%] border-l text-center" },
      { key: "submitDocsDueDate", title: "تاریخ ارسال اسناد", style: "w-[15%] border-l text-center" },
      { key: "submitDocsMethods", title: "روش‌های ارسال اسناد", style: "w-[25%] border-l text-center" },
      {
          key: "actions",
          title: "عملیات",
          style: "w-[10%] border-l text-center",
          buttons: [
            {
                text: "ویرایش",
                style: `bg-[#B27BFF] text-white px-2 py-1 rounded hover:scale-95 transition-all duration-300`,
                onClick: (item) => handleEdit(item.id),
              },
              {
                  text: "حذف",
                  style: "bg-red-500 text-white px-2 py-1 rounded hover:scale-95 transition-all duration-300",
                  onClick: (item) => handleDelete(item.id),
              },

          ],
      },
  ];

  // فیلتر کردن داده‌ها بر اساس مقدار `filter`
  const filteredItems = items.filter((item) => item.settlementType.includes(filter));

  return (
    <>
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-wrap gap-4 bg-zinc-100 p-4 rounded-t-lg justify-center"
    >
      <div
        className={`w-[100%] lg:w-[45%] ${
          settlementType == 1
            ? "xl:w-[45%]"
            : settlementType == 2
            ? "xl:w-[45%]"
            : settlementType == 3
            ? "xl:w-[30%]"
            : settlementType == 4
            ? "xl:w-[30%]"
            : "xl:w-[45%]"
        } xl:w-[30%] flex flex-wrap gap-1 items-center`}
      >
        <p className="w-full">روش پرداخت فاکتور :</p>
        <Controller
          name="settlementType"
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
              data={settlementType}
              setData={(selected) => {
                setSettlementType(selected);
                field.onChange(selected);
              }}
            />
          )}
        />
        {errors.settlementType && (
          <p style={{ color: "red" }}>{errors.settlementType.message}</p>
        )}
      </div>
      {(settlementType == 3 || settlementType == 4) && (
        <div
          className={`w-[100%] lg:w-[45%] h-[40px] ${
            settlementType == 1
              ? "xl:w-[45%]"
              : settlementType == 2
              ? "xl:w-[45%]"
              : settlementType == 3
              ? "xl:w-[30%]"
              : settlementType == 4
              ? "xl:w-[30%]"
              : "xl:w-[45%]"
          } flex flex-wrap`}
        >
          <div className="w-full flex gap-3">
            <p className="text-[1rem] xl:text-[1rem] text-black ">
              مانده اعتبار - تومان
            </p>
            <button
              type="button"
              onClick={openModal}
              className="text-white text-[.8rem] rounded-md bg-[#4CA232] px-3 text-nowrap hover:scale-95  transition-all duration-300"
            >
              تعیین و ویرایش اعتبار
            </button>
          </div>
          <Controller
            name="creditBalance"
            control={control}
            rules={{}}
            render={({ field }) => (
              <Price
                {...field}
                placeholder={dataTable[0]?.balance}
                label={""}
                svg={false}
                width={"w-[100%] h-[40px]"}
                max={""}
                data={dataTable[0]?.balance}
                //    setData={(value) => {
                //      if (/^[0-9]*$/.test(value)) {
                //        field.onChange(value);
                //      }
                //    }}
                styleLabel={"text-[1rem] xl:text-[1rem] text-black "}
                styleInput={"text-[1rem] xl:text-[1rem] h-[35px] "}
                styleBox={"bg-[rgba(0,0,0,.05)]"}
                disabled={true}
              />
            )}
          />
          {errors.creditBalance && (
            <p style={{ color: "red" }}>{errors.creditBalance.message}</p>
          )}
        </div>
      )}
      <div
        className={`w-[100%] lg:w-[45%] ${
          settlementType == 1
            ? "xl:w-[45%]"
            : settlementType == 2
            ? "xl:w-[45%]"
            : settlementType == 3
            ? "xl:w-[30%]"
            : settlementType == 4
            ? "xl:w-[30%]"
            : "xl:w-[45%]"
        } flex flex-wrap`}
      >
        <Controller
          name="amount"
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
              placeholder={amount}
              label={`${
                settlementType == 1
                  ? " میزان مبلغ واریز نقدی - تومان"
                  : settlementType == 2
                  ? " میزان مبلغ چک پرداختی - تومان"
                  : settlementType == 3
                  ? "میزان اعتبار مصرف شده به ازای فاکتور جاری"
                  : settlementType == 4
                  ? "میزان اعتبار مصرف شده به ازای فاکتور جاری"
                  : "میزان مبلغ "
              }`}
              svg={false}
              width={"w-[100%] h-[40px]"}
              max={""}
              data={amount}
              setData={(value) => {
                if (/^[0-9]*$/.test(value)) {
                  field.onChange(value);
                  setAmount(value);
                }
              }}
              styleLabel={"text-[1rem] xl:text-[1rem] text-black "}
              styleInput={"text-[1rem] xl:text-[1rem] h-[35px] "}
              styleBox={"bg-[#ffffff]"}
              disabled={false}
            />
          )}
        />
        {errors.amount && (
          <p style={{ color: "red" }}>{errors.amount.message}</p>
        )}
      </div>

      {(settlementType == 3 || settlementType == 4) && (
        <div
          className={`w-[100%] lg:w-[45%] ${
            settlementType == 1
              ? "xl:w-[45%]"
              : settlementType == 2
              ? "xl:w-[45%]"
              : settlementType == 3
              ? "xl:w-[30%]"
              : settlementType == 4
              ? "xl:w-[30%]"
              : "xl:w-[45%]"
          }`}
        >
          <Controller
            name="submitDocsDueDate"
            control={control}
            rules={{
              required: {
                value: false,
                message: "وارد کردن مهلت زمانی ارسال اسناد الزامی است",
              },
            }}
            render={({ field }) => (
              <InputNumber
                {...field}
                type="number"
                placeholder={""}
                label={"مهلت زمانی ارسال اسناد"}
                svg={false}
                width={"w-[100%]"}
                value={submitDocsDueDate}
                onChange={(e) => {
                  let value = e.target.value;
                  setSubmitDocsDueDate(value);
                  field.onChange(value);
                }}
                styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
                styleInput={"text-[1rem] xl:text-[1rem] h-[35px]"}
                styleBox={"bg-[#ffffff]"}
                disabled={false}
              />
            )}
          />
          {errors.submitDocsDueDate && (
            <p style={{ color: "red" }}>{errors.submitDocsDueDate.message}</p>
          )}
        </div>
      )}
      <div
        className={`w-[100%] lg:w-[45%] ${
          settlementType == 1
            ? "xl:w-[45%]"
            : settlementType == 2
            ? "xl:w-[45%]"
            : settlementType == 3
            ? "xl:w-[30%]"
            : settlementType == 4
            ? "xl:w-[30%]"
            : "xl:w-[45%]"
        }`}
      >
        <Controller
          name="settlementDueDate"
          control={control}
          rules={{}}
          render={({ field }) => (
            <InputNumber
              {...field}
              type="number"
              placeholder={""}
              label={`${
                settlementType == 1
                  ? "مهلت واریز وجه از زمان اعلام"
                  : settlementType == 2
                  ? "تاریخ سر رسید چک"
                  : settlementType == 3
                  ? "موعد سررسید"
                  : settlementType == 4
                  ? "موعد سررسید"
                  : "مهلت ارسال"
              }`}
              svg={false}
              width={"w-[100%]"}
              value={settlementDueDate}
              onChange={(e) => {
                let value = e.target.value;
                setSettlementDueDate(value);
                field.onChange(value);
              }}
              styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
              styleInput={"text-[1rem] xl:text-[1rem] h-[35px]"}
              styleBox={"bg-[#ffffff]"}
              disabled={false}
            />
          )}
        />
        {errors.settlementDueDate && (
          <p style={{ color: "red" }}>{errors.settlementDueDate.message}</p>
        )}
      </div>
      <div
        className={`w-[100%] lg:w-[45%] ${
          settlementType == 1
            ? "xl:w-[45%]"
            : settlementType == 2
            ? "xl:w-[45%]"
            : settlementType == 3
            ? "xl:w-[30%]"
            : settlementType == 4
            ? "xl:w-[30%]"
            : "xl:w-[45%]"
        } flex flex-wrap gap-1 items-center`}
      >
        <p className="w-full">روش ارسال اسناد :</p>
        <Controller
          name="submitDocsMethods"
          control={control}
          rules={{
            required: {
              value: true,
              message: " انتخاب روش ارسال اسناد الزامی است",
            },
          }}
          render={({ field }) => (
            <InputMultipleChoiceSelection
              options={options2}
              data={submitDocsMethods}
              setData={(selected) => {
                setSubmitDocsMethods(selected);
                field.onChange(selected);
              }}
            />
          )}
        />
        {errors.submitDocsMethods && (
          <p style={{ color: "red" }}>{errors.submitDocsMethods.message}</p>
        )}
      </div>

      <div className="w-[100%] lg:w-[45%] xl:w-[74%] rounded-none ">
        <Controller
          name="description"
          control={control}
          rules={{}}
          render={({ field }) => (
            <InputTextArea
              {...field}
              type="text"
              label={"توضیحات ارسالی به خریدار :"}
              width={"w-[100%] rounded-none"}
              placeholder={""}
              styleLabel={"black"}
              value={
                settlementType == 1
                  ? "در این فاکتور، تایید پرداخت به روش ارسال فیش واریزی از طریق صفحه چت و یا بخش تامین اعتبار کاربر (اتصال به درگاه بانکی و پرداخت موفق) خواهد بود و پس از واریز، امکان ارسال بار فراهم می گردد، در صورت عدم استفاده از پرداخت آنلاین، شبکه تجارت هیچ گونه مسئولیتی در قبال این فرآیند ندارد."
                  : settlementType == 2
                  ? "در این فاکتور، تایید پرداخت به روش ارسال و بارگزاری چک از طریق دفتر چک توسط درخواست دهنده خواهد بود و پس از تایید چک توسط تامین کننده، امکان ارسال بار در دستور کار قرار می گیرد. "
                  : settlementType == 3
                  ? "در این فاکتور، حساب دفتری برای فرد باز خواهید کرد و اسناد خرید، طی مدت مشخص شده به روش ارسال فیش واریزی و یا چک از طریق دفتر چک یا دفتر حساب اپلیکیشن بارگزاری گردد."
                  : settlementType == 4
                  ? "در این فاکتور، شما با دریافت یک چک ضمانت حساب دفتری برای خریدار باز خواهید کرد و اسناد خرید، طی مدت مشخص شده، به روش ارسال فیش واریزی و یا چک از طریق دفتر چک اپلیکیشن بارگزاری گردد."
                  : ""
              }
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 200) {
                  field.onChange(e);
                }
              }}
              styleTextarea={"bg-white h-[130px] p-2"}
              disabled={true}
            />
          )}
        />
        {errors.description && (
          <p style={{ color: "red" }}>{errors.description.message}</p>
        )}
      </div>

      <div className="w-full flex justify-center pt-2">
        <hr className="w-[80%] border border-zinc-300" />
      </div>
      <div className="w-full items-center flex justify-start">
        <button
          type="submit"
          className={
            " h-[40px] hover:scale-95  transition-all duration-300 text-[#138BC0] rounded-2xl text-[.9rem] flex justify-start items-center"
          }
        >
          + اضافه کردن ردیف بعدی
        </button>
      </div>
    </form>
    {sendData.length > 0 &&
    <div className="w-full p-4 bg-zinc-100">
            <GeneralTable
                data={sendData}
                items={items}
                headers={headers}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                totalItems={totalItems}
                filteredItems={filteredItems}
                filter={filter}
                setFilter={setFilter}
            />
        </div>
        }
    </>
  );
};

export default FormFinancing;
