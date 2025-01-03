import React, { FC } from "react";
import Table from "./component/table";
import { ShoppingCartGetAllResponseType } from "@/types/shopping-cart-types";

type Props = {
  order: ShoppingCartGetAllResponseType;
};
const RequestDetails: FC<Props> = ({ order }) => {
  return (
    <div className="w-full">
      <div>
        <Table order={order} />
      </div>
    </div>
  );
};

export default RequestDetails;
