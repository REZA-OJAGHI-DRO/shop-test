import { Badge } from "@/components/ui/badge";
import Spinner from "@/components/ui/spinner";
import {
  chequeCashedStatusArrayConstant,
  chequeIssuedChequeStatusArrayConstant,
  chequeReceiverAcceptanceStatusArrayConstant,
  chequeSayadStatusArrayConstant,
} from "@/lib/constants";
import { convertDate } from "@/lib/utils";
import { FC, useState } from "react";
import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import chequeService from "@/services-v2/cheque-services";
import { ChequeReceiverAcceptanceStatusEnum } from "@/types/cheque-types";
import { Button } from "@/components/ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/auth-context";

type Props = {};

const ChequesSentToYou: FC<Props> = ({}) => {
  const { userData } = useAuth();
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

  const filteredCheques = chequesList?.data.data.filter(
    (item) =>
      item.senderUserId !== userData?.userId &&
      item.receiverUserId === userData?.userId
  );

  const chequeAcceptanceMutation = useMutation({
    mutationKey: ["cheque-accept"],
    mutationFn: chequeService.acceptance,
    onSuccess: (data) => {
      if (data.isSuccess) {
        toast({
          variant: "success",
          description: data.message,
        });
      } else {
        toast({
          variant: "destructive",
          description: data.message,
        });
      }
    },
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

  function acceptCheque(id: string, accept: boolean) {
    chequeAcceptanceMutation.mutate({
      id: id,
      isAccepted: accept,
    });
  }

  return (
    <div>
      <div
        className="w-full bg-[rgba(255,255,255,0.3)] rounded-2xl overflow-hidden"
        dir="rtl"
      >
        <div className="overflow-x-auto">
          <div className="grid grid-cols-9 text-sm [&_div]:p-2 ps-6 pe-5 text-center text-gray-very-dark min-w-[700px]">
            <div>تاریخ سررسید</div>
            <div>مبلغ</div>
            <div>دریافت شده از</div>
            <div>پرداخت شده به</div>
            <div>بانک - شناسه صیاد</div>
            <div>وضعیت ثبت چک در صیاد</div>
            <div>وضعیت وصول چک</div>
            <div>وضعیت پذیرش چک</div>
            <div></div>
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
                  <div
                    className={`grid grid-cols-9 items-center bg-[rgba(255,255,255,0.6)] text-sm [&_div]:p-2 ps-6 text-center pe-5 [&_div]:overflow-hidden [&_div]:text-ellipsis py-3`}
                    key={row.id}
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
                    <div>{row.receiverName || ""}</div>
                    <div>
                      {`${row.bankName} - ${row.sayadId}` || "مشخص نشده"}
                    </div>
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
                        chequeReceiverAcceptanceStatusArrayConstant[
                          row.receiverAcceptanceStatus
                        ].label
                      }
                    </div>
                    <div>
                      <Menubar asChild>
                        <MenubarMenu>
                          <MenubarTrigger
                            asChild
                            className="!p-0"
                            disabled={
                              chequeAcceptanceMutation.isPending ||
                              row.receiverAcceptanceStatus !==
                                ChequeReceiverAcceptanceStatusEnum.AcceptanceWaiting
                            }
                          >
                            <span>
                              <Button
                                className="text-sm w-full rounded-xl my-2"
                                variant={"accent"}
                                disabled={
                                  chequeAcceptanceMutation.isPending ||
                                  row.receiverAcceptanceStatus !==
                                    ChequeReceiverAcceptanceStatusEnum.AcceptanceWaiting
                                }
                              >
                                {chequeAcceptanceMutation.isPending
                                  ? "در حال انجام عملیات ..."
                                  : "عملیات"}
                              </Button>
                            </span>
                          </MenubarTrigger>
                          <MenubarContent>
                            <MenubarItem
                              className="cursor-pointer"
                              onClick={() => acceptCheque(row.id, true)}
                            >
                              پذیرش
                            </MenubarItem>
                            <MenubarItem
                              className="cursor-pointer"
                              onClick={() => acceptCheque(row.id, false)}
                            >
                              رد چک
                            </MenubarItem>
                          </MenubarContent>
                        </MenubarMenu>
                      </Menubar>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-4 text-sm text-center text-gray-light">
                  موردی برای نمایش وجود ندارد
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChequesSentToYou;
