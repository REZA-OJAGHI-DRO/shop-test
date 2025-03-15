import {
    React,
    useCallback,
    useEffect,
    Suspense,
    useRef,
    useState,
    WithSupport2,
    Button,
    Modal,
    File,
    SelectInput,
    Load,
    CheckMessage,
    Loading,
    GeneralTable,
    useSelector,
    AdminSuggestionsGetList,
    GetCookie,
  } from "@/component/management-panel/import-management.js";

function Table({updateTable}) {
  const token = useSelector((state) => state.product.token);
  const chabk = useSelector((state) => state.product.chabk);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [messageData, setMessageData] = useState('');
  const [dataTable, setDataTable] = useState(null);
      const [filters, setFilters] = useState({
        keyword:''
      });
      const AdminSuggestions = async () => {
        const dataAll = {
          filter: {
            keyword: filters.keyword,
          },
          pageSize: rowsPerPage,
          pageIndex: currentPage,
          orderType: 1,
          orderPropertyName: "",
        };
        AdminSuggestionsGetList(
          dataAll,
          token,
          chabk,
          setMessageData,
          setDataTable,
          setTotalItems
        );
      };
    
      useEffect(() => {
        AdminSuggestions();
      }, [currentPage, rowsPerPage, filters, updateTable]);


    const items = (dataTable && dataTable && Array.isArray(dataTable) ? dataTable : []).map(
        (item) => ({
          id: item.id,
          status: item.entityType == 1 ? 'کالا' : 'تامین کننده',
          entityName: item.entityName,
          categoryName: item.categoryName,
          categoryLevel: item.categoryLevel,
          cityName: item.cityName,
        })
      );
    
      const headers = [
        {
          key: "id",
          title: "ردیف",
          style: "w-[5%] border-l h-[40px] text-center font-medium",
        },
        {
            key: "status",
            title: "پیشنهاد",
            style: "w-[10%] border-l h-[40px] text-center font-medium",
          },
        {
            key: "entityName",
            title: "نام",
            style: "w-[20%] border-l h-[40px] text-center font-medium",
          },
        {
            key: "categoryLevel",
            title: "سطح",
            style: "w-[5%] border-l h-[40px] text-center font-medium",
          },
        {
            key: "categoryName",
            title: "دسته بندی",
            style: "w-[20%] border-l h-[40px] text-center font-medium",
          },
        {
            key: "cityName",
            title: "شهر",
            style: "w-[20%] border-l h-[40px] text-center font-medium",
          },
        {
          key: "actions",
          title: "عملیات",
          style: "w-[20%] border-l h-[35px] text-center font-medium ",
          buttons: [
            // {
            //   text: "ویرایش",
            //   style: `bg-[#B27BFF] text-white px-2 py-1 rounded hover:scale-95 transition-all duration-300`,
            // //   onClick: (item) => catalogEdit(item),
            // },
          ],
        },
      ];
      const [filter, setFilter] = useState("");
      const filteredItems = items.filter((item) => item.entityName.includes(filter));
  return (
    <div className="w-full">
    <GeneralTable
      data={dataTable}
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
  )
}

export default Table