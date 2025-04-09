import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import gregorian from "react-date-object/calendars/gregorian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian_en from "react-date-object/locales/gregorian_en";
// import * as XLSX from "xlsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatThousands(n: any, mark = ","): string {
  if (!n || n.length === 0) return "";
  if (n === "-") return "-";
  let marker = mark;
  let number = n;
  number = Math.floor(Number(n));
  if (!marker || marker.length === 0) marker = ",";
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, marker);
}

export function unformatThousands(n: string): number {
  if (!n || n.length === 0) return 0;
  if (n === "-") return 0;
  return parseFloat(n.replace(/\D/g, ""));
}

export function convertDate(
  date: string | DateObject | null | undefined,
  convertTo: "persian" | "gregorian",
  format?: string
): string {
  if (!date) return "";

  let convertedDate: DateObject;

  if (typeof date === "string") {
    convertedDate = new DateObject(date);
  } else {
    convertedDate = date;
  }

  if (convertTo === "persian") {
    convertedDate.convert(persian, persian_fa);
  } else {
    convertedDate.convert(gregorian, gregorian_en);
  }

  return convertedDate.format(format || "YYYY-MM-DD");
}

export function convertPersianToEnglish(input: string): string {
  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return input.replace(/[۰-۹]/g, (match) =>
    persianNumbers.indexOf(match).toString()
  );
}

export const downloadExcel = (data: any, file_name?: string) => {
  if (!file_name) file_name = "DataSheet";
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
  //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
  XLSX.writeFile(workbook, `${file_name}.xlsx`);
};
