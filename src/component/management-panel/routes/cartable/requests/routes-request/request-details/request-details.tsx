import React, { FC } from "react";
import Table from "./component/table";
import { ShoppingCartGetAllResponseType } from "@/types/shopping-cart-types";

type Props = {
  order: ShoppingCartGetAllResponseType;
  onStatusChange: () => void;
};
const RequestDetails: FC<Props> = ({ order, onStatusChange }) => {
  return (
    <div className="w-full">
      <div>
        <Table order={order} onStatusChange={onStatusChange} />
      </div>
    </div>
  );
};

export default RequestDetails;
