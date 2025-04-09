import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Routes/router.jsx";
import img1 from "/img/bg-1.webp";
import img2 from "/img/bgAndroid1.webp";
import img3 from "/img/bgAndroid2.webp";
import img4 from "/img/bg-3.webp";
import "@/App.css";
import "@/index.css";
import {
  React,
  useContext,
  useRef,
  useEffect,
  useState,
  Password,
  TextFull,
  InputCode,
  TextNumber,
  Button,
  CheckMessage,
  useSelector,
  useDispatch,
  Load,
  WithSupport3,
  UserRegisterOrLogin,
  UserToken,
  UserLoginToken,
  setToken,
  setAuth,
} from "@/component/login-registration-supplier/import-login-registration-supplier";
import userService from "@/services-v2/user-service.ts";
import supplierService from "@/services-v2/supplier-service.ts";
import { useAuth } from "@/context/auth-context.tsx";

const Modal = ({ onClose, title, children, style }) => {
  return (
    <>
      <style>
        {`
      .boxFilter11{
    //   background:rgba(0,0,0,.3);
      backdrop-filter:blur(10px);
      }
      .boxFilter12{
    //   background:rgba(0,0,0,.3);
      backdrop-filter:blur(10px);
      }
      `}
      </style>
      <div className="fixed h-[100vh] inset-0 bg-opacity-50 flex items-center justify-center boxFilter11">
        <div
          className={` ${style} w-[90vw] lg:w-[50vw] py-4 bg-[#f5f2fdda] shadow-custom-8 rounded-2xl overflow-hidden`}
        >
          <div className="flex justify-between items-center px-4">
            <h2 className="text-lg font-bold">{title}</h2>
            <button onClick={onClose} className="text-red-500 text-[2rem]">
              &times;
            </button>
          </div>
          <div className=" myElement overflow-y-auto ">{children}</div>
        </div>
      </div>
    </>
  );
};

