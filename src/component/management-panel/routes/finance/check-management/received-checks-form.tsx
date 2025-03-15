import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CustomInput } from "@/components/ui/custom-input";
import { z } from "zod";
import { checkTypeArrayConstant } from "@/lib/constants";
import {
  checkSayadIdValidation,
  nationCodeValidation,
} from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import chequeService from "@/services-v2/cheque-services";
import { RelationshipMemberTypeEnum } from "@/types/relationship-types";
import Spinner from "@/components/ui/spinner";
import {
  ChequeAddIssuedChequeRequestType,
  ChequeAddReceivedChequeRequestType,
} from "@/types/cheque-types";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  chequeSayadId: checkSayadIdValidation(),
  ownerNationCode: nationCodeValidation("لطفا کد ملی صاحب چک را وارد کنید"),
  checkType: z.string().min(1, "لطفا نوع چک را انتخاب کنید"),
});

type Props = {
  onSubmit: () => void;
  setChequeData: React.Dispatch<
    React.SetStateAction<
      | ChequeAddReceivedChequeRequestType
      | ChequeAddIssuedChequeRequestType
      | undefined
    >
  >;
};

const ReceivedChecksForm: FC<Props> = ({
  onSubmit: onSubmitComplete,
  setChequeData,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      chequeSayadId: "",
      ownerNationCode: "",
      checkType: "",
    },
  });

  const inqueryCheckMutation = useMutation({
    mutationKey: ["inquery-check"],
    mutationFn: chequeService.inquiryForAddReceivedCheque,
    onSuccess: (data) => {
      if (data.isSuccess) {
        setChequeData(data.data.cheque);
        toast({
          variant: "success",
          description: data.message || "دریافت اطلاعات چک با موفقیت انجام شد",
        });
        onSubmitComplete();
      } else {
        toast({
          variant: "destructive",
          description:
            data?.message || "مشکلی در دریافت اطلاعات چک به وجود آمده است",
        });
      }
    },
    onError: (error) =>
      toast({
        variant: "destructive",
        description: "مشکلی در دریافت اطلاعات چک به وجود آمده است",
      }),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    inqueryCheckMutation.mutate({
      isGuarantee: values.checkType === "1",
      ownerNationalId: values.ownerNationCode,
      userType: RelationshipMemberTypeEnum.Supplier,
      sayadId: values.chequeSayadId,
    });
  }

  return (
    <Form {...form}>
      <form className="h-full" onSubmit={form.handleSubmit(onSubmit)} dir="rtl">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
          <FormField
            control={form.control}
            name="chequeSayadId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="flex gap-1">
                  <span>شناسه صیاد : </span>
                </FormLabel>
                <FormControl>
                  <CustomInput
                    maxLength={16}
                    type="tel"
                    className="placeholder:text-end"
                    placeholder="شناسه صیاد چک را وارد کنید"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ownerNationCode"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="flex gap-1">
                  <span>کد ملی صاحب چک : </span>
                </FormLabel>
                <FormControl>
                  <CustomInput
                    maxLength={10}
                    className="placeholder:text-end"
                    type="tel"
                    placeholder="کد ملی صاحب چک را وارد کنید"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="checkType"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>نوع چک : </FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="!mt-3">
                        <SelectValue
                          className="text-base"
                          placeholder="لطفا نوع چک را انتخاب کنید"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {checkTypeArrayConstant.map((item) => (
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
        </div>

        <div className="flex justify-center mt-10">
          <Button
            type="submit"
            className="min-w-[150px] "
            variant={"accent"}
            disabled={inqueryCheckMutation.isPending}
          >
            {inqueryCheckMutation.isPending ? (
              <Spinner
                className="size-4"
                text="در حال انجام عملیات ..."
                textClassName="text-white"
              />
            ) : (
              "استعلام و ثبت"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ReceivedChecksForm;
