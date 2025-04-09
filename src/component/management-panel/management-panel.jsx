import { Outlet } from "react-router-dom";
import "@/style/management-panel.css"
import Sidebar from "./sidebar/sidebar";
import "@/App.css";
import {
  React,
  useState,
} from '@/component/management-panel/import-management.js'

function managementPanel() {
  const [timer, setTimer] = useState(true);

  return (
    <>
      <style>
        {`
      .boxFilter3{
      backdrop-filter:blur(10px);
      }
      `}
      </style>
      <main className="w-full min-h-[100vh] bg-1 flex">
        <div className="w-full h-full flex">
        <Sidebar timer={timer} setTimer={setTimer} />
        <Outlet />
        </div>
      </main>
    </>
  );
}

export default managementPanel;