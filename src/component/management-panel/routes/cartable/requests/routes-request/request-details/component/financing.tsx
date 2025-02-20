import React, { FC } from "react";
import FormFinancing from "./form-financing";
import Crediting from "./crediting";
import { useMutation } from "@tanstack/react-query";
import {
  ShoppingCartGetAllResponseType,
  ShoppingCartGetAllResponseItemType,
  ShoppingCartStatusEnum,
} from "@/types/shopping-cart-types";


import {
  useEffect,
  useState,
  useCallback,
  useSelector,
  Button,
  TextFull,
  Modal,
  TextNumber,
  CheckMessage,
  TextArea,
  Load,
  LedgerAccountGetCreditList,
  PaymentMethodCreate,
  PaymentMethodGetList,
  GeneralTable,
} from "@/component/management-panel/import-management.js";
import IncreaseCredit from "./Increase-credit";
import EditCrediting from "./edit-crediting";
import Spinner from "@/components/ui/spinner.js";
import shoppingCartService from "@/services-v2/shopping-cart-service.ts";
import { ApiResponse } from "@/types/common-types";
import { toast } from "@/hooks/use-toast.js";
type Props = {
  priceAll: Number;
  order: ShoppingCartGetAllResponseType;
  onStatusChange: () => void;
  // setStage : Number
};


