export const pirceUnitConstant = "ریال";
export const checkTypeArrayConstant = [
  { label: "عادی", value: "0" },
  { label: "تضمین", value: "1" },
];

export const bankAccountTypeArrayConstant = [
  { label: "حساب جاری", value: "0" },
  { label: "حساب قرض الحسنه", value: "1" },
];

export const chequeSayadStatusArrayConstant = [
  { label: "صادر نشده", value: "0" },
  { label: "ثبت نشد", value: "1" },
  { label: "در انتظار تایید", value: "2" },
  { label: "ثبت شده", value: "3" },
  { label: "استعلام نشده", value: "4" },
  { label: "در سامانه صیاد وجود ندارد", value: "5" },
  { label: "استعلام شده", value: "6" },
];

export const chequeReceiverAcceptanceStatusArrayConstant = [
  { label: "پذیرش شده", value: "0" },
  { label: "رد شده", value: "1" },
  { label: "پرداخت نشده", value: "2" },
  { label: "منتظر پذیرش", value: "3" },
  { label: "پذیرش خودکار", value: "4" },
];

export const chequeCashedStatusArrayConstant = [
  { label: "نقد شده", value: "0" },
  { label: "برگشت خورده", value: "1" },
  { label: "بخشی برگشت خورده", value: "2" },
  { label: "باطل شده", value: "3" },
  { label: "استعلام نشده", value: "4" },
  { label: "سررسید نشده", value: "5" },
  { label: "سررسید شده بانک برده نشده", value: "6" },
];

export const shoppingCartStatusArrayConstant = [
  {
    value: 1,
    label: "در صف انتظار",
    color: "#A4A4A9",
  },
  {
    value: 2,
    label: "در انتظار بررسی",
    color: "#A4A4A9",
  },
  {
    value: 3,
    label: "در حال بررسی",
    color: "#A4A4A9",
  },
  {
    value: 4,
    label: "تغییر کرده توسط تامین کننده",
    color: "#D35341",
  },
  {
    value: 5,
    label: "رد شده توسط تامین کننده",
    color: "#D35341",
  },
  {
    value: 6,
    label: "رد شده توسط خریدار",
    color: "#D35341",
  },
  {
    value: 7,
    label: "تایید شده توسط تامین کننده",
    color: "#107E18",
  },
  {
    value: 8,
    label: "حذف شده توسط خریدار",
    color: "#D35341",
  },
  {
    value: 9,
    label: "ارسال برای تامین اعتبار توسط خریدار",
    color: "#107E18",
  },
  {
    value: 10,
    label: "ارسال برای تامین اعتبار توسط تامین کننده",
    color: "#107E18",
  },
  {
    value: 11,
    label: "تایید مدارک تامین اعتبار توسط تامین کننده",
    color: "#107E18",
  },
  {
    value: 12,
    label: "رد مدارک تامین اعتبار توسط تامین کننده",
    color: "#D35341",
  },
  {
    value: 12,
    label: "رد درخواست توسط خریدار",
    color: "#D35341",
  },
];

export const chequeReceivedChequeStatusArrayConstant = [
  "در صندوق خزانه",
  "وصول شده",
  "واگذار شده به بانک",
  "برگشت خورده",
  "خرج شده ی عودت داده شده",
  "تضمین",
  "عودت تضمین",
];

export const chequeIssuedChequeStatusArrayConstant = [
  "صادر شده",
  "برگشت خورده",
  "تضمین",
  "عودت تضمین",
];

export const supplierTypesArrayConstant = [
  { label: "وارد کننده", value: "0" },
  { label: "تولید کننده", value: "1" },
  { label: "پخش کننده", value: "2" },
];

export const supplierTypesObjectConstant = {
  importer: { label: "وارد کننده", value: "0" },
  producer: { label: "تولید کننده", value: "1" },
  spreader: { label: "پخش کننده", value: "2" },
};

export const paymentTypesArrayConstant = [
  { label: "نقدی", value: "0" },
  { label: "غیر نقدی", value: "1" },
];

export const paymentTypesObjectConstant = {
  cash: { label: "نقدی", value: "0" },
  nonCash: { label: "غیر نقدی", value: "1" },
};

export const relationshipStatusArrayConstant = [
  { value: 0, label: "منتظر پذیرش", colorClass: "" },
  { value: 1, label: "پذیرش شده", colorClass: "accent" },
  { value: 2, label: "دعوت شده به سیستم", colorClass: "" },
  { value: 3, label: "رد شده", colorClass: "destructive" },
];

export const fileInputRestrictionsConstant = {
  acceptedImages: [
    ".png",
    ".jpeg",
    ".jpg",
    ".jpe",
    ".gif",
    "image/png",
    "image/jpeg",
    "image/jpe",
    "image/gif",
  ],
  imageTypeError:
    "لطفا یک عکس با یکی از فرمت های .png , .jpeg , .jpg , .jpe , .gif انتخاب کنید",
  acceptedVideos: [
    ".mkv",
    ".mp4",
    ".mov",
    ".ogg",
    ".avi",
    ".3gp",
    "video/x-matroska", // .mkv
    "video/mp4", // .mp4
    "video/quicktime", // .mov
    "video/ogg", // .ogg
    "video/x-msvideo", // .avi
    "video/avi",
    "video/3gpp", // .3gp
  ],
  videoTypeError:
    "لطفا یک ویدئو با یکی از فرمت های .mkv , .mp4 , .mov , .ogg , .avi , .3gp انتخاب کنید",
  acceptedeExcels: [
    ".xls",
    ".xlsx",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ],
  acceptedFileSize: 20 * 1024 * 1024,
};
