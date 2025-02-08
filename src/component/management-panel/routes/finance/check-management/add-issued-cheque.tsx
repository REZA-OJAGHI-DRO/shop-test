import { Button } from "@/components/ui/button";
import {
  ChequeAddIssuedChequeRequestType,
  ChequeAddReceivedChequeRequestType,
} from "@/types/cheque-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
// @ts-ignore
import transition from "react-element-popper/animations/transition";
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
import { convertDate, formatThousands, unformatThousands } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { CalendarIcon, FileInput } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQuery } from "@tanstack/react-query";
import bankService from "@/services-v2/bank-service";
import InputFile from "@/components/ui/input-file";
import { fileValidation } from "@/lib/validations";
import { fileInputRestrictionsConstant } from "@/lib/constants";
import { toast } from "@/hooks/use-toast";
import fileService from "@/services-v2/file-service";
import chequeService from "@/services-v2/cheque-services";
import { FileTypeEnum } from "@/types/file-types";
import { RelationshipMemberTypeEnum } from "@/types/relationship-types";
import { useAuth } from "@/context/auth-context";
import Spinner from "@/components/ui/spinner";
import relationshipService from "@/services-v2/relationship-service";

const formSchema = z.object({
  cheque: z.object({
    id: z.string().optional(),
    amount: z.string().min(1, "لطفا مبلغ چک را وارد کنید"),
    bankId: z.string().min(1, "لطفا بانک را انتخاب کنید"),
    branchCode: z.string(),
    chequeImage: fileValidation(
      fileInputRestrictionsConstant.acceptedImages,
      fileInputRestrictionsConstant.imageTypeError,
      fileInputRestrictionsConstant.acceptedFileSize
    ).optional(),
    description: z.string().optional(),
    dueDate: z
      .instanceof(DateObject)
      .nullable()
      .refine((date) => date, {
        message: "لطفا تاریخ سررسید را انتخاب کنید",
      }),
    issuedDate: z.string(),
    ownerIban: z.string(),
    ownerName: z.string(),
    serialNo: z.string(),
    seriesNo: z.string(),
    receiverUserId: z.string().optional(),
  }),
});
type Props = {
  prevStep: () => void;
  chequeData:
    | ChequeAddReceivedChequeRequestType
    | ChequeAddIssuedChequeRequestType
    | undefined;
  userAccountNumber: string;
};

