
// *********

export function postUserCredentials(username, password, chabk) {
    const url = `https://${chabk}/Identity/User/Create`;

    const data = {
        username: username,
        password: password
    };

    return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(result => {
            // console.log('Response from API:', result);
            return result;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            throw error;
        });
}

//  دیتا لاگین

// دیتا فرم ثبت نام

// data.js
export const fetchProvinces = async (token, chabk) => {
    const url = `https://${chabk}/Place/Province/GetAll`;

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json-patch+json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            keyword: ''
        }),
    };

    try {
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.data
    } catch (error) {
        console.error('Fetch error:', error);
        return [];
    }
};

//   ********

export function cityData(dataCityId, token, chabk) {
    const url = `https://${chabk}/Place/City/GetByProvinceId`;

    const data = {
        "keyword": "",
        "data": {
            id: dataCityId
        }
    }

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
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(result => {
            // console.log('Response from API:', result);
            return result;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            throw error;
        });
}

// *********

export const fetchGetAllBrand = async ({
    token,
    chabk
}) => {
    const url = `https://${chabk}/Product/Brand/GetAll`;

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(),
    };

    try {
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.data
    } catch (error) {
        console.error('Fetch error:', error);
        return [];
    }
};
//   *******all

export async function postDataAll(dataAll, token, chabk) {
    const url = `https://${chabk}/Profile/Supplier/Create`;

    const data = {
        "name": dataAll.name,
        "lastName": dataAll.dataLastName,
        "phone": dataAll.phone,
        "mobile": dataAll.mobile,
        "coordinatorMobile": dataAll.mobile2,
        "accountantMobile": dataAll.mobile3,
        "description": dataAll.description,
        "cityId": dataAll.cityId,
        "address": dataAll.address,
        "categoryIds": dataAll.categoryIds,
        "import": dataAll.import,
        "produce": dataAll.produce,
        "spreader": dataAll.spreader,
        "isPerson": dataAll.isPerson,
        "exclusiveImport": dataAll.exclusiveImport,
        "importDescription": dataAll.importDescription,
        "produceDescription": dataAll.produceDescription,
        "spreaderDescription": dataAll.spreaderDescription,
        "hasImport": dataAll.hasImport,
        "hasProduce": dataAll.hasProduce,
        "hasSpread": dataAll.hasSpread,
        "installments": dataAll.installments,
        "installmentsDays": dataAll.installmentsMonth,
        "cash": dataAll.cash,
        "cashDays": dataAll.cashMonth,
        "preOrder": dataAll.preOrder,
        "nationalId": dataAll.nationalId,
        "attachments": dataAll.attachments,
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        // console.log('Response from API:', result);
        return result;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}



export async function postGoodList({
    dataAll,
    token,
    chabk
}) {
    const url = `https://${chabk}/Product/Good/GetList`;
    const data = {
        "filter": {
            "name": dataAll.name,
            "mainCategoryId": dataAll.mainCategoryId,
            "subCategoryId": dataAll.subCategoryId,
            "supplierCode": dataAll.supplierCode
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


export const fetchUnitGetAll = async ({
    token,
    chabk
}) => {
    const url = `https://${chabk}/Product/Unit/GetAll`;

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(),
    };

    try {
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.data
    } catch (error) {
        console.error('Fetch error:', error);
        return [];
    }
};

export const fetchPackageTypeGetAll = async ({
    token,
    chabk
}) => {
    const url = `https://${chabk}/Product/PackageType/GetAll`;

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(),
    };

    try {
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.data
    } catch (error) {
        console.error('Fetch error:', error);
        return [];
    }
};



// ******RegistrationFormEmptores

export async function sendShopperCreate(dataAll, token, chabk) {
    const url = `https://${chabk}/Profile/Shopper/Create`;
    console.log('reza', token);

    const data = {
        "name": dataAll.name,
        "mobile": dataAll.mobile,
        "phone": dataAll.phone,
        "nationCode": dataAll.nationCode,
        "categoryIds": dataAll.categoryIds,
        "brandId": dataAll.brandId,
        "cityId": dataAll.cityId,
        "postalCode": dataAll.postalCode,
        "address": dataAll.address,
        "isRent": dataAll.isRent,
        "hasLicense": dataAll.hasLicense,
        "isRetail": dataAll.shoppingType,
        "area": dataAll.shopArea,
        "licenseImage": dataAll.licenseImage,
        "bannerImage": dataAll.bannerImage,
        "docOrRentImage": dataAll.docOrRentImage,
        "friends": dataAll.friends
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Response from API:', result);
        return result;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}



// ******


export function SupplierGetAll(keyword, token, chabk) {
    const url = `https://${chabk}/Profile/Supplier/GetAll`;

    const data = {
        "keyword": keyword,
    }

    return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(result => {
            // console.log('Response from API:', result);
            return result;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            throw error;
        });
}
// ************
export function userGetAllPosition(token, chabk) {
    const url = `https://${chabk}/Identity/User/GetAllPosition`;


    return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify()
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(result => {
            // console.log('Response from API:', result);
            return result;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            throw error;
        });
}

// *****************

export const fetchGoodGet = async (
    id,
    token,
    chabk,
    setCheck,
    setMessageData,
    setCheckData,
    setData,
    setCheckDataAll,
    setLoadEdit
) => {
    const url = `https://${chabk}/Product/Good/GetByGoodCodeId`;
    const data = { goodCodeId: id };

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
            // setCheckData(false);
            setCheckDataAll((r) => ({...r,check1: true}));
            setTimeout(()=>{
                setLoadEdit(false)
                setCheck((r) => ({ ...r, check1: true }));
                setTimeout(()=>{
                setCheck((r) => ({ ...r, check1: false }));
            },5000)
            },2000)
            setMessageData(
                result.errors ? result.errors : result.message
            );
        } else {
            setCheckData(true);
            setTimeout(()=>{
                setLoadEdit(false)
                setCheck((r) => ({ ...r, check4: true }));
                setTimeout(()=>{
                setCheck((r) => ({ ...r, check4: false }));
            },5000)
            },2000)
            setMessageData(
                result.errors ? result.errors : result.message
            );
        }
        
        return result;
    } catch (error) {
        setCheckData(true);
        setTimeout(()=>{
            setLoadEdit(false)
            setCheck((r) => ({ ...r, check4: true }));
            setTimeout(()=>{
            setCheck((r) => ({ ...r, check4: false }));
        },5000)
        },2000)

        if (error instanceof TypeError && error.message === "Failed to fetch") {
            setMessageData( 
                'شما اجازه دسترسی به این قسمت را ندارید'
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