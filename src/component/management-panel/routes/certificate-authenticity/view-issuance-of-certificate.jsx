import {
    React,
    useEffect,
    useCallback,
    useState,
    useSelector,
    GetIceCertificateList,
    convertToJalali,
  } from "@/component/management-panel/import-management.js";
  
  function ViewIssuanceOfCertificate({ selectedId }) {
    const chabk = useSelector((state) => state.product.chabk);
    const token = useSelector((state) => state.product.token);
    const [data, setData] = useState([]);
    const [message, setMessage] = useState("");
    const [checkData, setCheckData] = useState(false);
    const [checkDataAll, setCheckDataAll] = useState({ check1: false });
    const [isLoading, setIsLoading] = useState(true);
  
    const IceCertificateList = useCallback(() => {
      setIsLoading(true);
      GetIceCertificateList(
        selectedId,
        token,
        chabk,
        setIsLoading,
        setData,
        setCheckDataAll,
        setCheckData,
        setMessage
      );
    }, [selectedId, token, chabk]);
  
    useEffect(() => {
      IceCertificateList();
    }, [IceCertificateList]);
  
    return (
      <div className="w-[90vw] max-w-[800px] mx-auto p-5">
        {isLoading ? (
          <div className="w-full flex justify-center items-center h-[300px] bg-gray-50 rounded-xl shadow-md">
            <p className="text-lg font-semibold text-gray-500">در حال بارگذاری...</p>
          </div>
        ) : data[0]?.file?.link ? (
          <figure className="w-full flex flex-col justify-center items-center overflow-hidden rounded-xl shadow-lg bg-white p-4 border">
            <img
              src={data[0].file.link}
              alt="گواهی اصالت"
              className="w-full max-h-[50vh] object-contain"
            />
            {data[0]?.cetificateDate && (
              <figcaption className="mt-4 text-gray-700 text-sm font-medium">
                تاریخ صدور: 
                <span className="ml-2 text-gray-900 font-semibold">{convertToJalali(data[0]?.cetificateDate)}</span>
              </figcaption>
            )}
          </figure>
        ) : (
          <div className="w-full flex justify-center items-center h-[300px] bg-gray-100 rounded-xl shadow-md">
            <p className="text-lg font-semibold text-gray-600">گواهی ثبت نشده است</p>
          </div>
        )}
      </div>
    );
  }
  
  export default ViewIssuanceOfCertificate;
  