const AddIssuedCheque: FC<Props> = ({
  prevStep,
  chequeData,
  userAccountNumber,
}) => {
  const { userData } = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cheque: {},
    },
  });

  useEffect(() => {
    if (chequeData) {
      form.setValue("cheque", {
        ...chequeData,
        amount: "",
        chequeImage: undefined,
        dueDate: null,
        issuedDate: convertDate(chequeData.issuedDate, "persian"),
      });
    }
  }, [chequeData]);

  const bankQuery = useQuery({
    queryKey: ["bank-get-all"],
    queryFn: bankService.getAll,
  });

  const relationships = useQuery({
    queryKey: ["relationship-get-all"],
    queryFn: () =>
      relationshipService.getList({
        filter: {
          MemberUserId: userData?.userId || "",
          MemberType: RelationshipMemberTypeEnum.Supplier,
        },
        orderPropertyName: "",
        orderType: 1,
        pageIndex: 1,
        pageSize: 10000,
      }),
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

  const addIssuedChequeMutation = useMutation({
    mutationKey: ["cheque-add-issued"],
    mutationFn: chequeService.addIssuedCheque,
    onSuccess: (data) => {
      if (data.isSuccess) {
        toast({
          variant: "success",
          description: data.message || "چک با موفقیت ثبت شد",
        });
        prevStep();
      } else {
        toast({
          variant: "destructive",
          description:
            data.message || "مشکلی در ثبت اطلاعات چک به وجود آمده است",
        });
      }
    },
    onError: (error) =>
      toast({
        variant: "destructive",
        description: "مشکلی در ثبت چک به وجود آمده است",
      }),
  });

  const uploadImageMutation = useMutation({
    mutationKey: ["upload-image"],
    mutationFn: fileService.uploadFile,
    onSuccess: (data) => {
      if (data.isSuccess) {
        addCheque(data.data);
      } else {
        console.error(data.errors);
        toast({
          variant: "destructive",
          title: "اپلود عکس",
          description:
            data.message || Array.isArray(data.errors)
              ? data.errors[0]
              : data.errors,
        });
      }
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.cheque.chequeImage) {
      const imageUploadForm = new FormData();
      imageUploadForm.append("File", values.cheque.chequeImage);
      imageUploadForm.append("Type", FileTypeEnum.ChequeImage);
      uploadImageMutation.mutate(imageUploadForm);
    } else {
      addCheque();
    }
  }

  function addCheque(imageId?: string) {
    const cheque = form.getValues("cheque");
    let receiver = RelationshipMemberTypeEnum.Supplier;
    if (cheque.receiverUserId) {
      const type = relationshipsList?.find(
        (item) => item.value === cheque.receiverUserId
      )?.userType;
      if (type !== undefined) receiver = type;
    }
    addIssuedChequeMutation.mutate({
      ...cheque,
      amount: Number(cheque.amount),
      description: cheque.description || "",
      id: cheque.id || "",
      isDigital: false,
      dueDate: cheque.dueDate
        ? new Date(
            convertDate(new DateObject(cheque.dueDate), "gregorian")
          ).toISOString()
        : "",
      issuedDate: chequeData?.issuedDate ? chequeData.issuedDate : "",
      chequeImage: imageId || "",
      receiverUserId: cheque.receiverUserId || userData?.userId || "",
      receiverType: receiver,
      ownerBankAccountId: userAccountNumber,
    });
  }

  return (
    <div className="flex-1 p-5">
      <Form {...form}>
        <form className="h-full" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="p-6 bg-gray-50/50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
            <p className="mb-6">
              * لطفا اطلاعاتی که تکمیل نشده را وارد کنید سپس چک را ثبت کنید
            </p>

            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 text-gray-very-dark">
              <FormField
                control={form.control}
                name="cheque.amount"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>مبلغ چک :</FormLabel>
                    <FormControl>
                      <CustomInput
                        type="tel"
                        icon={<span>ریال</span>}
                        className="placeholder:text-end"
                        placeholder="مبلغ چک را وارد کنید"
                        value={formatThousands(field.value)}
                        onChange={(e) =>
                          field.onChange(
                            unformatThousands(e.target.value).toString()
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cheque.dueDate"
                render={({ field }) => (
                  <DatePicker
                    calendar={persian}
                    locale={persian_fa}
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                    format="YYYY-MM-DD"
                    animations={[transition({ duration: 400, from: 25 })]}
                    render={
                      <FormItem className="w-full">
                        <FormLabel>تاریخ سررسید :</FormLabel>
                        <FormControl>
                          <CustomInput
                            className="text-start"
                            type="text"
                            icon={<CalendarIcon className="size-5 text-gray" />}
                            placeholder="تاریخ سررسید چک را وارد کنید"
                            value={field.value?.format("YYYY-MM-DD")}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                )}
              />

              <FormField
                control={form.control}
                name="cheque.bankId"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel> بانک :</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={bankQuery.isLoading}
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              bankQuery.isLoading
                                ? "در حال دریافت اطلاعات ..."
                                : "بانک را انتخاب کنید"
                            }
                          />
                        </SelectTrigger>

                        <SelectContent>
                          {bankQuery.isLoading ? (
                            <SelectItem value="loading">
                              در حال دریافت اطلاعات ...
                            </SelectItem>
                          ) : (
                            bankQuery?.data?.data &&
                            bankQuery.data.data.map((item) => (
                              <SelectItem value={item.key}>
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

              <FormField
                control={form.control}
                name="cheque.receiverUserId"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel> پرداخت به :</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={relationships.isLoading}
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              relationships.isLoading
                                ? "در حال دریافت اطلاعات ..."
                                : "همکاری که چک به او پرداخت میشود را انتخاب کنید"
                            }
                          />
                        </SelectTrigger>

                        <SelectContent>
                          {relationshipsList &&
                            relationshipsList.map((item) => (
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
                name="cheque.branchCode"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>کد شعبه :</FormLabel>
                    <FormControl>
                      <CustomInput
                        disabled={!!chequeData?.branchCode}
                        type="tel"
                        className="placeholder:text-end"
                        placeholder="کد شعبه را وارد کنید"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cheque.ownerIban"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>شماره شبا صاحب چک :</FormLabel>
                    <FormControl>
                      <CustomInput
                        disabled={!!chequeData?.ownerIban}
                        type="tel"
                        className="placeholder:text-end"
                        placeholder="شماره شبا صاحب چک را وارد کنید"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cheque.ownerName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>نام صاحب چک :</FormLabel>
                    <FormControl>
                      <CustomInput
                        disabled={!!chequeData?.ownerName}
                        placeholder="نام صاحب چک را وارد کنید"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cheque.serialNo"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>شماره سریال :</FormLabel>
                    <FormControl>
                      <CustomInput
                        disabled={!!chequeData?.serialNo}
                        type="tel"
                        className="placeholder:text-end"
                        placeholder="شماره سریال را وارد کنید"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cheque.seriesNo"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>شماره سری :</FormLabel>
                    <FormControl>
                      <CustomInput
                        disabled={!!chequeData?.seriesNo}
                        type="tel"
                        className="placeholder:text-end"
                        placeholder="شماره سری را وارد کنید"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cheque.issuedDate"
                render={({ field }) => (
                  <DatePicker
                    calendar={persian}
                    locale={persian_fa}
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                    disabled={!!chequeData?.issuedDate}
                    format="YYYY-MM-DD"
                    animations={[transition({ duration: 400, from: 25 })]}
                    render={
                      <FormItem className="w-full">
                        <FormLabel>تاریخ صدور دسته چک:</FormLabel>
                        <FormControl>
                          <CustomInput
                            className="text-start"
                            disabled={!!chequeData?.issuedDate}
                            icon={<CalendarIcon className="size-5 text-gray" />}
                            type="text"
                            placeholder="تاریخ صدور چک را وارد کنید"
                            value={
                              chequeData?.issuedDate
                                ? convertDate(chequeData.issuedDate, "persian")
                                : field.value
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                )}
              />

              <FormField
                control={form.control}
                name="cheque.chequeImage"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>تصویر چک :</FormLabel>
                    <FormControl>
                      <InputFile
                        disabled={typeof field.value === "string"}
                        selectedFile={
                          typeof field.value === "string"
                            ? undefined
                            : field.value
                        }
                        setSelectedFile={field.onChange}
                        acceptedFiles={"image"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cheque.description"
                render={({ field }) => (
                  <FormItem className="w-full col-span-1 md:col-span-2">
                    <FormLabel>توضیحات :</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={!!chequeData?.description}
                        className="resize-none"
                        rows={3}
                        placeholder="توضیحات را وارد کنید"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex md:flex-row flex-col justify-center gap-5 mt-10">
              <Button
                type="button"
                className="md:min-w-[250px]"
                variant={"accent"}
                onClick={prevStep}
              >
                بازگشت
              </Button>
              <Button
                type="submit"
                className="md:min-w-[250px]"
                variant={"accent"}
                disabled={
                  uploadImageMutation.isPending ||
                  addIssuedChequeMutation.isPending
                }
              >
                {uploadImageMutation.isPending ||
                addIssuedChequeMutation.isPending ? (
                  <Spinner
                    text="در حال انجام عملیات ..."
                    textClassName="text-white"
                  />
                ) : (
                  "ثبت در دفتر دریافت"
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddIssuedCheque;
