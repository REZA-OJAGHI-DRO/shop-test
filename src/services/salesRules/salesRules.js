
export async function sendGoodDiscount({ updatedDataAll: { data, token, chabk, setCheckData, setMessage } }) {
    const url = `https://${chabk}/Financial/GoodDiscount/Create`;
  
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
          const errorData = await response.json();
          const error = new Error(errorData.message || "خطای ناشناخته");
          error.status = response.status;
          throw error;
        }
    
        const result = await response.json();
        if (result?.isSuccess) {
          // setCheckDataAll((r) => ({ ...r, check1: true }));
        } else {
          setCheckData(true);
          setMessage(result.errors ? result.errors : result.message);
        }
    
        return result;
      } catch (error) {
        setCheckData(true);
    
        if (error instanceof Error) {
          if (error.message.includes("Failed to fetch")) {
            setMessage('مشکلی در ارتباط با سرور وجود دارد. لطفاً دوباره تلاش کنید.');
          } else if (!navigator.onLine) {
            setMessage("مشکلی در ارتباط با سرور وجود دارد. لطفاً اتصال اینترنت خود را بررسی کنید.");
          } else {
            switch (error.status) {
              case 400:
                setMessage('درخواست نادرست است. لطفاً اطلاعات ورودی را بررسی کنید.');
                break;
              case 401:
                setMessage('برای دسترسی به این بخش باید وارد حساب کاربری خود شوید.');
                break;
              case 403:
                setMessage('شما اجازه دسترسی به این قسمت را ندارید.');
                break;
              case 404:
                setMessage('صفحه یا منبع مورد نظر پیدا نشد.');
                break;
              case 500:
                setMessage('مشکلی در سرور به وجود آمده است. لطفاً دوباره تلاش کنید.');
                break;
              case 502:
                setMessage('مشکلی در ارتباط با سرور پیش آمده است. لطفاً دوباره تلاش کنید.');
                break;
              case 503:
                setMessage('سرویس در حال حاضر در دسترس نیست. لطفاً دوباره تلاش کنید.');
                break;
              case 504:
                setMessage('زمان اتصال به سرور اصلی تمام شد.');
                break;
              default:
                setMessage('خطای ناشناخته‌ای رخ داده است.');
            }
          }
        } else {
          setMessage('خطای ناشناخته‌ای رخ داده است.');
        }
      }
  }

// ***********

export const fetchGoodGetAll = async (
    token,
    chabk,
    setMessageData,
    setCheckData,
    data = {}
) => {
    const url = `https://${chabk}/Product/Good/GetAll`;


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
                        'خطا در دریافت لیست کالای شروط : شما اجازه دسترسی به این قسمت را ندارید.'
                    ]);
                } else if (!navigator.onLine) {
                    setMessageData((prevData) => [
                        ...prevData, 
                        "مشکلی در ارتباط با سرور وجود دارد. لطفاً اتصال اینترنت خود را بررسی کنید."
                    ]);
                } else {
                    const errorMessages = {
                        400: 'خطا در دریافت لیست کالای شروط : درخواست نادرست است. لطفاً اطلاعات ورودی را بررسی کنید.',
                        401: 'خطا در دریافت لیست کالای شروط : برای دسترسی به این بخش باید وارد حساب کاربری خود شوید.',
                        403: 'خطا در دریافت لیست کالای شروط : شما اجازه دسترسی به این قسمت را ندارید.',
                        404: 'خطا در دریافت لیست کالای شروط : صفحه یا منبع مورد نظر پیدا نشد.',
                        408: 'خطا در دریافت لیست کالای شروط : زمان درخواست تمام شد. لطفاً دوباره امتحان کنید.',
                        500: 'خطا در دریافت لیست کالای شروط : مشکلی در سرور به وجود آمده است. لطفاً بعداً دوباره تلاش کنید.',
                        502: 'خطا در دریافت لیست کالای شروط : مشکلی در ارتباط با سرور پیش آمده است. لطفاً بعداً امتحان کنید .',
                        503: 'خطا در دریافت لیست کالای شروط : سرویس در حال حاضر در دسترس نیست. لطفاً بعداً دوباره تلاش کنید.',
                        504: 'خطا در دریافت لیست کالای شروط : زمان اتصال به سرور اصلی تمام شد.'
                    };
                    
                    const message = errorMessages[Number(error.message)] || 'خطا در دریافت لیست کالای شروط : خطای ناشناخته‌ای رخ داده است.';
                    setMessageData((prevData) => [...prevData, message]);
                }
            });
    } catch (e) {
        setCheckData(true)
        setMessageData((prevData) => [...prevData,"خطا در دریافت لیست کالای شروط : مشکلی در ارسال درخواست به وجود آمده است. لطفاً دوباره تلاش کنید."]);
    }


};


