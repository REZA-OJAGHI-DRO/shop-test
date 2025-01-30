import {
  React,
  useState,
  GeneralTable,
  convertToJalali,
} from "@/component/management-panel/import-management.js";

function TableGoods({
  status,
  data,
  currentPage,
  setCurrentPage,
  rowsPerPage,
  setRowsPerPage,
  totalItems,
  openEdit
}) {
  const items =
    data &&
    data.map((item) => ({
      // تعریف تمام فیلدهای مشترک
      id: item.id ,
      name: item.name,
      code: item.code,
      createdAt: convertToJalali(item.createdAt),
      // اعمال شرط برای categoryLevel2Name
      ...(status !== 1 && { categoryLevel2Name: item.categoryLevel2Name }),
      ...(status == 3 && { categoryLevel1Name: item.categoryLevel1Name }),
    }));

  const headers = [
    { key: "id", title: "ردیف", style: "w-[5%]  border-l h-[40px]" },
    ...(status !== 1
      ? [
          {
            key: status == 2 ?"categoryLevel2Name" :status==3 && "categoryLevel1Name",
            title: "دسته بندی سطح 1",
            style: `${status == 2 ? 'w-[25%]' : status == 3 ? 'w-[20%]' : ''}  border-l h-[40px]`,
          },
        ]
      : []),
      ...(status == 3
        ? [
            {
              key: "categoryLevel2Name",
              title: "دسته بندی سطح 2",
              style: "w-[20%]  border-l h-[40px]",
            },
          ]
        : []),
    {
      key: "name",
      title:
        status == 1
          ? "دسته بندی سطح 1"
          : status == 2
          ? "دسته بندی سطح 2"
          : "دسته بندی سطح 3",
      style: `${status == 1 ? 'w-[30%]' : status == 2 ? 'w-[25%]' : 'w-[20%]'}   border-l h-[40px]`,
    },
    {
      key: "code",
      title: "کد",
      style: `${status == 1 ? 'w-[15%]' : status == 2 ? 'w-[10%]' : 'w-[10%]'}  border-l h-[40px]`,
    },
    {
      key: "createdAt",
      title: "تاریخ ثبت",
      style: `${status == 1 ? 'w-[30%]' : status == 2 ? 'w-[20%]' : 'w-[15%]'}  border-l h-[40px]`,
    },
    {
      key: "actions",
      title: "عملیات",
      style: `${status == 1 ? 'w-[20%]' : status == 2 ? 'w-[15%]' : 'w-[10%]'} h-[40px]`,
      buttons: [
        {
          text: (
            <i
              className="bi bi-pencil-square text-green-600 text-[1rem]"
              title="ویرایش"
            ></i>
          ),
          style: `text-white px-2 py-1 rounded hover:scale-125 transition-all duration-300 `,
          onClick: (item) => { openEdit( item );},
        },
        {
          text: (
            <i
              className="bi bi-trash3-fill text-red-700 text-[1rem]"
              title="حذف"
            ></i>
          ),
          style: ` text-white px-2 py-1 rounded hover:scale-125 transition-all duration-300 `,
          // onClick: (id) => alert(`حذف ${id}`),
        },
      ],
    },
  ];
  const [filter, setFilter] = useState("");
  const filteredItems = items.filter((item) => item.name.includes(filter));
  return (
    <>
      <GeneralTable
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
    </>
  );
}

export default TableGoods;
