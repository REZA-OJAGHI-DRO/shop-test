import {
  React,
  useCallback,
  useEffect,
  useState,
  useSelector,
  GoodDiscountGet,
} from "@/component/management-panel/import-management.js";

function SalesShowView({ id }) {
  const token = useSelector((state) => state.product.token);
  const chabk = useSelector((state) => state.product.chabk);

  const [checkData, setCheckData] = useState(false);
  const [messageData, setMessageData] = useState([]);
  const [checkDataAll, setCheckDataAll] = useState({
    check1: false,
  });
  const [data, setData] = useState([]);

  const [loading3, setLoading3] = useState(true)
  const MethodGet = useCallback(() => {
    setLoading3(true); // فعال کردن لودینگ قبل از دریافت داده‌ها
    GoodDiscountGet({
      id,
      token,
      chabk,
      setData,
      setCheckDataAll,
      setCheckData,
      setMessageData,
    }).finally(() => setLoading3(false)); // غیر فعال کردن لودینگ بعد از دریافت داده‌ها
  }, [id, token, chabk]);

  useEffect(() => {
    MethodGet();
  }, [MethodGet]);

  return (
    <>
    {loading3 ? (
    <p className="w-[80vw] text-center">در حال دریافت اطلاعات...</p>
  ) : (
    <div className="w-[100%] flex flex-wrap gap-2 justify-between">
    
        <div className="w-full lg:w-[40%] flex flex-wrap bg-white rounded-lg p-2 shadow-custom-6 gap-2">
          <p className="font-bold">نام قانون فروش :</p>
          <p className="">{data.name || "ندارد"}</p>
        </div>
        <div className="w-full lg:w-[40%] flex flex-wrap bg-white rounded-lg p-2 shadow-custom-6 gap-2">
          <p className=" font-bold">رتبه اعتباری خریدار :</p>
          <p className="">{data.shopperRankLimit || "ندارد"}</p>
        </div>
    

      
        <div className="w-full lg:w-[40%] flex flex-wrap bg-white rounded-lg p-2 shadow-custom-6 gap-2">
          <p className="font-bold">نوع فروش :</p>
          <p className="">
            {(data.saleType == 0
              ? "کارتونی"
              : data.saleType == 1
              ? "زیر کارتونی"
              : data.saleType == 2
              ? "کارتونی و زیر کارتونی"
              : "") || "ندارد"}
          </p>
        </div>

        <div className="w-full lg:w-[40%] flex flex-wrap bg-white rounded-lg p-2 shadow-custom-6 gap-2">
          <p className="font-bold">نوع پرداخت :</p>
          <p className="">
            {(data.paymentType == 0
              ? "نقدی"
              : data.paymentType == 1
              ? "مدت دار"
              : "") || "ندارد"}
          </p>
          {data.paymentType == 2 && (
            <>
              <p className=" font-bold">مدت :</p>
              <p className="">
                {(data.paymentType == 2
                  ? data.paymentDurationDays + "روز"
                  : "") || "ندارد"}
              </p>
            </>
          )}
        </div>

      {/* <div className='w-full flex'>
                <p className='w-[50%] font-bold'>کد :</p>
                <p className='w-[50%]'>{data.code || 'ندارد'}</p>
            </div> */}

      
        <div className="w-full lg:w-[40%] flex flex-wrap bg-white rounded-lg p-2 shadow-custom-6">
          <p className="w-[100%] font-bold">محدودیت مقداری :</p>
          <div className="w-full flex justify-center gap-4">
            <p className=" font-bold">بزرگتر از :</p>
            <p className="">{data.amountMinLimit || "ندارد"}</p>
            <p className=" font-bold">کوچکتر از :</p>
            <p className="">{data.amountMaxLimit || "ندارد"}</p>
          </div>
        </div>

        <div className="w-full lg:w-[40%] flex flex-wrap bg-white rounded-lg p-2 shadow-custom-6">
          <p className="w-[100%] font-bold">محدودیت ریالی :</p>
          <div className="w-full flex justify-center gap-4">
            <p className=" font-bold">بزرگتر از :</p>
            <p className="">{data.costMinLimit || "ندارد"}</p>
          </div>
        </div>
   

      
        <div className="w-full lg:w-[40%] flex flex-wrap bg-white rounded-lg p-2 shadow-custom-6">
          <p className="w-full font-bold mb-2">لیست کالاها:</p>
          <ul className="w-full space-y-1">
            {data.goods?.map((item, index) => (
              <li
                className="w-full flex items-center gap-2 border-b pb-1"
                key={index}
              >
                <span className="font-semibold">{index + 1}.</span>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full lg:w-[40%] flex flex-wrap bg-white rounded-lg p-2 shadow-custom-6 gap-2">
          <p className="font-bold">توضیحات شرایط :</p>
          <p className="">{data.conditionDescription || "ندارد"}</p>
        </div>
     

      <div className="w-full flex flex-wrap lg:flex-nowrap justify-between bg-white rounded-lg p-2 shadow-custom-6">
        <div className="w-full lg:w-[40%] flex flex-wrap gap-2">
          <p className="font-bold">درصد کسر زیر فاکتور :</p>
          <p className="">{data.invoiceDiscountPercent || "ندارد"}</p>
        </div>
        <div className="w-full lg:w-[40%] flex flex-wrap gap-2">
          <p className="font-bold">درصد تخفیف کالایی :</p>
          <p className="">{data.goodDiscountPercent || "ندارد"}</p>
        </div>
        <div className="w-full lg:w-[40%] flex flex-wrap gap-2">
          <p className="font-bold">کالای هدیه :</p>
          <p className="">{data.giftItem || "ندارد"}</p>
        </div>
      </div>

    </div>)}
    </>
  );
}

export default SalesShowView;
