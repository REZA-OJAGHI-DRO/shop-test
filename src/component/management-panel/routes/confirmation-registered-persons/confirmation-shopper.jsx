import Table2 from "./table-shopper";
import "@/App.css";
import {
  React,
  useState,
} from '@/component/management-panel/import-management.js'
function ConfirmationShopper() {
  const [updateTable, setUpdateTable] = useState(false);

  return (
    <main
      dir="ltr"
      className="w-full flex justify-center items-center min-h-[100vh] px-20"
    >
      <div dir="rtl" className="w-[90%]">
        <p className="w-full text-center text-[1.5rem] text-black pb-10">
          لیست ثبت نام افراد خریدار{" "}
        </p>
        <Table2 updateTable={updateTable} setUpdateTable={setUpdateTable} />
      </div>
    </main>
  );
}

export default ConfirmationShopper;
