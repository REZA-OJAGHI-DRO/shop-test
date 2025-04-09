"use client";

import { useState } from "react";
import {
  CustomDialog,
  CustomDialogContent,
  CustomDialogDescription,
  CustomDialogFooter,
  CustomDialogHeader,
  CustomDialogTitle,
  CustomDialogTrigger,
} from "@/components/ui/custom-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import bankService from "@/services-v2/bank-service";
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
import { CustomInput } from "@/components/ui/custom-input";
import { Button } from "@/components/ui/button";
import { bankAccountTypeArrayConstant } from "@/lib/constants";
import bankAccountService from "@/services-v2/bank-account-service";
import Spinner from "@/components/ui/spinner";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  bank: z.string().min(1, "لطفا بانک را انتخاب کنید"),
  accountType: z.string().min(1, "لطفا نوع حساب را انتخاب کنید"),
  accountNumber: z.string().min(1, "لطفا شماره حساب را وارد کنید"),
});

type Props = {
  onSubmit: () => void;
  children: React.ReactNode;
};

const AddAccountDialog: React.FC<Props> = ({
  children,
  onSubmit: onSubmitComplete,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bank: "",
      accountType: "",
      accountNumber: "",
    },
  });
  const [open, setOpen] = useState(false);

  const bankAccountMutation = useMutation({
    mutationKey: ["bank-account-create"],
    mutationFn: bankAccountService.create,
  });

  const bankQuery = useQuery({
    queryKey: ["bank-get-all"],
    queryFn: bankService.getAll,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(JSON.stringify(values));
    bankAccountMutation.mutate(
      {
        accountNumber: values.accountNumber,
        bankId: values.bank,
        type: Number(values.accountType),
      },
      {
        onSuccess: (data) => {
          if (data.isSuccess) {
            toast({
              variant: "success",
              description: data.message,
            });
            setOpen(false);
            form.reset();
            onSubmitComplete();
          } else {
            toast({
              variant: "destructive",
              description: data.message,
            });
          }
        },
      }
    );
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
            افزودن شماره حساب
          </CustomDialogTitle>
        </CustomDialogHeader>

        <div className="p-4  text-center">
          <Form {...form}>
            <form className="w-full text-gray-very-dark text-start space-y-5 max-w-[300px] mx-auto">
              <FormField
                control={form.control}
                name="accountNumber"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>شماره حساب :</FormLabel>
                    <FormControl>
                      <CustomInput
                        type="tel"
                        className="placeholder:text-end"
                        placeholder="شماره حساب را وارد کنید"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="accountType"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel> نوع حساب :</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={"لطفا نوع حساب را انتخاب کنید"}
                          />
                        </SelectTrigger>
                        <SelectContent className="z-[60]">
                          {bankAccountTypeArrayConstant.map((item) => (
                            <SelectItem value={item.value} key={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bank"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel> بانک :</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={bankQuery.isLoading}
                      >
                        <SelectTrigger className="!data-[state=open]:z-[65]">
                          <SelectValue
                            placeholder={
                              bankQuery.isLoading
                                ? "در حال دریافت اطلاعات ..."
                                : "بانک را انتخاب کنید"
                            }
                          />
                        </SelectTrigger>

                        <SelectContent className="z-[60]">
                          {bankQuery.isLoading ? (
                            <SelectItem value="loading">
                              در حال دریافت اطلاعات ...
                            </SelectItem>
                          ) : (
                            bankQuery?.data?.data &&
                            bankQuery.data.data.map((item) => (
                              <SelectItem value={item.key} key={item.key}>
                                {item.value}
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
                disabled={bankAccountMutation.isPending}
              >
                {bankAccountMutation.isPending ? (
                  <Spinner
                    text="در حال انجام عملیات ..."
                    textClassName="text-white"
                  />
                ) : (
                  " افزودن شماره حساب"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </CustomDialogContent>
    </CustomDialog>
  );
};

export default AddAccountDialog;
