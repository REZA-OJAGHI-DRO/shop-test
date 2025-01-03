export const fetchSupplierGet = async (
    id,
    token,
    chabk,
    setMessageData,
    setCheckData,
    setData,
    setCheckDataAll
) => {
    const url = `https://${chabk}/Profile/Supplier/Get`;
    const data = { id };

  
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json-patch+json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(response.status); 
        }
        
        const result = await response.json();
        if (result?.isSuccess) {
            setCheckData(false);
            setData(result.data);
            setCheckDataAll((r) => ({...r,check1: true}));
        } else {
            setCheckData(true);
            setMessageData((prevData) => [
                ...prevData,
                result.errors ? result.errors : result.message
            ]);
        }

        return result;
    } catch (error) {
        setCheckData(true);

        if (error instanceof TypeError && error.message === "Failed to fetch") {
            setMessageData((prevData) => [
                ...prevData, 
                'خطا در دریافت اطلاعات تامین کننده : به دلیل محدودیت‌های امنیتی، امکان دریافت اطلاعات از سرور وجود ندارد.'
            ]);
        } else if (!navigator.onLine) {
            setMessageData((prevData) => [
                ...prevData, 
                "مشکلی در ارتباط با سرور وجود دارد. لطفاً اتصال اینترنت خود را بررسی کنید."
            ]);
        } else {
            const errorMessages = {
                400: 'خطا در دریافت اطلاعات تامین کننده : درخواست نادرست است. لطفاً اطلاعات ورودی را بررسی کنید.',
                401: 'خطا در دریافت اطلاعات تامین کننده : برای دسترسی به این بخش باید وارد حساب کاربری خود شوید.',
                403: 'خطا در دریافت اطلاعات تامین کننده : شما اجازه دسترسی به این قسمت را ندارید.',
                404: 'خطا در دریافت اطلاعات تامین کننده : صفحه یا منبع مورد نظر پیدا نشد.',
                408: 'خطا در دریافت اطلاعات تامین کننده : زمان درخواست تمام شد. لطفاً دوباره امتحان کنید.',
                500: 'خطا در دریافت اطلاعات تامین کننده : مشکلی در سرور به وجود آمده است. لطفاً بعداً دوباره تلاش کنید.',
                502: 'خطا در دریافت اطلاعات تامین کننده : مشکلی در ارتباط با سرور پیش آمده است. لطفاً بعداً امتحان کنید .',
                503: 'خطا در دریافت اطلاعات تامین کننده : سرویس در حال حاضر در دسترس نیست. لطفاً بعداً دوباره تلاش کنید.',
                504: 'خطا در دریافت اطلاعات تامین کننده : زمان اتصال به سرور اصلی تمام شد.'
            };
            
            const message = errorMessages[Number(error.message)] || 'خطا در دریافت اطلاعات تامین کننده : خطای ناشناخته‌ای رخ داده است.';
            setMessageData((prevData) => [...prevData, message]);
        }
    }
};


export const profileSupplierUpdate = async ({ updatedData, token, chabk }) => {
    const url = `https://${chabk}/Profile/Supplier/Update`;
  
    try {
      // ارسال درخواست به سرور
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json-patch+json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedData)
      });
  
      // بررسی وضعیت پاسخ
      if (!response.ok) {
        const errorData = await response.json();
        const error = new Error(errorData.message || "خطای ناشناخته");
        error.status = response.status;
        throw error;
      }
  
      // دریافت نتیجه از پاسخ سرور
      return response.json(); 
  
    } catch (error) {
      if (error instanceof Error) {
        // در صورتی که مشکل ارتباطی با سرور باشد
        if (error.message.includes("Failed to fetch")) {
          throw new Error("مشکلی در ارتباط با سرور وجود دارد. لطفاً دوباره تلاش کنید.");
        }
  
        // در صورتی که کاربر به اینترنت متصل نباشد
        if (!navigator.onLine) {
          throw new Error("مشکلی در ارتباط با سرور وجود دارد. لطفاً اتصال اینترنت خود را بررسی کنید.");
        }
  
        // پردازش خطاهای مختلف HTTP
        switch (error.status) {
          case 400:
            throw new Error("درخواست نادرست است. لطفاً اطلاعات ورودی را بررسی کنید.");
          case 401:
            throw new Error("برای دسترسی به این بخش باید وارد حساب کاربری خود شوید.");
          case 403:
            throw new Error("شما اجازه دسترسی به این قسمت را ندارید.");
          case 404:
            throw new Error("صفحه یا منبع مورد نظر پیدا نشد.");
          case 408:
            throw new Error("زمان درخواست تمام شد. لطفاً دوباره امتحان کنید.");
          case 500:
            throw new Error("مشکلی در سرور به وجود آمده است. لطفاً دوباره تلاش کنید.");
          case 502:
            throw new Error("مشکلی در ارتباط با سرور پیش آمده است. لطفاً دوباره تلاش کنید.");
          case 503:
            throw new Error("سرویس در حال حاضر در دسترس نیست. لطفاً دوباره تلاش کنید.");
          case 504:
            throw new Error("زمان اتصال به سرور اصلی تمام شد.");
          default:
            throw new Error("خطای ناشناخته‌ای رخ داده است.");
        }
      }
      // در صورتی که خطای ناشناخته‌ای رخ دهد
      throw new Error("خطای ناشناخته‌ای رخ داده است.");
    }
  };
  