function login() {
  const { setSupplierData, setUserData } = useAuth();
  const [valueTextNumber1, setValueTextNumber1] = useState("");
  const [valueTextNumber2, setValueTextNumber2] = useState("");
  const [valuePassword, setValuePassword] = useState("");
  const [valueCod, setValueCod] = useState("");
  const [time, setTime] = useState(120);
  const [form, setForm] = useState(1);
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [errorTime, setErrorTime] = useState();
  const [load, setLoad] = useState(false);
  const [load2, setLoad2] = useState(false);
  const imgArray = [img2, img3, img4];
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const chabk = useSelector((state) => state.product.chabk);

  const [message, setMessage] = useState("");
  const [check, setCheck] = useState({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
  });
  const [showViewModal, setShowViewModal] = useState(false);

  const closeModal = () => {
    setShowViewModal(false);
    setValueTextNumber1("");
    setForm(1);
  };

  // function setCookie(name, value, days) {
  //   const expires = new Date(Date.now() + days * 864e5).toUTCString();
  //   document.cookie =
  //     name +
  //     "=" +
  //     encodeURIComponent(value) +
  //     "; expires=" +
  //     expires +
  //     "; path=/";
  // }

  function deleteCookie(name) {
    document.cookie =
      name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  useEffect(() => {
    let timer;
    if (isRunning && time > 0) {
      timer = setTimeout(() => {
        setTime(time - 1);
        setErrorTime("");
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
      setErrorTime("زمان برای ارسال کد پایان یافت ارسال دوباره کد را بزنید");
    }

    return () => clearTimeout(timer);
  }, [time, isRunning]);

  const resetTimer = (e) => {
    setValueTextNumber2("");
    e.preventDefault();
    if (time === 0) {
      setTime(120);
      setIsRunning(true);
      UserRegisterOrLogin(valueTextNumber1, chabk, setMessage, setCheck);
    }
  };
  function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + "=" + value + "; expires=" + expires + "; path=/";
  }
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  async function sendForm1(e) {
    deleteCookie("authToken");
    deleteCookie("role");
    deleteCookie("numberLogin");
    deleteCookie("userId");
    setLoad(true);
    e.preventDefault();
    setTime(120);
    setMessage("");
    if (valueTextNumber1?.length === 11) {
      const firstDigit = parseInt(valueTextNumber1.charAt(0), 10);

      if (firstDigit === 0) {
        try {
          const response = await UserRegisterOrLogin(
            valueTextNumber1,
            chabk,
            setMessage,
            setCheck
          );
          if (response.isSuccess == true || response.errors == "پیامک قبلا ارسال شده است.") {
            setForm(2);
            setIsRunning(true);
          } else if (response.isSuccess == false) {
            // setShowViewModal(true);
          }
        } catch (error) {
          // setCheck((r) => ({ ...r, check4: true }));
        } finally {
          setTimeout(() => {
            setLoad(false);
            setTimeout(() => {
              if (showViewModal == false) {
                setMessage("");
                setCheck((r) => ({ ...r, check1: false, check4: false }));
              }
            }, 5000);
          }, 2000);
        }
      } else {
        setTimeout(() => {
          setMessage("شماره تلفن باید با صفر شروع  شود");
          setLoad(false);
          setCheck((r) => ({
            ...r,
            check3: true,
          }));
          setTimeout(() => {
            setMessage("");
            setCheck((r) => ({
              ...r,
              check3: false,
            }));
          }, 5000);
        }, 2000);
      }
    } else {
      if (valueTextNumber1?.length == 0) {
        setTimeout(() => {
          setMessage("شماره تلفن را وارد کنید");
          setLoad(false);
          setCheck((r) => ({
            ...r,
            check3: true,
          }));
          setTimeout(() => {
            setMessage("");
            setCheck((r) => ({
              ...r,
              check3: false,
            }));
          }, 5000);
        }, 2000);
      } else {
        setTimeout(() => {
          setMessage("شماره تلفن باید 11 رقم باشد");
          setLoad(false);
          setCheck((r) => ({
            ...r,
            check3: true,
          }));
          setTimeout(() => {
            setMessage("");
            setCheck((r) => ({
              ...r,
              check3: false,
            }));
          }, 5000);
        }, 2000);
      }
    }
  }

  async function sendForm2(e) {
    
    setLoad(true);
    e.preventDefault();

    if (valueCod.length === 5) {
      try {
        const result = await UserToken(
          valueTextNumber1,
          valueCod,
          chabk,
          setMessage,
          setCheck
        );

        if (result.isSuccess === true) {
          const data = result.data;
          setCookie("authToken", result.data.access_token, 1);
          setCookie("userId", result.data.userId, 1);
          setCookie(
            "role",
            data?.roles.includes("Admin") == true
              ? "Admin"
              : data?.roles.includes("Supplier") == true
              ? "Supplier"
              : data?.roles.includes("Shopper") == true
              ? "Shopper"
              : "",
            1
          );
          dispatch(setToken(result.data.access_token));
          dispatch(setAuth(result.data.access_token));
          login(
            data?.roles.includes("Admin") == true
              ? "Admin"
              : data?.roles.includes("Supplier") == true
              ? "Supplier"
              : data?.roles.includes("Shopper") == true
              ? "Shopper"
              : ""
          );
          const positionResponse = await userService.getAllPositions();
          let supplierResponse;
          if (positionResponse.data?.suppliers[0]?.key)
            supplierResponse = await supplierService.get({
              id: positionResponse.data.suppliers[0].key,
            });

          setUserData({
            isActive: result.data?.isActive || result.data?.data?.isActive,
            isNewUser: result.data?.isNewUser || result.data?.data?.isNewUser,
            isAdmin: positionResponse.data?.isAdmin,
            shoppers: positionResponse.data?.shoppers,
            suppliers: positionResponse.data?.suppliers,
            roles: result.data?.roles || result.data?.data?.roles,
            userId: result.data?.userId || result.data?.data?.userId,
          });
          if (supplierResponse?.data) setSupplierData(supplierResponse?.data);
          if (result.data.isNewUser === true) {
            
            setCookie("numberLogin", valueTextNumber1, 1);
            setTimeout(() => {
              navigate("/registrationForm");
              setLoad(false);
            }, 2000);
          } else {
            if (result.data.isActive === true) {
              if (data?.roles.includes("Admin") == true) {
                setTimeout(() => {
                  navigate("/admin");
                  setLoad(false);
                }, 5000);
              } else if (data?.roles.includes("Supplier") == true) {
                setTimeout(() => {
                  navigate("/admin");
                  setLoad(false);
                }, 2000);
              } else if (data?.roles.includes("Shopper") == true) {
                setTimeout(() => {
                  navigate("/registrationForm");
                  setLoad(false);
                }, 2000);
              } else if (result.data.role === "" || result.data.role === null) {
                setMessage(
                  "هنوز به شما نوع دسترسی داده نشده لطفا با پشیبانی تماس بگیرید"
                );
                setCheck((r) => ({
                  ...r,
                  check4: true,
                }));
              }
            } else {
              setShowViewModal(true);
              setLoad(false);
            }
          }
        }
      } catch (error) {
        console.error(error);
        //  ...
      } finally {
        setTimeout(() => {
          setLoad(false);
          setTimeout(() => {
            if (showViewModal == false) {
              setMessage("");
              setCheck((r) => ({ ...r, check1: false, check4: false }));
            }
          }, 5000);
        }, 2000);
      }
    } else {
      setTimeout(() => {
        setLoad(false);
        setMessage("رمز یکبار مصرف را وارد کنید");
        setCheck((r) => ({
          ...r,
          check4: true,
        }));
        setTimeout(() => {
          setCheck((r) => ({
            ...r,
            check4: false,
          }));
          setMessage("");
        }, 5000);
      }, 2000);
    }
  }

  async function sendForm3(e) {
    setLoad2(true);
    e.preventDefault();
    deleteCookie("authToken");
    deleteCookie("role");

    let errorMessages = [];

    if (valueTextNumber2 == null || valueTextNumber2 === "") {
      errorMessages.push("نام کاربری خود را وارد کنید");
      setCheck((r) => ({
        ...r,
        check3: true,
      }));
    }

    if (valuePassword == null || valuePassword === "") {
      errorMessages.push("رمز عبور را وارد کنید");
      setCheck((r) => ({
        ...r,
        check3: true,
      }));
    }

    if (errorMessages.length > 0) {
      setTimeout(() => {
        setLoad2(false);
        setMessage(errorMessages.join(" - "));
        setTimeout(() => {
          setMessage("");
          setCheck((r) => ({
            ...r,
            check3: false,
          }));
        }, 5000);
      }, 2000);

      return;
    }

    if (valueTextNumber2 && valuePassword) {
      try {
        const result = await UserLoginToken(
          valueTextNumber2,
          valuePassword,
          chabk,
          setMessage,
          setCheck
        );
        if (result.data.isSuccess === true) {
          const data = result.data.data;
          login(data?.roles.includes("Admin") && "Admin");
          setCookie("authToken", result.data.data.access_token, 1);
          setCookie(
            "role",
            data?.roles.includes("Admin") == true
              ? "Admin"
              : data?.roles.includes("Supplier") == true
              ? "Supplier"
              : data?.roles.includes("Shopper") == true
              ? "Shopper"
              : "",
            1
          );
          dispatch(setToken(result.data.data.access_token));
          dispatch(setAuth(result.data.data.access_token));

          const positionResponse = await userService.getAllPositions();
          let supplierResponse;
          if (positionResponse.data?.suppliers[0]?.key)
            supplierResponse = await supplierService.get({
              id: positionResponse.data.suppliers[0].key,
            });

          setUserData({
            mobile: valueTextNumber1,
            isActive: result.data?.isActive || result.data?.data?.isActive,
            isNewUser: result.data?.isNewUser || result.data?.data?.isNewUser,
            isAdmin: positionResponse.data?.isAdmin,
            shoppers: positionResponse.data?.shoppers,
            suppliers: positionResponse.data?.suppliers,
            roles: result.data?.roles || result.data?.data?.roles,
            userId: result.data?.userId || result.data?.data?.userId,
          });
          if (supplierResponse.data) setSupplierData(supplierResponse.data);

          if (result.data.data.isNewUser === true) {

            
            setTimeout(() => {
              navigate("/registrationForm");
              setLoad2(false);
            }, 2000);
          } else if (result.data.data.isNewUser === false) {
            if (data?.roles.includes("Admin") && "Admin") {
              setTimeout(() => {
                navigate("/admin");
                setLoad2(false);
              }, 2000);
            } else if (data?.roles.includes("Supplier") && "Supplier") {
              setTimeout(() => {
                navigate("/admin");
                setLoad2(false);
              }, 2000);
            } else if (data?.roles.includes("Shopper") && "Shopper") {
              setTimeout(() => {
                navigate("/registrationForm");
                setLoad2(false);
              }, 2000);
            } else if (result.data.role === "" || result.data.role === null) {
              setMessage(
                "هنوز به شما نوع دسترسی داده نشده لطفا با پشیبانی تماس بگیرید"
              );
              setCheck((r) => ({
                ...r,
                check4: true,
              }));
            }
          }
        }
      } catch (error) {
        //  ...
      } finally {
        setTimeout(() => {
          setLoad2(false);
          setTimeout(() => {
            setMessage("");
            setCheck((r) => ({
              ...r,
              check1: false,
              check4: false,
              check3: false,
            }));
          }, 5000);
        }, 2000);
      }
    }
  }

  function enterForm3(e) {
    e.preventDefault();
    setForm(3);
  }
  const [styleBg, setStyleBg] = useState(false);
  const [styleBg2, setStyleBg2] = useState(true);
  setTimeout(() => {
    setStyleBg(true);
  }, 3000);
  function clickStart(e) {
    // e.preventDefault();
    setStyleBg(true);
  }

  function ClickBack(e) {
    if (form == 2 || form == 3) {
      setForm(1);
      setError1("");
      setError2("");
    }
  }
  function editPhone(e) {
    e.preventDefault();
    setStyleBg2(false);
    setForm(1);
  }

  const myDivRef = useRef(null);
  const [offsetTop, setOffsetTop] = useState(0);

  const [stopUpdating, setStopUpdating] = useState(false);

  const updateOffsetTop = () => {
    if (!stopUpdating && myDivRef.current) {
      const topOffset =
        myDivRef.current.getBoundingClientRect().top + window.scrollY;
      const newOffset = Math.max(topOffset, 1);
      if (newOffset !== offsetTop) {
        setOffsetTop(newOffset);
      }
      if (newOffset <= 1) {
        setStopUpdating(true);
      }
    }
  };

  useEffect(() => {
    updateOffsetTop();
    window.addEventListener("resize", updateOffsetTop);
    window.addEventListener("scroll", updateOffsetTop);
    return () => {
      window.removeEventListener("resize", updateOffsetTop);
      window.removeEventListener("scroll", updateOffsetTop);
    };
  }, [stopUpdating, offsetTop]);

  return (
    <>
      <style>
        {`
      .boxFilter11{
      // background:rgba(0,0,0,.3);
      backdrop-filter:blur(10px);
      }
      .boxFilter4{
    //   background:#ffffff4f;
      backdrop-filter:blur(10px);
      }
      `}
      </style>
      <CheckMessage message={message} check={check} />
      <main
        className="w-[100%] h-[100vh] relative  flex justify-center bg-zinc-900 overflow-hidden"
        style={{ fontFamily: "MyCustomFont" }}
      >
        <div className="w-full h-full absolute top-0">
          <figure className="w-full h-full hidden sm:flex">
            <img src={img1} alt="" className="w-[100%] h-full" />
          </figure>
          <figure className="w-full h-full flex sm:hidden ">
            <img
              src={form == 1 ? imgArray[0] : imgArray[1]}
              alt=""
              className={` ${
                styleBg == true ? "flex w-[100%] h-full" : "hidden sm:flex"
              }`}
            />
            <img
              onClick={() => clickStart(event)}
              className={`${
                styleBg == false && styleBg2 == true
                  ? "flex sm:hidden w-full h-full"
                  : "hidden"
              }  z-50`}
              src={form == 1 ? imgArray[2] : imgArray[1]}
              alt=""
            />
          </figure>
        </div>
        <div className="w-full h-full absolute top-0 2xl:container flex justify-center items-center">
          <section className="w-full h-full absolute top-0 flex justify-center  ">
            <article
              className={`w-[80%] lg:w-[80%] xl:w-[90%] h-full absolute top-0 flex flex-wrap justify-center sm:justify-start xl:justify-start content-center`}
            >
              <div
                ref={myDivRef}
                className={`w-[100%] sm:w-[70%] md:w-[55%] lg:w-[50%] xl:w-[40%] ${
                  offsetTop == 1 ? "top-0" : " top-[50%] -translate-y-[50%]"
                } absolute flex flex-wrap gap-4 lg:gap-2`}
              >
                <h2
                  className={`${
                    form == 1 ? "flex" : "hidden md:flex "
                  } w-full justify-center text-[2.5rem] text-custom-green text-center`}
                >
                  شبکه تجارت
                </h2>
                <p
                  className={`${
                    form == 1 ? "flex" : "hidden md:flex "
                  } w-[100%] items-center gap-2 text-[.9rem] md:text-[1.3rem] text-center justify-center text-white  lg:mb-10`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="27"
                    viewBox="0 0 28 27"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_8_27)">
                      <path
                        d="M24.2535 22.6892C24.1354 22.8082 24.0208 22.9305 23.9027 23.0453C23.7816 23.1616 23.657 23.2744 23.5291 23.3836C20.9463 25.7158 17.5378 27.0093 13.9994 26.9999C12.1602 27.0043 10.3384 26.657 8.63924 25.978C6.94013 25.2991 5.39749 24.302 4.10055 23.0444C-1.24045 17.8984 -1.3542 9.59676 3.74968 4.31067C3.86284 4.18861 3.97834 4.06851 4.09618 3.95039L4.46543 3.61204C7.05137 1.28261 10.4607 -0.009058 13.9994 -5.14984e-05C17.7409 -5.14984e-05 21.2549 1.40142 23.9027 3.95039C29.2393 9.10064 29.3531 17.4031 24.2535 22.6892ZM4.82068 22.3509C6.02309 23.517 7.45353 24.4414 9.02911 25.0706C10.6047 25.6997 12.2941 26.0211 13.9994 26.0161C17.2947 26.0161 20.4027 24.8383 22.8089 22.6892L21.6426 21.5594C19.5589 23.4059 16.8302 24.4275 14.0003 24.4206C12.5124 24.4251 11.0384 24.1446 9.6639 23.5954C8.28935 23.0462 7.04164 22.2391 5.99318 21.2211C4.93786 20.2098 4.10118 19.0066 3.53163 17.6812C2.96207 16.3558 2.67096 14.9346 2.67518 13.5C2.67518 10.7443 3.72343 8.15142 5.6423 6.13064L4.47068 5.00592C-0.232449 9.91064 -0.119574 17.5871 4.82068 22.3509ZM20.9172 20.8693V20.865L19.7324 19.7226C18.1591 21.0879 16.116 21.8411 13.9994 21.8362C12.8638 21.8394 11.7388 21.6251 10.6897 21.2056C9.64067 20.7861 8.68848 20.1699 7.88843 19.3927C7.08321 18.6207 6.44468 17.7024 6.00973 16.6909C5.57479 15.6795 5.35206 14.5949 5.35443 13.5C5.35148 11.4601 6.13057 9.49118 7.54193 7.9717L6.36155 6.82926C4.63831 8.65266 3.68695 11.033 3.69543 13.5C3.69153 14.8054 3.95617 16.0986 4.47404 17.3047C4.9919 18.5109 5.75271 19.606 6.71243 20.5267C7.66724 21.4521 8.80292 22.1858 10.0537 22.6851C11.3045 23.1845 12.6457 23.4397 13.9994 23.4359C16.5833 23.4359 19.0167 22.5264 20.9172 20.8693ZM21.6242 13.5C21.6242 11.5357 20.8314 9.68958 19.3912 8.30161C17.9509 6.91364 16.0373 6.14414 14.0003 6.14414C12.1554 6.1461 10.3741 6.79404 8.98743 7.96748V7.9717C8.85968 8.07717 8.73193 8.18264 8.60943 8.30161C8.49207 8.42017 8.37799 8.54171 8.2673 8.66611C7.0455 10.0004 6.37283 11.72 6.37643 13.5C6.37643 15.4642 7.16918 17.3103 8.60943 18.6983C9.31554 19.3833 10.1556 19.9264 11.081 20.296C12.0064 20.6656 12.9987 20.8545 14.0003 20.8515C15.864 20.8515 17.6237 20.2052 19.0132 19.0282C19.1409 18.9227 19.2731 18.8173 19.3912 18.6983C19.5146 18.5793 19.6239 18.457 19.7333 18.3338C20.9551 16.9995 21.6278 15.2799 21.6242 13.5ZM8.26643 7.27308C9.84154 5.91059 11.8834 5.1578 13.9994 5.15948C15.1354 5.15682 16.2606 5.37183 17.3096 5.79202C18.3587 6.21222 19.3107 6.82923 20.1104 7.6072C20.9164 8.37868 21.5555 9.29687 21.9905 10.3084C22.4255 11.32 22.6478 12.4049 22.6444 13.5C22.6474 15.5398 21.8683 17.5087 20.4569 19.0282L21.6417 20.1706C23.3612 18.3451 24.312 15.9662 24.3078 13.5C24.3111 12.1942 24.0458 10.9008 23.5272 9.69468C23.0085 8.48853 22.2469 7.39357 21.2864 6.4732C20.332 5.547 19.1965 4.81259 17.9456 4.31248C16.6948 3.81238 15.3535 3.55652 13.9994 3.55973C11.4419 3.55566 8.97488 4.47249 7.08168 6.13064L8.26643 7.27308ZM23.1782 4.64901C21.9758 3.48291 20.5453 2.5585 18.9697 1.92934C17.3942 1.30018 15.7048 0.978779 13.9994 0.983763C10.7317 0.97578 7.5829 2.16494 5.18993 4.31067L6.36155 5.43539C8.4457 3.58966 11.1741 2.56819 14.0038 2.57423C15.4918 2.57165 16.9655 2.85345 18.3399 3.40334C19.7142 3.95324 20.9619 4.76032 22.0109 5.77795C23.0655 6.78981 23.9016 7.99313 24.4711 9.31838C25.0406 10.6436 25.3322 12.0646 25.3289 13.4991C25.3349 16.2265 24.2756 18.856 22.3618 20.8642L23.5282 21.994C28.2313 17.0893 28.1184 9.41282 23.1782 4.64901Z"
                        fill="#83C100"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_8_27">
                        <rect
                          width="28"
                          height="27"
                          fill="white"
                          transform="matrix(1 0 0 -1 0 27)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  بستری برای افزایش و امنیت فروش اعتباری
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="27"
                    viewBox="0 0 28 27"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_8_27)">
                      <path
                        d="M24.2535 22.6892C24.1354 22.8082 24.0208 22.9305 23.9027 23.0453C23.7816 23.1616 23.657 23.2744 23.5291 23.3836C20.9463 25.7158 17.5378 27.0093 13.9994 26.9999C12.1602 27.0043 10.3384 26.657 8.63924 25.978C6.94013 25.2991 5.39749 24.302 4.10055 23.0444C-1.24045 17.8984 -1.3542 9.59676 3.74968 4.31067C3.86284 4.18861 3.97834 4.06851 4.09618 3.95039L4.46543 3.61204C7.05137 1.28261 10.4607 -0.009058 13.9994 -5.14984e-05C17.7409 -5.14984e-05 21.2549 1.40142 23.9027 3.95039C29.2393 9.10064 29.3531 17.4031 24.2535 22.6892ZM4.82068 22.3509C6.02309 23.517 7.45353 24.4414 9.02911 25.0706C10.6047 25.6997 12.2941 26.0211 13.9994 26.0161C17.2947 26.0161 20.4027 24.8383 22.8089 22.6892L21.6426 21.5594C19.5589 23.4059 16.8302 24.4275 14.0003 24.4206C12.5124 24.4251 11.0384 24.1446 9.6639 23.5954C8.28935 23.0462 7.04164 22.2391 5.99318 21.2211C4.93786 20.2098 4.10118 19.0066 3.53163 17.6812C2.96207 16.3558 2.67096 14.9346 2.67518 13.5C2.67518 10.7443 3.72343 8.15142 5.6423 6.13064L4.47068 5.00592C-0.232449 9.91064 -0.119574 17.5871 4.82068 22.3509ZM20.9172 20.8693V20.865L19.7324 19.7226C18.1591 21.0879 16.116 21.8411 13.9994 21.8362C12.8638 21.8394 11.7388 21.6251 10.6897 21.2056C9.64067 20.7861 8.68848 20.1699 7.88843 19.3927C7.08321 18.6207 6.44468 17.7024 6.00973 16.6909C5.57479 15.6795 5.35206 14.5949 5.35443 13.5C5.35148 11.4601 6.13057 9.49118 7.54193 7.9717L6.36155 6.82926C4.63831 8.65266 3.68695 11.033 3.69543 13.5C3.69153 14.8054 3.95617 16.0986 4.47404 17.3047C4.9919 18.5109 5.75271 19.606 6.71243 20.5267C7.66724 21.4521 8.80292 22.1858 10.0537 22.6851C11.3045 23.1845 12.6457 23.4397 13.9994 23.4359C16.5833 23.4359 19.0167 22.5264 20.9172 20.8693ZM21.6242 13.5C21.6242 11.5357 20.8314 9.68958 19.3912 8.30161C17.9509 6.91364 16.0373 6.14414 14.0003 6.14414C12.1554 6.1461 10.3741 6.79404 8.98743 7.96748V7.9717C8.85968 8.07717 8.73193 8.18264 8.60943 8.30161C8.49207 8.42017 8.37799 8.54171 8.2673 8.66611C7.0455 10.0004 6.37283 11.72 6.37643 13.5C6.37643 15.4642 7.16918 17.3103 8.60943 18.6983C9.31554 19.3833 10.1556 19.9264 11.081 20.296C12.0064 20.6656 12.9987 20.8545 14.0003 20.8515C15.864 20.8515 17.6237 20.2052 19.0132 19.0282C19.1409 18.9227 19.2731 18.8173 19.3912 18.6983C19.5146 18.5793 19.6239 18.457 19.7333 18.3338C20.9551 16.9995 21.6278 15.2799 21.6242 13.5ZM8.26643 7.27308C9.84154 5.91059 11.8834 5.1578 13.9994 5.15948C15.1354 5.15682 16.2606 5.37183 17.3096 5.79202C18.3587 6.21222 19.3107 6.82923 20.1104 7.6072C20.9164 8.37868 21.5555 9.29687 21.9905 10.3084C22.4255 11.32 22.6478 12.4049 22.6444 13.5C22.6474 15.5398 21.8683 17.5087 20.4569 19.0282L21.6417 20.1706C23.3612 18.3451 24.312 15.9662 24.3078 13.5C24.3111 12.1942 24.0458 10.9008 23.5272 9.69468C23.0085 8.48853 22.2469 7.39357 21.2864 6.4732C20.332 5.547 19.1965 4.81259 17.9456 4.31248C16.6948 3.81238 15.3535 3.55652 13.9994 3.55973C11.4419 3.55566 8.97488 4.47249 7.08168 6.13064L8.26643 7.27308ZM23.1782 4.64901C21.9758 3.48291 20.5453 2.5585 18.9697 1.92934C17.3942 1.30018 15.7048 0.978779 13.9994 0.983763C10.7317 0.97578 7.5829 2.16494 5.18993 4.31067L6.36155 5.43539C8.4457 3.58966 11.1741 2.56819 14.0038 2.57423C15.4918 2.57165 16.9655 2.85345 18.3399 3.40334C19.7142 3.95324 20.9619 4.76032 22.0109 5.77795C23.0655 6.78981 23.9016 7.99313 24.4711 9.31838C25.0406 10.6436 25.3322 12.0646 25.3289 13.4991C25.3349 16.2265 24.2756 18.856 22.3618 20.8642L23.5282 21.994C28.2313 17.0893 28.1184 9.41282 23.1782 4.64901Z"
                        fill="#83C100"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_8_27">
                        <rect
                          width="28"
                          height="27"
                          fill="white"
                          transform="matrix(1 0 0 -1 0 27)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </p>
                {/* *****form1***** */}
                <form
                  action=""
                  style={{ display: form == 1 ? "flex" : "none" }}
                  className="w-full  flex-wrap gap-3 lg:gap-5"
                >
                  <TextNumber
                    placeholder={"شماره تماس را وارد کنید"}
                    label={"شماره تماس"}
                    svg={true}
                    width={"w-full"}
                    max={11}
                    data={valueTextNumber1}
                    setData={setValueTextNumber1}
                    styleLabel={"text-[1.2rem] lg:text-[1.5rem] text-zinc-200"}
                    styleInput={
                      "text-[1rem] lg:text-[1.2rem] h-[40px] lg:h-[50px]"
                    }
                    styleBox={"bg-[rgb(217,217,217)]"}
                  />
                  <p
                    style={{ display: error1.length > 0 ? "flex" : "none" }}
                    className="text-red-600 text-[1rem]"
                  >
                    {error1}
                  </p>
                  <Button
                    type={'submit'}
                    click={() => sendForm1(event)}
                    value={"ورود"}
                    styleButton={1}
                  />
                  <button
                    type="button"
                    onClick={() => enterForm3(event)}
                    className="w-[100%] text-white text-[.9rem] flex justify-center items-center "
                  >
                    ورود با یوزر و پسورد
                  </button>
                </form>
                {/* ******form2******* */}
                <form
                  action=""
                  style={{ display: form == 2 ? "flex" : "none" }}
                  className="w-full flex-wrap gap-5"
                >
                  <p className="w-full flex gap-3 justify-center text-white text-[1rem] md:text-[1rem]">
                    کد فرستاده شده به <span>{valueTextNumber1}</span> را وارد
                    کنید
                  </p>
                  <TextNumber
                    placeholder={""}
                    label={""}
                    svg={false}
                    width={"w-full"}
                    max={5}
                    data={valueCod}
                    setData={setValueCod}
                    styleLabel={"text-[1.2rem] lg:text-[1.5rem] text-zinc-200"}
                    styleInput={
                      "text-[1rem] lg:text-[1.2rem] h-[40px] lg:h-[50px]"
                    }
                    styleBox={"bg-[rgb(217,217,217)]"}
                  />
                  <p
                    style={{ display: error1.length > 0 ? "flex" : "none" }}
                    className="text-red-600 text-[1rem]"
                  >
                    {error1}
                  </p>
                  <p
                    style={{ display: errorTime == "" ? "none" : "flex" }}
                    className="text-red-600 text-[1rem]"
                  >
                    {errorTime}
                  </p>
                  <Button
                  type={"submit"}
                    value={"تایید کد"}
                    click={() => sendForm2(event)}
                    styleButton={1}
                  />
                  <div className="w-[100%] flex">
                    <button
                  type="button"
                      onClick={() => editPhone(event)}
                      className="w-[100%] text-white text-[1rem] flex justify-center gap-3 items-center xl:hidden"
                    >
                      ویرایش شماره تماس
                    </button>
                    <button
                    type="button"
                      onClick={() => resetTimer(event)}
                      className="w-[100%] text-custom-green text-[1rem] flex justify-center gap-3 items-center "
                    >
                      ارسال دوباره کد <span>{formatTime(time)}</span>
                    </button>
                  </div>
                </form>
                {/* ******form3****** */}
                <form
                  action=""
                  style={{ display: form == 3 ? "flex" : "none" }}
                  className="w-full hidden flex-wrap gap-3 lg:gap-5"
                >
                  <TextFull
                    pattern={/^[a-zA-Z\u0600-\u06FF\s0-9\u0660-\u0669]+$/}
                    placeholder={"شماره تماس را وارد کنید"}
                    label={"نام کاربری (شماره تماس) :"}
                    svg={false}
                    width={"w-full"}
                    data={valueTextNumber2}
                    setData={setValueTextNumber2}
                    styleLabel={"text-[1.2rem] lg:text-[1.5rem] text-zinc-200"}
                    styleInput={
                      "text-[1rem] lg:text-[1.2rem] h-[40px] lg:h-[50px]"
                    }
                    styleError={""}
                    styleBox={"bg-[rgb(217,217,217)]"}f
                  />
                  <p
                    style={{ display: error1.length > 0 ? "flex" : "none" }}
                    className="text-red-600 text-[1rem]"
                  >
                    {error1}
                  </p>
                  <Password
                    valuePassword={valuePassword}
                    setValuePassword={setValuePassword}
                    placeholder={"*****"}
                    label={"رمز عبور :"}
                    width={"w-full"}
                  />
                  <p
                    style={{ display: error2.length > 0 ? "flex" : "none" }}
                    className="text-red-600 text-[1rem]"
                  >
                    {error2}
                  </p>
                  <Button
                  type={'submit'}
                    value={"ورود"}
                    click={() => sendForm3(event)}
                    styleButton={1}
                  />
                  <a
                    href=""
                    className="w-[100%] text-white text-[.9rem] flex justify-center items-center"
                  >
                    ورود با تلفن کد یکبار مصرف
                  </a>
                </form>
              </div>
            </article>
            {/* <article className="w-[0%] xl:w-[50%] lg:w-[20%] h-[100%] hidden xl:flex justify-end items-start px-16 py-10">
            <button
              onClick={() => ClickBack(event)}
              style={{ display: form == 1 ? "none" : "flex" }}
              className="px-5 py-4 text-white text-[1.5rem] gap-3 justify-center items-center group"
            >
              بازگشت
              <i className="bi bi-chevron-left group-hover:-translate-x-3 transition-all duration-300"></i>
            </button>
          </article> */}
          </section>
        </div>
      </main>
      <Load load={load} text={"در حال ورود لطفا منتظر بمانید ..."} />
      <Load load={load2} text={"در حال ورود لطفا منتظر بمانید ..."} />
      {showViewModal && (
        <Modal onClose={closeModal} title="">
          <div className="w-[100%] flex justify-center content-center flex-wrap gap-5 px-5">
            <p className="w-[100%] text-[1.2rem] lg:text-[1.5rem] text-zinc-700 px-3 lg:px-10">
              {message}
            </p>
            <WithSupport3 />
          </div>
        </Modal>
      )}
    </>
  );
}

export default login;

{
  /*
کاربر گرامی، شما قبلاً در سیستم ثبت‌نام کرده‌اید. ثبت‌نام شما در
حال بررسی و تأیید می‌باشد. لطفاً منتظر بمانید تا تأیید نهایی انجام
شود. در صورت نیاز به اطلاعات بیشتر، می‌توانید با پشتیبانی تماس
بگیرید.
 */
}
