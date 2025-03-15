import { FC } from "react";
import Table from "./component/table";
import Financing from "./component/financing";
import { ShoppingCartGetAllResponseType } from "@/types/shopping-cart-types";
import Stepper1 from '../../../../../../../../public/img/stepper-1.png'
import Stepper2 from '../../../../../../../../public/img/stepper-2.png'
import Stepper3 from '../../../../../../../../public/img/stepper-3.png'
import messageNotif from '../../../../../../../../public/img/message-notif.png'
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
import ChatFactor from "./chat-factor/chat-factor";
type Props = {
  order: ShoppingCartGetAllResponseType;
  onStatusChange: () => void;
  setStage : Number
};
const RequestDetails: FC<Props> = ({ order, onStatusChange }) => {
  const [stage, setStage] = useState(1);
  const [priceAll, setPriceAll] = useState('');
 const [modalChat, setModalChat] = useState(false);

 function closeModal() {
  setModalChat(false);
}

  return (
    <>
    <div className="w-full flex flex-wrap gap-3">
      <div className="w-full bg-zinc-100 rounded-lg h-[40px] flex items-center justify-start px-4">
      <div className="flex justify-center items-center">
          <button
            onClick={() => setModalChat(true)}
            className=" flex gap-2 justify-center items-center hover:scale-95 transition-all duration-300"
            >
            <img src={messageNotif} alt="" className=""/>
            <p className="text-nowrap">چت با خریدار</p>
          </button>
        </div>
      </div>
      <div className="w-full flex flex-wrap gap-3">
        {stage == 1 ? (
          <>
            <div className="w-full h-[64px] grid *:w-full *:h-full">
              <div className="gridArea">
                <img src={Stepper1} alt="" className="w-full h-full"/>
              </div>
              <div className="gridArea flex w-full justify-around">
              <div className="w-[25%] h-full flex flex-wrap content-center">
                <p className="w-full text-center text-white">جزئیات درخواست خریدار</p>
                <p className="w-full text-center text-white">در حال محاسبه</p>
              </div>
              <div className="w-[25%] h-full flex flex-wrap content-center">
              <p className="w-full text-center text-[rgb(35,64,93)]">تعیین شیوه حمل</p>
              <p className="w-full text-center text-[rgb(35,64,93)]">----</p>
              </div>
              <div className="w-[25%] h-full flex flex-wrap content-center">
              <p className="w-full text-center text-[rgb(35,64,93)]">تعیین روش تامین اعتبار</p>
              <p className="w-full text-center text-[rgb(35,64,93)]">----</p>
              </div>
              </div>
            </div>
            <Table order={order} onStatusChange={onStatusChange} setStage={setStage} setPriceAll={setPriceAll} setModalChat={setModalChat} modalChat={modalChat}/>
          </>
        ) : stage == 2 ? (
          <>
           <div className="w-full h-[64px] grid *:w-full *:h-full">
              <div className="gridArea">
                <img src={Stepper2} alt="" className="w-full h-full"/>
              </div>
              <div className="gridArea flex w-full justify-around">
              <div className="w-[25%] h-full flex flex-wrap content-center">
                <p className="w-full text-center text-[rgb(35,64,93)]">جزئیات درخواست خریدار</p>
                <p className="w-full text-center text-[rgb(35,64,93)]">در حال محاسبه</p>
              </div>
              <div className="w-[25%] h-full flex flex-wrap content-center">
              <p className="w-full text-center text-white">تعیین شیوه حمل</p>
              <p className="w-full text-center text-white">----</p>
              </div>
              <div className="w-[25%] h-full flex flex-wrap content-center">
              <p className="w-full text-center text-[rgb(35,64,93)]">تعیین روش تامین اعتبار</p>
              <p className="w-full text-center text-[rgb(35,64,93)]">----</p>
              </div>
              </div>
            </div>
          </>
        ) : stage == 3 ? (
          <>
            <div className="w-full h-[64px] grid *:w-full *:h-full">
              <div className="gridArea">
                <img src={Stepper3} alt="" className="w-full h-full"/>
              </div>
              <div className="gridArea flex w-full justify-around">
              <div className="w-[25%] h-full flex flex-wrap content-center">
                <p className="w-full text-center text-[rgb(35,64,93)]">جزئیات درخواست خریدار</p>
                <p className="w-full text-center text-[rgb(35,64,93)]">----</p>
              </div>
              <div className="w-[25%] h-full flex flex-wrap content-center">
              <p className="w-full text-center text-[rgb(35,64,93)]">تعیین شیوه حمل</p>
              <p className="w-full text-center text-[rgb(35,64,93)]">----</p>
              </div>
              <div className="w-[25%] h-full flex flex-wrap content-center">
              <p className="w-full text-center text-white">تعیین روش تامین اعتبار</p>
              <p className="w-full text-center text-white">در حال محاسبه</p>
              </div>
              </div>
            </div>
            <Financing priceAll={priceAll} onStatusChange={onStatusChange} stage={stage} setStage={setStage} order={order}/>
          </>
        ) : <></>}
      </div>
    </div>

    {modalChat && (
        <Modal
          onClose={closeModal}
          title={
            <>
              چت با خریدار {order?.shopperName} <br />
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
    </>
  );
};

export default RequestDetails;


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
