export async function LedgerAccountGetCreditList({
    token,
    chabk,
    setMessageData,
    setCheckData,
    dataAll,
    setDataTable,
    setTotalItems,
    setCheckDataAll
  }) {
    const url = `https://${chabk}/Financial/LedgerAccount/GetCreditList`;
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
          
        };


        // *********


        export async function LedgerAccountCreateCredit({ updatedDataAll: { data, token, chabk, setCheckData, setMessage } }) {
            const url = `https://${chabk}/Financial/LedgerAccount/CreateCredit`;
          
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

        //   *********
        export async function LedgerAccountUpdateCredit({ updatedDataAll: { data, token, chabk, setCheckData, setMessage } }) {
            const url = `https://${chabk}/Financial/LedgerAccount/UpdateCredit`;
          
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

        //   ********
      
        export async function PaymentMethodCreate({ updatedDataAll: { data, token, chabk, setCheckData, setMessage } }) {
            const url = `https://${chabk}/Financial/PaymentMethod/Create`;
          
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

        //   ********

        export async function PaymentMethodGetList({
            token,
            chabk,
            setMessageData2,
            setCheckData2,
            dataAll,
            setDataTable2,
            setTotalItems,
            setCheckDataAll2
          }) {
            const url = `https://${chabk}/Financial/PaymentMethod/GetList`;
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
                      setDataTable2(result.data)
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