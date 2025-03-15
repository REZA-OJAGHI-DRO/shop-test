import React, { useEffect, useState } from "react";
import imgIcon from "/img/iconUploadImage.png";
import "@/index.css";
import "@/App.css";
import { postFile } from "@/services/file/file";
import { useSelector } from "react-redux";
import { message } from "antd";

function ImageUpload({
  width,
  label,
  setData,
  data,
  styleLabel,
  styleBox,
  disabled,
  type,
  setLoad,
  fileType,
  setCheck,
  setMessage,
  setShowDeleteModal,
  setDataDelete,
  setImage,
  image,
  // maxFiles = Infinity, 
  maxFiles , 
}) {
  const [fileUrls, setFileUrls] = useState([]);
  const inputId = useState(
    `fileInput-${Math.random().toString(36).substr(2, 9)}`
  );
  const getAcceptedFileTypes = () => {
    switch (fileType) {
      case "image":
        return ".jpg, .jpeg, .png, .gif";
      case "video":
        return ".mp4, .avi, .mov, .mkv";
      case "excel":
        return ".xls, .xlsx, .csv";
      default:
        return "*";
    }
  };
  const token = useSelector((state) => state.product.token);
  
  
  // const isDuplicateFile = (file) => {
  //   return fileUrls.some(
  //     (uploadedFile) =>
  //       uploadedFile.name === file.name && uploadedFile.size === file.size
  //   );
  // };
  
  const handleFileChange2 = async (event) => {
    const fileList = Array.from(event.target.files);
    
    // console.log(message);
    
    if (fileList.length > 0) {
      const newFilesData = [];
      setLoad(true);
      if (data.length >= maxFiles) {
        setMessage(`حداکثر تعداد فایل‌های قابل آپلود ${maxFiles} است.`);
        setCheck((r) => ({ ...r, check4: true }));
        setTimeout(() => {
          setMessage("");
          setCheck((r) => ({ ...r, check4: false }));
        }, 5000);
        setLoad(false);
        return;
      }

      for (let file of fileList) {
        try {
          const result = await postFile(file, token, type);
          if (result.isSuccess) {
            setMessage(result?.error ? result?.error : result?.message || "فایل با موفقیت آپلود شد.");
            setCheck((r) => ({ ...r, check1: true }));
            setTimeout(() => {
              setMessage("");
              setCheck((r) => ({ ...r, check4: false }));
              setCheck((r) => ({ ...r, check3: false }));
              setCheck((r) => ({ ...r, check2: false }));
              setCheck((r) => ({ ...r, check1: false }));
            }, 5000);
            newFilesData.push(result.data);

            const reader = new FileReader();
            reader.onload = (e) => {
              setImage((prevImages) => [...prevImages, e.target.result]);
            };
            reader.readAsDataURL(file);
          } else {
            setMessage(result?.error ? result?.error : result?.message || "خطا در آپلود فایل");
            setCheck((r) => ({ ...r, check4: true }));
            setTimeout(() => {
              setMessage("");
              setCheck((r) => ({ ...r, check4: false }));
              setCheck((r) => ({ ...r, check3: false }));
              setCheck((r) => ({ ...r, check2: false }));
              setCheck((r) => ({ ...r, check1: false }));
            }, 5000);
          }
        } catch (error) {
          setMessage("خطا در آپلود فایل");
          setCheck((r) => ({ ...r, check4: true }));
          setTimeout(() => {
            setMessage("");
            setCheck((r) => ({ ...r, check4: false }));
            setCheck((r) => ({ ...r, check3: false }));
            setCheck((r) => ({ ...r, check2: false }));
            setCheck((r) => ({ ...r, check1: false }));
          }, 5000);
        }
      }

      setData((prevData) => [...(prevData || []), ...(newFilesData || [])]);

      setFileUrls((prevFileUrls) => [...prevFileUrls, ...fileList]);
      setLoad(false);
      document.getElementById(inputId).value = "";
    }
  };

  useEffect(() => {
    if (data?.length === 0) {
      setFileUrls([]);
    }
  }, [data]);

  function openModal(i) {
    setShowDeleteModal(true);
    setDataDelete(i);
  }

  useEffect(() => {
    setData(data);
  }, [data]);

  return (
    <>
      <style>
        {`
      .boxFilter {
        background:#ffffff4f;
        backdrop-filter:blur(10px);
      }
      .boxFilter4 {
        backdrop-filter:blur(10px);
      }
      .loader {
        border: 8px solid #f3f3f3;
        border-top: 8px solid #3498db;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
        margin: auto;
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      `}
      </style>
      <div className={`${width} flex flex-wrap gap-2 lg:gap-2`}>
        <label className={`${styleLabel} w-full`}>{label}</label>
        <div className="w-full grid gap-1 xl:gap-0" title="آپلود تصاویر">
          <div className="w-full gridArea h-full flex gap-2 justify-end ">
            <label
              className="w-[45px] h-[40px] group custom-button flex justify-center items-center rounded-lg"
              htmlFor={inputId}
            >
              <img src={imgIcon} className="w-full h-full rounded-lg shadow-custom-6 hover:scale-105 transition-all duration-300" alt="" />
            </label>
            <input
              type="file"
              id={inputId}
              onChange={handleFileChange2}
              className="overflow-hidden h-full custom-file-input"
              multiple
              disabled={disabled}
              accept={getAcceptedFileTypes()}
            />
            <div
              className={`w-[100%]  h-[100px] px-2 shadow-custom-6 ${styleBox} flex items-center gap-2 rounded-xl overflow-x-scroll myElement2`}
            >
              {image &&
                image.map((file, index) => (
                  <div
                    key={index}
                    style={{ flex: "0 0 auto" }}
                    className="relative w-[80px] h-[80px] rounded-lg shadow-custom-6 group"
                    onClick={() => openModal(index)}
                  >
                    {/* تصویر */}
                    <img
                      src={file}
                      alt=""
                      loading="lazy"
                      className="w-full h-full rounded-lg "
                    />
                    <div className="absolute inset-0 cursor-pointer rounded-lg bg-black bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <i
                      className="bi bi-trash3-fill text-white"
                      title="حذف"
                    ></i>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ImageUpload;
