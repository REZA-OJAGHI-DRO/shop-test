import { useEffect, useRef, useState } from "react";
import "@/App.css";
import "@/index.css";
import { postFile, postFileExcel } from "@/services/file/file";
import { useSelector } from "react-redux";
import Modal from "@/component/component-general/modal/modal";

function File({
  width,
  label,
  setDataFile,
  style2,
  styleLabel,
  type,
  setLoad,
  fileType,
  setCheck,
  setMessage,
  updateTable
}) {
  const [p, setP] = useState("فایل را آپلود کنید");
  const [p2, setP2] = useState("");
  const [goodUpdateExcelErrors, setGoodUpdateExcelErrors] = useState([]);
  const inputId = useState(`fileInput-${Math.random().toString(36).substr(2, 9)}`);
  const fileInputRef = useRef(null);
  const chabk = useSelector((state) => state.product.chabk);
  const token = useSelector((state) => state.product.token);
  const getAcceptedFileTypes = () => {
    switch (fileType) {
      case "image":
        return ".jpg, .jpeg, .png, .gif , .jpe";
      case "video":
        return ".mp4, .avi, .mov, .mkv , .mov , .ogg , .3gp";
      case "excel":
        return ".xls, .xlsx";
      default:
        return "*";
    }
  };

  const [showExcelModal, setShowExcelModal] = useState(false);
  const closeModal = () => {
    setShowExcelModal(false);
    setP("فایل را آپلود کنید");
    setDataFile(null);
    setMessage("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    setShowExcelModal(false);
    setP("فایل را آپلود کنید");
    setDataFile(null);
    // setMessage("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [updateTable]);

  const handleFileChange = async (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const maxSize = fileType === "excel" ? 5 * 1024 * 1024 : 50 * 1024 * 1024; 

      if (file.size > maxSize) {
       
        setP("حجم فایل از حد مجاز بیشتر است");
        setLoad(false);
        return; 
      }

      setLoad(true);
      try {
        if (fileType === "image" || fileType === "video") {
          const result = await postFile(file, token, type);
          if (result.isSuccess) {
            setMessage(result?.error ? result?.error : result?.message);
            setDataFile(result.data);
            setP("فایل آپلود شد");
            setTimeout(() => {
              setLoad(false);
              setCheck((r) => ({ ...r, check1: true }));
              setTimeout(() => {
                setCheck((r) => ({ ...r, check1: false }));
              }, 2000);
            }, 2000);
          } else {
            setMessage(result?.error ? result?.error : result?.message);
            setDataFile(result.data);
            setP("فایل آپلود نشد");
            setTimeout(() => {
              setLoad(false);
              setCheck((r) => ({ ...r, check4: true }));
              setTimeout(() => {
                setCheck((r) => ({ ...r, check4: false }));
              }, 2000);
            }, 2000);
          }
        } else if (fileType === "excel") {
          const result = await postFileExcel(file, token);
          if (result.isSuccess) {
            setMessage(result?.error ? result?.error : result?.message);
            setDataFile(result.data);
            setGoodUpdateExcelErrors(result.data.goodUpdateExcelErrors);
            setP2(result?.error ? result?.error : result?.message);
            setP("فایل آپلود شد");
            setTimeout(() => {
              setLoad(false);
              setCheck((r) => ({ ...r, check1: true }));
              setShowExcelModal(true);
              setTimeout(() => {
                setCheck((r) => ({ ...r, check1: false }));
              }, 2000);
            }, 2000);
          } else {
            setMessage(result?.error ? result?.error : result?.message);
            setDataFile(result.data);
            setP("فایل آپلود نشد");
            setTimeout(() => {
              setLoad(false);
              setCheck((r) => ({ ...r, check4: true }));
              setTimeout(() => {
                setCheck((r) => ({ ...r, check4: false }));
              }, 2000);
            }, 2000);
          }
        }
      } catch (error) {
        setP("فایل آپلود نشد");
        setLoad(false);
      }
    } else {
      setDataFile(null);
      setP("فایلی انتخاب نشده است");
      setLoad(false);
    }
  };

  return (
    <>
      <div className={`${width} flex flex-wrap gap-1 xl:gap-0`}>
        <label htmlFor={inputId} className={`${styleLabel} w-full`}>
          {label}
        </label>
        <div
          className={`${style2} w-full grid gap-1 xl:gap-0 grid-col shadow-custom-6 bg-[#ffffff] rounded-xl`}
        >
          <div className="gridArea w-full h-full flex justify-start items-center pr-3 text-zinc-400 text-[1rem]">
            {p}
          </div>
          <div className="w-full gridArea h-full flex justify-end px-5">
            <label
              className="group custom-button w-[25%] flex justify-center items-center"
              htmlFor={inputId}
            >
              <Svg />
            </label>
            <input
              type="file"
              id={inputId}
              accept={getAcceptedFileTypes()}
              onChange={handleFileChange}
              className="w-full h-full custom-file-input"
              ref={fileInputRef}
            />
          </div>
        </div>
      </div>

      {showExcelModal && (
        <Modal onClose={closeModal} title="" style={"w-[70%]"}>
          <div className="w-full flex flex-wrap justify-center gap-5 max-h-[300px] overflow-y-auto">
            <div className="w-full flex justify-center text-green-600">
              <p>{p2}</p>
            </div>

            {goodUpdateExcelErrors.length > 0 ? (
              <div className="w-full font-bold">
                <p>خطا های اکسل</p>
              </div>
            ) : (
              ""
            )}
            {goodUpdateExcelErrors &&
              goodUpdateExcelErrors.map((val, index) => {
                return (
                  <div key={index} className="w-full">
                    <p>
                      ردیف {val.rowNumber} : {val.description}
                    </p>
                  </div>
                );
              })}

            <p className="w-full text-center text-[1.5rem]"></p>
          </div>
        </Modal>
      )}
    </>
  );
}

export default File;

const Svg = () => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="26"
        height="30"
        viewBox="0 0 50 55"
        fill="none"
        className="group-hover:translate-y-1 transition-all duration-300"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M21.0003 14.4375C20.6522 14.4375 20.3184 14.5758 20.0723 14.8219C19.8261 15.0681 19.6878 15.4019 19.6878 15.75L19.6878 34.9528L16.7478 31.521C16.5213 31.2564 16.199 31.0927 15.8518 31.0658C15.5046 31.0389 15.1609 31.151 14.8963 31.3775C14.6318 31.604 14.468 31.9263 14.4411 32.2735C14.4142 32.6208 14.5263 32.9644 14.7528 33.229L20.0028 39.354C20.1261 39.4981 20.279 39.6138 20.4512 39.6931C20.6234 39.7724 20.8108 39.8135 21.0003 39.8135C21.1899 39.8135 21.3773 39.7724 21.5495 39.6931C21.7217 39.6138 21.8746 39.4981 21.9978 39.354L27.2478 33.229C27.36 33.098 27.4452 32.9462 27.4987 32.7823C27.5522 32.6183 27.5729 32.4455 27.5596 32.2735C27.5462 32.1016 27.4992 31.934 27.4211 31.7802C27.343 31.6265 27.2353 31.4896 27.1043 31.3775C26.9733 31.2654 26.8215 31.1801 26.6576 31.1266C26.4937 31.0731 26.3208 31.0525 26.1489 31.0658C25.9769 31.0791 25.8093 31.1262 25.6556 31.2043C25.5018 31.2824 25.365 31.39 25.2528 31.521L22.3128 34.951L22.3128 15.75C22.3128 15.0255 21.7248 14.4375 21.0003 14.4375Z"
          fill="#7C7C7C"
        />
        <path
          d="M14 26.25C15.2285 26.25 15.8427 26.25 16.2855 25.9542C16.4759 25.8269 16.6394 25.6634 16.7667 25.473C17.0625 25.0302 17.0625 24.416 17.0625 23.1875L17.0625 15.75C17.0625 14.7057 17.4773 13.7042 18.2158 12.9658C18.9542 12.2273 19.9557 11.8125 21 11.8125C22.0443 11.8125 23.0458 12.2273 23.7842 12.9658C24.5227 13.7042 24.9375 14.7057 24.9375 15.75L24.9375 23.1875C24.9375 24.416 24.9375 25.0302 25.2332 25.473C25.3606 25.6634 25.5241 25.8269 25.7145 25.9542C26.1572 26.25 26.7715 26.25 28 26.25C32.949 26.25 35.4252 26.25 36.9618 24.7118C38.5 23.1753 38.5 20.7025 38.5 15.7518L38.5 14.0018C38.5 9.04925 38.5 6.5765 36.9618 5.03825C35.4253 3.5 32.949 3.5 28 3.5L14 3.5C9.051 3.5 6.57475 3.5 5.03825 5.03825C3.5 6.5765 3.5 9.051 3.5 14L3.5 15.75C3.5 20.7007 3.5 23.1752 5.03825 24.7117C6.57475 26.25 9.051 26.25 14 26.25Z"
          fill="#7C7C7C"
        />
      </svg>
    </>
  );
};
