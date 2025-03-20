export async function sendRegisterOfGoods({ updatedDataAll: { data, token, chabk, setCheckData, setMessage } }) {
  const url = `https://${chabk}/Product/Good/Create`;

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

export async function postGoodList({
  token,
  chabk,
  setMessageData2,
  setCheckData2,
  dataAll,
  setDataTable,
  setTotalItems,
  setCheckDataAll2
}) {
  const url = `https://${chabk}/Product/Good/GetListForSupplier`;
  const data = dataAll
    
  
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
            setDataTable(result.data.data)
            setTotalItems(result.data.count || result.data.data.length)
            setCheckDataAll2((r) => ({...r,check1: true}));
          } else {
            setCheckData2(true);
            setMessageData2(
                result.errors ? result.errors : result.message
              );
            }
            
            return result;
          } catch (error) {
        setCheckData2(true);
        
        if (error instanceof TypeError && error.message === "Failed to fetch") {
          setMessageData2( 
            'مشکلی در سرور به وجود آمده است. لطفاً بعداً دوباره تلاش کنید.'
          );
        } else if (!navigator.onLine) {
          setMessageData2(
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
            setMessageData2( message);
          }
        }
        
      };
      
      export async function postGoodDelete(dataDelete, token, chabk, setMessage) {
        const url = `https://${chabk}/Product/Good/Delete`;
        
        const data = {
          goodCodeId: dataDelete.goodCodeId,
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
        //    ...
      } else {
        
            setMessage(
              result.errors ? result.errors : result.message
            );
          }
          
          return result;
        } catch (error) {
          
        if (error instanceof TypeError && error.message === "Failed to fetch") {
            setMessage( 
                'مشکلی در سرور به وجود آمده است. لطفاً بعداً دوباره تلاش کنید.'
            );
        } else if (!navigator.onLine) {
          setMessage(
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
          setMessage( message);
        }
    }
  }
  
  export async function postGoodUpdate({ updatedDataAll: { dataEdit, token, chabk, setCheckData, setMessage } }) {
    const url = `https://${chabk}/Product/Good/Update`;
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json-patch+json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(dataEdit),
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
  
  export const fetchGetListProduct = async (
    token,
    chabk,
    setMessageData,
    setCheckData,
    data 
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
                        'خطا در دریافت لیست کالاهای ثبت شده : شما اجازه دسترسی به این قسمت را ندارید.'
                    ]);
                } else if (!navigator.onLine) {
                  setMessageData((prevData) => [
                        ...prevData, 
                        "مشکلی در ارتباط با سرور وجود دارد. لطفاً اتصال اینترنت خود را بررسی کنید."
                      ]);
                } else {
                    const errorMessages = {
                        400: 'خطا در دریافت لیست کالاهای ثبت شده : درخواست نادرست است. لطفاً اطلاعات ورودی را بررسی کنید.',
                        401: 'خطا در دریافت لیست کالاهای ثبت شده : برای دسترسی به این بخش باید وارد حساب کاربری خود شوید.',
                        403: 'خطا در دریافت لیست کالاهای ثبت شده : شما اجازه دسترسی به این قسمت را ندارید.',
                        404: 'خطا در دریافت لیست کالاهای ثبت شده : صفحه یا منبع مورد نظر پیدا نشد.',
                        408: 'خطا در دریافت لیست کالاهای ثبت شده : زمان درخواست تمام شد. لطفاً دوباره امتحان کنید.',
                        500: 'خطا در دریافت لیست کالاهای ثبت شده : مشکلی در سرور به وجود آمده است. لطفاً بعداً دوباره تلاش کنید.',
                        502: 'خطا در دریافت لیست کالاهای ثبت شده : مشکلی در ارتباط با سرور پیش آمده است. لطفاً بعداً امتحان کنید .',
                        503: 'خطا در دریافت لیست کالاهای ثبت شده : سرویس در حال حاضر در دسترس نیست. لطفاً بعداً دوباره تلاش کنید.',
                        504: 'خطا در دریافت لیست کالاهای ثبت شده : زمان اتصال به سرور اصلی تمام شد.'
                    };
                    
                    const message = errorMessages[Number(error.message)] || 'خطا در دریافت لیست کالاهای ثبت شده : خطای ناشناخته‌ای رخ داده است.';
                    setMessageData((prevData) => [...prevData, message]);
                  }
                });
    } catch (e) {
        setCheckData(true)
        setMessageData((prevData) => [...prevData,"خطا در دریافت بلیست کالاهای ثبت شده : مشکلی در ارسال درخواست به وجود آمده است. لطفاً دوباره تلاش کنید."]);
      }
    };
    export const fetchGetAllForSupplier = async (token, chabk, setMessageData, setCheckData) => {
      const url = `https://${chabk}/Product/Good/GetAllForSupplier`;
  
      try {
          return fetch(url, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json-patch+json',
                  'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify()
          })
          .then(response => {
              if (!response.ok) {
                  throw new Error(response.status);
              }
              return response.json();
          })
          .catch((error) => {
              setCheckData(true);
              handleFetchError(error, setMessageData);
          });
      } catch (e) {
          setCheckData(true);
          setMessageData(prevData => [...prevData, "مشکلی در ارسال درخواست به وجود آمده است. لطفاً دوباره تلاش کنید."]);
      }
  };
  
  const handleFetchError = (error, setMessageData) => {
      const errorMessages = {
          400: 'درخواست نادرست است. لطفاً اطلاعات ورودی را بررسی کنید.',
          401: 'برای دسترسی به این بخش باید وارد حساب کاربری شوید.',
          403: 'شما اجازه دسترسی به این قسمت را ندارید.',
          404: 'صفحه یا منبع مورد نظر پیدا نشد.',
          408: 'زمان درخواست تمام شد. لطفاً دوباره امتحان کنید.',
          500: 'مشکلی در سرور به وجود آمده است. لطفاً بعداً دوباره تلاش کنید.',
          502: 'مشکلی در ارتباط با سرور پیش آمده است. لطفاً بعداً امتحان کنید.',
          503: 'سرویس در حال حاضر در دسترس نیست. لطفاً بعداً دوباره تلاش کنید.',
          504: 'زمان اتصال به سرور اصلی تمام شد.'
      };
  
      const message = errorMessages[Number(error.message)] || 'خطای ناشناخته‌ای رخ داده است.';
      setMessageData(prevData => [...prevData, message]);
  };
  

    export async function sendRegisterCreateGoodCode({ updatedDataAll: { data, token, chabk, setCheckData, setMessage } }) {
      const url = `https://${chabk}/Product/Good/CreateGoodCode`;
    
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