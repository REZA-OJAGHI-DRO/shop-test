import { z } from "zod";

export const checkSayadIdValidation = (
  requiredErrorMessage?: string
): z.ZodString =>
  z
    .string()
    .min(1, requiredErrorMessage || "لطفا شناسه صیاد چک را وارد کنید")
    .length(16, "شناسه صیاد چک باید 16 رقمی باشد")
    .regex(/^\d+$/, "شناسه صیاد چک باید فقط شامل اعداد باشد");

export const nameValidation = (requiredErrorMessage?: string): z.ZodString =>
  z
    .string()
    .min(1, requiredErrorMessage || "لطفا نام و نام خانوادگی را وارد کنید")
    .min(2, "نام و نام خانوادگی باید حداقل 2 کارکتر باشد")
    .max(50, "نام و نام خانوادگی حداکثر میتواند 50 کارکتر باشد");

export const telephoneValidation = (
  requiredErrorMessage?: string
): z.ZodString =>
  z
    .string()
    .min(1, requiredErrorMessage || "لطفا شماره تلفن را وارد کنید")
    .regex(/^\d+$/, "شماره تلفن باید فقط شامل اعداد باشد");

export const nationCodeValidation = (
  requiredErrorMessage?: string
): z.ZodString =>
  z
    .string()
    .min(1, requiredErrorMessage || "لطفا کد ملی را وارد کنید")
    .length(10, "کد ملی باید 10 رقمی باشد")
    .regex(/^\d+$/, "کد ملی باید فقط شامل عدد باشد");

export const phonenumberValidation = (requiredErrorMessage?: string) =>
  z
    .string()
    .min(1, requiredErrorMessage || "لطفا تلفن همراه را وارد کنید")
    .length(11, "تلفن همراه باید 11 رقمی باشد")
    .startsWith("09", "تلفن همراه باید به صورت 09123456789 وارد شود")
    .regex(/^\d+$/, "تلفن همراه باید فقط شامل عدد باشد");

export const provinceValidation = (requiredErrorMessage?: string) =>
  z.string().min(1, requiredErrorMessage || "لطفا استان را انتخاب کنید");

export const cityValidation = (requiredErrorMessage?: string) =>
  z.string().min(1, requiredErrorMessage || "لطفا شهر را انتخاب کنید");

export const postalCodeValidation = (requiredErrorMessage?: string) =>
  z
    .string()
    .min(1, requiredErrorMessage || "لطفا کدپستی را وارد کنید")
    .regex(/^\d+$/, "کدپستی باید فقط شامل عدد باشد");

export const shopperAreaValidation = (requiredErrorMessage?: string) =>
  z
    .string()
    .min(1, requiredErrorMessage || "لطفا متراژ محل کسب را وارد کنید")
    .regex(/^\d+$/, "متراژ محل کسب باید فقط شامل عدد باشد");
export const fileValidation = (
  acceptedTypes: string[],
  typeError: string,
  sizeLimitInMB: number
) =>
  z
    .instanceof(File)
    .refine((file) => acceptedTypes.includes(file.type), { message: typeError })
    .refine((file) => file.size <= sizeLimitInMB, {
      message: `حجم فایل انتخابی نباید بیشتر از ${sizeLimitInMB}مگابایت باشد `,
    });
