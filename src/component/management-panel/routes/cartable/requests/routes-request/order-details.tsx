import React, { FC, useState } from "react";
import RequestDetails from "./request-details/request-details";
import Colleagues from "./colleagues/colleagues";
import { ShoppingCartGetAllResponseType } from "@/types/shopping-cart-types";

type Props = {
  order: ShoppingCartGetAllResponseType;
  onStatusChange: () => void;
};
export const OrderDetails: FC<Props> = ({ order, onStatusChange }) => {
  // const [menu, _] = useState([
  //   {
  //     id: 1,
  //     name: "جزئیات درخواست",
  //   },
  //   {
  //     id: 2,
  //     name: "همکاران",
  //   },
  //   {
  //     id: 3,
  //     name: "ارزیابی",
  //   },
  //   {
  //     id: 4,
  //     name: "وضعیت تسهیلات",
  //   },
  //   {
  //     id: 5,
  //     name: "وضعیت اعتباری چک ها",
  //   },
  //   {
  //     id: 6,
  //     name: "اطلاعات شغلی هویتی",
  //   },
  // ]);
  // const [x, setX] = useState(1);
  // function clickMenu(id: number) {
  //   setX(id);
  // }
  return (
    <>
      <div className="w-full flex flex-wrap gap-2 justify-center py-2">
        {/* <div className="w-[170px] flex flex-wrap gap-5 justify-center content-start">
          {menu &&
            menu.map((val) => {
              return (
                <>
                  <div
                    key={val.id}
                    style={{ background: val.id == x ? "#B886FF" : "#F4F4F4" }}
                    onClick={() => clickMenu(val.id)}
                    className={`${
                      val.id == x
                        ? "shadow-custom-12 text-white"
                        : "hover:scale-95 text-zinc-600"
                    } w-full transition-all duration-300  cursor-pointer text-[.8rem] bg-zinc-200 flex justify-center items-center py-3 rounded-lg`}
                  >
                    {val.name}
                  </div>
                </>
              );
            })}
        </div> */}
        <div className="w-full">
          {/* {x == 1 ? (
            <> */}
              <RequestDetails order={order} onStatusChange={onStatusChange} />
            {/* </>
          ) : x == 2 ? (
            <> */}
              {/* <Colleagues /> */}
            {/* </>
          ) : (
            ""
          )} */}
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
