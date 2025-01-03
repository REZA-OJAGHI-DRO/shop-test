import React, { useEffect, useState } from "react";
import OrderDetails from "./routes-request/order-details";
import { useQuery } from "@tanstack/react-query";
import shoppingCartService from "@/services-v2/shopping-cart-service";
import Spinner from "@/components/ui/spinner";
import { ShoppingCartGetAllResponseType } from "@/types/shopping-cart-types";
import {
  paymentTypesArrayConstant,
  paymentTypesObjectConstant,
} from "@/lib/constants";
import { convertDate } from "@/lib/utils";
import { DateObject } from "react-multi-date-picker";

type RowType = {
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  order: ShoppingCartGetAllResponseType;
};
function Row({ index, order, isOpen, onToggle }: RowType) {
  return (
    <>
      {/* ردیف اصلی */}
      <div className="relative grid grid-cols-8 text-center text-sm items-center bg-white rounded-2xl">
        <div
          className="absolute right-3 top-1/2 -translate-y-1/2 text-center cursor-pointer text-[#B886FF] text-[1.1rem]"
          onClick={onToggle}
        >
          {isOpen ? "▼" : "▲"}
        </div>
        <div className="p-2 py-4">{index + 1}</div>
        <div className="p-2 py-4 text-center">
          {convertDate(
            new DateObject({ date: new Date(order.createdAt) }),
            "persian",
            "YYYY-MM-DD HH:mm"
          )}
        </div>
        <div className="p-2 py-4">{order.shopperName}</div>
        <div className="p-2 py-4">{'فیلدی ندارد'}</div>
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
        <div className="p-2 py-4 flex-1 text-center">{"فیلدی ندارد"}</div>
        <div className="p-2 py-4 flex-1 text-center">
          {order.sendToSupplier
            ? "منتظر تایید تامین کننده"
            : "منتظر تایید فروشنده"}
        </div>
      </div>

      {/* محتوای اضافی */}
      {isOpen && (
        <div className="w-full p-4 mt-5 bg-white rounded-2xl">
          <OrderDetails order={order} />
        </div>
      )}
    </>
  );
}

export default function TableCollapsible() {
  const data = [
    {
      id: 56757,
      date: "1401/3/6 12:00",
      customer: "رضا",
      city: "تهران",
      order: "10 کارتن 127 واحد",
      payment: "چک 20 روزه",
      status: "مشتری جدید",
      viewStatus: "مشاهده نشده",
    },
    {
      id: 56758,
      date: "1401/3/7 12:30",
      customer: "علی",
      city: "مشهد",
      order: "5 کارتن 50 واحد",
      payment: "نقدی",
      status: "مشتری قدیمی",
      viewStatus: "مشاهده شده",
    },
    {
      id: 56759,
      date: "1401/3/8 14:00",
      customer: "سارا",
      city: "اصفهان",
      order: "20 کارتن 200 واحد",
      payment: "چک 30 روزه",
      status: "مشتری جدید",
      viewStatus: "مشاهده نشده",
    },
    {
      id: 56760,
      date: "1401/3/9 15:00",
      customer: "مهدی",
      city: "تبریز",
      order: "15 کارتن 150 واحد",
      payment: "نقدی",
      status: "مشتری جدید",
      viewStatus: "مشاهده نشده",
    },
  ];

  const requests = useQuery({
    queryKey: ["get-supplier-request"],
    queryFn: shoppingCartService.getAllForSupplier,
  });

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full mx-auto mt-8 text-[.9rem] rounded-lg flex flex-wrap gap-2 text-gray-very-dark">
      <div className="grid grid-cols-8 w-full ">
        {/* <div className="p-2 w-12"></div> */}
        <div className="p-2 flex-1 text-center">شماره</div>
        <div className="p-2 flex-1 text-center">تاریخ / ساعت</div>
        <div className="p-2 flex-1 text-center">نام و نام خانوادگی</div>
        <div className="p-2 flex-1 text-center">آدرس</div>
        <div className="p-2 flex-1 text-center">میزان سفارش</div>
        <div className="p-2 flex-1 text-center">نوع خرید</div>
        <div className="p-2 flex-1 text-center">دفعات سفارش</div>
        <div className="p-2 flex-1 text-center">وضعیت</div>
      </div>

      {/* حلقه برای ایجاد ردیف‌ها بر اساس داده‌ها */}
      <div className="w-full flex flex-wrap gap-5">
        {requests.isPending ? (
          <div className="flex justify-center py-4">
            <Spinner text="در حال دریافت اطلاعات ..." />
          </div>
        ) : requests.data?.data && requests.data.data.length > 0 ? (
          requests.data.data.map((row, index) => (
            <div className="w-full" key={row.id}>
              <Row
                index={index}
                order={row}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
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
