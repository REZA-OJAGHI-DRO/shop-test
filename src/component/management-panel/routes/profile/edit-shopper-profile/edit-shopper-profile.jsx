import "@/index.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
// const Form1 = React.lazy(() => import("./form-1"));
import Form1 from "./form-1";
import Form2 from "./form-2";
import Form3 from "./form-3";
// const Form2 = React.lazy(() => import("./form-2"));
// const Form3 = React.lazy(() => import("./form-3"));
import {
  React,
  useEffect,
  // Suspense,
  useState,
  Button,
  Modal,
  CheckMessage,
  areArraysEqual,
  Load,
  Loading,
} from "@/component/management-panel/import-management.js";

function EditShopper({ data, updateTable, setUpdateTable }) {

  const [load, setLoad] = useState(false);
  const [load2, setLoad2] = useState(false);

  const [messageData, setMessageData] = useState([]);
  const [checkData, setCheckData] = useState(false);

  const [checkDataAll, setCheckDataAll] = useState({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
    check5: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(!Object.values(checkDataAll).every((value) => value === true));
  }, [checkDataAll]);

  // *********
  const [message, setMessage] = useState("");
  const [check, setCheck] = useState({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
  });

  // ***********
  const [dataImages1, setDataImages1] = useState([]);
  const [image1, setImage1] = useState([]);
  const [dataDeleteImg, setDataDeleteImg] = useState("");
  const [showDeleteModalImg, setShowDeleteModalImg] = useState(false);
  const [imagesEdited1, setImagesEdited1] = useState(false);

  const closeModalImg = () => {
    setShowDeleteModalImg(false);
  };

  const deleteDataImg = (e) => {
    e.preventDefault();
    const indexToDelete = parseInt(dataDeleteImg, 10);
    const updatedImages = image1.filter((_, index) => index !== indexToDelete);
    const updatedDataImages = dataImages1.filter(
      (_, index) => index !== indexToDelete
    );
    setDataImages1(updatedDataImages);
    setImage1(updatedImages);
    setDataDeleteImg("");
    setShowDeleteModalImg(false);
    setMessage("عکس با موفقیت حذف شد");
    setCheck((r) => ({ ...r, check1: true }));
    setTimeout(() => {
      setMessage("");
      setCheck((r) => ({ ...r, check1: false }));
    }, 5000);
  };

  useEffect(() => {
    setImagesEdited1(
      areArraysEqual(
        data?.docOrRentImages?.map((file) => file.fileId),
        dataImages1
      ) == true
        ? true
        : false
    );
  }, [dataImages1]);

  // **********
  const [imagesEdited2, setImagesEdited2] = useState(false);
  const [dataImages2, setDataImages2] = useState([]);
  const [image2, setImage2] = useState([]);
  const [showDeleteModalImg2, setShowDeleteModalImg2] = useState(false);
  const [dataDeleteImg2, setDataDeleteImg2] = useState("");

  const closeModalImg2 = () => {
    setShowDeleteModalImg2(false);
  };

  const deleteDataImg2 = (e) => {
    e.preventDefault();
    const indexToDelete = parseInt(dataDeleteImg2, 10);
    const updatedImages = image2.filter((_, index) => index !== indexToDelete);
    const updatedDataImages = dataImages2.filter(
      (_, index) => index !== indexToDelete
    );
    setDataImages2(updatedDataImages);
    setImage2(updatedImages);
    setDataDeleteImg2("");
    setShowDeleteModalImg2(false);
    setMessage("عکس با موفقیت حذف شد");
    setCheck((r) => ({ ...r, check1: true }));
    setTimeout(() => {
      setMessage("");
      setCheck((r) => ({ ...r, check1: false }));
    }, 5000);
  };

  useEffect(() => {
    setImagesEdited2(
      areArraysEqual([data?.licenseImage?.fileId], dataImages2) == true
        ? true
        : false
    );
  }, [dataImages2]);


  

  // ********

  return (
    <>
      <CheckMessage message={message} check={check} />
      {isLoading == false ? (
        checkData == false ? (
          <div className="w-full h-full flex content-center justify-center flex-wrap gap-5">
            <Loading />
            <p className="w-full flex justify-center items-center text-[1.2rem]">
              لطفاً منتظر بمانید، داده‌ها در حال بارگذاری هستند ...
            </p>
          </div>
        ) : (
          <div className="w-full h-full flex content-center justify-center flex-wrap gap-5">
            <p className="w-full flex justify-center items-center text-[1.5rem]">
              خطاهای پردازش
            </p>
            {messageData &&
              messageData.map((val, i) => {
                return (
                  <p
                    key={i}
                    className="w-full flex justify-center items-center text-[1.2rem]"
                  >
                    {i + 1} - {val}
                  </p>
                );
              })}
          </div>
        )
      ) : (
        <div className='w-full flex flex-wrap px-4 pb-2 justify-between content-start"'>
          <article className="w-[100%] flex flex-wrap content-start justify-start">
            <p className="w-fit h-[40px] text-[1.2rem] shadow-custom-7 -translate-x-5 translate-y-5 z-10 bg-white px-3 rounded-2xl flex items-center gap-2">
              {" "}
              <span className="text-red-600 ">*</span> اطلاعات تماس و هویتی
            </p>
            <div
              dir="rtl"
              className="w-[100%] min-h-[360px] rounded-3xl px-4 py-7 flex gap-5 shadow-custom-6 justify-between flex-wrap boxFilter"
            >
              <div
                dir="rtl"
                className="w-[100%] rounded-3xl px-4 py-2 flex gap-5 justify-between flex-wrap"
              >
                <Form1
                  data={data}
                  setLoad={setLoad}
                  setLoad2={setLoad2}
                  setCheck={setCheck}
                  setMessage={setMessage}
                  setUpdateTable={setUpdateTable}
                  updateTable={updateTable}
                />
                {/* <Suspense fallback={<div>Loading ...</div>}>
              </Suspense> */}
              </div>
            </div>
          </article>
          <article className="w-[100%]  flex flex-wrap content-start justify-start">
            <p className="w-fit h-[40px] text-[1.2rem] border -translate-x-5 translate-y-5 z-10 bg-white px-3 rounded-2xl flex items-center gap-2">
              <span className="text-red-600">*</span> آدرس و وضعیت ملک محل کسب
            </p>
            <div
              dir="rtl"
              className="w-[100%] min-h-[403px] rounded-3xl px-4 py-7 flex gap-5 shadow-custom-6 justify-between content-start flex-wrap boxFilter"
            >
              <Form2
                data={data}
                setLoad={setLoad}
                setLoad2={setLoad2}
                setCheck={setCheck}
                setMessage={setMessage}
                setUpdateTable={setUpdateTable}
                updateTable={updateTable}
                setImage1={setImage1}
                image1={image1}
                setDataImages1={setDataImages1}
                dataImages1={dataImages1}
                setImagesEdited1={setImagesEdited1}
                imagesEdited1={imagesEdited1}
                setShowDeleteModalImg={setShowDeleteModalImg}
                setDataDeleteImg={setDataDeleteImg}
              />
            </div>
          </article>
          <article className="w-[100%]  flex flex-wrap content-start justify-start">
            <p className="w-fit h-[40px] text-[1.2rem] shadow-custom-7 -translate-x-5 translate-y-5 z-10 bg-white px-3 rounded-2xl flex items-center gap-2">
              {" "}
              <span className="text-red-600 ">*</span> فعالیت
            </p>
            <div
              dir="rtl"
              className="w-[100%] min-h-[403px] rounded-3xl px-4 py-7 flex gap-5 shadow-custom-6 justify-between flex-wrap boxFilter"
            >
              <Form3
                data={data}
                setLoad={setLoad}
                setLoad2={setLoad2}
                setCheck={setCheck}
                setMessage={setMessage}
                setUpdateTable={setUpdateTable}
                updateTable={updateTable}
                setImage2={setImage2}
                image2={image2}
                setDataImages2={setDataImages2}
                dataImages2={dataImages2}
                setImagesEdited2={setImagesEdited2}
                imagesEdited2={imagesEdited2}
                setShowDeleteModalImg2={setShowDeleteModalImg2}
                setDataDeleteImg2={setDataDeleteImg2}
                setIsLoading={setIsLoading}
                setCheckDataAll={setCheckDataAll}
                setCheckData={setCheckData}
                setMessageData={setMessageData}
              />
            </div>
          </article>
          <Load
            load={load}
            text={"در حال آپلود تصاویر لطفا منتظر بمانید ..."}
          />
          <Load load={load2} text={"در حال ویرایش لطفا منتظر بمانید ..."} />
        </div>
      )}

      {showDeleteModalImg && (
        <Modal onClose={closeModalImg} title="">
          <div className="w-full flex flex-wrap justify-center gap-5">
            <p className="w-full text-center text-[1.5rem]">
              ایا مطمئن هستید که می خواهید این عکس را حذف کنید؟
            </p>
            <div className="w-[100%] flex justify-center">
              <Button
                value={"حذف"}
                click={() => deleteDataImg(event)}
                styleButton={13}
              />
            </div>
          </div>
        </Modal>
      )}
      {showDeleteModalImg2 && (
        <Modal onClose={closeModalImg2} title="">
          <div className="w-full flex flex-wrap justify-center gap-5">
            <p className="w-full text-center text-[1.5rem]">
              ایا مطمئن هستید که می خواهید این عکس را حذف کنید؟
            </p>
            <div className="w-[100%] flex justify-center">
              <Button
                value={"حذف"}
                click={() => deleteDataImg2(event)}
                styleButton={13}
              />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default EditShopper;
