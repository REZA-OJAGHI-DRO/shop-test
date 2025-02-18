export async function postRelationshipCreate(dataAll, token, chabk , setMessageData) {
    const url = `https://${chabk}/Communication/Relationship/Create`;

    const data = {
        "requesterId": dataAll.requesterId,
        "requesterType": dataAll.requesterType,
        "acceptorId": dataAll.acceptorId,
        "acceptorType": dataAll.acceptorType,
        "acceptorExists": dataAll.acceptorExists,
        "acceptorName": dataAll.acceptorName,
        "acceptorCityId": dataAll.acceptorCityId,
        "acceptorPhoneNumber": dataAll.acceptorPhoneNumber,
        "acceptorNationalId": dataAll.acceptorNationalId,
        "relationshipType": dataAll.relationshipType,
        "description": dataAll.description
    }

    
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

        return result;
    } catch (error) {
      
        if (error instanceof TypeError && error.message === "Failed to fetch") {
            setMessageData( 
                'شما اجازه دسترسی به این قسمت را ندارید.'
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


export async function postRelationshipGetList(
    dataAll,
    token,
    chabk,
    setMessageData,
    setCheckDataAll,
    setCheckData,
    setData,
    setTotalItems
) {
    const url = `https://${chabk}/Communication/Relationship/GetList`;
    
    
    const data = {
        "filter": {
            "memberUserId": dataAll.memberUserId,
            "memberType": dataAll.memberType,
            "memberSupplierId": dataAll.memberSupplierId,
            "memberShopperId": dataAll.memberShopperId,
            "relationshipType": dataAll.relationshipType
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
            setTotalItems(result.count || result.data.length)
            setData(result?.data.data)
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
            setMessageData( (prevData) => [
                ...prevData,
                'شما اجازه دسترسی به این قسمت را ندارید.'
            ]);
        } else if (!navigator.onLine) {
            setMessageData((prevData) => [
                ...prevData,
                "مشکلی در ارتباط با سرور وجود دارد. لطفاً اتصال اینترنت خود را بررسی کنید."
            ]);
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
            setMessageData((prevData) => [...prevData, message]);
        }  
    }
};

export async function postRelationshipSearchMembers(
    searchPhone,
    searchCodeNational,
    token,
    chabk,
    setMessageData,
    setDataSearch,
    setLoad2,
    setCheck
) {
    const url = `https://${chabk}/Communication/Relationship/SearchMembers`;
    const data = {
        "mobile": searchPhone,
        "nationalId": searchCodeNational,
        "name": ''
    }
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
            setTimeout(() => {
                setCheck((r) => ({ ...r, check1: true }));
                setLoad2(false);
                setMessageData(
                    result.errors ? result.errors : result.message
                );
                setTimeout(() => {
                  setCheck((r) => ({ ...r, check1: false }));
                  setMessageData('')
                }, 5000);
              }, 2000);
      
            setDataSearch(result?.data)
        } else {
            setTimeout(() => {
                setCheck((r) => ({ ...r, check4: true }));
                setLoad2(false);
                setMessageData(
                    result.errors ? result.errors : result.message
                );
                setTimeout(() => {
                  setCheck((r) => ({ ...r, check4: false }));
                  setMessageData('')
                }, 5000);
              }, 2000);
        }

        return result;
    } catch (error) {
        setTimeout(() => {
            setCheck((r) => ({ ...r, check4: true }));
            setLoad2(false);
            if (error instanceof TypeError && error.message === "Failed to fetch") {
                setMessageData( (prevData) => [
                    ...prevData,
                    'شما اجازه دسترسی به این قسمت را ندارید.'
                ]);
            } else if (!navigator.onLine) {
                setMessageData((prevData) => [
                    ...prevData,
                    "مشکلی در ارتباط با سرور وجود دارد. لطفاً اتصال اینترنت خود را بررسی کنید."
                ]);
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
                setMessageData((prevData) => [...prevData, message]);
            }
            setTimeout(() => {
              setCheck((r) => ({ ...r, check4: false }));
              setMessageData('')
            }, 5000);
          }, 2000);
    }

};



export async function postRelationshipAnswer(dataDate , dataAll, token, chabk , setMessageData) {
    const url = `https://${chabk}/Communication/Relationship/Answer`;

    const data = {
        "id": dataAll.id,
        "acceptorId": dataAll.acceptorId,
        "acceptorType": dataAll.acceptorType,
        "isAccepted": dataAll.isAccepted,
        "hasKnown": dataAll.hasKnown,
        "hasKnownFromYear":dataDate ,
        "hasTrade": dataAll.hasTrade,
        "hasTradeFromYear": dataAll.hasTradeFromYear,
        "suggests": dataAll.suggests
    }

    
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

        return result;
    } catch (error) {
      
        if (error instanceof TypeError && error.message === "Failed to fetch") {
            setMessageData( 
                'شما اجازه دسترسی به این قسمت را ندارید.'
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