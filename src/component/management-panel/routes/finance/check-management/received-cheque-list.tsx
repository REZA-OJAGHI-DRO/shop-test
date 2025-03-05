import { Badge } from "@/components/ui/badge";
import Spinner from "@/components/ui/spinner";
import {
  chequeCashedStatusArrayConstant,
  chequeIssuedChequeStatusArrayConstant,
  chequeSayadStatusArrayConstant,
} from "@/lib/constants";
import { convertDate } from "@/lib/utils";
import React, { FC, useState } from "react";
import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import chequeService from "@/services-v2/cheque-services";
import ImageViewerModal from "@/components/ui/image-viewer-modal";
import { ChequeReceiverAcceptanceStatusEnum } from "@/types/cheque-types";
import { Button } from "@/components/ui/button";
import PayChequeDialog from "./pay-cheque-dialog";

type Props = {};

const receivedChequesLists = [
  { title: "نزد صندوق", receivedChequeStatus: 0, soon: false },
  { title: "خرج شده", receivedChequeStatus: 4, soon: false },
  { title: "واگذار شده به بانک", receivedChequeStatus: 2, soon: false },
  { title: "تضمین", receivedChequeStatus: 5, soon: false },
  { title: "استرداد شده", receivedChequeStatus: 11, soon: true },
  { title: "ابطال شده", receivedChequeStatus: 12, soon: true },
];

const ReceivedChequeList: FC<Props> = () => {
  const [selectedRow, setSelectedRow] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<{
    title: string;
    receivedChequeStatus: number;
    soon: boolean;
  }>(receivedChequesLists[0]);

  const { data: chequesList, isPending: chequesLoading } = useQuery({
    queryKey: ["cheque-get-list"],
    queryFn: () =>
      chequeService.getReceivedCheques({
        filter: {
          keyword: "",
        },
        orderPropertyName: "",
        orderType: 1,
        pageIndex: 1,
        pageSize: 10000,
      }),
  });

  const filteredCheques = chequesList?.data?.data?.filter(
    (item) =>
      item.enabled &&
      (item.receivedChequeStatus === selectedFilter.receivedChequeStatus ||
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
      <h4 className="text-gray-very-dark mb-3">لیست چک های دریافتی : </h4>
      <div className="flex items-center gap-3 overflow-auto py-2">
        {receivedChequesLists.map((item) => (
          <div
            className={`inline-flex justify-center items-center cursor-pointer transition-all duration-150 px-3 py-2 text-center text-white text-xs rounded-full whitespace-nowrap active  ${
              item.receivedChequeStatus === selectedFilter.receivedChequeStatus
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
          <div
            className={`grid ${
              selectedFilter.title !== receivedChequesLists[0].title
                ? "grid-cols-8"
                : "grid-cols-7"
            } text-sm [&_div]:p-2 ps-6 pe-5 text-center text-gray-very-dark min-w-[700px]`}
          >
            <div>تاریخ سررسید</div>
            <div>مبلغ</div>
            <div>دریافت شده از</div>
            {selectedFilter.title !== receivedChequesLists[0].title && (
              <div>پرداخت شده به</div>
            )}
            <div>بانک - شناسه صیاد</div>
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
              {filteredCheques && filteredCheques.length > 0 ? (
                filteredCheques.map((row) => (
                  <React.Fragment key={row.id}>
                    <div
                      className={`relative grid ${
                        selectedFilter.title !== receivedChequesLists[0].title
                          ? "grid-cols-8"
                          : "grid-cols-7"
                      } items-center bg-[rgba(255,255,255,0.6)] text-sm [&_div]:p-2 ps-6 text-center pe-5 [&_div]:overflow-hidden [&_div]:text-ellipsis cursor-pointer py-3`}
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
                      <div>{row.senderName || ""}</div>
                      {selectedFilter.title !==
                        receivedChequesLists[0].title && (
                        <div>{row.receiverName || ""}</div>
                      )}
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

                      {/* <div className="absolute top-1/2 -translate-y-1/2 left-3">
                        <Menubar asChild>
                          <MenubarMenu>
                            <MenubarTrigger
                              asChild
                              className="!p-0"
                              disabled={
                                selectedFilter.title === "نزد صندوق" &&
                                row.receiverAcceptanceStatus ===
                                  ChequeReceiverAcceptanceStatusEnum.Accepted
                              }
                            >
                              <EllipsisVerticalIcon className="text-gray-very-dark size-5" />
                            </MenubarTrigger>
                            <MenubarContent>
                              <MenubarItem
                                className="cursor-pointer"
                                disabled={
                                  selectedFilter.title === "نزد صندوق" &&
                                  row.receiverAcceptanceStatus ===
                                    ChequeReceiverAcceptanceStatusEnum.Accepted
                                }
                              >
                                خرج چک
                              </MenubarItem>
                            </MenubarContent>
                          </MenubarMenu>
                        </Menubar>
                      </div> */}
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
                        <div className="relative">
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

                          <div className="absolute top-3 left-3">
                            <PayChequeDialog
                              onSubmit={() => {}}
                              chequeId={row.id}
                            >
                              <Button
                                variant={"accent"}
                                size={"sm"}
                                disabled={
                                  row.receiverAcceptanceStatus !==
                                  ChequeReceiverAcceptanceStatusEnum.Accepted
                                }
                              >
                                خرج چک
                              </Button>
                            </PayChequeDialog>
                          </div>
                        </div>
                      )}
                    </div>
                  </React.Fragment>
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

export default ReceivedChequeList;
