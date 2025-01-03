import { Swiper, SwiperSlide } from "swiper/react";
import { Image } from "antd";
import "@/index.css";
import ReactPlayer from "react-player";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import {
  React,
  useState,
  useEffect,
  Modal,
} from "@/component/management-panel/import-management.js";

function ViewShopper({ data }) {
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
        <article className="w-[100%]  flex flex-wrap content-start justify-start">
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
              <p className="w-[100%] md:w-[45%] xl:w-[30%] boxFilter19 rounded-lg overflow-hidden py-1 px-2">
                {" "}
                نام و نام خانوادگی : {data?.personName}
              </p>
              <p className="w-[100%] md:w-[45%] xl:w-[30%] boxFilter19 rounded-lg overflow-hidden py-1 px-2">
                {" "}
                کد ملی : {data?.nationCode}
              </p>
              <p className="w-[100%] md:w-[45%] xl:w-[30%] boxFilter19 rounded-lg overflow-hidden py-1 px-2">
                تلفن همراه : {data?.mobile}
              </p>
              <p className="w-[100%] md:w-[45%] xl:w-[30%] boxFilter19 rounded-lg overflow-hidden py-1 px-2">
                تلفن همراه ثابت : {data?.phone}
              </p>
            </div>
            <p className="w-[100%] xl:w-[100%] text-[1.3rem]">
              <span className="text-red-600 ">*</span> آدرس منزل
            </p>
            <p className="w-[100%] md:w-[45%] xl:w-[30%] boxFilter19 rounded-lg overflow-hidden py-1 px-2">
              استان : {data?.homeProvince?.value}
            </p>
            <p className="w-[100%] md:w-[45%] xl:w-[30%] boxFilter19 rounded-lg overflow-hidden py-1 px-2">
              شهر : {data?.homeCity?.value}
            </p>
            <p className="w-[100%] md:w-[45%] xl:w-[30%] boxFilter19 rounded-lg overflow-hidden py-1 px-2">
              کد پستی : {data?.homePostalCode}
            </p>
            <p className="w-[100%] break-all boxFilter19 rounded-lg overflow-hidden py-1 px-2">
              جزئیات آدرس : <br /> {data?.homeAddress}
            </p>
          </div>
        </article>
        <article className="w-[100%]  flex flex-wrap content-start justify-start">
          <p className="w-fit h-[40px] text-[1.2rem] border -translate-x-5 translate-y-5 z-10 bg-white px-3 rounded-2xl flex items-center gap-2">
            <span className="text-red-600">*</span> آدرس و وضعیت ملک محل کسب
          </p>
          <div
            dir="rtl"
            className="w-[100%] min-h-[403px] rounded-3xl px-4 py-7 flex gap-5 shadow-custom-6 justify-between content-start flex-wrap boxFilter "
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
                  {data?.bannerImages &&
                    data?.bannerImages?.map((val, i) => {
                      return (
                        <>
                          {val?.fileType == 11 || val?.fileType == 13 ? (
                            <Image
                            key={i}
                              height={100}
                              src={
                                val?.fileType == 11
                                  ? val.link
                                  : val?.fileType == 13 && val.link
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
              <div className="w-full flex flex-wrap gap-3 ">
                {data?.bannerImages &&
                  data?.bannerImages.map((val, i) => {
                    if (val?.fileType === 12 || val?.fileType === 14) {
                      return (
                        <>
                          <figure key={i} className="w-[150px] h-[100px]  relative cursor-pointer">
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
            <p className="w-[100%] md:w-[45%] xl:w-[30%] boxFilter19 rounded-lg overflow-hidden py-1 px-2">
              نوع مالکیت : {data?.isRent == true ? "استیجاری" : "مالک"}
            </p>
            <p className="w-[100%] md:w-[45%] xl:w-[30%] boxFilter19 rounded-lg overflow-hidden py-1 px-2">
              متراژ محل کسب : {data?.area} متر
            </p>
            <div className="w-full flex flex-wrap bg-zinc-300 rounded-lg">
              <p className="w-[100%] xl:w-[100%] rounded-lg overflow-hidden py-1 px-2">
                نمایش سند / اجاره نامه ملک : {""}
              </p>
              <div className="w-full flex justify-center">
                <div className="w-[100%] lg:w-[70%] xl:w-[50%]">
                  {data?.docOrRentImages.length > 0 ? (
                    <Swiper
                      slidesPerView={3}
                      spaceBetween={30}
                      pagination={{
                        clickable: true,
                      }}
                      modules={[Pagination]}
                      className="mySwiper"
                    >
                      {data?.docOrRentImages &&
                        data?.docOrRentImages.map((val, i) => {
                          return (
                            <>
                              <SwiperSlide key={i}>
                                <Image.PreviewGroup
                                  preview={{
                                    onChange: (current, prev) =>
                                      console.log(
                                        `current index: ${current}, prev index: ${prev}`
                                      ),
                                  }}
                                >
                                  <Image
                                    width={"100%"}
                                    height={"100%"}
                                    src={val.link}
                                  />
                                </Image.PreviewGroup>
                              </SwiperSlide>
                            </>
                          );
                        })}
                    </Swiper>
                  ) : (
                    <p className="w-full  px-2"> عکسی آپلود نشده است </p>
                  )}
                </div>
              </div>
            </div>
            <p className="w-[100%] md:w-[45%] xl:w-[30%] boxFilter19 rounded-lg overflow-hidden py-1 px-2">
              اسم مغازه : {data?.name}
            </p>
            <p className="w-[100%] md:w-[45%] xl:w-[30%] boxFilter19 rounded-lg overflow-hidden py-1 px-2">
              کد پستی : {data?.postalCode}
            </p>
            <p className="w-[100%] md:w-[45%] xl:w-[30%] boxFilter19 rounded-lg overflow-hidden py-1 px-2">
              استان : {data?.province?.value}
            </p>
            <p className="w-[100%] md:w-[45%] xl:w-[30%] boxFilter19 rounded-lg overflow-hidden py-1 px-2">
              شهر : {data?.city?.value}
            </p>
            <p className="w-[100%] break-all boxFilter19 rounded-lg overflow-hidden py-1 px-2">
              جزئیات آدرس : <br /> {data?.address}
            </p>
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
            <p className="w-[100%] md:w-[45%] xl:w-[30%] boxFilter19 rounded-lg overflow-hidden py-1 px-2">
              نوع جواز کسب :{" "}
              {data?.hasLicense == true ? "جواز رسمی" : "فاقد جواز"}
            </p>
            <p className="w-[100%] md:w-[45%] xl:w-[30%] boxFilter19 rounded-lg overflow-hidden py-1 px-2">
              کد رهگیری جواز کسب : {data?.licenseCode}
            </p>
            <div className="w-full flex flex-wrap bg-zinc-300 rounded-lg">
              <p className="w-[100%] xl:w-[100%] rounded-lg overflow-hidden py-1 px-2">
                نمایش جواز کسب : {""}
              </p>

              <div className="w-[100%] flex justify-start">
                <figure className="w-[100%] h-[90px]  flex justify-center rounded-lg ">
                  {data?.licenseImage?.link ? (
                    <Image.PreviewGroup
                      preview={{
                        onChange: (current, prev) =>
                          console.log(
                            `current index: ${current}, prev index: ${prev}`
                          ),
                      }}
                    >
                      <Image height={"90px"} src={data?.licenseImage?.link} />
                    </Image.PreviewGroup>
                  ) : (
                    <p className="w-full  px-2"> عکسی آپلود نشده است </p>
                  )}
                </figure>
              </div>
            </div>
            <p className="w-[100%] xl:w-[100%] boxFilter19 rounded-lg overflow-hidden py-1 px-2">
              نوع کسب و کار :{" "}
              {data?.isRetail == true ? "خرده فروشی" : "پخش عمده"}
            </p>
            <p className="w-[100%] xl:w-[100%] boxFilter19 rounded-lg overflow-hidden py-1 px-2 flex flex-wrap">
              برند ها :
              <span className="w-full flex flex-wrap items-center gap-5">
                {Array.isArray(data?.brands) &&
                  data.brands.map((val, i) => (
                    <>
                      <span className="flex gap-3 items-center">
                        <span key={val.key}>
                          {i + 1 + "- " + val.name + " "}
                        </span>
                        <span>
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
                        </span>
                      </span>
                    </>
                  ))}
              </span>
            </p>
            <p className="w-[100%] xl:w-[45%] boxFilter19 rounded-lg overflow-hidden py-1 px-2">
              رسته های کالایی :
              {data?.categories &&
                data?.categories.map((val, i) => {
                  return <p key={val.key}>{i + 1 + "- " + val.value + " "}</p>;
                })}
            </p>
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

export default ViewShopper;
