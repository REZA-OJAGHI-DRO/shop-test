
export const fetchPackageTypeGetAll = async (
    token,
    chabk,
    setMessageData,
    setCheckData,
    data = {}
) => {
    const url = `https://${chabk}/Product/PackageType/GetAll`;

    try {
        return fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json-patch+json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.status); 
                }
                return response.json(); 
            })
            .then(result => {
                return result;
            })
            .catch((error) => {
                setCheckData(true);
                if (error instanceof TypeError && error.message === "Failed to fetch") {
                    setMessageData((prevData) => [
                        ...prevData, 
                        'خطا در دریافت نوع بسته بندی کالا : شما اجازه دسترسی به این قسمت را ندارید.'
                    ]);
                } else if (!navigator.onLine) {
                    setMessageData((prevData) => [
                        ...prevData, 
                        "مشکلی در ارتباط با سرور وجود دارد. لطفاً اتصال اینترنت خود را بررسی کنید."
                    ]);
                } else {
                    const errorMessages = {
                        400: 'خطا در دریافت نوع بسته بندی کالا : درخواست نادرست است. لطفاً اطلاعات ورودی را بررسی کنید.',
                        401: 'خطا در دریافت نوع بسته بندی کالا : برای دسترسی به این بخش باید وارد حساب کاربری خود شوید.',
                        403: 'خطا در دریافت نوع بسته بندی کالا : شما اجازه دسترسی به این قسمت را ندارید.',
                        404: 'خطا در دریافت نوع بسته بندی کالا : صفحه یا منبع مورد نظر پیدا نشد.',
                        408: 'خطا در دریافت نوع بسته بندی کالا : زمان درخواست تمام شد. لطفاً دوباره امتحان کنید.',
                        500: 'خطا در دریافت نوع بسته بندی کالا : مشکلی در سرور به وجود آمده است. لطفاً بعداً دوباره تلاش کنید.',
                        502: 'خطا در دریافت نوع بسته بندی کالا : مشکلی در ارتباط با سرور پیش آمده است. لطفاً بعداً امتحان کنید .',
                        503: 'خطا در دریافت نوع بسته بندی کالا : سرویس در حال حاضر در دسترس نیست. لطفاً بعداً دوباره تلاش کنید.',
                        504: 'خطا در دریافت نوع بسته بندی کالا : زمان اتصال به سرور اصلی تمام شد.'
                    };
                    
                    const message = errorMessages[Number(error.message)] || 'خطا در دریافت نوع بسته بندی کالا : خطای ناشناخته‌ای رخ داده است.';
                    setMessageData((prevData) => [...prevData, message]);
                }
            });
    } catch (e) {
        setCheckData(true)
        setMessageData((prevData) => [...prevData,"خطا در دریافت نوع بسته بندی کالا : مشکلی در ارسال درخواست به وجود آمده است. لطفاً دوباره تلاش کنید."]);
    }
};