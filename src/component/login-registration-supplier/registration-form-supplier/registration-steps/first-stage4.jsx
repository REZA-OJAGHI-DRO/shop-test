import "@/App.css";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import {
  React,
  useCallback,
  useEffect,
  useState,
  Button,
  useSelector,
  SelectAllInput,
  Load,
  WithSupport,
  WithSupport3,
  CheckBox,
  SvgDesktop4,
  postDataAll,
} from "@/component/login-registration-supplier/import-login-registration-supplier";

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
      <div className="fixed h-[100vh] inset-0 bg-opacity-50 flex items-center justify-center boxFilter11 z-50">
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

function FirstStage4({
  setDataAll,
  stage5,
  setStage5,
  dataAll,
  styleLeft,
  setStyleLeft,
}) {
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(true);
  const [options3, setOptions3] = useState([{ key: "0", value: "" }]);
  const [idMainCategory, setIdMainCategory] = useState([]);
  const [styleError1, setStyleError1] = useState(false);
  const [load, setLoad] = useState(false);
  const [message, setMessage] = useState("");
  const [installments, setInstallments] = useState(false);
  const [installmentsDays, setInstallmentsDays] = useState(0);
  const [cash, setCash] = useState(false);
  const [cashDays, setCashDays] = useState(0);
  const [preOrder, setPreOrder] = useState(false);
  const [checkedOpen1, setCheckedOpen1] = useState(true);
  const [checkedOpen2, setCheckedOpen2] = useState(true);
  const [checkedOpen3, setCheckedOpen3] = useState(true);
  const [error, setError] = useState("");
  const token = useSelector((state) => state.product.token);
  const chabk = useSelector((state) => state.product.chabk);
  const [checkAll, setCheckAll] = useState({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
  });
  const [showViewModal, setShowViewModal] = useState(false);
  function deleteCookie(name) {
    document.cookie =
      name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
  const closeModal = () => {
    setShowViewModal(false);
  };

  const loadMainCategory = useCallback(async () => {
    if (styleLeft == 300) {
      try {
        const provinces = await categoryGetAll(1, "", token, chabk);
        setOptions3(provinces.data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    }
  }, [styleLeft]);

  useEffect(() => {
    loadMainCategory();
  }, [loadMainCategory]);

  useEffect(() => {
    setDataAll((prev) => ({
      ...prev,
      installments: installments,
      installmentsDays: installments == true ? installmentsDays : "",
      cash: cash,
      cashDays: cash == true ? cashDays : "",
      preOrder: preOrder,
      categoryIds: idMainCategory,
    }));
  }, [
    installments,
    installmentsDays,
    cash,
    cashDays,
    preOrder,
    idMainCategory,
  ]);

  const send = async (e) => {
    e.preventDefault();
    setLoad(true);
    const updatedDataAll = dataAll;
    try {
      const result = await postDataAll(updatedDataAll, token, chabk);
      if (result.isSuccess == true) {
        if (result) {
          setTimeout(() => {
            setLoad(false);
            setStage5(false);
            deleteCookie("numberLogin");
          }, 2000);
        } else {
          setTimeout(() => {
            setLoad(false);
            setShowViewModal(true);
          }, 2000);
        }
      } else {
        setMessage(result?.error ? result?.error : result?.message);
        setTimeout(() => {
          setLoad(false);
          setCheckAll((r) => ({ ...r, check4: true }));
          setTimeout(() => {
            setCheckAll((r) => ({ ...r, check4: false }));
            setMessage("");
          }, 5000);
        }, 2000);
      }
    } catch (error) {
      setTimeout(() => {
        setLoad(false);
        if (error.response && error.response.status === 400) {
          setShowViewModal(true);
        } else {
          setMessage("مشکلی در ارسال به وجود آمده خطای 500");
          setCheckAll((r) => ({ ...r, check4: true }));
          setTimeout(() => {
            setCheckAll((r) => ({ ...r, check4: false }));
            setMessage("");
          }, 5000);
        }
      }, 2000);
    }
  };

  return (
    <>
      <style>
        {`
      .boxFilter{
      background:rgba(218, 218, 218, 0.2);
      backdrop-filter:blur(10px);
      @media screen and (max-width:640px) {
         background:transparent;
          }
      }
      `}
      </style>
      <div className="w-[50%] z-50 fixed top-[5vh] left-[25%]">
        <Stack sx={{ width: "100%" }} spacing={2}>
          {checkAll.check1 == true && (
            <Alert severity="success" className="border-2 border-black">
              {message}
            </Alert>
          )}
          {/* <Alert severity="info">This is an info Alert.</Alert> */}
          {/* <Alert severity="warning">This is a warning Alert.</Alert> */}
          {checkAll.check4 == true && (
            <Alert severity="error" className="border-2 border-black">
              {message}
            </Alert>
          )}
        </Stack>
      </div>
      <div
        style={{ display: styleLeft == 300 ? "flex" : "none" }}
        className="w-[100vw] xl:w-[100vw] h-[100vh] xl:h-[75vh] relative justify-center flex overflow-y-auto lg:overflow-y-hidden"
      >
        <div className="w-[90%] flex flex-wrap justify-center content-between gap-4 xl:gap-1 py-10 xl:py-5 sm:py-3 px-3 h-full absolute top-0 ">
          <div className="w-full flex flex-wrap justify-center gap-5 sm:gap-0 xl:gap-4">
            <article className="w-[90%] flex flex-wrap gap-4 justify-center items-center">
              <SvgDesktop4 />
              <p className="w-[100%] flex justify-center text-white text-[1.1rem] lg:text-[1.5rem]">
                شرایط فروش کالا
              </p>
            </article>
          </div>
          <article className="w-[90%] lg:w-[80%]  flex flex-wrap justify-between gap-5 sm:gap-3">
            <div className="w-[100%] md:w-[30%]">
              <CheckBox
                setDate={setCash}
                label={"نقد"}
                setCheckedOpen={setCheckedOpen2}
              />
            </div>
            <div className="w-[100%] md:w-[30%]">
              <CheckBox
                setDate={setInstallments}
                label={"مدت دار"}
                setCheckedOpen={setCheckedOpen1}
              />
            </div>
            <div className="w-[100%] md:w-[30%]">
              <CheckBox
                setDate={setPreOrder}
                label={"پیش فروش کالا"}
                setCheckedOpen={setCheckedOpen3}
              />
            </div>
            <div className="w-full flex justify-center">
              <div className="w-[50%] flex-wrap flex justify-center content-center gap-2">
                <p className="w-full text-white">
                  {" "}
                  چه نوع کالاهایی رو کار میکنید :
                </p>
                <SelectAllInput
                  options={options3}
                  setData={setIdMainCategory}
                  hasError={styleError1}
                />
              </div>
            </div>
          </article>
          <article className="w-[90%] flex justify-center flex-wrap gap-4 xl:gap-2 ">
            <div className="w-full  flex flex-wrap justify-center gap-4 xl:gap-2">
              <p className="w-full py-4 flex justify-center text-[1.1rem] text-red-600">
                {error}
              </p>
              <Button
                value={"ثبت نهایی"}
                click={() => send(event)}
                styleButton={4}
              />
            </div>
            <div className="w-full  flex justify-center items-center sm:mb-3">
              <WithSupport />
            </div>
          </article>
        </div>
      </div>
      <Load load={load} text={"در حال ثبت لطفا منتظر بمانید ..."} />
      {showViewModal && (
        <Modal onClose={closeModal} title="">
          <div className="w-[100%] flex justify-center content-center flex-wrap gap-5 px-5 ">
            <p className="w-[100%] text-[1.2rem] lg:text-[1.5rem] text-zinc-700 px-3 lg:px-10">
              مشکلی در ذخیره‌سازی اطلاعات به وجود آمده است. لطفاً مجدداً تلاش
              کنید و یا با پشتیبانی تماس بگیرید.
            </p>
            <WithSupport3 />
          </div>
        </Modal>
      )}
    </>
  );
}

export default FirstStage4;
