import { FC, useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import {
  postBrandGetList,
  PriceListGetList,
  Button,
  Modal,
  Load,
  CheckMessage,
  GeneralTable,
  PriceListToggle,
} from "@/component/management-panel/import-management.js";
import CustomImage from "@/components/ui/custom-image";
import FormCreate from "./form/form-create";
import FormEdit from "./form/form-edit";
import zIndex from "@mui/material/styles/zIndex";

// تعریف انواع برای state ها
interface CatalogProps {
  brandId?: string;
  brandName?: string;
  setIsSelectVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

// تعریف نوع برای داده‌های برند
interface Brand {
  logoLink: string;
  enName: string;
  name: string;
  ownerName: string;
  id: string;
  logo: string;
  enabled: boolean;
  priceList: any;
  priceListLink: string | null;
}

// نوع برای state های مختلف
interface Filters {
  activeStatus: number;
  name: string;
  enName: string;
}

interface State {
  product: {
    token: string;
    chabk: string;
  };
}

const Catalog: FC<CatalogProps> = ({
  brandId,
  brandName,
  setIsSelectVisible,
}) => {
  const token = useSelector<State, string>((state) => state.product.token);
  const chabk = useSelector<State, string>((state) => state.product.chabk);
  const [load, setLoad] = useState(false);
  const [load2, setLoad2] = useState(false);
  const [load3, setLoad3] = useState(false);
  const [checkData, setCheckData] = useState(false);
  const [checkDataAll, setCheckDataAll] = useState({
    check1: false,
  });
  const [updateTable, setUpdateTable] = useState(false);
  const [message, setMessage] = useState("");
  const [check, setCheck] = useState({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dataTable, setDataTable] = useState<Brand[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [messageData, setMessageData] = useState<any[]>([]);
  const [messageData2, setMessageData2] = useState<any[]>([]);
  const [filters, setFilters] = useState<Filters>({
    activeStatus: 0,
    name: brandName || "",
    enName: "",
  });

  const BrandGetList = useCallback(() => {
    setIsLoading(true);
    const dataAll = {
      ...filters,
      pageSize: 1,
      pageIndex: 1,
      orderType: 1,
      orderPropertyName: "",
    };
    postBrandGetList(dataAll, token, chabk, setDataTable, setTotalItems);
  }, [filters, token, chabk]);

  useEffect(() => {
    BrandGetList();
  }, [BrandGetList]);

  function brandSelection() {
    setIsSelectVisible(true);
  }

  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const [filtersCatalog, setFiltersCatalog] = useState<{
    keyword: string;
    data: { id?: string };
  }>({
    keyword: "",
    data: {
      id: brandId,
    },
  });

  const fetchData = async () => {
    const dataAll = {
      filter: {
        keyword: filtersCatalog.keyword,
        data: {
          id: filtersCatalog.data.id,
        },
      },
      pageSize: rowsPerPage,
      pageIndex: currentPage,
      orderType: 1,
      orderPropertyName: "",
    };
    PriceListGetList(
      dataAll,
      token,
      chabk,
      setMessageData,
      setData,
      setTotalItems
    );
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, rowsPerPage, filtersCatalog, updateTable]);

  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const closeModal = () => {
    setShowCreateModal(false);
    setShowEditModal(false);
  };

  function brandNew() {
    setShowCreateModal(true);
  }


   // *********
     const [dataImages, setDataImages] = useState([]);
    const [image, setImage] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const closeModal2 = () => {
      setShowDeleteModal(false);
    };
  
    const [dataDelete, setDataDelete] = useState("");
    const deleteData = (e) => {
      e.preventDefault();
      const indexToDelete = parseInt(dataDelete, 10);
      const updatedImages = image.filter((_, index) => index !== indexToDelete);
      const updatedDataImages = dataImages.filter(
        (_, index) => index !== indexToDelete
      );
      setDataImages(updatedDataImages);
      setImage(updatedImages);
      setDataDelete("");
      setShowDeleteModal(false);
    };
//   *****

  const items = (data && data && Array.isArray(data) ? data : []).map(
    (item) => ({
      id: item.id,
      brandId: item.brandId,
      title: item.title,
      description: item.description,
      status: item.enabled == true ? "فعال" : "غیر فعال",
      file: item.priceFiles.length,
      image: item.priceFiles[0].link,
      images: item.priceFiles,
    })
  );

  const headers = [
    {
      key: "id",
      title: "ردیف",
      style: "w-[5%] border-l h-[40px] text-center font-medium",
    },
    {
      key: "title",
      title: "عنوان",
      style: "w-[10%] border-l h-[40px] text-center font-medium",
    },
    {
      key: "image",
      title: "تصویر",
      style: "w-[10%] border-l h-[40px] text-center font-medium",
    },
    {
      key: "file",
      title: "تعداد فایل های بارگذاری",
      style: "w-[20%] border-l h-[40px] text-center font-medium",
    },
    {
        key: "description",
        title: "توضیحات",
        style:
          "w-[30%] border-l h-[40px] text-center font-medium overflow-auto",
      }
      ,
    {
      key: "status",
      title: "وضعیت",
      style: "w-[5%] border-l h-[40px] text-center font-medium",
    },
    {
      key: "actions",
      title: "عملیات",
      style: "w-[20%] border-l h-[35px] text-center font-medium ",
      buttons: [
        {
          text: "تعیین وضعیت",
          style: `bg-green-500 text-white px-2 py-1 rounded hover:scale-95 transition-all duration-300`,
          onClick: (item) => handleStatusToggle(item),
        },
        {
          text: "ویرایش",
          style: `bg-[#B27BFF] text-white px-2 py-1 rounded hover:scale-95 transition-all duration-300`,
          onClick: (item) => catalogEdit(item),
        },
      ],
    },
  ];
  const [filter, setFilter] = useState("");
  const filteredItems = items.filter((item) => item.title.includes(filter));

  const handleStatusToggle = async (item) => {
     setIsLoading(true);
     setLoad2(true)
        try {
          const result = await PriceListToggle(
            item.id,
            token,
            chabk,
            setCheckDataAll,
            setCheckData,
            setMessage
          );
          if (result.isSuccess == true) {
            setMessage(result.error ? result.error : result.message);
            setUpdateTable(!updateTable);
            setCheck((r) => ({ ...r, check1: true }));
            setLoad2(false)
            setTimeout(() => {
              setCheck((r) => ({ ...r, check1: false }));
              setMessage("");
            }, 5000);
          } else if (result.isSuccess == false) {
            setMessage(result.error ? result.error : result.message);
            setUpdateTable(!updateTable);
            setLoad2(false)
            setCheck((r) => ({ ...r, check4: true }));
            setTimeout(() => {
              setCheck((r) => ({ ...r, check4: false }));
              setMessage("");
            }, 5000);
          }
        } catch (error) {
          setCheck((r) => ({ ...r, check4: true }));
          setLoad2(false)
          setTimeout(() => {
            setMessage("");
            setCheck((r) => ({ ...r, check4: false }));
          }, 5000);
        }
  };

  const [dataEdit , setDataEdit] = useState([])

  function catalogEdit (item) {
    setShowEditModal(true);
    setDataEdit(item)
  }
  
  return (
    <>
      <CheckMessage message={message} check={check} />
      <div className="w-full flex flex-wrap gap-5 content-start p-5">
        <div className="w-full flex justify-end">
          <Button value="انتخاب برند" click={brandSelection} styleButton={7} />
        </div>

        <div className="w-full h-[100px] rounded-md bg-white shadow-lg flex">
          <ul className="w-full h-full p-5 flex gap-2 text-[12px]">
            <li className="h-full flex items-center gap-4 border-l border-zinc-300">
              <figure className="w-[50px] h-[50px]">
                <CustomImage
                  src={dataTable[0]?.logoLink || "/assets/icons/image.svg"}
                  alt={dataTable[0]?.enName || "Brand logo"}
                  className="w-full h-auto rounded-md"
                />
              </figure>
              <div className="h-full flex flex-wrap">
                <p className="w-full">نام برند</p>
                <p className="w-full">
                  {dataTable[0]?.enName || "نام برند یافت نشد"}
                </p>
              </div>
            </li>
            <li className="h-full flex items-center gap-2 border-l border-zinc-300">
              <div className="h-full flex flex-wrap">
                <p className="w-full">مالک برند</p>
                <p className="w-full text-[#198F89]">
                  {dataTable[0]?.ownerName || "اطلاعات موجود نیست"}
                </p>
              </div>
            </li>
            <li className="h-full flex items-center gap-2 border-l border-zinc-300">
              <div className="h-full flex flex-wrap">
                <p className="w-full">نمایندگی های فروش</p>
                <p className="w-full">{"فیلدی ندارد"}</p>
              </div>
            </li>
            <li className="h-full flex items-center gap-2 border-l border-zinc-300">
              <div className="h-full flex flex-wrap">
                <p className="w-full">خدمات پس از فروش</p>
                <p className="w-full">{"فیلدی ندارد"}</p>
              </div>
            </li>
            <li className="h-full flex items-center gap-2 border-l border-zinc-300">
              <div className="h-full flex flex-wrap">
                <p className="w-full">کد برند</p>
                <p className="w-full">{"فیلدی ندارد"}</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="w-full">
          <div className="w-[200px]">
            <Button value="+ جدید" click={brandNew} styleButton={15} />
          </div>
        </div>

        <div className="w-full">
          <GeneralTable
            data={data}
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
      </div>
      <Load load={load} text={"در حال آپلود فایل ..."} />
      <Load load={load3} text={"در حال ثبت لطفا منتظر بمانید ..."} />
      <Load load={load2} text={"در حال تعیین وضعیت لطفا منتظر بمانید ..."} />

      {showDeleteModal && (
        <Modal onClose={closeModal2} title="" styleBox={{zIndex:'100'}}>
          <div className="w-full flex flex-wrap justify-center gap-5">
            <p className="w-full text-center text-[1.5rem]">
              ایا مطمئن هستید که می خواهید این عکس را حذف کنید؟
            </p>
            <div className="w-[100%] flex justify-center">
              <Button
                value={"حذف"}
                click={() => deleteData(event)}
                styleButton={13}
              />
            </div>
          </div>
        </Modal>
      )}

      {showCreateModal && (
        <Modal onClose={closeModal} title="فرم ساخت لیست قیمت">
          <FormCreate
            setLoad={setLoad}
            //   setLoad2={setLoad2}
            setLoad3={setLoad3}
            brandId={brandId}
            setCheckData={setCheckData}
            setMessageData={setMessageData2}
            setCheckDataAll={setCheckDataAll}
            setUpdateTable={setUpdateTable}
            updateTable={updateTable}
            setCheck={setCheck}
            setMessage={setMessage}
            setShowCreateModal={setShowCreateModal}
            dataImages={dataImages}
            setDataImages={setDataImages}
            setShowDeleteModal={setShowDeleteModal}
            setDataDelete={setDataDelete}
            setImage={setImage}
            image={image}
          />
        </Modal>
      )}
      {showEditModal && (
        <Modal onClose={closeModal} title="فرم ویرایش لیست قیمت">
          <FormEdit
            dataEdit={dataEdit}
            setLoad={setLoad}
            //   setLoad2={setLoad2}
            setLoad3={setLoad3}
            brandId={brandId}
            setCheckData={setCheckData}
            setMessageData={setMessageData2}
            setCheckDataAll={setCheckDataAll}
            setUpdateTable={setUpdateTable}
            updateTable={updateTable}
            setCheck={setCheck}
            setMessage={setMessage}
            setShowEditModal={setShowEditModal}
            dataImages={dataImages}
            setDataImages={setDataImages}
            setShowDeleteModal={setShowDeleteModal}
            setDataDelete={setDataDelete}
            setImage={setImage}
            image={image}
          />
        </Modal>
      )}
    </>
  );
};

export default Catalog;

