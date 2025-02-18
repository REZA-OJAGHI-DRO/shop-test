import TableColleagues from "./table-colleagues/table-colleagues.jsx";
import FormCollegues from "./table-colleagues/form-collegues.jsx";
import  '@/index.css'
import {
  React,
  useCallback,
  useEffect,
  useState,
  WithSupport2,
  Svg1,
  Svg2,
  Loading,
  loadUserGetAllPosition,
  useSelector,
  GetCookie,
  postRelationshipGetList,
  InputDate2
} from '@/component/management-panel/import-management.js'

function Component({type , relationshipType}) {
  const token = useSelector((state) => state.product.token);
  const chabk = useSelector((state) => state.product.chabk);
  const [userId,setUserId]=useState(GetCookie("userId"))
  
  const [updateTable, setUpdateTable] = useState(false);
  const [messageData, setMessageData] = useState([]);
  const [checkData, setCheckData] = useState(false);
  const [checkDataAll, setCheckDataAll] = useState({
    check1: false,
  });
 
  
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
      setIsLoading(
          !Object.values(checkDataAll).every(value => value === true)
      );
  }, [checkDataAll]);
  // *********roleCookie
  const [role, setRole] = useState("");
  useEffect(() => {
    const roleCookie = GetCookie("role");
    setRole(roleCookie);
  }, []);
  // *********UserGet
  const [id, setId] = useState(null);
  const [nameLogin, setNameLogin] = useState("");
  const UserGet = useCallback(() => {
    loadUserGetAllPosition(role, token, chabk, setId, setNameLogin);
  }, [role, token, chabk, setId, setNameLogin]);
  useEffect(() => {
    UserGet();
  }, [UserGet, id]);
  // *********dataTable
  const[data,setData]=useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState();

  const [filters, setFilters] = useState({
    memberUserId:userId,
    memberType: 0,
    memberSupplierId:null,
    memberShopperId:null,
    relationshipType:relationshipType,
  });
 
  
  // useEffect(() => {
  //   if (id) {
  //     setFilters((prevFilters) => ({ ...prevFilters, currentMemberId: id }));
  //   }
  // }, [id]);
  
  const fetchData = async () => {
    const dataAll = {
      ...filters,
      pageSize: rowsPerPage,
      pageIndex: currentPage,
      orderType: 1,
      orderPropertyName: "",
    };
    postRelationshipGetList(
      dataAll,
      token,
      chabk,
      setMessageData,
      setCheckDataAll,
      setCheckData,
      setData,
      setTotalItems
    );
  };
  
  useEffect(() => {
      fetchData();
    }, [currentPage, rowsPerPage, filters, updateTable, userId]);


 

  return (
    <>
      <style>
        {`
          .boxFilter{
            background:#ffffff4f;
            backdrop-filter:blur(10px);
          }
          .boxFilter18{
            background:#ffffff4f;
            backdrop-filter:blur(10px);
            }
            .boxFilter4{
              backdrop-filter:blur(10px);
          }
          `}
      </style>
      {isLoading == true ? (
        checkData == false ? (
          <div className="w-full min-h-[100vh] flex content-center justify-center flex-wrap gap-5">
            <Loading />
            <p className="w-full flex justify-center items-center text-[1.2rem]">
              لطفاً منتظر بمانید، داده‌ها در حال بارگذاری هستند ...
            </p>
          </div>
        ) : (
          <div className="w-full min-h-[100vh] flex content-center justify-center flex-wrap gap-5">
            <p className="w-full flex justify-center items-center text-[1.5rem]">
              خطاهای پردازش
            </p>
                  <p
                    className="w-full flex justify-center items-center text-[1.2rem]"
                  >
                    {messageData}
                  </p>
          </div>
        )
      ) : (
      <div className="w-full min-h-[100vh] flex justify-center  flex-wrap content-between ">
        <div className="w-[100%]  flex justify-center content-between flex-wrap">
          <>
            <div className=" w-full">
              <div className="w-full flex justify-end pt-2">
                <div className="flex gap-2">
                  <div className="bg-[#B886FF] w-[30px] h-[30px] flex items-center justify-center rounded-lg">
                    <Svg1 />
                  </div>
                  <div className="bg-[#ffffff] w-[30px] h-[30px] flex items-center justify-center rounded-lg">
                    <Svg2 />
                  </div>
                  <p className=" h-[30px] text-[1.2rem] flex items-center justify-center">
                    {nameLogin}
                  </p>
                  <div className="w-[30px] h-[30px] flex items-center justify-center rounded-lg">
                    <i className="bi bi-chevron-down"></i>
                  </div>
                </div>
              </div>
              <div className="w-full h-[50px] flex flex-wrap">
                <h4 className="w-full text-center text-[1.5rem] text-zinc-800">
                  {type==0?'همکاران':type==1?'لیست نمایندگان فروش':'خدمات پس از فروش'}
                </h4>
              </div>
            </div>
            <div className="w-full ">
              <div
                className="w-full  flex"
                dir="ltr"
              >
                <section
                  dir="rtl"
                  className="w-full flex flex-wrap justify-center content-start gap-8"
                >
                  <article className="w-[80%] flex justify-center">
                    <TableColleagues userId={userId} isNew={1} type={type} token={token} chabk={chabk} id={id} data={data.filter(item => item.isNew === false).filter(item => item.relationshipType === type)} currentPage={currentPage} setCurrentPage={setCurrentPage} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} totalItems={totalItems} setUpdateTable={setUpdateTable} updateTable={updateTable}/>
                  </article>
                 
                  <article className="w-[80%]">
                    <FormCollegues type={type} token={token} chabk={chabk} userId={userId} updateTable={updateTable} setUpdateTable={setUpdateTable}/>
                  </article>
                  {type==0?
                  <article className="w-[80%] flex justify-center">
                    <TableColleagues userId={userId} isNew={2} type={type} token={token} chabk={chabk} id={id} data={data.filter(item => item.isNew === true).filter(item => item.relationshipType === type)} currentPage={currentPage} setCurrentPage={setCurrentPage} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} totalItems={totalItems} setUpdateTable={setUpdateTable} updateTable={updateTable}/>
                  </article>
                  :''}
                </section>
              </div>
            </div>
          </>
        </div>
            <div className="w-full h-[50px] flex justify-center items-center pt-1">
              <WithSupport2 />
            </div>
      </div>
      )}
    </>
  );
}

export default Component;
