export const fetchShopperGet = async (
    id,
    token,
    chabk,
    setMessageData,
    setCheckData,
    setData,
    setCheckDataAll
) => {
    const url = `https://${chabk}/Profile/Shopper/Get`;
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
                'خطا در دریافت اطلاعات خریداران : شما اجازه دسترسی به این قسمت را ندارید.'
            ]);
        } else if (!navigator.onLine) {
            setMessageData((prevData) => [
                ...prevData, 
                "مشکلی در ارتباط با سرور وجود دارد. لطفاً اتصال اینترنت خود را بررسی کنید."
            ]);
        } else {
            const errorMessages = {
                400: 'خطا در دریافت اطلاعات خریداران : درخواست نادرست است. لطفاً اطلاعات ورودی را بررسی کنید.',
                401: 'خطا در دریافت اطلاعات خریداران : برای دسترسی به این بخش باید وارد حساب کاربری خود شوید.',
                403: 'خطا در دریافت اطلاعات خریداران : شما اجازه دسترسی به این قسمت را ندارید.',
                404: 'خطا در دریافت اطلاعات خریداران : صفحه یا منبع مورد نظر پیدا نشد.',
                408: 'خطا در دریافت اطلاعات خریداران : زمان درخواست تمام شد. لطفاً دوباره امتحان کنید.',
                500: 'خطا در دریافت اطلاعات خریداران : مشکلی در سرور به وجود آمده است. لطفاً بعداً دوباره تلاش کنید.',
                502: 'خطا در دریافت اطلاعات خریداران : مشکلی در ارتباط با سرور پیش آمده است. لطفاً بعداً امتحان کنید .',
                503: 'خطا در دریافت اطلاعات خریداران : سرویس در حال حاضر در دسترس نیست. لطفاً بعداً دوباره تلاش کنید.',
                504: 'خطا در دریافت اطلاعات خریداران : زمان اتصال به سرور اصلی تمام شد.'
            };
            
            const message = errorMessages[Number(error.message)] || 'خطا در دریافت اطلاعات خریداران : خطای ناشناخته‌ای رخ داده است.';
            setMessageData((prevData) => [...prevData, message]);
        }
    }

};








export const profileShopperUpdate = async ({ updatedData, token, chabk }) => {
    const url = `https://${chabk}/Profile/Shopper/Update`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json-patch+json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updatedData)
        });

        // بررسی وضعیت پاسخ سرور
        if (!response.ok) {
            const errorData = await response.json();
            const error = new Error(errorData.message || "خطای ناشناخته");
            error.status = response.status;
            throw error;
        }

        return response.json(); 

    } catch (error) {
        if (error instanceof Error) {
            // اگر مشکلی در ارتباط با سرور بود
            if (error.message.includes("Failed to fetch")) {
                throw new Error("مشکلی در ارتباط با سرور وجود دارد. لطفاً دوباره تلاش کنید.");
            }
            // اگر کاربر به اینترنت متصل نباشد
            if (!navigator.onLine) {
                throw new Error("مشکلی در ارتباط با سرور وجود دارد. لطفاً اتصال اینترنت خود را بررسی کنید.");
            }

            // پردازش خطاهای مختلف سرور
            switch (error.status) {
                case 400:
                    throw new Error("درخواست نادرست است. لطفاً اطلاعات ورودی را بررسی کنید.");
                case 401:
                    throw new Error("برای دسترسی به این بخش باید وارد حساب کاربری خود شوید.");
                case 403:
                    throw new Error("شما اجازه دسترسی به این قسمت را ندارید.");
                case 404:
                    throw new Error("صفحه یا منبع مورد نظر پیدا نشد.");
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
        throw new Error("خطای ناشناخته‌ای رخ داده است.");
    }
};
