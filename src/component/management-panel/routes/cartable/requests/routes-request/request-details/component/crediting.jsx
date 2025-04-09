import {
    useEffect,
    useState,
    useCallback,
    useSelector,
    Button,
    TextFull,
    Modal,
    TextNumber,
    CheckMessage,
    TextArea,
    Load,
    GeneralTable,
  } from "@/component/management-panel/import-management.js";

function Crediting({dataTable , setTypeModal , setDataId}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [totalItems, setTotalItems] = useState(1);
  
        const items = (dataTable && dataTable && Array.isArray(dataTable) ? dataTable : []).map(
            (item) => ({
              id:item?.id ,
              type: item.type == 1 ? 'حساب دفتری' : item.type == 2 ? 'چک ضمانت' : '',
              limit: item.limit,
              balance: item.balance,
              enabled: item.enabled == true ? 'فعال' : 'غیر فعال',
            })
          );
        
          const headers = [
            {
                key: "type",
                title: "نوع اعتبار",
                style: "w-[20%] border-l h-[40px] text-center font-medium",
              },
            {
                key: "limit",
                title: "میزان اعتبار",
                style: "w-[20%] border-l h-[40px] text-center font-medium",
              },
            {
                key: "balance",
                title: "باقی مانده اعتبار",
                style: "w-[20%] border-l h-[40px] text-center font-medium",
              },
            {
                key: "enabled",
                title: "وضعیت اعتبار",
                style: "w-[20%] border-l h-[40px] text-center font-medium",
              },
              {
                key: "actions",
                title: "عملیات",
                style: "w-[20%] border-l h-[35px] text-center font-medium ",
                buttons: [
                  {
                    text: "ویرایش",
                    style: `bg-[#B27BFF] text-white px-2 py-1 rounded hover:scale-95 transition-all duration-300`,
                    onClick: (item) => {
                        setTypeModal(3)
                        setDataId(item?.id)  
                    } 
                  },
                ],
              },
          ];

          const [filter, setFilter] = useState("");
          const filteredItems = items.filter((item) => item.type.includes(filter));
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

export default Crediting