// ******

export async function postGoodDiscountGetList({
    dataAll,
    token,
    chabk
}) {
    const url = `https://${chabk}/Financial/GoodDiscount/GetList`;
    const data = {
        "filter": {
            "keyword": dataAll.keyword,
            "saleType": dataAll.shopperRankLimit,
            "paymentType": dataAll.paymentType,
            "shopperRankLimit": dataAll.shopperRankLimit
        },
        "pageSize": dataAll.pageSize,
        "pageIndex": dataAll.pageIndex,
        "orderType": dataAll.orderType,
        "orderPropertyName": dataAll.orderPropertyName
    }


    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
};

// *************

export async function GoodDiscountToggle(
  id,
   token,
    chabk,
    setCheckDataAll,
    setCheckData,
    setMessageData,
  ) {
  const url = `https://${chabk}/Financial/GoodDiscount/Toggle`;

  const data = {
      id: id
  };
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
          setCheckDataAll((r) => ({...r,check1: true}));
      } else {
          setCheckData(true);
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
// *************

export async function GoodDiscountGet({
    id,
    token,
    chabk,
    setData,
    setCheckDataAll,
    setCheckData,
    setMessageData,
}) {
    const url = `https://${chabk}/Financial/GoodDiscount/Get`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json-patch+json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ id:id })  // ارسال id به صورت شیء
        });

        if (!response.ok) {
            throw new Error(response.status);
        }

        const result = await response.json();
        if (result?.isSuccess) {
            setCheckDataAll((r) => ({ ...r, check1: true }));
            setData(result?.data);
        } else {
            setCheckData(true);
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
            setMessageData(message);
        }
    }
}

// *******

export async function GoodDiscountUpdate({ updatedDataAll: { data, token, chabk, setCheckData, setMessage } }) {
    const url = `https://${chabk}/Financial/GoodDiscount/Update`;
  
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
          const errorData = await response.json();
          const error = new Error(errorData.message || "خطای ناشناخته");
          error.status = response.status;
          throw error;
        }
    
        const result = await response.json();
        if (result?.isSuccess) {
          // setCheckDataAll((r) => ({ ...r, check1: true }));
        } else {
          setCheckData(true);
          setMessage(result.errors ? result.errors : result.message);
        }
    
        return result;
      } catch (error) {
        setCheckData(true);
    
        if (error instanceof Error) {
          if (error.message.includes("Failed to fetch")) {
            setMessage('مشکلی در ارتباط با سرور وجود دارد. لطفاً دوباره تلاش کنید.');
          } else if (!navigator.onLine) {
            setMessage("مشکلی در ارتباط با سرور وجود دارد. لطفاً اتصال اینترنت خود را بررسی کنید.");
          } else {
            switch (error.status) {
              case 400:
                setMessage('درخواست نادرست است. لطفاً اطلاعات ورودی را بررسی کنید.');
                break;
              case 401:
                setMessage('برای دسترسی به این بخش باید وارد حساب کاربری خود شوید.');
                break;
              case 403:
                setMessage('شما اجازه دسترسی به این قسمت را ندارید.');
                break;
              case 404:
                setMessage('صفحه یا منبع مورد نظر پیدا نشد.');
                break;
              case 500:
                setMessage('مشکلی در سرور به وجود آمده است. لطفاً دوباره تلاش کنید.');
                break;
              case 502:
                setMessage('مشکلی در ارتباط با سرور پیش آمده است. لطفاً دوباره تلاش کنید.');
                break;
              case 503:
                setMessage('سرویس در حال حاضر در دسترس نیست. لطفاً دوباره تلاش کنید.');
                break;
              case 504:
                setMessage('زمان اتصال به سرور اصلی تمام شد.');
                break;
              default:
                setMessage('خطای ناشناخته‌ای رخ داده است.');
            }
          }
        } else {
          setMessage('خطای ناشناخته‌ای رخ داده است.');
        }
      }
  }