const financing: FC<Props> = ({ onStatusChange , priceAll, setStage, order }) => {
  const token = useSelector((state) => state.product.token);
  const chabk = useSelector((state) => state.product.chabk);
  const [typeModal, setTypeModal] = useState(1);
  const [dataId, setDataId] = useState();
  const [sendData, setSendData] = useState([]);
  const [remainder, setRemainder] = useState(priceAll);
  const [dataTable2, setDataTable2] = useState([]);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const totalUsed = sendData.reduce(
      (sum, item) => sum + parseInt(item.amount || 0),
      0
    );
    const totalUsed2 = dataTable2.reduce(
      (sum, item) => sum + parseInt(item.amount || 0),
      0
    );
    setRemainder(priceAll - totalUsed - totalUsed2);
  }, [sendData, priceAll, dataTable2]);

  function stageOne() {
    setStage(1);
  }
  const [determiningCredit, setDeterminingCredit] = useState(false);

  function closeModal() {
    setDeterminingCredit(false);
    setTypeModal(1);
  }

  //   ******
  const [updateTable, setUpdateTable] = useState(false);
  const [load, setLoad] = useState(false);
  const [checkData, setCheckData] = useState(false);
  const [message, setMessage] = useState("");
  const [message1, setMessage1] = useState("");
  const [check, setCheck] = useState({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
  });

  const [dataTable, setDataTable] = useState([]);
  const [messageData, setMessageData] = useState([]);
  const [checkDataAll, setCheckDataAll] = useState({
    check1: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(!Object.values(checkDataAll).every((value) => value === true));
  }, [checkDataAll]);

  const [filters, setFilters] = useState({
    currentUserType: 0,
    partyUserId: order?.shopperUserId,
    partyType: 1,
    justProvider: true,
    justEnabled: null,
  });

  const CreditList = useCallback(() => {
    setIsLoading(true);
    const dataAll = {
      filter: {
        currentUserType: 0,
        partyUserId: filters.partyUserId,
        partyType: 1,
        justProvider: filters.justProvider,
        justEnabled: filters.justEnabled,
      },
      pageSize: 100,
      pageIndex: 1,
      orderType: 1,
      orderPropertyName: "",
    };

    LedgerAccountGetCreditList({
      dataAll,
      token,
      chabk,
      setDataTable,
      setCheckDataAll,
      setCheckData,
      setMessageData,
    });
  }, [filters, updateTable, token, chabk]);

  useEffect(() => {
    CreditList();
  }, [CreditList]);

  //   ******
  const [options2, setOptions2] = useState([
    { key: "1", value: "بارگزاری در دفتر چک اپلیکیشن" },
    { key: "2", value: "بارگزاری در دفتر حساب اپلیکیشن" },
    { key: "3", value: "ارسال اسناد به صورت پرداخت آنلاین" },
    { key: "4", value: "ارسال اسناد در چت با تامین کننده" },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [totalItems, setTotalItems] = useState(1);
  const [filter, setFilter] = useState("");
  const MethodGetList = useCallback(() => {
    setIsLoading(true);
    const dataAll = {
      shoppingCartId: order?.id,
    };

    PaymentMethodGetList({
      dataAll,
      token,
      chabk,
      setDataTable2,
      setCheckDataAll,
      setCheckData,
      setMessageData,
    });
  }, [filters, updateTable, token, chabk]);

  useEffect(() => {
    MethodGetList();
  }, [MethodGetList]);

  // *****

  function send() {
  setIsSending(true); // شروع لودینگ
  let remainingAmount = priceAll;

  const sendPromises = sendData.map((item) => {
    return new Promise((resolve, reject) => {
      const updatedDataAll = {
        data: {
          shoppingCartId: order?.id,
          settlementType: Number(item?.settlementType),
          amount: Number(item?.amount),
          settlementDueDate: Number(item?.settlementDueDate ?? 0),
          submitDocsDueDate: Number(item?.submitDocsDueDate ?? 0),
          submitDocsMethods: item?.submitDocsMethods,
        },
        token,
        chabk,
        setCheckData,
        setMessage1,
      };

      mutation.mutate(
        { updatedDataAll, item },
        {
          onSuccess: (result) => {
            if (result.isSuccess) {
              setSendData((prevData) => prevData.filter((data) => data !== item));
              resolve(item.amount);
            } else {
              reject(result.message);
            }
          },
          onError: (error) => {
            reject(error.message || "ارسال اطلاعات با خطا مواجه شد.");
          },
        }
      );
    });
  });

  Promise.allSettled(sendPromises).then((results) => {
    results.forEach((result) => {
      if (result.status === "fulfilled") {
        remainingAmount -= result.value;
      }
    });

    const finalRemaining = remainingAmount - dataTable2.reduce(
      (sum, item) => sum + (parseInt(item.amount, 10) || 0),
      0
    );

    if (finalRemaining === 0) {
      acceptRequest(); 
    } else {
      setMessage(
        `درخواست تایید نشد. باقی‌مانده فاکتور ${finalRemaining.toLocaleString("fa-IR")} تومان است. لطفاً روش‌های پرداخت را تکمیل کنید.`
      );
      setCheck((prev) => ({ ...prev, check1: true }));
      // setLoad3(false);
      setTimeout(() => {
        setMessage("");
        setCheck((prev) => ({ ...prev, check2: false }));
        setCheck((prev) => ({ ...prev, check1: false }));
      }, 5000);
    }
    setIsSending(false); // پایان لودینگ
  }).catch(() => setIsSending(false)); // در صورت خطا هم لودینگ متوقف شود
}

  

  const mutation = useMutation({
    mutationFn: PaymentMethodCreate,
    onMutate: () => {
      // setIsLoading(true);
      // setLoad3(true);
    },
    onSuccess: (result, { item }) => {
      // حذف داده موفق از sendData

      setMessage1(result.error ? result.error : result.message);
      if (result.isSuccess) {
        setSendData((prevData) => prevData.filter((data) => data !== item));
        setTimeout(() => {
          setUpdateTable(!updateTable);
        }, 1500);
        setCheck((prev) => ({ ...prev, check1: true }));
        // setLoad3(false);
        setTimeout(() => {
          setMessage1("");
          setCheck((prev) => ({ ...prev, check2: false }));
          setCheck((prev) => ({ ...prev, check1: false }));
        }, 5000);
      } else {
        setCheck((prev) => ({ ...prev, check1: true }));
        // setLoad3(false);
        setTimeout(() => {
          setMessage1("");
          setCheck((prev) => ({ ...prev, check2: false }));
          setCheck((prev) => ({ ...prev, check1: false }));
        }, 5000);
      }
    },
    onError: (error) => {
      setMessage1(error.message || "عملیات با خطا مواجه شد");
      setCheck((prev) => ({ ...prev, check4: true }));
      setTimeout(() => {
        setMessage1("");
        setCheck((prev) => ({ ...prev, check4: false }));
      }, 5000);
    },
    onSettled: () => {
      // setIsLoading(false);
      // setLoad3(false);
    },
  });

  // *******
  const items =
    dataTable2.length > 0
      ? dataTable2.map((item, i) => ({
          id: i, // استفاده از index برای شناسایی هر آیتم
          settlementType:
            item.settlementType == 1
              ? "نقدی - ارسال کالا پس از واریز وجه"
              : item.settlementType == 2
              ? "مدت دار - ارسال کالا پس از پرداخت چک"
              : item.settlementType == 3
              ? "مدت دار -  به صورت حساب دفتری"
              : item.settlementType == 4
              ? "مدت دار - حساب دفتری با چک ضمانت"
              : "",
          amount: item.amount,
          settlementDueDate: item.settlementDueDate,
          submitDocsDueDate: item.submitDocsDueDate,
          submitDocsMethods: Array.isArray(item.submitDocsMethods)
            ? item.submitDocsMethods
                .map(
                  (method) => options2.find((opt) => opt.key == method)?.value
                )
                .filter(Boolean)
                .join("  /  ")
            : "",
        }))
      : [];

  // تعریف ساختار هدر جدول
  const headers = [
    {
      key: "settlementType",
      title: "نوع تسویه",
      style: "w-[20%] border-l text-center",
    },
    { key: "amount", title: "مبلغ", style: "w-[20%] border-l text-center" },
    {
      key: "settlementDueDate",
      title: "تاریخ سررسید",
      style: "w-[20%] border-l text-center",
    },
    {
      key: "submitDocsDueDate",
      title: "تاریخ ارسال اسناد",
      style: "w-[20%] border-l text-center",
    },
    {
      key: "submitDocsMethods",
      title: "روش‌های ارسال اسناد",
      style: "w-[20%] border-l text-center",
    },
  ];

  // فیلتر کردن داده‌ها بر اساس مقدار `filter`
  const filteredItems = items.filter((item) =>
    item.settlementType.includes(filter)
  );

  // ******
  const lastTransactions = order?.transactions
    ? order.transactions[order.transactions.length - 1]
    : null;
  const changeShoppingCartStatus = useMutation({
    mutationKey: ["change-shopping-cart-status"],
    mutationFn: shoppingCartService.changeStatusBySupplier,
    onSuccess: (data) => {
      if (data.isSuccess) {
        toast({
          variant: "success",
          description: data.message,
        });
        onStatusChange();
      } else {
        toast({
          variant: "destructive",
          description: data.message,
        });
      }
    },
  });

  

    function acceptRequest() {
      changeShoppingCartStatus.mutate({
        id: order.id,
        status: ShoppingCartStatusEnum.AcceptBySupplier,
        description: null,
      });
    }
  
    function rejectRequest() {
      changeShoppingCartStatus.mutate({
        id: order.id,
        status: ShoppingCartStatusEnum.RejectBySupplier,
        description: null,
      });
    }

  return (
    <>
      <CheckMessage message={message} check={check} />
      <CheckMessage message={message1} check={check} />
      <Load load={load} text={"در حال ثبت لطفا منتظر بمانید ..."} />
      <div className="w-full flex flex-wrap ">
        <FormFinancing
          remainder={remainder}
          setDeterminingCredit={setDeterminingCredit}
          dataTable={dataTable}
          setSendData={setSendData}
          sendData={sendData}
          setMessage={setMessage}
          setCheck={setCheck}
        />
        {/* {
            sendData.length > 0 &&
            <DataTableSend 
            sendData={sendData}
            />
        } */}
        <div className="w-full flex justify-center pt-2 bg-zinc-100">
          <hr className="w-[80%] border border-zinc-300" />
        </div>
        <div className="w-full flex justify-end p-4 bg-zinc-100">
          <p> باقی مانده فاکتور {remainder.toLocaleString("fa-IR")}</p>
        </div>
        {dataTable2?.length > 0 &&
        <div className="w-full flex flex-wrap">
          <div className="w-full flex justify-start p-4 bg-zinc-100">
            <p>روش های پرداخت ثبت شده</p>
          </div>
          <div className="w-full p-4 bg-zinc-100">
            <GeneralTable
              data={sendData}
              items={items}
              headers={headers}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              totalItems={totalItems}
              filteredItems={filteredItems}
              filter={filter}
              setFilter={setFilter}
            />
          </div>
        </div>}
          {dataTable2?.length > 0 &&
            (priceAll || 0) -
              dataTable2.reduce(
                (sum, item) => sum + (parseInt(item.amount, 10) || 0),
                0
              ) !==
              0 && (
              <div className="w-full p-4 bg-zinc-100">
                <p className="text-red-500">
                  درخواست تایید نشد. باقی‌مانده فاکتور
                  {" " +
                    (
                      (priceAll || 0) -
                      dataTable2.reduce(
                        (sum, item) => sum + (parseInt(item.amount, 10) || 0),
                        0
                      )
                    ).toLocaleString("fa-IR") +
                    " "}
                  تومان. لطفاً روش‌های پرداخت را ثبت کنید تا باقی‌مانده صفر شود.
                </p>
              </div>
            )}
        <div className="w-full  h-[64px] flex justify-between px-4 bg-[#d4d4d6af] shadow-md rounded-b-lg">
          <div className="flex gap-4 h-full items-center">
            <Button
              value={"مرحله قبل"}
              click={stageOne}
              styleButton={25}
            />
            <Button
              value={
                isSending  ? (
                  <Spinner />
                ) : (
                "تایید درخواست"
                )
              }
              click={send}
              styleButton={25}
                disabled={isSending || ![2, 3, 4].includes(lastTransactions?.status)}
            />

            <Button
              value={
                changeShoppingCartStatus.isPending ? (
                  <Spinner />
                ) : (
                "رد درخواست"
                )
              }
              click={""}
              styleButton={26}
                disabled={![2, 3, 4].includes(lastTransactions?.status)}
            />
          </div>
          <div className="h-full flex items-center">
            <p className="text-zinc-700 text-[.8rem]">
              مبلغ کامل با تخفیف {priceAll.toLocaleString("fa-IR")}
            </p>
          </div>
        </div>
      </div>

      {determiningCredit && (
        <Modal
          onClose={closeModal}
          title={
            <div className="flex gap-10">
              <button
                onClick={() => setTypeModal(1)}
                className={`text-[1rem] pb-2 ${
                  typeModal == 1
                    ? "border-b-4 border-[#E2B389] scale-105"
                    : "scale-95"
                }`}
              >
                جزئیات بخش اعتباردهی
              </button>
              <button
                onClick={() => setTypeModal(2)}
                className={`text-[1rem] pb-2 ${
                  typeModal == 2
                    ? "border-b-4 border-[#E2B389] scale-105"
                    : "scale-95"
                }`}
              >
                {" "}
                ایجاد اعتبار
              </button>
              <p
                className={`text-[1rem] pb-2 ${
                  typeModal == 3
                    ? "border-b-4 border-[#E2B389] scale-105"
                    : "scale-95 hidden"
                }`}
              >
                {" "}
                ویرایش اعتبار
              </p>
            </div>
          }
          style={"w-[90vw] bg-[#FFFFFF]"}
        >
          <div className="w-full flex flex-wrap justify-center gap-5">
            {typeModal == 1 ? (
              <Crediting
                dataTable={dataTable}
                setTypeModal={setTypeModal}
                setDataId={setDataId}
              />
            ) : typeModal == 2 ? (
              <IncreaseCredit
                setTypeModal={setTypeModal}
                order={order}
                setLoad3={setLoad}
                setCheck={setCheck}
                setMessage={setMessage}
                setUpdateTable={setUpdateTable}
                updateTable={updateTable}
                setCheckData={setCheckData}
              />
            ) : typeModal == 3 ? (
              <EditCrediting
                dataId={dataId}
                setTypeModal={setTypeModal}
                dataTable={dataTable}
                order={order}
                setLoad3={setLoad}
                setCheck={setCheck}
                setMessage={setMessage}
                setUpdateTable={setUpdateTable}
                updateTable={updateTable}
                setCheckData={setCheckData}
              />
            ) : (
              ""
            )}
          </div>
        </Modal>
      )}
    </>
  );
};

export default financing;
