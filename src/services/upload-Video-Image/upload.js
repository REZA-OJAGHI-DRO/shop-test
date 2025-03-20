

export const SupplierGetFiles = async (
    id,
    token,
    chabk,
    setMessageData,
    setCheckData,
    setData,
    setPlay,
    setCheckDataAll,
    setIsLoading
) => {
    const url = `https://${chabk}/Profile/Supplier/GetFiles`;
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
            const RData = result.data
            setData(RData);
            const priorityFileTypes = [10, 9, 8, 7];
            const filteredItem = RData?.length > 0 ? RData.find((item) => priorityFileTypes.includes(item.fileType)) || '' : '';
            setPlay(
                filteredItem
            )
            setCheckDataAll((r) => ({...r,check2: true}));
            // setIsLoading(false);
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
                'خطا در دریافت اطلاعات تامین کننده : شما اجازه دسترسی به این قسمت را ندارید.'
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


// export async function addFile(id, data, token, chabk , setCheckData , setMessageData , setCheckDataAll , setUpdateImage , updateImage) {
//     const url = `https://${chabk}/Profile/Supplier/AddFile`;

//     const requestOptions = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//             "supplierId": id,
//             "fileIds": [data]
//         }),
//     };

//     try {
//         const response = await fetch(url, requestOptions);
//         if (!response.ok) {
//             throw new Error(response.status); 
//         }
        
//         const result = await response.json();
        
//         if (result?.isSuccess) {
//             setUpdateImage(!updateImage)
//             setCheckDataAll((r) => ({...r,check1: true}));
//         } else {
//             setCheckData(true);
//             setMessageData((prevData) => [
//                 ...prevData,
//                 result.errors ? result.errors : result.message
//             ]);
//         }
    
//         return result;
//     } catch (error) {
//         setCheckData(true);

//         if (error instanceof TypeError && error.message === "Failed to fetch") {
//             setMessageData((prevData) => [
//                 ...prevData, 
//                 'خطا در دریافت اطلاعات تامین کننده : شما اجازه دسترسی به این قسمت را ندارید.'
//             ]);
//         } else if (!navigator.onLine) {
//             setMessageData((prevData) => [
//                 ...prevData, 
//                 "مشکلی در ارتباط با سرور وجود دارد. لطفاً اتصال اینترنت خود را بررسی کنید."
//             ]);
//         } else {
//             const errorMessages = {
//                 400: 'خطا در دریافت اطلاعات تامین کننده : درخواست نادرست است. لطفاً اطلاعات ورودی را بررسی کنید.',
//                 401: 'خطا در دریافت اطلاعات تامین کننده : برای دسترسی به این بخش باید وارد حساب کاربری خود شوید.',
//                 403: 'خطا در دریافت اطلاعات تامین کننده : شما اجازه دسترسی به این قسمت را ندارید.',
//                 404: 'خطا در دریافت اطلاعات تامین کننده : صفحه یا منبع مورد نظر پیدا نشد.',
//                 408: 'خطا در دریافت اطلاعات تامین کننده : زمان درخواست تمام شد. لطفاً دوباره امتحان کنید.',
//                 500: 'خطا در دریافت اطلاعات تامین کننده : مشکلی در سرور به وجود آمده است. لطفاً بعداً دوباره تلاش کنید.',
//                 502: 'خطا در دریافت اطلاعات تامین کننده : مشکلی در ارتباط با سرور پیش آمده است. لطفاً بعداً امتحان کنید .',
//                 503: 'خطا در دریافت اطلاعات تامین کننده : سرویس در حال حاضر در دسترس نیست. لطفاً بعداً دوباره تلاش کنید.',
//                 504: 'خطا در دریافت اطلاعات تامین کننده : زمان اتصال به سرور اصلی تمام شد.'
//             };
            
//             const message = errorMessages[Number(error.message)] || 'خطا در دریافت اطلاعات تامین کننده : خطای ناشناخته‌ای رخ داده است.';
//             setMessageData((prevData) => [...prevData, message]);
//         }
//     }
// }

export const SupplierUpdateMainFile = async ({ id, fileId, fileType, token, chabk, setCheckData, setMessageData, setCheckDataAll, setUpdate, update }) => {
    const url = `https://${chabk}/Profile/Supplier/UpdateMainFile`;

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            "supplierId": id,
            "fileId": fileId,
            "fileType": fileType
        }),
    };

    try {
        const response = await fetch(url, requestOptions);

        // Check if response is OK (status code in the range 200-299)
        if (!response.ok) {
            const errorData = await response.json();
            const error = new Error(errorData.message || "خطای ناشناخته");
            error.status = response.status;
            throw error;
        }

        // Parse the JSON response if the fetch is successful
        const result = await response.json();

        // Handle the result (success)
        if (result?.isSuccess) {
            setUpdate(!update);
            setCheckDataAll((r) => ({ ...r, check1: true }));
            setCheckData(true);
            setMessageData((prevData) => [
                ...prevData,
                result.errors ? result.errors : result.message
            ]);
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

        if (error instanceof Error) {
            if (error.message.includes("Failed to fetch")) {
                throw new Error("مشکلی در ارتباط با سرور وجود دارد. لطفاً دوباره تلاش کنید.");
            }

            if (!navigator.onLine) {
                throw new Error("مشکلی در ارتباط با سرور وجود دارد. لطفاً اتصال اینترنت خود را بررسی کنید.");
            }

            // Handle different HTTP error statuses
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

        throw new Error("خطای ناشناخته‌ای رخ داده است.");
    }
};

export const SupplierRemoveFile = async ({ id, fileId, token, chabk, setCheckData, setMessageData, setCheckDataAll, setUpdateDelete, updateDelete }) => {
    const url = `https://${chabk}/Profile/Supplier/RemoveFile`;

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            "supplierId": id,
            "fileIds": [fileId]
        }),
    };

    try {
        const response = await fetch(url, requestOptions);

        // Check if response is OK (status code in the range 200-299)
        if (!response.ok) {
            const errorData = await response.json();
            const error = new Error(errorData.message || "خطای ناشناخته");
            error.status = response.status;
            throw error;
        }

        // Parse the JSON response if the fetch is successful
        const result = await response.json();

        // Handle the result (success)
        if (result?.isSuccess) {
            setUpdateDelete(!updateDelete);
            setCheckDataAll((r) => ({ ...r, check1: true }));
        } else {
            setCheckData(true);
            setMessageData((prevData) => [
                ...prevData,
                result.errors ? result.errors : result.message
            ]);
        }

        return result;

    } catch (error) {
        // Handle different types of errors
        setCheckData(true);

        if (error instanceof Error) {
            if (error.message.includes("Failed to fetch")) {
                throw new Error("مشکلی در ارتباط با سرور وجود دارد. لطفاً دوباره تلاش کنید.");
            }

            if (!navigator.onLine) {
                throw new Error("مشکلی در ارتباط با سرور وجود دارد. لطفاً اتصال اینترنت خود را بررسی کنید.");
            }

            // Handle different HTTP error statuses
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






// import { useMutation } from '@tanstack/react-query';

export const sendDataToServer = async ({ supplierId, fileIds, token, chabk , setUpdate , update }) => {
    try {
      const response = await fetch(`https://${chabk}/Profile/Supplier/AddFile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ supplierId, fileIds }),
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
          throw new Error("مشکلی در ارتباط با سرور وجود دارد. لطفاً دوباره تلاش کنید.");
        }
        if (!navigator.onLine) {
          throw new Error("مشکلی در ارتباط با سرور وجود دارد. لطفاً اتصال اینترنت خود را بررسی کنید.");
        }
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
  
  
