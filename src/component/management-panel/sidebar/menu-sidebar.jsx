import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  React,
  useState,
  GetCookie,
} from "@/component/management-panel/import-management.js";

function MenuSidebar() {
  const [icon, setIcon] = useState([
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ]);
  const [icon1, setIcon1] = useState([true]);
  const timer = useSelector((state) => state.product.timerSideBar);

  const [roleCookie, setRoleCookie] = useState(GetCookie("role"));

  function menubar(e, x) {
    setIcon((prevState) => {
      const isCurrentlyFalse = prevState[x] === false;
      return prevState.map((item, index) => {
        if (index === x) {
          return isCurrentlyFalse ? true : false;
        } else {
          return true;
        }
      });
    });
  }
  function menubar2(e, x) {
    setIcon1((prevState) => {
      const isCurrentlyFalse = prevState[x] === false;
      return prevState.map((item, index) => {
        if (index === x) {
          return isCurrentlyFalse ? true : false;
        } else {
          return true;
        }
      });
    });
  }

  function reload() {
    // window.location.reload();
  }

  function openProfileSupplier() {}

  return (
    <ul
      dir="ltr"
      className={`w-[100%] flex flex-wrap content-start ${
        timer == true ? "gap-2" : "gap-5"
      }`}
    >
      <li
        dir="rtl"
        className={`w-full flex flex-wrap *:text-[1.1rem] *:lg:text-[1.1rem] *:text-white ${
          timer == true ? "justify-start" : "justify-center"
        } `}
      >
        <div>
          <span className="flex items-center gap-3 px-2">
            <Icon icon="iconoir:tools"></Icon>
            {timer == true ? " داشبورد" : ""}
          </span>
        </div>
      </li>
      <li
        dir="rtl"
        className="w-full flex flex-wrap *:text-[1.1rem] *:lg:text-[1.1rem] *:text-white  "
      >
        <div
          onClick={() => menubar(event, 0)}
          className={`w-full flex ${
            timer == true ? "justify-between" : "justify-center"
          } items-center rounded-2xl px-2 hover:bg-[rgb(255,255,255,.2)] transition-all duration-300 cursor-pointer`}
        >
          <span className="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 48 48"
            >
              <g
                fill="none"
                stroke="#ffffff"
                strokeLinejoin="round"
                strokeWidth="4"
              >
                <path d="M44 14L24 4L4 14V34L24 44L44 34V14Z" />
                <path strokeLinecap="round" d="M4 14L24 24" />
                <path strokeLinecap="round" d="M24 44V24" />
                <path strokeLinecap="round" d="M44 14L24 24" />
                <path strokeLinecap="round" d="M34 9L14 19" />
              </g>
            </svg>
            {timer == true ? "کالا" : ""}
          </span>
          {timer == true ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chevron-left"
                viewBox="0 0 16 16"
                style={{ display: icon[0] == true ? "flex" : "none" }}
              >
                <path
                  fillRule="evenodd"
                  d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chevron-down"
                viewBox="0 0 16 16"
                style={{ display: icon[0] == true ? "none" : "flex" }}
              >
                <path
                  fillRule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                />
              </svg>
            </>
          ) : null}
        </div>
        <ul
          className={`w-[100%] ${
            timer == true ? "px-2" : "px-0"
          }  py-0 flex flex-wrap gap-1 ${
            icon[0] == true
              ? "h-0"
              : "h-auto py-2 bg-[rgba(255,255,255,0.14)] rounded-lg"
          } overflow-hidden transition-all duration-300 py-0`}
        >
          <li
            // style={{ display: roleCookie == "Admin" ? "flex" : "none" }}
            className={`w-full rounded-2xl ${
              timer == true ? "px-2" : "px-6"
            }  bg-transparent hover:bg-[rgb(255,255,255,.2)] transition-all duration-300  cursor-pointer`}
          >
            <Link to="registerOfGoods" onClick={reload}>
              <span className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                >
                  <g clipPath="url(#clip0_348_1463)">
                    <g filter="url(#filter0_d_348_1463)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.9371 4.7446C12.1563 4.7446 12.334 4.92227 12.334 5.14146V12.6817C12.334 12.9009 12.1563 13.0786 11.9371 13.0786H4.39686C4.17767 13.0786 4 12.9009 4 12.6817V5.14146C4 4.92227 4.17767 4.7446 4.39686 4.7446H11.9371ZM10.6474 6.43124H5.68664V11.3919H10.6474V6.43124ZM22.8838 8.60616C23.0387 8.76114 23.0387 9.01242 22.8838 9.16739L18.3938 13.6573C18.2389 13.8123 17.9876 13.8123 17.8326 13.6573L13.3427 9.16739C13.1877 9.01242 13.1877 8.76114 13.3427 8.60616L17.8326 4.11623C17.9876 3.96126 18.2389 3.96126 18.3939 4.11623L22.8838 8.60616ZM20.7791 8.88677L18.1132 6.22091L15.4473 8.88679L18.1132 11.5527L20.7791 8.88677ZM11.9371 14.666C12.1563 14.666 12.334 14.8437 12.334 15.0629V22.6031C12.334 22.8223 12.1563 23 11.9371 23H4.39686C4.17767 23 4 22.8223 4 22.6031V15.0629C4 14.8437 4.17767 14.666 4.39686 14.666H11.9371ZM10.6474 16.3527H5.68664V21.3134H10.6474V16.3527ZM21.8586 14.666C22.0778 14.666 22.2554 14.8437 22.2554 15.0629V22.6031C22.2554 22.8223 22.0778 23 21.8586 23H14.3183C14.0991 23 13.9214 22.8223 13.9214 22.6031V15.0629C13.9214 14.8437 14.0991 14.666 14.3183 14.666H21.8586ZM20.5688 16.3527H15.6081V21.3134H20.5688V16.3527Z"
                        fill="white"
                      />
                    </g>
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_348_1463"
                      x="0"
                      y="2"
                      width="27"
                      height="27"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="2" />
                      <feGaussianBlur stdDeviation="2" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_348_1463"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_348_1463"
                        result="shape"
                      />
                    </filter>
                    <clipPath id="clip0_348_1463">
                      <rect width="28" height="28" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                {timer == true ? "ثبت کالا" : ""}
              </span>
            </Link>
          </li>
          <li
            className={`w-full  rounded-2xl flex ${
              timer == true ? "px-2" : "px-5"
            }  bg-transparent hover:bg-[rgb(255,255,255,.2)] transition-all duration-300  cursor-pointer`}
          >
            <Link to="productUpdate" onClick={reload}>
              <span className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                >
                  <g clipPath="url(#clip0_377_563)">
                    <g clipPath="url(#clip1_377_563)">
                      <path
                        d="M7.75439 13.5V5.35L5.15439 7.95L3.75439 6.5L8.75439 1.5L13.7544 6.5L12.3544 7.95L9.75439 5.35V13.5H7.75439ZM2.75439 17.5C2.20439 17.5 1.73373 17.3043 1.34239 16.913C0.951061 16.5217 0.755061 16.0507 0.754395 15.5V12.5H2.75439V15.5H14.7544V12.5H16.7544V15.5C16.7544 16.05 16.5587 16.521 16.1674 16.913C15.7761 17.305 15.3051 17.5007 14.7544 17.5H2.75439Z"
                        fill="white"
                      />
                    </g>
                  </g>
                  <defs>
                    <clipPath id="clip0_377_563">
                      <rect
                        width="18"
                        height="18"
                        fill="white"
                        transform="translate(0.245605)"
                      />
                    </clipPath>
                    <clipPath id="clip1_377_563">
                      <rect
                        width="28"
                        height="28"
                        fill="white"
                        transform="translate(-0.245605 0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                {timer == true ? "بروزرسانی کالا" : ""}
              </span>
            </Link>
          </li>
        </ul>
      </li>
      <li
        dir="rtl"
        className="w-full flex flex-wrap *:text-[1.1rem] *:lg:text-[1.1rem] *:text-white"
      >
        <div
          onClick={() => menubar(event, 1)}
          className={`w-full flex ${
            timer == true ? "justify-between" : "justify-center"
          } items-center rounded-2xl px-2 hover:bg-[rgb(255,255,255,.2)] transition-all duration-300 cursor-pointer`}
        >
          <span className="flex items-center gap-3">
            <Icon icon="carbon:rule"></Icon>
            {timer == true ? " قوانین فروش" : ""}
          </span>
          {timer == true ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chevron-left"
                viewBox="0 0 16 16"
                style={{ display: icon[1] == true ? "flex" : "none" }}
              >
                <path
                  fillRule="evenodd"
                  d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chevron-down"
                viewBox="0 0 16 16"
                style={{ display: icon[1] == true ? "none" : "flex" }}
              >
                <path
                  fillRule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                />
              </svg>
            </>
          ) : null}
        </div>
        <ul
          className={`w-[100%] ${
            timer == true ? "px-2" : "px-0"
          } py-0 flex flex-wrap gap-1 ${
            icon[1] == true
              ? "h-0"
              : "h-auto py-2 bg-[rgba(255,255,255,0.14)] rounded-lg"
          } overflow-hidden transition-all duration-300 py-0`}
        >
          <li
            className={`w-full rounded-2xl flex ${
              timer == true ? "px-2" : "ps-8"
            }  bg-transparent hover:bg-[rgb(255,255,255,.2)] transition-all duration-300 cursor-pointer`}
          >
            <Link to="" onClick={reload}>
              <span className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M4.74561 12.875C5.57061 12.875 6.24561 13.55 6.24561 14.375C6.24561 15.2 5.57061 15.875 4.74561 15.875C3.92061 15.875 3.24561 15.2 3.24561 14.375C3.24561 13.55 3.92061 12.875 4.74561 12.875ZM12.2456 12.875C13.0706 12.875 13.7456 13.55 13.7456 14.375C13.7456 15.2 13.0706 15.875 12.2456 15.875C11.4206 15.875 10.7456 15.2 10.7456 14.375C10.7456 13.55 11.4206 12.875 12.2456 12.875ZM4.89561 10.475C4.89561 10.55 4.97061 10.625 5.04561 10.625H13.7456V12.125H4.74561C3.92061 12.125 3.24561 11.45 3.24561 10.625C3.24561 10.325 3.32061 10.1 3.39561 9.875L4.37061 8.075L1.74561 2.375H0.245605V0.875H2.72061L5.94561 7.625H11.1956L14.1206 2.375L15.3956 3.125L12.4706 8.375C12.2456 8.825 11.7206 9.125 11.1956 9.125H5.57061L4.89561 10.325V10.475ZM6.54561 0.125C7.14561 0.125 7.59561 0.575 7.59561 1.175C7.59561 1.775 7.14561 2.225 6.54561 2.225C5.94561 2.225 5.49561 1.775 5.49561 1.175C5.49561 0.575 6.02061 0.125 6.54561 0.125ZM10.4456 6.125C9.84561 6.125 9.39561 5.675 9.39561 5.075C9.39561 4.475 9.84561 4.025 10.4456 4.025C11.0456 4.025 11.4956 4.475 11.4956 5.075C11.4956 5.675 10.9706 6.125 10.4456 6.125ZM6.39561 6.125L5.49561 5.225L10.5956 0.125L11.4956 1.025L6.39561 6.125Z"
                    fill="white"
                  />
                </svg>
                {timer == true ? " شرایط فروش" : ""}
              </span>
            </Link>
          </li>
          <li
            className={`w-full rounded-2xl flex ${
              timer == true ? "px-2" : "ps-7"
            }  bg-transparent hover:bg-[rgb(255,255,255,.2)] transition-all duration-300 cursor-pointer`}
          >
            <Link to="salesDiscounts" onClick={reload}>
              <span className="flex items-center gap-3">
                <Icon icon="solar:sale-linear"></Icon>
                {timer == true ? " تخفیفات فروش" : ""}
              </span>
            </Link>
          </li>
        </ul>
      </li>
      <li
        style={{ display: roleCookie == "Admin" ? "flex" : "none" }}
        dir="rtl"
        className="w-full flex flex-wrap *:text-[1.1rem] *:lg:text-[1.1rem] *:text-white"
      >
        <div
          onClick={() => menubar(event, 2)}
          className={`w-full flex ${
            timer == true ? "justify-between" : "justify-center"
          } items-center rounded-2xl px-2 hover:bg-[rgb(255,255,255,.2)] transition-all duration-300 cursor-pointer`}
        >
          <span className="flex items-center gap-3">
            <Icon icon="eos-icons:product-subscriptions-outlined"></Icon>
            {timer == true ? " برند ها" : ""}
          </span>
          {timer == true ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chevron-left"
                viewBox="0 0 16 16"
                style={{ display: icon[2] == true ? "flex" : "none" }}
              >
                <path
                  fillRule="evenodd"
                  d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chevron-down"
                viewBox="0 0 16 16"
                style={{ display: icon[2] == true ? "none" : "flex" }}
              >
                <path
                  fillRule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                />
              </svg>
            </>
          ) : null}
        </div>
        <ul
          className={`w-[100%] ${
            timer == true ? "px-2" : "px-0"
          } py-0 flex flex-wrap gap-1 ${
            icon[2] == true
              ? "h-0"
              : "h-auto py-2 bg-[rgba(255,255,255,0.14)] rounded-lg"
          } overflow-hidden transition-all duration-300 `}
        >
          <li
            className={`w-full rounded-2xl flex ${
              timer == true ? "px-2" : "ps-7"
            }  bg-transparent hover:bg-[rgb(255,255,255,.2)] transition-all duration-300  cursor-pointer`}
          >
            <Link to="brandRegistration" onClick={reload}>
              <span className="flex items-center gap-3">
                <Icon icon="eos-icons:product-subscriptions-outlined"></Icon>
                {timer == true ? " ثبت برند" : ""}
              </span>
            </Link>
          </li>
          <li
            className={`w-full rounded-2xl flex ${
              timer == true ? "px-2" : "ps-7"
            }  bg-transparent hover:bg-[rgb(255,255,255,.2)] transition-all duration-300  cursor-pointer`}
          >
            <Link to="brandCatalog" onClick={reload}>
              <span className="flex items-center gap-3">
                <Icon icon="eos-icons:product-subscriptions-outlined"></Icon>
                {timer == true ? " کاتالوگ لیست قیمت" : ""}
              </span>
            </Link>
          </li>
        </ul>
      </li>
      <li
        dir="rtl"
        className="w-full flex flex-wrap *:text-[1.1rem] *:lg:text-[1.1rem] *:text-white"
      >
        <div
          onClick={() => menubar(event, 3)}
          className={`w-full flex ${
            timer == true ? "justify-between" : "justify-center"
          } items-center rounded-2xl px-2 hover:bg-[rgb(255,255,255,.2)] transition-all duration-300 cursor-pointer`}
        >
          <span className="flex items-center gap-3">
            <Icon icon="hugeicons:document-validation"></Icon>
            {timer == true ? "اعتبار سنجی" : ""}
          </span>
          {timer == true ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chevron-left"
                viewBox="0 0 16 16"
                style={{ display: icon[3] == true ? "flex" : "none" }}
              >
                <path
                  fillRule="evenodd"
                  d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chevron-down"
                viewBox="0 0 16 16"
                style={{ display: icon[3] == true ? "none" : "flex" }}
              >
                <path
                  fillRule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                />
              </svg>
            </>
          ) : null}
        </div>
        <ul></ul>
      </li>
      <li
        dir="rtl"
        className="w-full flex flex-wrap *:text-[1.1rem] *:lg:text-[1.1rem] *:text-white"
      >
        <div
          onClick={() => menubar(event, 5)}
          className={`w-full flex ${
            timer == true ? "justify-between" : "justify-center"
          } items-center rounded-2xl px-2 hover:bg-[rgb(255,255,255,.2)] transition-all duration-300 cursor-pointer`}
        >
          <span className="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 18 18"
              fill="none"
            >
              <g clipPath="url(#clip0_348_1443)">
                <path
                  d="M13.5 13.875L13.7085 12.8355C13.818 12.2858 14.112 11.778 14.217 11.2275C14.2395 11.113 14.2505 10.9955 14.25 10.875C14.2497 10.614 14.1949 10.356 14.0891 10.1174C13.9834 9.87887 13.829 9.665 13.6358 9.48951C13.4427 9.31403 13.215 9.18079 12.9675 9.09834C12.7199 9.01588 12.4578 8.98601 12.198 9.01065C11.9382 9.03529 11.6864 9.11389 11.4587 9.24142C11.231 9.36895 11.0325 9.5426 10.8758 9.75126C10.719 9.95993 10.6076 10.199 10.5486 10.4532C10.4896 10.7074 10.4843 10.9711 10.533 11.2275C10.638 11.7788 10.932 12.285 11.0422 12.8355L11.25 13.875M13.5 13.875H11.25M13.5 13.875L15.3727 14.3745C15.6925 14.4456 15.9784 14.6237 16.1833 14.8792C16.3883 15.1347 16.5 15.4525 16.5 15.78C16.5 16.1775 16.1775 16.5 15.78 16.5H8.97C8.77904 16.5 8.59591 16.4241 8.46088 16.2891C8.32586 16.1541 8.25 15.971 8.25 15.78C8.25 15.105 8.71875 14.5208 9.37725 14.3745L11.25 13.875M12.75 6.75V6C12.75 3.879 12.75 2.81775 12.0908 2.15925C11.4323 1.5 10.371 1.5 8.25 1.5H6C3.879 1.5 2.81775 1.5 2.15925 2.15925C1.5 2.81775 1.5 3.879 1.5 6V12C1.5 14.121 1.5 15.1823 2.15925 15.8408C2.81775 16.5 3.879 16.5 6 16.5"
                  stroke="#E6E6E6"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.25 6.50025C5.25 6.50025 5.71875 6.50025 6.1875 7.5C6.1875 7.5 7.67625 5.00025 9 4.5M4.5 10.5H7.5M4.5 12.75H7.5"
                  stroke="#E6E6E6"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_348_1443">
                  <rect width="18" height="18" fill="white" />
                </clipPath>
              </defs>
            </svg>
            {timer == true ? "همکاران" : ""}
          </span>
          {timer == true ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chevron-left"
                viewBox="0 0 16 16"
                style={{ display: icon[5] == true ? "flex" : "none" }}
              >
                <path
                  fillRule="evenodd"
                  d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chevron-down"
                viewBox="0 0 16 16"
                style={{ display: icon[5] == true ? "none" : "flex" }}
              >
                <path
                  fillRule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                />
              </svg>
            </>
          ) : null}
        </div>
        <ul
          className={`w-[100%] ${
            timer == true ? "px-2" : "px-0"
          } py-0 flex flex-wrap gap-1 ${
            icon[5] == true
              ? "h-0"
              : "h-auto py-2 bg-[rgba(255,255,255,0.14)] rounded-lg"
          } overflow-hidden transition-all duration-300 `}
        >
          <li
            className={`w-full rounded-2xl ${
              timer == true ? "px-2" : "ps-8"
            }  bg-transparent hover:bg-[rgb(255,255,255,.2)] transition-all duration-300  cursor-pointer`}
          >
            <Link to="colleagues" onClick={reload}>
              <span className="flex items-center gap-3">
                <i className="bi bi-list-check"></i>
                {timer == true ? "همکاران" : ""}
              </span>
            </Link>
          </li>
          <li
            className={`w-full rounded-2xl ${
              timer == true ? "px-2" : "ps-8"
            }  bg-transparent hover:bg-[rgb(255,255,255,.2)] transition-all duration-300  cursor-pointer`}
          >
            <Link to="representatives" onClick={reload}>
              <span className="flex items-center gap-3">
                <i className="bi bi-list-check"></i>
                {timer == true ? "نمایندگان" : ""}
              </span>
            </Link>
          </li>
          <li
            className={`w-full rounded-2xl ${
              timer == true ? "px-2" : "ps-8"
            }  bg-transparent hover:bg-[rgb(255,255,255,.2)] transition-all duration-300  cursor-pointer`}
          >
            <Link to="afterSalesService" onClick={reload}>
              <span className="flex items-center gap-3 text-[1rem]">
                <i className="bi bi-list-check"></i>
                {timer == true ? "خدمات پس از فروش" : ""}
              </span>
            </Link>
          </li>
        </ul>
      </li>
      <li
        dir="rtl"
        className="w-full flex flex-wrap *:text-[1.1rem] *:lg:text-[1.1rem] *:text-white"
      >
        <div
          onClick={() => menubar(event, 9)}
          className={`w-full flex ${
            timer == true ? "justify-between" : "justify-center"
          } items-center rounded-2xl px-2 hover:bg-[rgb(255,255,255,.2)] transition-all duration-300 cursor-pointer`}
        >
          <span className="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 18 18"
              fill="none"
            >
              <g clipPath="url(#clip0_348_1443)">
                <path
                  d="M13.5 13.875L13.7085 12.8355C13.818 12.2858 14.112 11.778 14.217 11.2275C14.2395 11.113 14.2505 10.9955 14.25 10.875C14.2497 10.614 14.1949 10.356 14.0891 10.1174C13.9834 9.87887 13.829 9.665 13.6358 9.48951C13.4427 9.31403 13.215 9.18079 12.9675 9.09834C12.7199 9.01588 12.4578 8.98601 12.198 9.01065C11.9382 9.03529 11.6864 9.11389 11.4587 9.24142C11.231 9.36895 11.0325 9.5426 10.8758 9.75126C10.719 9.95993 10.6076 10.199 10.5486 10.4532C10.4896 10.7074 10.4843 10.9711 10.533 11.2275C10.638 11.7788 10.932 12.285 11.0422 12.8355L11.25 13.875M13.5 13.875H11.25M13.5 13.875L15.3727 14.3745C15.6925 14.4456 15.9784 14.6237 16.1833 14.8792C16.3883 15.1347 16.5 15.4525 16.5 15.78C16.5 16.1775 16.1775 16.5 15.78 16.5H8.97C8.77904 16.5 8.59591 16.4241 8.46088 16.2891C8.32586 16.1541 8.25 15.971 8.25 15.78C8.25 15.105 8.71875 14.5208 9.37725 14.3745L11.25 13.875M12.75 6.75V6C12.75 3.879 12.75 2.81775 12.0908 2.15925C11.4323 1.5 10.371 1.5 8.25 1.5H6C3.879 1.5 2.81775 1.5 2.15925 2.15925C1.5 2.81775 1.5 3.879 1.5 6V12C1.5 14.121 1.5 15.1823 2.15925 15.8408C2.81775 16.5 3.879 16.5 6 16.5"
                  stroke="#E6E6E6"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.25 6.50025C5.25 6.50025 5.71875 6.50025 6.1875 7.5C6.1875 7.5 7.67625 5.00025 9 4.5M4.5 10.5H7.5M4.5 12.75H7.5"
                  stroke="#E6E6E6"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_348_1443">
                  <rect width="18" height="18" fill="white" />
                </clipPath>
              </defs>
            </svg>
            {timer == true ? "کارتابل" : ""}
          </span>
          {timer == true ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chevron-left"
                viewBox="0 0 16 16"
                style={{ display: icon[9] == true ? "flex" : "none" }}
              >
                <path
                  fillRule="evenodd"
                  d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chevron-down"
                viewBox="0 0 16 16"
                style={{ display: icon[9] == true ? "none" : "flex" }}
              >
                <path
                  fillRule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                />
              </svg>
            </>
          ) : null}
        </div>
        <ul
          className={`w-[100%] ${
            timer == true ? "px-2" : "px-0"
          } py-0 flex flex-wrap gap-1 ${
            icon[9] == true
              ? "h-0"
              : "h-auto py-1 bg-[rgba(255,255,255,0.14)] rounded-lg"
          } overflow-hidden transition-all duration-300`}
        >
          <li
            className={`w-full rounded-2xl ${
              timer == true ? "px-2" : "ps-6"
            }  bg-transparent hover:bg-[rgb(255,255,255,.2)] transition-all duration-300  cursor-pointer`}
          >
            <Link to="Cartable" onClick={reload}>
              <span className="flex items-center gap-3">
                <Icon icon="solar:sale-linear"></Icon>
                {timer == true ? "کارتابل سفارشات" : ""}
              </span>
            </Link>
          </li>
        </ul>
      </li>
      <li
        style={{ display: roleCookie == "Admin" ? "flex" : "none" }}
        dir="rtl"
        className="w-full flex flex-wrap *:text-[1.1rem] *:lg:text-[1.1rem] *:text-white"
      >
        <div
          onClick={() => menubar(event, 6)}
          className={`w-full flex ${
            timer == true ? "justify-between" : "justify-center"
          } items-center rounded-2xl px-2 hover:bg-[rgb(255,255,255,.2)] transition-all duration-300 cursor-pointer`}
        >
          <span className="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 18 18"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.70875 0.9375H11.2913C12.3165 0.9375 13.1438 0.9375 13.794 1.02525C14.469 1.11525 15.0375 1.31025 15.489 1.761C15.9405 2.2125 16.134 2.781 16.2255 3.456C16.3125 4.10625 16.3125 4.9335 16.3125 5.95875V12.0413C16.3125 13.0665 16.3125 13.8938 16.2255 14.544C16.134 15.219 15.9405 15.7875 15.489 16.239C15.0375 16.6905 14.469 16.884 13.794 16.9755C13.1438 17.0625 12.3165 17.0625 11.2913 17.0625H6.70875L6.0345 17.0618C6.00952 17.063 5.98448 17.063 5.9595 17.0618C5.271 17.0565 4.68975 17.04 4.206 16.9755C3.531 16.884 2.9625 16.6905 2.511 16.239C2.0595 15.7875 1.866 15.219 1.77525 14.544C1.7025 14.0078 1.6905 13.3515 1.68825 12.5625H1.5C1.35082 12.5625 1.20774 12.5032 1.10225 12.3977C0.996763 12.2923 0.9375 12.1492 0.9375 12C0.9375 11.8508 0.996763 11.7077 1.10225 11.6023C1.20774 11.4968 1.35082 11.4375 1.5 11.4375H1.6875V9.5625H1.5C1.35082 9.5625 1.20774 9.50324 1.10225 9.39775C0.996763 9.29226 0.9375 9.14918 0.9375 9C0.9375 8.85082 0.996763 8.70774 1.10225 8.60225C1.20774 8.49676 1.35082 8.4375 1.5 8.4375H1.6875V6.5625H1.5C1.35082 6.5625 1.20774 6.50324 1.10225 6.39775C0.996763 6.29226 0.9375 6.14918 0.9375 6C0.9375 5.85082 0.996763 5.70774 1.10225 5.60225C1.20774 5.49676 1.35082 5.4375 1.5 5.4375H1.6875C1.6905 4.6485 1.7025 3.99225 1.77525 3.456C1.86525 2.781 2.06025 2.2125 2.511 1.761C2.9625 1.3095 3.531 1.116 4.206 1.02525C4.85625 0.9375 5.6835 0.9375 6.70875 0.9375ZM2.8125 6.5625H3C3.14918 6.5625 3.29226 6.50324 3.39775 6.39775C3.50324 6.29226 3.5625 6.14918 3.5625 6C3.5625 5.85082 3.50324 5.70774 3.39775 5.60225C3.29226 5.49676 3.14918 5.4375 3 5.4375H2.8125C2.8155 4.653 2.8275 4.068 2.88975 3.606C2.964 3.0555 3.09975 2.7645 3.30675 2.55675C3.5145 2.349 3.8055 2.214 4.35675 2.13975C4.65675 2.09925 5.01075 2.07975 5.4375 2.07075V15.93C5.076 15.9271 4.71494 15.904 4.356 15.861C3.8055 15.7868 3.5145 15.651 3.30675 15.444C3.099 15.2362 2.964 14.9452 2.88975 14.394C2.8275 13.9327 2.8155 13.3477 2.81325 12.5632H3C3.14918 12.5632 3.29226 12.504 3.39775 12.3985C3.50324 12.293 3.5625 12.1499 3.5625 12.0007C3.5625 11.8516 3.50324 11.7085 3.39775 11.603C3.29226 11.4975 3.14918 11.4383 3 11.4383H2.8125V9.56325H3C3.14918 9.56325 3.29226 9.50399 3.39775 9.3985C3.50324 9.29301 3.5625 9.14993 3.5625 9.00075C3.5625 8.85157 3.50324 8.70849 3.39775 8.603C3.29226 8.49751 3.14918 8.43825 3 8.43825H2.8125V6.5625ZM6.5625 15.9375H11.25C12.3263 15.9375 13.077 15.936 13.644 15.8602C14.1945 15.786 14.4855 15.6502 14.6932 15.4432C14.901 15.2355 15.036 14.9445 15.1102 14.3932C15.186 13.827 15.1875 13.0763 15.1875 12V6C15.1875 4.92375 15.186 4.17225 15.1102 3.606C15.036 3.0555 14.9002 2.7645 14.6932 2.55675C14.4855 2.349 14.1945 2.214 13.6432 2.13975C13.077 2.064 12.3263 2.0625 11.25 2.0625H6.5625V15.9375ZM8.0625 4.875C8.0625 4.72582 8.12176 4.58274 8.22725 4.47725C8.33274 4.37176 8.47582 4.3125 8.625 4.3125H12.375C12.5242 4.3125 12.6673 4.37176 12.7727 4.47725C12.8782 4.58274 12.9375 4.72582 12.9375 4.875C12.9375 5.02418 12.8782 5.16726 12.7727 5.27275C12.6673 5.37824 12.5242 5.4375 12.375 5.4375H8.625C8.47582 5.4375 8.33274 5.37824 8.22725 5.27275C8.12176 5.16726 8.0625 5.02418 8.0625 4.875ZM8.0625 7.5C8.0625 7.35082 8.12176 7.20774 8.22725 7.10225C8.33274 6.99676 8.47582 6.9375 8.625 6.9375H12.375C12.5242 6.9375 12.6673 6.99676 12.7727 7.10225C12.8782 7.20774 12.9375 7.35082 12.9375 7.5C12.9375 7.64918 12.8782 7.79226 12.7727 7.89775C12.6673 8.00324 12.5242 8.0625 12.375 8.0625H8.625C8.47582 8.0625 8.33274 8.00324 8.22725 7.89775C8.12176 7.79226 8.0625 7.64918 8.0625 7.5Z"
                fill="#E6E6E6"
              />
            </svg>
            {timer == true ? "تعاریف پایه" : ""}
          </span>
          {timer == true ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chevron-left"
                viewBox="0 0 16 16"
                style={{ display: icon[6] == true ? "flex" : "none" }}
              >
                <path
                  fillRule="evenodd"
                  d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chevron-down"
                viewBox="0 0 16 16"
                style={{ display: icon[6] == true ? "none" : "flex" }}
              >
                <path
                  fillRule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                />
              </svg>
            </>
          ) : null}
        </div>
        <ul
          className={`w-[100%] ${
            timer == true ? "px-2" : "px-0"
          } py-0 flex flex-wrap gap-1 ${
            icon[6] == true
              ? "h-0"
              : "h-auto py-1 bg-[rgba(255,255,255,0.14)] rounded-lg"
          } overflow-hidden transition-all duration-300`}
        >
          <li
            className={`w-full rounded-2xl ${
              timer == true ? "px-2" : "ps-6"
            }  bg-transparent hover:bg-[rgb(255,255,255,.2)] transition-all duration-300  cursor-pointer`}
          >
            <Link to="packaging" onClick={reload}>
              <span className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M4.74561 12.875C5.57061 12.875 6.24561 13.55 6.24561 14.375C6.24561 15.2 5.57061 15.875 4.74561 15.875C3.92061 15.875 3.24561 15.2 3.24561 14.375C3.24561 13.55 3.92061 12.875 4.74561 12.875ZM12.2456 12.875C13.0706 12.875 13.7456 13.55 13.7456 14.375C13.7456 15.2 13.0706 15.875 12.2456 15.875C11.4206 15.875 10.7456 15.2 10.7456 14.375C10.7456 13.55 11.4206 12.875 12.2456 12.875ZM4.89561 10.475C4.89561 10.55 4.97061 10.625 5.04561 10.625H13.7456V12.125H4.74561C3.92061 12.125 3.24561 11.45 3.24561 10.625C3.24561 10.325 3.32061 10.1 3.39561 9.875L4.37061 8.075L1.74561 2.375H0.245605V0.875H2.72061L5.94561 7.625H11.1956L14.1206 2.375L15.3956 3.125L12.4706 8.375C12.2456 8.825 11.7206 9.125 11.1956 9.125H5.57061L4.89561 10.325V10.475ZM6.54561 0.125C7.14561 0.125 7.59561 0.575 7.59561 1.175C7.59561 1.775 7.14561 2.225 6.54561 2.225C5.94561 2.225 5.49561 1.775 5.49561 1.175C5.49561 0.575 6.02061 0.125 6.54561 0.125ZM10.4456 6.125C9.84561 6.125 9.39561 5.675 9.39561 5.075C9.39561 4.475 9.84561 4.025 10.4456 4.025C11.0456 4.025 11.4956 4.475 11.4956 5.075C11.4956 5.675 10.9706 6.125 10.4456 6.125ZM6.39561 6.125L5.49561 5.225L10.5956 0.125L11.4956 1.025L6.39561 6.125Z"
                    fill="white"
                  />
                </svg>
                {timer == true ? "بسته بندی" : ""}
              </span>
            </Link>
          </li>
          <li
            className={`w-full rounded-2xl ${
              timer == true ? "px-2" : "ps-6"
            }  bg-transparent hover:bg-[rgb(255,255,255,.2)] transition-all duration-300  cursor-pointer`}
          >
            <Link to="unitOfGoods" onClick={reload}>
              <span className="flex items-center gap-3">
                <Icon icon="solar:sale-linear"></Icon>
                {timer == true ? " واحد کالا" : ""}
              </span>
            </Link>
          </li>
          <li
            className={` w-full rounded-2xl ${
              timer == true ? "" : ""
            }  bg-transparent hover:bg-[rgb(255,255,255,.2)] transition-all duration-300  cursor-pointer`}
          >
            <div
              onClick={() => menubar2(event, 0)}
              className="w-full flex flex-wrap justify-between items-center rounded-2xl  px-2 hover:bg-[rgb(255,255,255,.2)] transition-all duration-300 cursor-pointer"
            >
              <span className="flex items-center gap-3 ps-4">
                <Icon icon="solar:sale-linear"></Icon>
                {timer == true ? "دسته بندی" : ""}
              </span>
              {timer == true ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-chevron-left"
                    viewBox="0 0 16 16"
                    style={{ display: icon1[0] == true ? "flex" : "none" }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-chevron-down"
                    viewBox="0 0 16 16"
                    style={{ display: icon1[0] == true ? "none" : "flex" }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                    />
                  </svg>
                </>
              ) : null}
              <ul
                className={`w-[100%] ${
                  timer == true ? "px-2" : "ps-6"
                } py-0 flex flex-wrap gap-1 ${
                  icon1[0] == true ? "h-0" : "h-auto"
                } overflow-hidden transition-all duration-300`}
              >
                <li
                  className={`w-full mt-2 rounded-2xl ${
                    timer == true ? "px-2" : ""
                  }  bg-transparent hover:bg-[rgb(255,255,255,.2)] transition-all duration-300  cursor-pointer`}
                >
                  <Link to="classificationOfGoods1" onClick={reload}>
                    <span className="flex items-center gap-3">
                      <Icon icon="solar:sale-linear"></Icon>
                      {timer == true ? "سطح یک" : ""}
                    </span>
                  </Link>
                </li>
                <li
                  className={`w-full mt-2 rounded-2xl ${
                    timer == true ? "px-2" : ""
                  }  bg-transparent hover:bg-[rgb(255,255,255,.2)] transition-all duration-300  cursor-pointer`}
                >
                  <Link to="classificationOfGoods2" onClick={reload}>
                    <span className="flex items-center gap-3">
                      <Icon icon="solar:sale-linear"></Icon>
                      {timer == true ? "سطح دو" : ""}
                    </span>
                  </Link>
                </li>
                <li
                  className={`w-full mt-2 rounded-2xl ${
                    timer == true ? "px-2" : ""
                  }  bg-transparent hover:bg-[rgb(255,255,255,.2)] transition-all duration-300  cursor-pointer`}
                >
                  <Link to="classificationOfGoods3" onClick={reload}>
                    <span className="flex items-center gap-3">
                      <Icon icon="solar:sale-linear"></Icon>
                      {timer == true ? "سطح سه" : ""}
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </li>
      <li
        dir="rtl"
        className="w-full flex flex-wrap *:text-[1.1rem] *:lg:text-[1.1rem] *:text-white"
        style={{ display: roleCookie == "Admin" ? "flex" : "none" }}
      >
        <div
          onClick={() => menubar(event, 7)}
          className={`w-full flex ${
            timer == true ? "justify-between" : "justify-center"
          } items-center rounded-2xl px-2 hover:bg-[rgb(255,255,255,.2)] transition-all duration-300 cursor-pointer`}
        >
          <span className="flex items-center gap-3">
            <i className="bi bi-list-check"></i>

            {timer == true ? "لیست ثبت نام " : ""}
          </span>
          {timer == true ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chevron-left"
                viewBox="0 0 16 16"
                style={{ display: icon[7] == true ? "flex" : "none" }}
              >
                <path
                  fillRule="evenodd"
                  d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chevron-down"
                viewBox="0 0 16 16"
                style={{ display: icon[7] == true ? "none" : "flex" }}
              >
                <path
                  fillRule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                />
              </svg>
            </>
          ) : null}
        </div>
        <ul
          className={`w-[100%] ${
            timer == true ? "px-2" : "px-0"
          } py-0 flex flex-wrap gap-1 ${
            icon[7] == true
              ? "h-0"
              : "h-auto py-1 bg-[rgba(255,255,255,0.14)] rounded-lg"
          } overflow-hidden transition-all duration-300`}
        >
          <li
            className={`w-full rounded-2xl ${
              timer == true ? "px-2" : "ps-8"
            }  bg-transparent hover:bg-[rgb(255,255,255,.2)] transition-all duration-300  cursor-pointer`}
          >
            <Link to="confirmation" onClick={reload}>
              <span className="flex items-center gap-3">
                <i className="bi bi-list-check"></i>
                {timer == true ? " تامین کننده" : ""}
              </span>
            </Link>
          </li>
          <li
            className={`w-full rounded-2xl ${
              timer == true ? "px-2" : "ps-8"
            }  bg-transparent hover:bg-[rgb(255,255,255,.2)] transition-all duration-300  cursor-pointer`}
          >
            <Link to="confirmationOfBuyers" onClick={reload}>
              <span className="flex items-center gap-3">
                <i className="bi bi-list-check"></i>
                {timer == true ? " خریداران" : ""}
              </span>
            </Link>
          </li>
        </ul>
      </li>
      <li
        dir="rtl"
        className="w-full flex flex-wrap *:text-[1.1rem] *:lg:text-[1.1rem] *:text-white"
        style={{ display: roleCookie == "Admin" ? "flex" : "none" }}
      >
        <div
          onClick={() => menubar(event, 8)}
          className={`w-full flex ${
            timer == true ? "justify-between" : "justify-center"
          } items-center rounded-2xl px-2 hover:bg-[rgb(255,255,255,.2)] transition-all duration-300 cursor-pointer`}
        >
          <span className="flex items-center gap-3">
            <i className="bi bi-chat-left-text"></i>

            {timer == true ? "لیست پیامک " : ""}
          </span>
          {timer == true ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chevron-left"
                viewBox="0 0 16 16"
                style={{ display: icon[8] == true ? "flex" : "none" }}
              >
                <path
                  fillRule="evenodd"
                  d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chevron-down"
                viewBox="0 0 16 16"
                style={{ display: icon[8] == true ? "none" : "flex" }}
              >
                <path
                  fillRule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                />
              </svg>
            </>
          ) : null}
        </div>
        <ul
          className={`w-[100%] ${
            timer == true ? "px-2" : "px-0"
          } py-0 flex flex-wrap gap-1 ${
            icon[8] == true
              ? "h-0"
              : "h-auto py-1 bg-[rgba(255,255,255,0.14)] rounded-lg"
          } overflow-hidden transition-all duration-300`}
        >
          <li
            className={`w-full rounded-2xl ${
              timer == true ? "px-2" : "ps-7"
            }  bg-transparent hover:bg-[rgb(255,255,255,.2)] transition-all duration-300  cursor-pointer`}
          >
            <Link to="MessageList" onClick={reload}>
              <span className="flex items-center gap-3">
                <i className="bi bi-chat-left-text"></i>
                {timer == true ? "پیامک" : ""}
              </span>
            </Link>
          </li>
        </ul>
      </li>
      <li
        dir="rtl"
        className="w-full flex flex-wrap *:text-[1.1rem] *:lg:text-[1.1rem] *:text-white"
      >
        <div
          onClick={() => menubar(event, 4)}
          className={`w-full flex ${
            timer == true ? "justify-between" : "justify-center"
          } items-center rounded-2xl px-2 hover:bg-[rgb(255,255,255,.2)] transition-all duration-300 cursor-pointer`}
        >
          <span className="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
              >
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2"></path>
                <path d="M4.271 18.346S6.5 15.5 12 15.5s7.73 2.846 7.73 2.846M12 12a3 3 0 1 0 0-6a3 3 0 0 0 0 6"></path>
              </g>
            </svg>
            {timer == true ? "پروفایل" : ""}
          </span>
          {timer == true ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chevron-left"
                viewBox="0 0 16 16"
                style={{ display: icon[4] == true ? "flex" : "none" }}
              >
                <path
                  fillRule="evenodd"
                  d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chevron-down"
                viewBox="0 0 16 16"
                style={{ display: icon[4] == true ? "none" : "flex" }}
              >
                <path
                  fillRule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                />
              </svg>
            </>
          ) : null}
        </div>
        <ul
          className={`w-[100%] ${
            timer == true ? "px-2" : "px-0"
          } py-0 flex flex-wrap gap-1 ${
            icon[4] == true
              ? "h-0"
              : "h-auto py-1 bg-[rgba(255,255,255,0.14)] rounded-lg"
          } overflow-hidden transition-all duration-300`}
        >
          <li
            onClick={openProfileSupplier()}
            className={`w-full rounded-2xl flex ${
              timer == true ? "px-2" : "ps-8"
            }  bg-transparent hover:bg-[rgb(255,255,255,.2)] transition-all duration-300  cursor-pointer`}
          >
            <Link to="ProfileSupplier" onClick={reload}>
              <span className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                  >
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2"></path>
                    <path d="M4.271 18.346S6.5 15.5 12 15.5s7.73 2.846 7.73 2.846M12 12a3 3 0 1 0 0-6a3 3 0 0 0 0 6"></path>
                  </g>
                </svg>
                {timer == true ? "تامین کننده" : ""}
              </span>
            </Link>
          </li>
          <li
            //  style={{ display: roleCookie == "Admin" ? "flex" : "none" }}
            className={`w-full  rounded-2xl ${
              timer == true ? "px-2" : "ps-8"
            }  bg-transparent hover:bg-[rgb(255,255,255,.2)] transition-all duration-300  cursor-pointer`}
          >
            <Link to="GallerySupplier" onClick={reload}>
              <span className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                  >
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2"></path>
                    <path d="M4.271 18.346S6.5 15.5 12 15.5s7.73 2.846 7.73 2.846M12 12a3 3 0 1 0 0-6a3 3 0 0 0 0 6"></path>
                  </g>
                </svg>
                {timer == true ? "گالری تامین کننده" : ""}
              </span>
            </Link>
          </li>
          <li
            style={{ display: roleCookie == "Admin" ? "flex" : "none" }}
            className={`w-full  rounded-2xl ${
              timer == true ? "px-2" : "ps-8"
            }  bg-transparent hover:bg-[rgb(255,255,255,.2)] transition-all duration-300  cursor-pointer`}
          >
            <Link to="ProfileShopper" onClick={reload}>
              <span className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                  >
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2"></path>
                    <path d="M4.271 18.346S6.5 15.5 12 15.5s7.73 2.846 7.73 2.846M12 12a3 3 0 1 0 0-6a3 3 0 0 0 0 6"></path>
                  </g>
                </svg>
                {timer == true ? "خریداران" : ""}
              </span>
            </Link>
          </li>
        </ul>
      </li>

      <li
        dir="rtl"
        className="w-full flex flex-wrap *:text-[1.1rem] *:lg:text-[1.1rem] *:text-white  "
      >
        <div
          onClick={() => menubar(event, 10)}
          className={`w-full flex ${
            timer == true ? "justify-between" : "justify-center"
          } items-center rounded-2xl px-2 hover:bg-[rgb(255,255,255,.2)] transition-all duration-300 cursor-pointer`}
        >
          <span className="flex items-center gap-3">
            <Icon icon="system-uicons:coins" />
            {timer == true ? "امور مالی" : ""}
          </span>
          {timer == true ? (
            <Icon
              icon="bi:chevron-left"
              className={`transition-all duration-200 text-[16px] ${
                icon[10] === true ? "" : "-rotate-90"
              }`}
            ></Icon>
          ) : null}
        </div>
        <ul
          className={`w-[100%] ${
            timer == true ? "px-2" : "px-0"
          }  py-0 flex flex-wrap gap-1 ${
            icon[10] == true
              ? "h-0"
              : "h-auto py-2 bg-[rgba(255,255,255,0.14)] rounded-lg"
          } overflow-hidden transition-all duration-300 py-0`}
        >
          <li
            className={`w-full rounded-2xl ${
              timer == true ? "px-2" : "px-6"
            }  bg-transparent hover:bg-[rgb(255,255,255,.2)] transition-all duration-300  cursor-pointer`}
          >
            <Link to="finance/check-management" onClick={reload}>
              <span className="flex items-center gap-3">
                <Icon icon="fluent:check-20-regular" />
                {timer == true ? "دفتر چک" : ""}
              </span>
            </Link>
          </li>
        </ul>
      </li>

      <li
        dir="rtl"
        style={{ display: roleCookie == "Admin" ? "flex" : "none" }}
        className="w-full flex flex-wrap *:text-[1.1rem] *:lg:text-[1.1rem] *:text-white  "
      >
        <div
          onClick={() => menubar(event, 11)}
          className={`w-full flex ${
            timer == true ? "justify-between" : "justify-center"
          } items-center rounded-2xl px-2 hover:bg-[rgb(255,255,255,.2)] transition-all duration-300 cursor-pointer`}
        >
          <span className="flex items-center gap-3">
            <Icon icon="system-uicons:coins" />
            {timer == true ? "پیشنهادات" : ""}
          </span>
          {timer == true ? (
            <Icon
              icon="bi:chevron-left"
              className={`transition-all duration-200 text-[16px] ${
                icon[11] === true ? "" : "-rotate-90"
              }`}
            ></Icon>
          ) : null}
        </div>
        <ul
          className={`w-[100%] ${
            timer == true ? "px-2" : "px-0"
          }  py-0 flex flex-wrap gap-1 ${
            icon[11] == true
              ? "h-0"
              : "h-auto py-2 bg-[rgba(255,255,255,0.14)] rounded-lg"
          } overflow-hidden transition-all duration-300 py-0`}
        >
          <li
            className={`w-full rounded-2xl ${
              timer == true ? "px-2" : "px-6"
            }  bg-transparent hover:bg-[rgb(255,255,255,.2)] transition-all duration-300  cursor-pointer`}
          >
            <Link to="adminSuggestions" onClick={reload}>
              <span className="flex items-center gap-3">
                <Icon icon="fluent:check-20-regular" />
                {timer == true ? "پیشنهادات ادمین" : ""}
              </span>
            </Link>
          </li>
        </ul>
      </li>

      <li
        dir="rtl"
        style={{ display: roleCookie == "Admin" ? "flex" : "none" }}
        className="w-full flex flex-wrap *:text-[1.1rem] *:lg:text-[1.1rem] *:text-white  "
      >
        <div
          onClick={() => menubar(event, 12)}
          className={`w-full flex ${
            timer == true ? "justify-between" : "justify-center"
          } items-center rounded-2xl px-2 hover:bg-[rgb(255,255,255,.2)] transition-all duration-300 cursor-pointer`}
        >
          <span className="flex items-center gap-3">
            <Icon icon="system-uicons:coins" />
            {timer == true ? "گواهی اعتبار" : ""}
          </span>
          {timer == true ? (
            <Icon
              icon="bi:chevron-left"
              className={`transition-all duration-200 text-[16px] ${
                icon[12] === true ? "" : "-rotate-90"
              }`}
            ></Icon>
          ) : null}
        </div>
        <ul
          className={`w-[100%] ${
            timer == true ? "px-2" : "px-0"
          }  py-0 flex flex-wrap gap-1 ${
            icon[12] == true
              ? "h-0"
              : "h-auto py-2 bg-[rgba(255,255,255,0.14)] rounded-lg"
          } overflow-hidden transition-all duration-300 py-0`}
        >
          <li
            className={`w-full rounded-2xl ${
              timer == true ? "px-2" : "px-6"
            }  bg-transparent hover:bg-[rgb(255,255,255,.2)] transition-all duration-300  cursor-pointer`}
          >
            <Link to="certificateAuthenticity" onClick={reload}>
              <span className="flex items-center gap-3">
                <Icon icon="fluent:check-20-regular" />
                {timer == true ? "گواهی اعتبار خریدار" : ""}
              </span>
            </Link>
          </li>
        </ul>
      </li>
    </ul>
  );
}

export default MenuSidebar;
