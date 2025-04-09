import { Badge } from "@/components/ui/badge";
import Spinner from "@/components/ui/spinner";
import {
  chequeCashedStatusArrayConstant,
  chequeIssuedChequeStatusArrayConstant,
  chequeSayadStatusArrayConstant,
} from "@/lib/constants";
import { convertDate } from "@/lib/utils";
import { FC, useState } from "react";
import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import chequeService from "@/services-v2/cheque-services";
import ImageViewerModal from "@/components/ui/image-viewer-modal";

type Props = {};

const issuedChequesLists = [
  { title: "چک های صادره جاری", issuedChequeStatus: 0, soon: false },
  { title: "پاس شده", issuedChequeStatus: 10, soon: true },
  { title: "ابطال شده", issuedChequeStatus: 11, soon: true },
  { title: "تضمین", issuedChequeStatus: 3, soon: false },
];

const IssuedChequeList: FC<Props> = ({}) => {
  const [selectedRow, setSelectedRow] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<{
    title: string;
    issuedChequeStatus: number;
    soon: boolean;
  }>(issuedChequesLists[0]);

  const { data: chequesList, isPending: chequesLoading } = useQuery({
    queryKey: ["cheque-get-list"],
    queryFn: () =>
      chequeService.getIssuedCheques({
        filter: {
          keyword: "",
        },
        orderPropertyName: "",
        orderType: 1,
        pageIndex: 1,
        pageSize: 10000,
      }),
  });

  const filterdCheques = chequesList?.data?.data?.filter(
    (item) =>
      item.enabled &&
      (item.receivedChequeStatus === selectedFilter.issuedChequeStatus ||
        item.receivedChequeStatus === null)
  );

  const cheque = useMutation({
    mutationKey: ["cheque-get"],
    mutationFn: chequeService.get,
  });

  const materialColors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-red-500",
    "bg-cyan-500",
    "bg-orange-500",
    "bg-teal-500",
    "bg-pink-500",
    "bg-fuchsia-500",
    "bg-purple-500",
    "bg-gray-500",
    "bg-pink-800",
    "bg-indigo-900",
  ];

  function onRowClickHandler(id: string) {
    setSelectedRow(selectedRow === id ? "" : id);
    if (id) {
      cheque.mutate({ id: id });
    }
  }

  return (
    <div>
      <h4 className="text-gray-very-dark mb-3">لیست چک های صادره : </h4>
      <div className="flex items-center gap-3 overflow-auto py-2">
        {issuedChequesLists.map((item) => (
          <div
            className={`inline-flex justify-center items-center cursor-pointer transition-all duration-150 px-3 py-2 text-center text-white text-xs rounded-full whitespace-nowrap active  ${
              item.issuedChequeStatus === selectedFilter.issuedChequeStatus
                ? "bg-primary shadow-custom-12 text-white"
                : "bg-primary-foreground hover:scale-95 text-zinc-600"
            }`}
            key={item.title}
            onClick={() => setSelectedFilter(item)}
          >
            {item.title}
          </div>
        ))}
      </div>
      <div
        className="w-full bg-[rgba(255,255,255,0.3)] rounded-2xl overflow-hidden"
        dir="rtl"
      >
        <div className="overflow-x-auto">
          <div className="grid grid-cols-8 text-sm [&_div]:p-2 ps-6 pe-5 text-center text-gray-very-dark min-w-[700px]">
            <div>تاریخ سررسید</div>
            <div>مبلغ</div>
            <div>شماره حساب محل صدور چک</div>
            <div>پرداخت شده به</div>
            <div>بانک - شناسه صیاد - سری و سریال</div>
            <div>وضعیت ثبت چک در صیاد</div>
            <div>وضعیت وصول چک</div>
            <div>تصویر چک</div>
          </div>

          {chequesLoading ? (
            <div className="flex justify-center py-5">
              <Spinner
                text="درحال دریافت اطلاعات ..."
                textClassName="text-gray-very-dark"
              />
            </div>
          ) : (
            <div className="overflow-hidden  rounded-2xl text-gray-very-dark min-w-[700px]">
              {filterdCheques && filterdCheques.length > 0 ? (
                filterdCheques.map((row) => (
                  <>
                    <div
                      className={`grid grid-cols-8 items-center bg-[rgba(255,255,255,0.6)] text-sm [&_div]:p-2 ps-6 text-center pe-5 [&_div]:overflow-hidden [&_div]:text-ellipsis cursor-pointer py-3`}
                      onClick={() => onRowClickHandler(row.id)}
                    >
                      <div className="flex gap-2 items-center justify-center">
                        {row.dueDate ? (
                          <Badge
                            variant={"ghost"}
                            className={`!py-1 !px-2 ${
                              materialColors[
                                new DateObject(row.dueDate).convert(
                                  persian,
                                  persian_fa
                                ).month.number - 1
                              ]
                            } text-white`}
                          >
                            {
                              new DateObject(row.dueDate).convert(
                                persian,
                                persian_fa
                              ).month.name
                            }
                          </Badge>
                        ) : null}
                        <span>{convertDate(row.dueDate, "persian")}</span>
                      </div>
                      <div>{row.amount.toLocaleString("fa-IR")}</div>
                      <div>{"مشخص نشده"}</div>
                      <div>{row.receiverName || ""}</div>
                      <div>
                        {`${row.bankName || ""} - ${row.sayadId || ""} - ${
                          row.seriesNo || ""
                        }/${row.serialNo || ""}`}
                      </div>
                      <div>
                        {chequeSayadStatusArrayConstant[row.sayadStatus].label}
                      </div>
                      <div>
                        {
                          chequeCashedStatusArrayConstant[row.cashedStatus]
                            .label
                        }
                      </div>
                      <div>
                        {row.image?.link ? (
                          <ImageViewerModal
                            imageUrl={row.image.link}
                            altText="تصویر چک"
                          >
                            <span className="text-accent">تصویر چک</span>
                          </ImageViewerModal>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div
                      className={
                        selectedRow === row.id
                          ? "animate-in fade-in slide-in-from-bottom-4 duration-300 ease-in"
                          : "animate-out fade-out slide-out-to-bottom-4 duration-300 ease-out opacity-0 max-h-0 max-w-0 hidden"
                      }
                    >
                      {cheque.isPending ? (
                        <div className="flex justify-center py-5">
                          <Spinner
                            text="در حال دریافت اطلاعات ..."
                            textClassName="text-gray-very-dark"
                          />
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-3 py-4 px-6">
                          <div>
                            <span>بانک : </span>
                            <span>{cheque.data?.data?.bankName}</span>
                          </div>
                          <div>
                            <span>صادر کننده : </span>
                            <span>{cheque.data?.data?.ownerName}</span>
                          </div>
                          <div>
                            <span>تاریخ اخذ دسته چک: </span>
                            <span dir="rtl">
                              {cheque.data?.data?.issuedDate
                                ? convertDate(
                                    cheque.data?.data?.issuedDate,
                                    "persian"
                                  )
                                : ""}
                            </span>
                          </div>
                          <div>
                            <span>شماره شبای دسته چک : </span>
                            <span>{cheque.data?.data?.ownerIban}</span>
                          </div>
                          <div>
                            <span>وضعیت استعلام : </span>
                            <span>
                              {cheque.data?.data?.receivedChequeStatus
                                ? cheque.data.data.receivedChequeStatus === 6
                                  ? "استعلام شده"
                                  : chequeIssuedChequeStatusArrayConstant[
                                      cheque.data?.data?.receivedChequeStatus
                                    ]
                                : "مشخص نشده"}
                            </span>
                          </div>
                          <div className="space-x-3">
                            <span>وضعیت ثبت : </span>
                            <span>
                              {cheque.data?.data.receivedChequeStatus
                                ? cheque.data.data.receivedChequeStatus > 2
                                  ? "ثبت شده"
                                  : chequeIssuedChequeStatusArrayConstant[
                                      cheque.data.data.receivedChequeStatus
                                    ]
                                : "مشخص نشده"}
                            </span>
                          </div>
                          <div className="md:col-span-2 col-span-1">
                            <span>شرح چک : </span>
                            <span>{cheque.data?.data.description || ""}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                ))
              ) : (
                <div className="py-4 text-sm text-center text-gray-light">
                  {selectedFilter.soon
                    ? "به زودی"
                    : "موردی برای نمایش وجود ندارد"}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IssuedChequeList;
