import React, { useEffect, useState } from "react";
import OrderDetails from "./routes-request/order-details";
import { useMutation, useQuery } from "@tanstack/react-query";
import shoppingCartService from "@/services-v2/shopping-cart-service";
import Spinner from "@/components/ui/spinner";
import {
  ShoppingCartGetAllResponseType,
  ShoppingCartStatusEnum,
} from "@/types/shopping-cart-types";
import {
  paymentTypesArrayConstant,
  paymentTypesObjectConstant,
  shoppingCartStatusArrayConstant,
} from "@/lib/constants";
import { convertDate } from "@/lib/utils";
import { DateObject } from "react-multi-date-picker";
import { useAuth } from "@/context/auth-context";

type RowType = {
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  order: ShoppingCartGetAllResponseType;
  onStatusChange: () => void;
};
function Row({ index, order, isOpen, onToggle, onStatusChange }: RowType) {
  const { userData } = useAuth();
  const lastTransactions = order?.transactions
    ? order.transactions[order.transactions.length - 1]
    : null;

  const changeShoppingCartStatus = useMutation({
    mutationKey: ["change-shopping-cart-status"],
    mutationFn: shoppingCartService.changeStatusBySupplier,
    onSuccess: (data) => {
      if (data.isSuccess) onStatusChange();
    },
  });

  useEffect(() => {
    if (
      lastTransactions &&
      isOpen &&
      lastTransactions.status === ShoppingCartStatusEnum.SendToSupplier &&
      !!userData &&
      !userData.isAdmin
    ) {
      changeShoppingCartStatus.mutate({
        id: order.id,
        status: ShoppingCartStatusEnum.ReviewBySupplier,
        description: null,
      });
    }
  }, [isOpen, onToggle]);

  return (
    <>
      {/* ردیف اصلی */}
      <div className="relative grid grid-cols-6 text-center text-sm items-center bg-white rounded-2xl">
        <div
          className="absolute right-3 top-1/2 -translate-y-1/2 text-center cursor-pointer text-[#B886FF] text-[1.1rem]"
          onClick={onToggle}
        >
          {isOpen ? "▼" : "▲"}
        </div>
        <div className="p-2 py-4">{order.code}</div>
        <div className="p-2 py-4 text-center">
          <p>
            {convertDate(
              new DateObject({ date: new Date(order.createdAt) }),
              "persian",
              "YYYY-MM-DD"
            )}
          </p>
          <p>
            {convertDate(
              new DateObject({ date: new Date(order.createdAt) }),
              "persian",
              "HH:mm"
            )}
          </p>
        </div>
        <div className="p-2 py-4">{order.shopperName}</div>
        {/* <div className="p-2 py-4">{"فیلدی ندارد"}</div> */}
        <div className="p-2 py-4">
          <p>
            {order.items.reduce((acc, item) => item.packageCount + acc, 0) +
              " کارتن "}
          </p>
          <p>
            {order.items.reduce((acc, item) => item.subPackageCount + acc, 0) +
              " واحد کالا "}
          </p>
        </div>
        <div className="p-2 py-4 flex-1 text-center">
          {`${paymentTypesArrayConstant[order.paymentType].label} ${
            order.paymentType === 1 ? `${order.paymentDurationDays} روزه` : ""
          }`}
        </div>
        {/* <div className="p-2 py-4 flex-1 text-center">{"فیلدی ندارد"}</div> */}
        <div className="p-2 py-4 flex-1 text-center">
          {lastTransactions
            ? shoppingCartStatusArrayConstant[lastTransactions.status - 1].label
            : ""}
        </div>
      </div>

      {/* محتوای اضافی */}
      {isOpen && (
        <div className="w-full p-4 mt-5 bg-white rounded-2xl">
          <OrderDetails order={order} onStatusChange={onStatusChange} />
        </div>
      )}
    </>
  );
}

type Props = {
  supplierId?: string;
};
export default function TableCollapsible({ supplierId }: Props) {
  const { userData } = useAuth();

  const requests = useQuery({
    queryKey: ["get-supplier-request", supplierId],
    queryFn: () => {
      console.log("Query function called");
      return shoppingCartService.getAllForSupplier({
        id: supplierId || undefined,
      });
    },
    enabled: userData?.isAdmin ? !!supplierId : true,
  });

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full mx-auto mt-8 text-[.9rem] rounded-lg flex flex-wrap gap-2 text-gray-very-dark">
      <div className="grid grid-cols-6 w-full ">
        {/* <div className="p-2 w-12"></div> */}
        <div className="p-2 flex-1 text-center">شماره</div>
        <div className="p-2 flex-1 text-center">تاریخ / ساعت</div>
        <div className="p-2 flex-1 text-center">نام و نام خانوادگی</div>
        {/* <div className="p-2 flex-1 text-center">آدرس</div> */}
        <div className="p-2 flex-1 text-center">میزان سفارش</div>
        <div className="p-2 flex-1 text-center">نوع خرید</div>
        {/* <div className="p-2 flex-1 text-center">دفعات سفارش</div> */}
        <div className="p-2 flex-1 text-center">وضعیت</div>
      </div>

      {/* حلقه برای ایجاد ردیف‌ها بر اساس داده‌ها */}
      <div className="w-full flex flex-wrap gap-5">
        {requests.isLoading ? (
          <div className="flex justify-center py-4">
            <Spinner text="در حال دریافت اطلاعات ..." />
          </div>
        ) : requests.data?.data && requests.data.data.length > 0 ? (
          requests.data.data
            .slice()
            .reverse()
            .map((row, index) => (
              <div className="w-full" key={row.id}>
                <Row
                  index={index}
                  order={row}
                  isOpen={openIndex === index}
                  onToggle={() => handleToggle(index)}
                  onStatusChange={() => requests.refetch()}
                />
              </div>
            ))
        ) : (
          <div className="text-center py-4 text-sm text-gray-very-dark">
            موردی برای نمایش وجود ندارد
          </div>
        )}
      </div>
    </div>
  );
}
