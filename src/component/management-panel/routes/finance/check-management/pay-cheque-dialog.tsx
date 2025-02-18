"use client";

import { useState } from "react";
import {
  CustomDialog,
  CustomDialogContent,
  CustomDialogHeader,
  CustomDialogTitle,
  CustomDialogTrigger,
} from "@/components/ui/custom-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import chequeService from "@/services-v2/cheque-services";
import relationshipService from "@/services-v2/relationship-service";
import { useAuth } from "@/context/auth-context";
import { RelationshipMemberTypeEnum } from "@/types/relationship-types";

const formSchema = z.object({
  colleague: z.string().min(1, "لطفا همکار را انتخاب کنید"),
});

type Props = {
  onSubmit: () => void;
  chequeId: string;
  children: React.ReactNode;
};

const PayChequeDialog: React.FC<Props> = ({
  children,
  chequeId,
  onSubmit: onSubmitComplete,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      colleague: "",
    },
  });
  const [open, setOpen] = useState(false);
  const { userData } = useAuth();

  const payChequeMutation = useMutation({
    mutationKey: ["cheque-pay"],
    mutationFn: chequeService.payCheque,
  });

  const relationships = useQuery({
    queryKey: ["relationships-get-all"],
    queryFn: () =>
      relationshipService.getList({
        filter: {
          MemberUserId: userData?.userId || "",
          MemberType: RelationshipMemberTypeEnum.Supplier,
        },
        orderType: 1,
        pageIndex: 1,
        pageSize: 10000,
        orderPropertyName: "",
      }),
    enabled: open,
  });

  const relationshipsList = relationships.data?.data?.data?.map((item) => {
    const isAcceptor = item.acceptorId === userData?.userId;

    return {
      value: isAcceptor
        ? item.requesterId || userData?.userId || ""
        : item.acceptorId || userData?.userId || "",
      label: isAcceptor ? item.requesterName : item.acceptorName,
      userType: isAcceptor ? item.requesterType : item.acceptorType,
    };
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    let receiverType = RelationshipMemberTypeEnum.Supplier;
    const type = relationshipsList?.find(
      (item) => item.value === values.colleague
    )?.userType;
    if (type !== undefined) receiverType = type;

    payChequeMutation.mutate({
      id: chequeId,
      receiverUserId: values.colleague,
      receivertype: receiverType,
    });
    form.reset();
  }

  return (
    <CustomDialog open={open} onOpenChange={setOpen}>
      <CustomDialogTrigger asChild>{children}</CustomDialogTrigger>
      <CustomDialogContent className="gap-0 bg-[#EEEEEE]">
        <CustomDialogHeader>
          <CustomDialogTitle
            className="border-gray-very-dark/15 text-base text-gray-very-dark"
            closeClassName="text-destructive"
          >
            خرج چک
          </CustomDialogTitle>
        </CustomDialogHeader>

        <div className="p-4  text-center">
          <Form {...form}>
            <form className="w-full text-gray-very-dark text-start space-y-5 max-w-[300px] mx-auto">
              <FormField
                control={form.control}
                name="colleague"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel> همکار :</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={relationships.isLoading}
                      >
                        <SelectTrigger className="data-[state=open]:!z-[65] data-[state=closed]:z[50]">
                          <SelectValue
                            placeholder={
                              relationships.isLoading
                                ? "در حال دریافت اطلاعات ..."
                                : "همکار را انتخاب کنید"
                            }
                          />
                        </SelectTrigger>

                        <SelectContent className="data-[state=open]:!z-[60]">
                          {relationships.isLoading ? (
                            <SelectItem value="loading">
                              در حال دریافت اطلاعات ...
                            </SelectItem>
                          ) : (
                            relationshipsList &&
                            relationshipsList.map((item) => (
                              <SelectItem value={item.value} key={item.value}>
                                {item.label}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                onClick={form.handleSubmit(onSubmit)}
                className="w-full !mt-10"
                variant="accent"
                disabled={payChequeMutation.isPending}
              >
                {payChequeMutation.isPending ? (
                  <Spinner
                    className="size-4"
                    text="در حال انجام عملیات ..."
                    textClassName="text-white"
                  />
                ) : (
                  "خرج چک"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </CustomDialogContent>
    </CustomDialog>
  );
};

export default PayChequeDialog;
