import { useEffect, useState } from "react";
import { WithSupport2 } from "@/component/management-panel/import-management.js";
import StepBullets from "./step-bullets";
import AddReceivedCheque from "./add-received-cheque";
import {
  ChequeAddIssuedChequeRequestType,
  ChequeAddReceivedChequeRequestType,
} from "@/types/cheque-types";
import ReceivedChequeList from "./received-cheque-list";
import IssuedChecksForm from "./issued-checks.form";
import IssuedChequeList from "./issued-cheque-list";
import { useAuth } from "@/context/auth-context";
import ReceivedChecksForm from "./received-checks-form";
import ChequesSentToYou from "./cheques-sent-to-you";
import AddIssuedCheque from "./add-issued-cheque";
import InqueryRecordsList from "./Inquiry-records-list";

const CheckManagementPage = () => {
  const { userData } = useAuth();
  const [step, setStep] = useState(1);
  const [typeOfCheque, setTypeOfCheque] = useState<
    "Received" | "Issued" | "SentToYou"
  >("Received");
  const [chequeData, setChequeData] = useState<
    ChequeAddReceivedChequeRequestType | ChequeAddIssuedChequeRequestType
  >();

  const [accountNumber, setAccountNumber] = useState("");

  const nextStep = () => {
    if (step < 3) setStep((prevState) => prevState + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep((prevState) => prevState - 1);
  };

  return (
    <div className="w-full min-h-[100vh] overflow-hidden flex flex-col justify-between">
      <div className=" w-full">
        <div className="py-5 mx-auto md:max-w-[300px] max-w-[200px]">
          <StepBullets
            currentStep={step}
            numberOfSteps={2}
            labels={["دریافت اطلاعات", "تکمیل اطلاعات", "عملیات چک"]}
          />
        </div>
        <div className="pt-14">
          <div
            className={
              step === 1
                ? "animate-in fade-in slide-in-from-bottom-4 duration-300 ease-in"
                : "animate-out fade-out slide-out-to-bottom-4 duration-300 ease-out opacity-0 max-h-0 max-w-0 hidden"
            }
          >
            <div className="flex-1 p-5">
              <div className="flex items-center justify-between">
                <div className="flex gap-4 text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
                  <div
                    className={`w-[150px] inline-flex justify-center items-center cursor-pointer transition-all duration-150 px-4 py-3 text-center text-white rounded-lg active  ${
                      typeOfCheque === "Received"
                        ? "bg-primary shadow-custom-12 text-white"
                        : "bg-primary-foreground hover:scale-95 text-zinc-600"
                    }`}
                    onClick={() => setTypeOfCheque("Received")}
                  >
                    چک های دریافتی
                  </div>
                  <div
                    className={`w-[150px] inline-flex justify-center items-center cursor-pointer transition-all duration-150 px-4 py-3 text-center text-white rounded-lg active  ${
                      typeOfCheque === "Issued"
                        ? "bg-primary shadow-custom-12 text-white"
                        : "bg-primary-foreground hover:scale-95 text-zinc-600"
                    }`}
                    onClick={() => setTypeOfCheque("Issued")}
                  >
                    چک های صادره
                  </div>
                </div>
                <div className="flex gap-3 text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
                  <div
                    className={`whitespace-nowrap inline-flex justify-center items-center cursor-pointer transition-all duration-150 px-3 py-2 text-center text-white rounded-lg active  ${
                      typeOfCheque === "SentToYou"
                        ? "bg-primary shadow-custom-12 text-white"
                        : "bg-primary-foreground hover:scale-95 text-zinc-600"
                    }`}
                    onClick={() => setTypeOfCheque("SentToYou")}
                  >
                    چک های ارسال شده به شما
                  </div>
                  {/* <div
                    className={`whitespace-nowrap inline-flex justify-center items-center cursor-pointer transition-all duration-150 px-3 py-2 text-center text-white rounded-lg active  ${
                      typeOfCheque === "InqueryList"
                        ? "bg-primary shadow-custom-12 text-white"
                        : "bg-primary-foreground hover:scale-95 text-zinc-600"
                    }`}
                    onClick={() => setTypeOfCheque("InqueryList")}
                  >
                    سوابق استعلام
                  </div> */}
                </div>
              </div>
              <div className="flex lg:flex-row flex-col gap-4 justify-between ">
                {typeOfCheque !== "SentToYou" && (
                  <div className="p-6 bg-gray-50/50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
                    {userData?.isAdmin ? (
                      <p className="text-center p-3 text-destructive text-sm">
                        در حال حاضر با نقش ادمین وارد سیستم شده اید و امکان ثبت
                        چک با نقش ادمین وجود ندارد
                      </p>
                    ) : typeOfCheque === "Received" ? (
                      <ReceivedChecksForm
                        onSubmit={nextStep}
                        setChequeData={setChequeData}
                      />
                    ) : typeOfCheque === "Issued" ? (
                      <IssuedChecksForm
                        onSubmit={nextStep}
                        setChequeData={setChequeData}
                        setAccountNumber={setAccountNumber}
                      />
                    ) : null}
                  </div>
                )}
                {typeOfCheque !== "SentToYou" && (
                  <div className="p-6 flex items-center justify-center bg-gray-50/50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
                    <img src="/img/check.webp" />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div
            className={
              step === 2
                ? "animate-in fade-in slide-in-from-bottom-4 duration-300 ease-in"
                : "animate-out fade-out slide-out-to-bottom-4 duration-300 ease-out opacity-0 max-h-0 max-w-0 hidden"
            }
          >
            {typeOfCheque === "Received" ? (
              <AddReceivedCheque prevStep={prevStep} chequeData={chequeData} />
            ) : typeOfCheque === "Issued" ? (
              <AddIssuedCheque
                prevStep={prevStep}
                chequeData={chequeData}
                userAccountNumber={accountNumber}
              />
            ) : null}
          </div>
        </div>
        {step === 1 && (
          <div className="p-5 pb-7">
            {typeOfCheque === "Received" ? (
              <ReceivedChequeList />
            ) : typeOfCheque === "Issued" ? (
              <IssuedChequeList />
            ) : typeOfCheque === "SentToYou" ? (
              <ChequesSentToYou />
            ) : null}
          </div>
        )}
      </div>

      <div className="w-full h-[50px] flex justify-center items-center pt-1">
        <WithSupport2 />
      </div>
    </div>
  );
};

export default CheckManagementPage;
