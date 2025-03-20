import React, { useEffect } from "react";

function Modal2({ onClose, title, children, style, styleBox }) {
  useEffect(() => {
    // جلوگیری از اسکرول صفحه هنگام باز شدن مودال
    document.body.style.overflow = "hidden";

    return () => {
      // فعال‌سازی دوباره اسکرول هنگام بسته شدن مودال
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <style>
        {`
          .boxFilter11 {
            backdrop-filter: blur(10px);
          }
          .boxFilter12 {
            backdrop-filter: blur(10px);
          }
        `}
      </style>

      <div
        style={styleBox}
        className={`fixed z-50 w-[100vw] inset-0 bg-opacity-50 flex items-center justify-center boxFilter11`}
      >
        <div
          className={` ${style} py-4 bg-[rgba(229,231,235,1)] shadow-custom-6 boxFilter12 rounded-2xl`}
        >
          {/* Header */}
          <div className="flex justify-between items-center px-4 border-b-2 border-zinc-300">
            <h2 className="text-lg font-bold">{title}</h2>
            <button
              type="button"
              onClick={onClose}
              className="text-red-500 text-[2rem]"
            >
              &times;
            </button>
          </div>

          {/* Body */}
          <div className="w-full h-[85%] px-4 mt-4 py-4">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal2;
