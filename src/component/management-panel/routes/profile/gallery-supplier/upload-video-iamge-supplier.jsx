import FormUploadVideo from "./form-upload-video";
import FormUploadImage from "./form-upload-img";
import { useMutation } from "@tanstack/react-query";
import {
  React,
  useState,
  Button,
  Modal,
  Load,
  useSelector,
  CheckMessage,
  SupplierUpdateMainFile,
  SupplierRemoveFile,
} from "@/component/management-panel/import-management.js";

function UploadVideoImgSupplier({
  id,
  play,
  setPlay,
  updateImage,
  updateDelete,
  update,
  setUpdateImage,
  setUpdateDelete,
  setUpdate,
  setCheckData,
  setMessageData,
  setCheckDataAll,
  data,
  setData,
}) {
  const token = useSelector((state) => state.product.token);
  const chabk = useSelector((state) => state.product.chabk);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showViewModal2, setShowViewModal2] = useState(false);

  const [load, setLoad] = useState(false);
  const [checkAll, setCheckAll] = useState({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
  });

  const [message, setMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [dataVideo, setDataVideo] = useState();
  const [dataImage, setDataImage] = useState();
  const [check, setCheck] = useState(true);

  const mutationUpdate = useMutation({
    mutationFn: SupplierUpdateMainFile,
    onMutate: () => {
      setLoad(true);
    },
    onSuccess: (result) => {
      setLoad(false);
      if (result.isSuccess) {
        setMessage(
          result.error
            ? result.error
            : result.message || "عملیات با موفقیت انجام شد"
        );
        setPlay("");
        setTimeout(()=>{
            setUpdate(!update);
        },1500)
        setTimeout(() => {
          setShowDeleteModal(false);
          setCheck(!check);
          setCheckAll((r) => ({ ...r, check1: true }));
          setTimeout(() => {
            setMessage("");
            setCheckAll((r) => ({ ...r, check4: false }));
            setCheckAll((r) => ({ ...r, check1: false }));
          }, 5000);
        }, 2000);
      } else {
        setMessage(
          result.error
            ? result.error
            : result.message || "عملیات با موفقیت انجام نشد"
        );
        setTimeout(() => {
          setLoad(false);
          setCheck(!check);
          setCheckAll((r) => ({ ...r, check4: true }));
          setTimeout(() => {
            setMessage("");
            setCheckAll((r) => ({ ...r, check4: false }));
            setCheckAll((r) => ({ ...r, check1: false }));
          }, 5000);
        }, 2000);
      }
    },
    onError: (error) => {
      setLoad(false);
      setCheck(!check);
      setMessage(error.message || "ارسال نشد");
      setCheckAll((r) => ({ ...r, check4: true }));
      setTimeout(() => {
        setMessage("");
        setCheckAll((r) => ({ ...r, check4: false }));
        setCheckAll((r) => ({ ...r, check1: false }));
      }, 5000);
    },
    onSettled: () => {
      setLoad(false);
      setTimeout(() => {
        setMessage("");
        setCheckAll((r) => ({ ...r, check4: false, check1: false }));
      }, 5000);
    },
  });

  const sendForm1 = () => {
    const requestData = {
      id,
      fileId: play?.fileId,
      fileType: play?.fileType === 8 ? 10 : play?.fileType == 7 && 9,
      token,
      chabk,
      setCheckData,
      setMessageData,
      setCheckDataAll,
      setUpdate,
      update,
    };

    mutationUpdate.mutate(requestData);
  };

  const mutationDelete = useMutation({
    mutationFn: SupplierRemoveFile,
    onMutate: () => {
      setLoad(true);
    },
    onSuccess: (result) => {
      setLoad(false);
      if (result.isSuccess) {
        setMessage(
          result.error
            ? result.error
            : result.message || "عملیات با موفقیت انجام شد"
        );
        setTimeout(()=>{
          setUpdateDelete(!updateDelete);
        },1500)
        setPlay("");
        setTimeout(() => {
          setShowDeleteModal(false);
          setCheck(!check);
          setCheckAll((r) => ({ ...r, check1: true }));
        }, 2000);
      } else {
        setMessage(
          result.error
            ? result.error
            : result.message || "عملیات با موفقیت انجام نشد"
        );
        setTimeout(() => {
          setCheck(!check);
          setCheckAll((r) => ({ ...r, check4: true }));
        }, 2000);
      }
    },
    onError: (error) => {
      setLoad(false);
      setCheck(!check);
      setMessage(error.message || "ارسال نشد");
      setCheckAll((r) => ({ ...r, check4: true }));
    },
    onSettled: () => {
      setLoad(false);
      setTimeout(() => {
        setMessage("");
        setCheckAll((r) => ({ ...r, check4: false, check1: false }));
      }, 5000);
    },
  });

  const deleteData = (e) => {
    const requestData = {
      id,
      fileId: play?.fileId,
      token,
      chabk,
      setCheckData,
      setMessageData,
      setCheckDataAll,
      setUpdateDelete,
      updateDelete,
    };

    mutationDelete.mutate(requestData);
  };

  function openModalDelete() {
    setShowDeleteModal(true);
  }
  function clickPlay(val) {
    setPlay(val);
  }
  function sendForm3() {
    setShowViewModal(true);
  }
  function sendForm4() {
    setShowViewModal2(true);
  }

  const closeModal = () => {
    setShowViewModal(false);
    setShowViewModal2(false);
    setShowDeleteModal(false);
  };

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
      <CheckMessage message={message} check={checkAll} />
      <div className="w-full overflow-hidden relative">
        <div className="w-full flex" dir="ltr">
          <section
            dir="rtl"
            className="w-full h-full flex flex-wrap justify-center py-0"
          >
            <article className="w-[90%] h-auto flex flex-wrap bg-[#ffffff7f] rounded-2xl overflow-hidden">
              <div className="w-[100%] xl:w-[55%] ">
                <div className="w-full p-4 flex justify-center items-center">
                  {(play && play?.fileType == 7) || play?.fileType == 9 ? (
                    <figure className="w-full h-[350px] flex justify-center items-center rounded-2xl overflow-hidden bg-black">
                      <img
                        className="h-full rounded-2xl overflow-hidden"
                        src={play?.link}
                        alt="Image"
                      />
                    </figure>
                  ) : (
                    <div className="rounded-2xl overflow-hidden w-[100%] h-[400px] object-cover bg-black">
                      <video
                        src={play?.link ? play?.link : ""}
                        controls={
                          play?.fileType == 8 || play?.fileType == 10
                            ? true
                            : false
                        }
                        className="w-full h-full object-cover"
                      ></video>
                    </div>
                  )}
                </div>
                <div className="w-full flex justify-center gap-10">
                  <div className="w-[30%]">
                    <Button
                      value={
                        play?.fileType == 8 || play?.fileType == 10
                          ? "انتخاب بعنوان ویدئو اصلی"
                          : "انتخاب بعنوان عکس اصلی"
                      }
                      click={() => sendForm1(event)}
                      styleButton={18}
                    />
                  </div>
                  <div className="w-[30%]">
                    <Button
                      value={
                        play?.fileType == 8 || play?.fileType == 10
                          ? "حذف ویدئو"
                          : "حذف عکس"
                      }
                      click={() => openModalDelete(event)}
                      styleButton={17}
                    />
                  </div>
                </div>
              </div>
              <div className="w-[100%] xl:w-[45%] h-[440px] overflow-hidden">
                <div className="w-full h-full p-4 overflow-y-auto myElement flex flex-wrap justify-between content-start gap-5">
                  {data &&
                  data.filter((item) => item.fileType === 10).length > 0 ? (
                    <div className="w-[12rem] 2xl:w-[14rem] bg-black rounded-2xl relative overflow-hidden">
                      <div className="rounded-2xl overflow-hidden w-[100%]  object-cover bg-black">
                        <video
                          src={
                            data?.filter((item) => item.fileType === 10)[0]
                              ?.link || ""
                          }
                          controls={false}
                          className="w-full h-full object-cover"
                        ></video>
                        <div
                          onClick={() =>
                            clickPlay(
                              data?.filter((item) => item.fileType === 10)[0]
                            )
                          }
                          className="cursor-pointer w-full h-full text-white bg-[rgba(0,0,0,.5)] absolute top-0 flex justify-center items-center"
                        >
                          ویدئو اصلی
                        </div>
                      </div>
                    </div>
                  ) : null}
                  {data?.filter((item) => item.fileType === 9) ? (
                    <div className="w-[12rem] 2xl:w-[14rem] bg-black rounded-2xl relative overflow-hidden">
                      <>
                        <figure className="w-full h-[110px] flex justify-center items-center bg-black rounded-2xl overflow-hidden">
                          <img
                            className="h-full rounded-2xl overflow-hidden cursor-pointer absolute top-0 "
                            src={
                              data?.filter((item) => item.fileType === 9)[0]
                                ?.link
                            }
                            alt="Image"
                          />
                        </figure>
                        <div
                          onClick={() =>
                            clickPlay(
                              data?.filter((item) => item.fileType === 9)[0]
                            )
                          }
                          className="cursor-pointer w-full h-full text-white bg-[rgba(0,0,0,.5)] absolute top-0 flex justify-center items-center"
                        >
                          عکس اصلی
                        </div>
                      </>
                    </div>
                  ) : null}
                  {data &&
                    data?.filter(
                        (item) => item.fileType === 7 || item.fileType === 8
                      )
                      .map((val, i) => {
                        return (
                          <div
                            key={i}
                            className="w-[12rem] 2xl:w-[14rem] bg-black rounded-2xl"
                          >
                            {val.fileType === 7 ? (
                              <figure className="w-full h-[126px] flex justify-center rounded-2xl overflow-hidden items-center bg-black">
                                <img
                                  onClick={() => clickPlay(val)}
                                  className="h-full rounded-2xl cursor-pointer"
                                  src={val.link}
                                  alt="Image"
                                />
                              </figure>
                            ) : (
                              val.fileType === 8 && (
                                <div className="cursor-pointer rounded-2xl overflow-hidden w-[100%] h-[126px] object-cover bg-black">
                                  <video
                                    onClick={() => clickPlay(val)}
                                    src={val?.link ? val?.link : ""}
                                    controls={false}
                                    className="w-full h-full object-cover"
                                  ></video>
                                </div>
                              )
                            )}
                          </div>
                        );
                      })}
                </div>
              </div>
            </article>
            <article className="w-[90%] py-2 flex justify-end items-center gap-5">
              <div className="w-[20%]">
                <Button
                  value={"بارگذاری ویدئو جدید"}
                  click={() => sendForm3(event)}
                  styleButton={10}
                />
              </div>
              <div className="w-[20%]">
                <Button
                  value={"بارگذاری عکس جدید"}
                  click={() => sendForm4(event)}
                  styleButton={10}
                />
              </div>
            </article>
          </section>
        </div>
      </div>
      <Load load={load} text={"لطفا منتظر بمانید ..."} />

      {/* View Modal */}
      {showViewModal && (
        <Modal
          onClose={closeModal}
          title="آپلود ویدئو"
          style={"w-[95%] md:w-[50%]"}
        >
          <FormUploadVideo
            setLoad={setLoad}
            dataVideo={dataVideo}
            setDataVideo={setDataVideo}
            setCheck={setCheck}
            setMessage={setMessage}
            setUpdateImage={setUpdateImage}
            updateImage={updateImage}
            id={id}
            setShowViewModal={setShowViewModal}
            setCheckAll={setCheckAll}
            check={check}
            setCheckData={setCheckData}
            setMessageData={setMessageData}
            setCheckDataAll={setCheckDataAll}
          />
        </Modal>
      )}
      {/* View Modal */}
      {showViewModal2 && (
        <Modal
          onClose={closeModal}
          title="آپلود عکس"
          style={"w-[95%] md:w-[50%]"}
        >
          <FormUploadImage
            setLoad={setLoad}
            dataVideo={dataImage}
            setDataImage={setDataImage}
            setCheck={setCheck}
            setMessage={setMessage}
            setUpdateImage={setUpdateImage}
            updateImage={updateImage}
            id={id}
            setShowViewModal2={setShowViewModal2}
            setCheckAll={setCheckAll}
            check={check}
            setCheckData={setCheckData}
            setMessageData={setMessageData}
            setCheckDataAll={setCheckDataAll}
          />
        </Modal>
      )}

      {showDeleteModal && (
        <Modal onClose={closeModal} title="" style={"w-[95%] md:w-[50%]"}>
          <div className="w-full flex flex-wrap justify-center gap-5">
            <p className="w-full text-center text-[1.5rem]">
              ایا مطمئن هستید که می خواهید این{" "}
              {play?.fileType == 8 || play?.fileType == 10 ? "ویدئو" : "عکس"} را
              حذف کنید؟
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
    </>
  );
}

export default UploadVideoImgSupplier;
