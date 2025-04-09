import jalaali from 'jalaali-js';
import moment from 'moment-timezone';

// تبدیل تاریخ میلادی به شمسی
export function convertToJalali(dateString) {
    // چک کردن اگر تاریخ به صورت 0001-01-01 ارسال شده است
    if (dateString === '0001-01-01T00:00:00' || !dateString) {
        return ''; // برگرداندن مقدار خالی
    }

    // تبدیل تاریخ ورودی به زمان محلی ایران
    const localDate = moment.tz(dateString, "Asia/Tehran");

    // استخراج سال، ماه و روز میلادی از تاریخ
    const year = localDate.year();
    const month = localDate.month() + 1; // ماه‌ها در moment از 0 شروع می‌شوند
    const day = localDate.date();

    // تبدیل تاریخ میلادی به تاریخ شمسی
    const jalaliDate = jalaali.toJalaali(year, month, day);

    // ساختن رشته تاریخ شمسی به همراه ساعت
    const formattedJalaliDate = `${jalaliDate.jy}/${jalaliDate.jm}/${jalaliDate.jd} ${localDate.format('HH:mm:ss')}`;

    return formattedJalaliDate;
}


 export function sendDateToBackend(jalaliDate) {
    const [jalaliYear, jalaliMonth, jalaliDay] = jalaliDate.split('/').map(Number);
  
    // تعداد روزهای ماه‌های جلالی
    const daysInJalaliMonth = [31, 31, 31, 30, 30, 30, 31, 31, 30, 30, 30, 29];
  
    // تعداد سال‌های جلالی در دوره 33 ساله
    const jalaliBaseYear = 622;
    
    let dayCount = 0;
  
    // محاسبه روزهای سال‌های کامل جلالی
    dayCount += (jalaliYear - 1) * 365 + Math.floor((jalaliYear - 1) / 33) * 8 + Math.floor((jalaliYear - 1) % 33 / 4);
  
    // محاسبه روزهای ماه‌های قبل از ماه جاری در سال جلالی
    for (let i = 0; i < jalaliMonth - 1; i++) {
      dayCount += daysInJalaliMonth[i];
    }
  
    // اضافه کردن روزهای ماه جاری
    dayCount += jalaliDay;
  
    // محاسبه تاریخ میلادی
    const gregorianYear = jalaliBaseYear + Math.floor((dayCount - 1) / 365.2422);
    const daysInGregorianYear = Math.floor((gregorianYear - 0) * 365.2422);
    const dayOfYear = dayCount - daysInGregorianYear;
  
    // محاسبه ماه و روز میلادی
    const gregorianMonth = getGregorianMonthAndDay(dayOfYear).month;
    const gregorianDay = getGregorianMonthAndDay(dayOfYear).day;
  
    // ساختار زمان میلادی به فرمت YYYY-MM-DDTHH:mm:ss.SSSZ
    const gregorianDate = new Date(gregorianYear, gregorianMonth - 1, gregorianDay);
    const isoString = gregorianDate.toISOString(); // فرمت استاندارد ISO 8601
    return isoString; // به صورت "2024-11-28T00:00:00.000Z"
  }
  
  // تابع برای محاسبه ماه و روز میلادی از تعداد روزهای سال
  function getGregorianMonthAndDay(dayOfYear) {
    const gregorianMonthLengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let month = 0;
    let day = dayOfYear;
  
    while (day > gregorianMonthLengths[month]) {
      day -= gregorianMonthLengths[month];
      month++;
    }
  
    return { month: month + 1, day: day };
  }
  

 export const updateArrayError = (index , value , setRequired) => {
    setRequired((prevErrors) => {
      const newErrors = [...prevErrors];
      newErrors[index] = value;
      return newErrors;
    });
  };

// برابری دو ارایه
export const areArraysEqual = (arr1, arr2) => {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) return false;
  if (arr1.length !== arr2.length) return false;

  // مرتب‌سازی و سپس مقایسه
  const sortedArr1 = [...arr1].sort();
  const sortedArr2 = [...arr2].sort();

  return sortedArr1.every((value, index) => value === sortedArr2[index]);
};





  




