//@ts-nocheck
import {
  ShoppingCartGetAllResponseType,
  ShoppingCartGetAllResponseItemType,
  ShoppingCartStatusEnum,
} from "@/types/shopping-cart-types";
import Description from "./description.jsx";
import {
  React,
  useEffect,
  useState,
  Button,
  TextFull,
  Modal,
  TextNumber,
  CheckMessage,
  TextArea,
  Load,
} from "@/component/management-panel/import-management.js";
import FormDiscount from "./form-discount.js";
import { FC } from "react";
import { Value } from "@radix-ui/react-select";
// import shoppingCartService from "@/services-v2/shopping-cart-services";
import shoppingCartService from "@/services-v2/shopping-cart-service.ts";
import { ApiResponse } from "@/types/common-types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast.js";
import Spinner from "@/components/ui/spinner.js";
import ChatFactor from "../chat-factor/chat-factor.js";
type Props = {
  order: ShoppingCartGetAllResponseType;
  onStatusChange: () => void;
};

const Table: FC<Props> = ({ order, onStatusChange }) => {
  const [load, setLoad] = useState(false);
  const [modalChat, setModalChat] = useState(false);
  const [message, setMessage] = useState("");
  const [updateTable, setUpdateTable] = useState(false);
  const [check, setCheck] = useState({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
  });

  const [data, setData] = useState<ShoppingCartGetAllResponseItemType>();

  useEffect(() => {
    if (order?.items) {
      setData(order.items);
    }
  }, [order?.items]);

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

  const [showDiscount, setShowDiscount] = useState(false);
  const [showDiscount2, setShowDiscount2] = useState(false);
  const [title, setTitle] = useState(null);
  const [price, setPrice] = useState(null);
  const [type, setType] = useState(null);
  const [description, setDescription] = useState(order?.discreption);
  const [dataDiscount, setDataDiscount] = useState([]);

  const handleChange = (e, index, field) => {
    const value = Math.max(0, e.target.value);
    const updatedData = [...data];
    if (field === 1) {
      updatedData[index].packageCount = value;
    } else if (field === 2) {
      updatedData[index].subPackageCount = value;
    } else if (field === 3) {
      updatedData[index].goodDiscountPercent = value;
    }
    setData(updatedData);
  };

  function closeModal() {
    setType(null);
    setPrice(null);
    setTitle(null);
    setShowDiscount(false);
    setShowDiscount2(false);
    setModalChat(false);
  }

  const handleSubmitEdit = async () => {
    const updatedItems = data.map((item) => ({
      id: item.id,
      packageCount: item.packageCount,
      subPackageCount: item.subPackageCount,
      goodDiscountPercent: item.goodDiscountPercent,
    }));

    const requestPayload: ShoppingCartEditRequestType = {
      id: order.id,
      description: description || "",
      supplierDiscounts: dataDiscount,
      items: updatedItems,
    };

    setLoad(true);

    try {
      const response: ApiResponse<ShoppingCartEditRequestType> =
        await shoppingCartService.getEditCart(requestPayload);

      if (response.isSuccess) {
        setTimeout(() => {
          setUpdateTable((prev) => !prev);
        }, 1500);

        setCheck((prev) => ({ ...prev, check1: true }));
        setLoad(false);
        setMessage(response.error ? response.error : response.message);
        setTimeout(() => {
          setMessage("");
          setCheck((prev) => ({ ...prev, check1: false, check2: false }));
        }, 5000);
      } else {
        setCheck((prev) => ({ ...prev, check1: true }));
        setLoad(false);
        setMessage(response.error ? response.error : response.message);
        setTimeout(() => {
          setMessage("");
          setCheck((prev) => ({ ...prev, check1: false, check2: false }));
        }, 5000);
      }
    } catch (error) {
      setLoad(false);

      if (error instanceof Error) {
        if (error.message.includes("Failed to fetch")) {
          setMessage(
            "مشکلی در ارتباط با سرور وجود دارد. لطفاً دوباره تلاش کنید."
          );
        } else if (!navigator.onLine) {
          setMessage(
            "مشکلی در ارتباط با سرور وجود دارد. لطفاً اتصال اینترنت خود را بررسی کنید."
          );
        } else {
          switch (error.status) {
            case 400:
              setMessage(
                "درخواست نادرست است. لطفاً اطلاعات ورودی را بررسی کنید."
              );
              break;
            case 401:
              setMessage(
                "برای دسترسی به این بخش باید وارد حساب کاربری خود شوید."
              );
              break;
            case 403:
              setMessage("شما اجازه دسترسی به این قسمت را ندارید.");
              break;
            case 404:
              setMessage("صفحه یا منبع مورد نظر پیدا نشد.");
              break;
            case 500:
              setMessage(
                "مشکلی در سرور به وجود آمده است. لطفاً دوباره تلاش کنید."
              );
              break;
            case 502:
              setMessage(
                "مشکلی در ارتباط با سرور پیش آمده است. لطفاً دوباره تلاش کنید."
              );
              break;
            case 503:
              setMessage(
                "سرویس در حال حاضر در دسترس نیست. لطفاً دوباره تلاش کنید."
              );
              break;
            case 504:
              setMessage("زمان اتصال به سرور اصلی تمام شد.");
              break;
            default:
              setMessage("خطای ناشناخته‌ای رخ داده است.");
              break;
          }
        }

        setTimeout(() => {
          setMessage("");
          setCheck((prev) => ({ ...prev, check2: false, check1: false }));
        }, 5000);
      }
    }
  };

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

  function yes() {
    setDataDiscount((prevData) => [...prevData, { title, price, type }]);
    closeModal();
  }

  function no() {
    closeModal();
  }

  const handleDelete = (index: number) => {
    const updatedDataDiscount = dataDiscount.filter((_, i) => i !== index);
    setDataDiscount(updatedDataDiscount);
  };

  return (
    <>
      <CheckMessage message={message} check={check} />
      <Load load={load} text={"در حال ویرایش فاکتور لطفا منتظر بمانید ..."} />
      <div className="w-full flex flex-wrap justify-center items-center px-4">
        <div className="w-full flex flex-wrap justify-center items-center border-t-2 border-b-2 border-custom-green">
          <div className="w-full flex justify-around h-[50px] items-center border-b border-zinc-500">
            <p className="text-[1.2rem] font-semibold">درخواست دهنده</p>
            <p className="text-[1.2rem] font-semibold">نوع خرید</p>
            <p className="text-[1.2rem] font-semibold">تاریخ و ساعت</p>
          </div>
          <div className="w-full flex justify-around items-center">
            <table className="w-full table-auto border-collapse  overflow-hidden">
              <thead className="h-[50px]">
                <tr className="border-b border-zinc-500 h-[50px] *:text-zinc-600">
                  <th className="w-fit text-center  border-e border-zinc-300">
                    ردیف
                  </th>
                  <th className="w-fit text-center  border-e border-zinc-300">
                    کد کالا
                  </th>
                  <th className="w-fit text-center  border-e border-zinc-300">
                    نام کالا
                  </th>
                  <th className="w-fit text-center  border-e border-zinc-300">
                    تعداد کارتن
                  </th>
                  <th className="w-fit text-center  border-e border-zinc-300">
                    تعداد واحد در کارتن
                  </th>
                  <th className="w-fit text-center  border-e border-zinc-300">
                    تعداد واحد در زیر کارتن
                  </th>
                  <th className="w-fit text-center  border-e border-zinc-300">
                    تعداد نهایی
                  </th>
                  <th className="w-fit text-center  border-e border-zinc-300">
                    واحد
                  </th>
                  <th className="w-fit text-center  border-e border-zinc-300">
                    قیمت اصلی
                  </th>
                  <th className="w-fit text-center  border-e border-zinc-300">
                    تخفیف
                  </th>
                  <th className="w-fit text-center ">قیمت نهایی</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data?.map((val, i) => (
                    <tr
                      key={i}
                      className="border-b border-zinc-500 h-[50px] *:text-zinc-600 "
                    >
                      <td className="w-fit text-center border-e border-zinc-300">
                        {i + 1}
                      </td>
                      <td className="w-fit text-center border-e border-zinc-300">
                        {val.goodCode}
                      </td>
                      <td className="w-fit text-center border-e border-zinc-300">
                        {val.goodName}
                      </td>
                      <td className="w-fit text-center border-e border-zinc-300">
                        <input
                          dir="ltr"
                          type="number"
                          onChange={(e) => handleChange(e, i, 1)}
                          value={val.packageCount || 0}
                          className="w-[50px] border-2 h-[35px] text-center rounded-lg shadow-inner-custom-3 bg-[rgb(243,243,243)]"
                        />
                      </td>
                      <td className="w-fit text-center border-e border-zinc-300">
                        {val.countInBox * val.packageCount}
                      </td>
                      <td className="w-fit text-center border-e border-zinc-300">
                        <input
                          dir="ltr"
                          type="number"
                          onChange={(e) => handleChange(e, i, 2)}
                          value={val.subPackageCount || 0}
                          className="w-[50px] border-2 h-[35px] text-center rounded-lg shadow-inner-custom-3 bg-[rgb(243,243,243)]"
                        />
                      </td>
                      <td className="w-fit text-center border-e border-zinc-300">
                        {val.countInBox * val.packageCount +
                          val.subPackageCount}
                      </td>
                      <td className="w-fit text-center border-e border-zinc-300">
                        {val.unit}
                      </td>
                      <td className="w-fit text-center border-e border-zinc-300">
                        {val.priceAmount.toLocaleString("fa-IR")}
                      </td>
                      <td className="w-fit text-center border-e border-zinc-300">
                        %{" "}
                        <input
                          dir="ltr"
                          type="number"
                          onChange={(e) => handleChange(e, i, 3)}
                          value={val.goodDiscountPercent || 0}
                          className="w-[50px] border-2 h-[35px] text-center rounded-lg shadow-inner-custom-3 bg-[rgb(243,243,243)]"
                        />
                      </td>
                      <td className="w-fit text-center">
                        {(
                          (val.packageCount * val.countInBox +
                            val.subPackageCount) *
                          val.priceAmount *
                          (1 - (val.goodDiscountPercent || 0) / 100)
                        ).toLocaleString("fa-IR")}
                      </td>
                    </tr>
                  ))}

                <tr className="h-[50px] *:text-zinc-600">
                  <th className="w-fit text-center">جمع</th>
                  <th className="w-fit text-center"></th>
                  <th className="w-fit text-center"></th>
                  <th className="w-fit text-center">
                    {data?.reduce(
                      (total, item) => total + Number(item?.packageCount),
                      0
                    )}
                  </th>
                  <th className="w-fit text-center"></th>
                  <th className="w-fit text-center">
                    {data?.reduce(
                      (total, item) => total + Number(item?.subPackageCount),
                      0
                    )}
                  </th>
                  <th className="w-fit text-center">
                    {data?.reduce(
                      (total, item) =>
                        total +
                        Number(
                          item.countInBox * item.packageCount +
                            item.subPackageCount
                        ),
                      0
                    )}
                  </th>
                  <th className="w-fit text-center"></th>
                  <th className="w-fit text-center">
                    {data
                      ?.reduce(
                        (total, item) => total + Number(item?.priceAmount),
                        0
                      )
                      .toLocaleString("fa-IR")}
                  </th>
                  <th className="w-fit text-center"></th>
                  <th className="w-fit text-center">
                    {data
                      ?.reduce(
                        (total, item) =>
                          total +
                          Number(
                            (item.packageCount * item.countInBox +
                              item.subPackageCount) *
                              item.priceAmount *
                              (1 - (item.goodDiscountPercent || 0) / 100)
                          ),
                        0
                      )
                      .toLocaleString("fa-IR")}
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-full text-[1.1rem] flex flex-wrap">
          {dataDiscount.map((val, index) => (
            <div
              key={index}
              className="w-full flex justify-between items-center"
            >
              <p>
                {val?.type === 2
                  ? `اضافه شدن تخفیف زیر فاکتور با عنوان ${
                      val?.title
                    } به مقدار ${Number(val?.price).toLocaleString("fa-IR")}`
                  : val?.type === 1
                  ? `اضافه شدن اضافات زیر فاکتور با عنوان ${
                      val?.title
                    } به مقدار ${Number(val?.price).toLocaleString("fa-IR")}`
                  : ""}
              </p>
              <div
                className="p-2 text-center flex justify-center items-center gap-1 cursor-pointer group"
                style={{ width: "5%" }}
                onClick={() => handleDelete(index)}
              >
                <i className="bi bi-trash3-fill text-red-700" title="حذف"></i>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full py-5">
          <Description
            setShowDiscount={setShowDiscount}
            description={description}
            setDescription={setDescription}
          />
        </div>
        <div className="w-full border-y border-zinc-500 *:text-zinc-600 h-[50px] flex gap-10 justify-end px-10 items-center">
          <p>مبلغ کامل با تخفیف</p>
          <p>
            {(
              data?.reduce(
                (total, item) =>
                  total +
                  Number(
                    (item.packageCount * item.countInBox +
                      item.subPackageCount) *
                      item.priceAmount *
                      (1 - (item.goodDiscountPercent || 0) / 100)
                  ),
                0
              ) +
              dataDiscount?.reduce((totalDiscount, discountItem) => {
                // اعمال تخفیف و اضافات
                if (discountItem?.type === 2) {
                  return totalDiscount - Number(discountItem?.price); // کم کردن تخفیف
                } else if (discountItem?.type === 1) {
                  return totalDiscount + Number(discountItem?.price); // اضافه کردن اضافات
                }
                return totalDiscount;
              }, 0)
            ).toLocaleString("fa-IR")}
          </p>
        </div>
        <div className="w-full text-[1.2rem] *:text-red-500 font-semibold h-[50px] flex gap-2 justify-center items-center">
          <p>
            <p>
              {(
                data?.reduce(
                  (total, item) =>
                    total +
                    ((item.packageCount * item.countInBox +
                      item.subPackageCount) *
                      item.priceAmount *
                      (item.goodDiscountPercent || 0)) /
                      100,
                  0
                ) +
                dataDiscount
                  ?.filter((val) => val.type === 2)
                  .reduce((sum, val) => sum + Number(val.price), 0)
              ).toLocaleString("fa-IR")}
            </p>
          </p>

          <p>تومان تخفیف داده شد</p>
        </div>
        <div className="w-full h-[50px] flex gap-2 justify-center items-center">
          <div className="w-[250px]">
            <Button
              value={
                changeShoppingCartStatus.isPending ? (
                  <Spinner />
                ) : (
                  "ارسال پیش فاکتور به خریدار"
                )
              }
              click={acceptRequest}
              styleButton={22}
              disabled={![2, 3, 4].includes(lastTransactions?.status)}
            />
          </div>
          <div className="px-2 w-[150px]">
            <Button
              value={
                changeShoppingCartStatus.isPending ? (
                  <Spinner />
                ) : (
                  "ویرایش فاکتور"
                )
              }
              click={handleSubmitEdit}
              styleButton={22}
              disabled={![2, 3, 4].includes(lastTransactions?.status)}
            />
          </div>
          <div className="w-[150px]">
            <Button
              value={
                changeShoppingCartStatus.isPending ? <Spinner /> : "رد سفارش"
              }
              click={rejectRequest}
              styleButton={17}
              disabled={![2, 3, 4].includes(lastTransactions?.status)}
            />
          </div>
        </div>
        <div className="w-full h-[70px] flex gap-5 justify-center items-center">
          <p>چت با خریدار</p>
          <button
            onClick={() => setModalChat(true)}
            className="w-[40px] h-[40px] shadow-custom-6 rounded-xl flex justify-center items-center hover:scale-95 transition-all duration-300"
          >
            <Svg />
          </button>
        </div>
      </div>

      {modalChat && (
        <Modal
          onClose={closeModal}
          title={
            <>
              چت با خریدار {order?.shopperName}{" "}
              <br />
              <span className="text-gray-500 text-[13px]">
              کد رهگیری فاکتور {order?.code}
              </span>
            </>
          }
          style={"w-[90vw] h-[90vh] bg-white"}
        >
          <div className="w-full h-full">
            <ChatFactor
              shopperUserId={order?.shopperUserId}
              factorId={order?.id}
              shopperName={order?.shopperName}
            />
          </div>
        </Modal>
      )}

      {showDiscount && (
        <Modal onClose={closeModal} title="" style={"w-[90vw] xl:w-[600px]"}>
          <div className="w-full flex flex-wrap justify-center gap-5">
            <FormDiscount
              setTitle={setTitle}
              title={title}
              price={price}
              setPrice={setPrice}
              type={type}
              setType={setType}
              setShowDiscount={setShowDiscount}
              setShowDiscount2={setShowDiscount2}
            />
          </div>
        </Modal>
      )}
      {showDiscount2 && (
        <Modal onClose={closeModal} title="" style={"w-[90vw] xl:w-[600px]"}>
          <div className="w-full flex flex-wrap justify-center gap-5">
            <p className="w-full flex justify-center">آیا مطمئن هستید ؟</p>
            <div className="w-[80px]">
              <Button value={"بله"} click={yes} styleButton={23} />
            </div>
            <div className="w-[80px]">
              <Button value={"خیر"} click={no} styleButton={17} />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Table;

function Svg() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="20"
        viewBox="0 0 25 20"
        fill="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.12179 0.199326C10.8792 -0.08392 14.6532 -0.0652646 18.4075 0.255113L20.6706 0.447578C21.5008 0.518637 22.283 0.866968 22.8915 1.4366C23.5001 2.00623 23.8997 2.76408 24.026 3.58839L24.1682 4.52142C24.6517 7.68442 24.6065 10.9059 24.0344 14.054C23.8981 14.807 23.5018 15.4882 22.9147 15.9784C22.3276 16.4686 21.587 16.7368 20.8224 16.736H8.31461C8.02616 16.736 7.74328 16.8071 7.48967 16.9438L2.03979 19.8754C1.88054 19.9611 1.7018 20.0039 1.52106 19.9997C1.34032 19.9956 1.16375 19.9445 1.0086 19.8517C0.853448 19.7588 0.725026 19.6272 0.635882 19.4698C0.546738 19.3123 0.499919 19.1345 0.5 18.9535V7.07507C0.500359 5.34133 1.15512 3.67172 2.33315 2.4006C3.51118 1.12949 5.12551 0.350717 6.85285 0.220246L7.12179 0.199326ZM7.11901 7.09878C6.65704 7.09878 6.214 7.28246 5.88734 7.6094C5.56068 7.93634 5.37716 8.37976 5.37716 8.84213C5.37716 9.30449 5.56068 9.74792 5.88734 10.0749C6.214 10.4018 6.65704 10.5855 7.11901 10.5855C7.58097 10.5855 8.02402 10.4018 8.35068 10.0749C8.67734 9.74792 8.86085 9.30449 8.86085 8.84213C8.86085 8.37976 8.67734 7.93634 8.35068 7.6094C8.02402 7.28246 7.58097 7.09878 7.11901 7.09878ZM12.6929 7.09878C12.2309 7.09878 11.7879 7.28246 11.4612 7.6094C11.1346 7.93634 10.9511 8.37976 10.9511 8.84213C10.9511 9.30449 11.1346 9.74792 11.4612 10.0749C11.7879 10.4018 12.2309 10.5855 12.6929 10.5855C13.1549 10.5855 13.5979 10.4018 13.9246 10.0749C14.2512 9.74792 14.4348 9.30449 14.4348 8.84213C14.4348 8.37976 14.2512 7.93634 13.9246 7.6094C13.5979 7.28246 13.1549 7.09878 12.6929 7.09878ZM16.525 8.84213C16.525 8.37976 16.7085 7.93634 17.0351 7.6094C17.3618 7.28246 17.8048 7.09878 18.2668 7.09878C18.7288 7.09878 19.1718 7.28246 19.4985 7.6094C19.8251 7.93634 20.0087 8.37976 20.0087 8.84213C20.0087 9.30449 19.8251 9.74792 19.4985 10.0749C19.1718 10.4018 18.7288 10.5855 18.2668 10.5855C17.8048 10.5855 17.3618 10.4018 17.0351 10.0749C16.7085 9.74792 16.525 9.30449 16.525 8.84213Z"
          fill="#83C100"
        />
      </svg>
    </>
  );
}
