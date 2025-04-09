import React from "react";
import TableCollapsible from "./table-collapsible";
type Props = {
  supplierId?: string;
};
function Requests({ supplierId }: Props) {
  return (
    <>
      <article className="w-[95%] py-5 flex flex-wrap justify-center content-start">
        <h5 className="w-full text-[1.2rem] text-gray-very-dark font-semibold">
          درخواست ها :
        </h5>
        <div className="w-full px-4">
          <TableCollapsible supplierId={supplierId} />
        </div>
      </article>
    </>
  );
}

export default Requests;
