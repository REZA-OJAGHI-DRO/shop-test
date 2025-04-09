export const UploadIceCertificate = async ({ updatedDataAll: { data, token, chabk, setMessage } }) => {
    const url = `https://${chabk}/Profile/Shopper/UploadIceCertificate`;
  

  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        const error = new Error(errorData.message || "خطای ناشناخته");
        error.status = response.status;
        throw error;
      }
  
      return response.json(); 
    } catch (error) {
        if (error instanceof Error) {
            if (error.message.includes("Failed to fetch")) {
                setMessage("مشکلی در ارتباط با سرور وجود دارد. لطفاً دوباره تلاش کنید.");
            } else if (!navigator.onLine) {
                setMessage("مشکلی در ارتباط با سرور وجود دارد. لطفاً اتصال اینترنت خود را بررسی کنید.");
            } else {
              switch (error.status) {
                case 400:
                    setMessage("درخواست نادرست است. لطفاً اطلاعات ورودی را بررسی کنید.");
                  break;
                case 401:
                    setMessage("برای دسترسی به این بخش باید وارد حساب کاربری خود شوید.");
                  break;
                case 403:
                    setMessage("شما اجازه دسترسی به این قسمت را ندارید.");
                  break;
                case 404:
                    setMessage("صفحه یا منبع مورد نظر پیدا نشد.");
                  break;
                case 500:
                    setMessage("مشکلی در سرور به وجود آمده است. لطفاً دوباره تلاش کنید.");
                  break;
                case 502:
                    setMessage("مشکلی در ارتباط با سرور پیش آمده است. لطفاً دوباره تلاش کنید.");
                  break;
                case 503:
                    setMessage("سرویس در حال حاضر در دسترس نیست. لطفاً دوباره تلاش کنید.");
                  break;
                case 504:
                    setMessage("زمان اتصال به سرور اصلی تمام شد.");
                  break;
                default:
                    setMessage("خطای ناشناخته‌ای رخ داده است.");
                  break;
              }
            }
          };
    }
  };


  export async function GetIceCertificateList(
    selectedId,
    token,
    chabk,
    setIsLoading,
    setData,
    setCheckDataAll,
    setCheckData,
    setMessageData
) {
    const url = `https://${chabk}/Profile/Shopper/GetIceCertificateList`;


    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json-patch+json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({id:selectedId})
        });

        if (!response.ok) {
            throw new Error(response.status); 
        }
        
        const result = await response.json();
        if (result?.isSuccess) {
            setData(result.data)
            setCheckDataAll((r) => ({...r,check1: true}));
            setIsLoading(false)
        } else {
            setCheckData(true);
            setIsLoading(false)
            setMessageData(
                result.errors ? result.errors : result.message
            );
        }

        return result;
    } catch (error) {
        setCheckData(true);

        if (error instanceof TypeError && error.message === "Failed to fetch") {
            setMessageData( 
                'مشکلی در سرور به وجود آمده است. لطفاً بعداً دوباره تلاش کنید.'
            );
        } else if (!navigator.onLine) {
            setMessageData(
                "مشکلی در ارتباط با سرور وجود دارد. لطفاً اتصال اینترنت خود را بررسی کنید."
            );
        } else {
            const errorMessages = {
                400: ' درخواست نادرست است. لطفاً اطلاعات ورودی را بررسی کنید.',
                401: 'برای دسترسی به این بخش باید وارد حساب کاربری خود شوید.',
                403: 'شما اجازه دسترسی به این قسمت را ندارید.',
                404: 'صفحه یا منبع مورد نظر پیدا نشد.',
                408: 'زمان درخواست تمام شد. لطفاً دوباره امتحان کنید.',
                500: 'مشکلی در سرور به وجود آمده است. لطفاً بعداً دوباره تلاش کنید.',
                502: 'مشکلی در ارتباط با سرور پیش آمده است. لطفاً بعداً امتحان کنید .',
                503: 'سرویس در حال حاضر در دسترس نیست. لطفاً بعداً دوباره تلاش کنید.',
                504: 'زمان اتصال به سرور اصلی تمام شد.'
            };
            
            const message = errorMessages[Number(error.message)] || 'خطای ناشناخته‌ای رخ داده است.';
            setMessageData( message);
        }
    }

}
