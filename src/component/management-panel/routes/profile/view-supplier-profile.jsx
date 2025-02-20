import { Swiper, SwiperSlide } from "swiper/react";
import { Image } from "antd";
import "@/index.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import TableInstallments from "./tableInstallments.jsx";

import {
  React,
  useState,
  useEffect,
  Modal,
  convertToJalali,
} from "@/component/management-panel/import-management.js";

function ViewSupplier({ data }) {
  const [updateTable, setUpdateTable] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [video, setVideo] = useState("");
  function openModal(link) {
    setShowModal(true);
    setVideo(link);
  }
  function closeModal() {
    setShowModal(false);
  }
  return (
    <>
      <style>
        {`
          .boxFilter{
            background:#ffffff4f;
            backdrop-filter:blur(10px);
          }
          `}
      </style>
      <div className='w-full flex flex-wrap px-4 pb-2 justify-between content-start"'>
        <article className="w-[100%] md:w-[48%]  flex flex-wrap content-start justify-start ">
          <p className="w-fit h-[40px] text-[1.2rem] shadow-custom-7 -translate-x-5 translate-y-5 z-10 bg-white px-3 rounded-2xl flex items-center gap-2">
            {" "}
            <span className="text-red-600 ">*</span> اطلاعات تماس و هویتی
          </p>
          <div
            dir="rtl"
            className="w-[100%] min-h-[360px] rounded-3xl px-4 py-7 flex gap-5 shadow-custom-6 justify-between flex-wrap boxFilter "
          >
            <div
              dir="rtl"
              className="w-[100%] rounded-3xl px-4 py-2 flex gap-5 justify-between flex-wrap boxFilter18"
            >
              <p
                style={{ display: data?.isPerson == false ? "none" : "flex" }}
                className="w-[100%] 2xl:w-[40%]"
              >
                {" "}
                نام و نام خانوادگی : {data?.name}
              </p>
              <p
                style={{ display: data?.isPerson == true ? "none" : "flex" }}
                className="w-[100%] 2xl:w-[40%]"
              >
                {" "}
                نام شرکت : {data?.name}
              </p>
              <p className="w-[100%] 2xl:w-[50%]">
                {" "}
                تلفن همراه تامین کننده : {data?.mobile}
              </p>
              <p className="w-[100%] xl:w-[40%]">
                وضعیت دسترسی : {data?.isActive == true ? "فعال" : "غیر فعال"}
              </p>
              <p className="w-[100%] xl:w-[50%]">
                نوع شخصیت : {data?.isPerson == true ? "حقیقی" : "حقوقی"}
              </p>
              <p
                style={{ display: data?.isPerson == false ? "none" : "flex" }}
                className="w-[100%] xl:w-[45%]"
              >
                شناسه کد / کد ملی : {data?.nationalId}
              </p>
              <p
                style={{ display: data?.isPerson == true ? "none" : "flex" }}
                className="w-[100%] xl:w-[45%]"
              >
                شناسه ملی شرکت : {data?.companyNationalId}
              </p>
              <p
                style={{ display: data?.isPerson == true ? "none" : "flex" }}
                className="w-[100%] xl:w-[50%]"
              >
                {" "}
                کد ملی مدیر عامل : {data?.nationalId}
              </p>
              <p
                style={{ display: data?.isPerson == true ? "none" : "flex" }}
                className="w-[100%] xl:w-[45%]"
              >
                {" "}
                تاریخ تولد مدیر عامل :{" "}
                {convertToJalali(
                  data?.birthDate == "0001-01-01T00:00:00"
                    ? ""
                    : data?.birthDate
                )}
              </p>
            </div>
            <p className="w-[100%] xl:w-[40%]"> تلفن ثابت 1 : {data?.phone}</p>
            <p className="w-[100%] xl:w-[50%]">تلفن ثابت 2 : {data?.phone2}</p>
            <p className="w-[100%]">
              تلفن همراه مدیر مجموعه : {data?.managerMobile}
            </p>
            <p className="w-[100%]">
              تلفن همراه حسابدار : {data?.accountantMobile}
            </p>
            <p className="w-[100%]">
              تلفن همراه مسئول هماهنگ کننده امور : {data?.coordinatorMobile}
            </p>

            <div
              dir="rtl"
              className="w-[100%] rounded-3xl px-2 flex shadow-custom-6 justify-center content-start flex-wrap boxFilter"
            >
              <div className="w-full xl:w-full">
                <p className="w-[100%] rounded-lg overflow-hidden py-1 px-2">
                  تصاویر پروفایل تامین کننده :
                </p>
                <Image.PreviewGroup
                  preview={{
                    onChange: (current, prev) =>
                      console.log(
                        `current index: ${current}, prev index: ${prev}`
                      ),
                  }}
                >
                  <div className="w-full flex flex-wrap gap-3 ">
                    {data?.attachments &&
                      data?.attachments?.map((val, i) => {
                        return (
                          <>
                            {val?.fileType == 7 || val?.fileType == 9 ? (
                              <Image
                                height={100}
                                src={
                                  val?.fileType == 7
                                    ? val.link
                                    : val?.fileType == 9 && val.link
                                }
                              />
                            ) : (
                              ""
                            )}
                          </>
                        );
                      })}
                  </div>
                </Image.PreviewGroup>
                <p className="w-[100%] rounded-lg overflow-hidden py-1 px-2">
                  ویدئوهای پروفایل تامین کننده :
                </p>
                <div className="w-full flex flex-wrap gap-3 py-2 px-1">
                  {data?.attachments &&
                    data?.attachments.map((val, i) => {
                      if (val?.fileType === 8 || val?.fileType === 10) {
                        return (
                          <>
                            <figure className="w-[150px] h-[100px]  relative cursor-pointer">
                              <video
                                muted
                                src={val.link}
                                className="w-full h-full object-cover"
                              />
                              <div
                                onClick={() => openModal(val.link)}
                                className="w-full h-full absolute top-0 text-[.8rem] opacity-0 transition-all duration-500 hover:opacity-100 hover:bg-[rgba(0,0,0,.3)] flex justify-center items-center text-white"
                              >
                                Preview
                              </div>
                            </figure>
                          </>
                        );
                      }
                      return null;
                    })}
                </div>
              </div>
            </div>
          </div>
        </article>
        <article className="w-[100%] md:w-[48%]  flex flex-wrap content-start justify-start">
          <p className="w-fit h-[40px] text-[1.2rem] shadow-custom-7 -translate-x-5 translate-y-5 z-10 bg-white px-3 rounded-2xl flex items-center gap-2">
            <span className="text-red-600">*</span> آدرس
          </p>
          <div
            dir="rtl"
            className="w-[100%] min-h-[403px] rounded-3xl px-4 py-7 flex gap-5 shadow-custom-6 justify-between content-start flex-wrap boxFilter"
          >
            <p className="w-[100%] lg:w-[40%]">استان : {data?.provinceName}</p>
            <p className="w-[100%] lg:w-[40%]">شهر : {data?.cityName}</p>
            <p className="w-[100%] break-all">
              جزئیات آدرس : <br /> {data?.address}
            </p>
            <p className="w-[100%]">کد پستی : {data?.postalCode}</p>
          </div>
        </article>
        <article className="w-[100%] md:w-[48%]  flex flex-wrap content-start justify-start">
          <p className="w-fit h-[40px] text-[1.2rem] shadow-custom-7 -translate-x-5 translate-y-5 z-10 bg-white px-3 rounded-2xl flex items-center gap-2">
            {" "}
            <span className="text-red-600 ">*</span> فعالیت
          </p>
          <div
            dir="rtl"
            className="w-[100%] min-h-[403px] rounded-3xl px-4 py-7 flex gap-5 shadow-custom-6 justify-around flex-wrap boxFilter"
          >
            <p className="w-[100%] flex justify-start">
              نوع فعالیت :
              {(() => {
                const labels = [];
                if (data?.isProducer) labels.push(" تولید کننده ");
                if (data?.isImporter) labels.push(" وارد کننده ");
                if (data?.isSpreader) labels.push(" پخش کننده ");
                return labels.join(" ، ");
              })()}
            </p>
            {data?.isProducer == true ? (
              <>
                <hr className="w-full border-gray-400" />
                <div className="w-[100%] flex justify-start gap-5 flex-wrap">
                  <p className="w-full">برند تولیدی :</p>
                  {data?.produceDetails?.brands &&
                    data?.produceDetails?.brands.map((val, i) => {
                      return (
                        <>
                        <div className="flex gap-5 items-center">
                          <p key={`produce-${i}`} className="w-[45%] text-nowrap">
                            {i + 1 + "- " + val.name + " "}
                          </p>
                          <Image.PreviewGroup
                            preview={{
                              onChange: (current, prev) =>
                                console.log(
                                  `current index: ${current}, prev index: ${prev}`
                                ),
                            }}
                          >
                            <Image
                              width={"50px"}
                              height={"50px"}
                              src={val.logoFileLink}
                            />
                          </Image.PreviewGroup>
                          </div>
                        </>
                      );
                    })}
                </div>
                <p className="w-[100%] flex justify-start">
                  توضیحات برند تولیدی : {data?.produceDetails?.description}
                </p>
              </>
            ) : null}
            {data?.isImporter == true ? (
              <>
                <hr className="w-full border-gray-400" />
                <div className="w-[100%] flex justify-start gap-5 flex-wrap">
                  <p className="w-full">برند وارداتی :</p>
                  {data?.importDetails?.brands &&
                    data?.importDetails?.brands.map((val, i) => {
                      return (
                        <>
                        <div className="flex gap-5 items-center">
                          <p key={`produce-${i}`} className="w-[45%] text-nowrap">
                            {i + 1 + "- " + val.name + " "}
                          </p>
                          <Image.PreviewGroup
                            preview={{
                              onChange: (current, prev) =>
                                console.log(
                                  `current index: ${current}, prev index: ${prev}`
                                ),
                            }}
                          >
                            <Image
                              width={"50px"}
                              height={"50px"}
                              src={val.logoFileLink}
                            />
                          </Image.PreviewGroup>
                          </div>
                        </>
                      );
                    })}
                </div>
                <p className="w-[100%] flex justify-start">
                  توضیحات برند وارداتی : {data?.importDetails?.description}
                </p>
              </>
            ) : null}
            {data?.isSpreader == true ? (
              <>
                <hr className="w-full border-gray-400" />
                <div className="w-[100%] flex justify-start gap-5 flex-wrap">
                  <p className="w-full">برند پخش :</p>
                  {data?.spreadDetails?.brands &&
                    data?.spreadDetails?.brands.map((val, i) => {
                      return (
                        <>
                        <div className="flex gap-5 items-center">
                          <p key={`produce-${i}`} className="w-[45%] text-nowrap">
                            {i + 1 + "- " + val.name + " "}
                          </p>
                          <Image.PreviewGroup
                            preview={{
                              onChange: (current, prev) =>
                                console.log(
                                  `current index: ${current}, prev index: ${prev}`
                                ),
                            }}
                          >
                            <Image
                              width={"50px"}
                              height={"50px"}
                              src={val.logoFileLink}
                            />
                          </Image.PreviewGroup>
                          </div>
                        </>
                      );
                    })}
                </div>
                <p className="w-[100%] flex justify-start">
                  توضیحات برند پخش : {data?.spreadDetails?.description}
                </p>
              </>
            ) : null}
          </div>
        </article>
        <article className="w-[100%] md:w-[48%]  flex flex-wrap content-start justify-start">
          <p className="w-fit h-[40px] text-[1.2rem] shadow-custom-7 -translate-x-5 translate-y-5 z-10 bg-white px-3 rounded-2xl flex items-center gap-2">
            <span className="text-red-600">*</span> شرایط فروش
          </p>
          <div
            dir="rtl"
            className="w-[100%] min-h-[403px] rounded-3xl px-4 py-7 flex gap-5 shadow-custom-6 justify-between content-start flex-wrap boxFilter"
          >
            <p className="w-[100%] lg:w-[40%]">
              نوع فروش :
              {(() => {
                const labels = [];
                if (data?.installments) labels.push(" اقساط ");
                if (data?.cash) labels.push(" نقد ");
                if (data?.preOrder) labels.push(" پیش فروش ");
                return labels.join(" ، ");
              })()}
            </p>
            <div className="w-[100%]">
              مدت چک : <br />
              <TableInstallments
                updateTable={updateTable}
                setUpdateTable={setUpdateTable}
                data={data?.paymentDurationDaysList}
              />
            </div>
          </div>
        </article>
      </div>
      {showModal && (
        <Modal onClose={closeModal} title="">
          <div className="w-full flex flex-wrap justify-center  items-center">
            <video muted controls width={"500px"} src={video} />
          </div>
        </Modal>
      )}
    </>
  );
}

export default ViewSupplier;
