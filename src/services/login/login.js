export async function UserRegisterOrLogin(mobileNumber, chabk, setMessage, setCheck) {

    const url = `https://${chabk}/Identity/User/RegisterOrLogin`;


    const data = {
        mobile: mobileNumber
    };
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json-patch+json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(response.status);
        }
        const result = await response.json();
        if (result.isSuccess == true) {
            setCheck((r) => ({
                ...r,
                check1: false,
              check4: false,

              }));
              setMessage('');
            setTimeout(() => {
                setCheck((r) => ({
                  ...r,
                  check1: true,
                }));
                setMessage(result.errors ? result.errors : result.message);
            }, 2000);
      
        } else if (result.isSuccess == false) {
            setCheck((r) => ({
              ...r,
              check1: false,
              check4: false,
            }));
            setMessage('');
            setTimeout(() => {
                setCheck((r) => ({
                  ...r,
                  check4: true,
                }));
                setMessage(result.errors ? result.errors : result.message);
              }, 2000);
        }

        return result;
    } catch (error) {
        setCheck((r) => ({
            ...r,
            check4: true
        }));
        if (Number(error.message)) {
            switch (Number(error.message)) {
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
                case 408:
                    setMessage('زمان درخواست تمام شد. لطفاً دوباره امتحان کنید.');
                    break;
                case 500:
                    setMessage('مشکلی در سرور به وجود آمده است. لطفاً بعداً دوباره تلاش کنید.');
                    break;
                case 502:
                    setMessage('مشکلی در ارتباط با سرور پیش آمده است. لطفاً بعداً امتحان کنید.');
                    break;
                case 503:
                    setMessage('سرویس در حال حاضر در دسترس نیست. لطفاً بعداً دوباره تلاش کنید.');
                    break;
                case 504:
                    setMessage('زمان اتصال به سرور اصلی تمام شد.');
                    break;
                default:
                    setMessage('خطای ناشناخته‌ای رخ داده است.');
            }
        } else if (!navigator.onLine) {
            setMessage(
                "مشکلی در ارتباط با سرور وجود دارد. لطفاً اتصال اینترنت خود را بررسی کنید."
            );
        } else {
            setMessage("خطا در ارسال درخواست. لطفاً دوباره تلاش کنید.");
        }
    }
}

// ******

export async function UserToken(mobileNumber, loginCode, chabk, setMessage, setCheck) {
    const url = `https://${chabk}/Identity/User/Token`;

    const data = {
        mobile: mobileNumber,
        loginCode: loginCode
    };


    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json-patch+json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (result.isSuccess == true) {

            setCheck((r) => ({
              ...r,
              check1: false,
              check4: false,
            }));
            setMessage('');
            setTimeout(() => {
                setCheck((r) => ({
                  ...r,
                  check1: true,
                }));
                setMessage(result.errors ? result.errors : result.message);
            }, 2000);
      
        } else if (result.isSuccess == false) {
            setCheck((r) => ({
              ...r,
              check1: false,
              check4: false,
            }));
            setMessage('');
            setTimeout(() => {
                setCheck((r) => ({
                  ...r,
                  check4: true,
                }));
                setMessage(result.errors ? result.errors : result.message);
              }, 2000);
        }

        return result;
    } catch (error) {
        setCheck((r) => ({
            ...r,
            check4: true
        }));
        const match = error.message.match(/status: (\d{3})/);

        if (match) {
            const statusCode = parseInt(match[1], 10);
            switch (statusCode) {
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
                case 408:
                    setMessage('زمان درخواست تمام شد. لطفاً دوباره امتحان کنید.');
                    break;
                case 500:
                    setMessage('مشکلی در سرور به وجود آمده است. لطفاً بعداً دوباره تلاش کنید.');
                    break;
                case 502:
                    setMessage('مشکلی در ارتباط با سرور پیش آمده است. لطفاً بعداً امتحان کنید.');
                    break;
                case 503:
                    setMessage('سرویس در حال حاضر در دسترس نیست. لطفاً بعداً دوباره تلاش کنید.');
                    break;
                case 504:
                    setMessage('زمان اتصال به سرور اصلی تمام شد.');
                    break;
                default:
                    setMessage('خطای ناشناخته‌ای رخ داده است.');
            }
        } else if (!navigator.onLine) {
            setMessage(
                "مشکلی در ارتباط با سرور وجود دارد. لطفاً اتصال اینترنت خود را بررسی کنید."
            );
        } else {
            setMessage("خطا در ارسال درخواست. لطفاً دوباره تلاش کنید.");
        }
    }
}

// *********

export async function UserLoginToken(valueTextNumber2, valuePassword, chabk, setMessage, setCheck) {
    const url = `https://${chabk}/Identity/User/Login`;

    const data = {
        userName: valueTextNumber2,
        password: valuePassword
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json-patch+json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (result.isSuccess == true) {

            setCheck((r) => ({
              ...r,
              check1: false,
              check4: false,
            }));
            setMessage('');
            setTimeout(() => {
                setCheck((r) => ({
                  ...r,
                  check1: true,
                }));
                setMessage(result.errors ? result.errors : result.message);
            }, 2000);
      
        } else if (result.isSuccess == false) {
            setCheck((r) => ({
              ...r,
              check1: false,
              check4: false,
            }));
            setMessage('');
            setTimeout(() => {
                setCheck((r) => ({
                  ...r,
                  check4: true,
                }));
                setMessage(result.errors ? result.errors : result.message);
              }, 2000);
        }

        return result;
    } catch (error) {
        setCheck((r) => ({
            ...r,
            check4: true
        }));
        const match = error.message.match(/status: (\d{3})/);

        if (match) {
            const statusCode = parseInt(match[1], 10);
            switch (statusCode) {
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
                case 408:
                    setMessage('زمان درخواست تمام شد. لطفاً دوباره امتحان کنید.');
                    break;
                case 500:
                    setMessage('مشکلی در سرور به وجود آمده است. لطفاً بعداً دوباره تلاش کنید.');
                    break;
                case 502:
                    setMessage('مشکلی در ارتباط با سرور پیش آمده است. لطفاً بعداً امتحان کنید.');
                    break;
                case 503:
                    setMessage('سرویس در حال حاضر در دسترس نیست. لطفاً بعداً دوباره تلاش کنید.');
                    break;
                case 504:
                    setMessage('زمان اتصال به سرور اصلی تمام شد.');
                    break;
                default:
                    setMessage('خطای ناشناخته‌ای رخ داده است.');
            }
        } else if (!navigator.onLine) {
            setMessage(
                "مشکلی در ارتباط با سرور وجود دارد. لطفاً اتصال اینترنت خود را بررسی کنید."
            );
        } else {
            setMessage("خطا در ارسال درخواست. لطفاً دوباره تلاش کنید.");
        }
    }
}