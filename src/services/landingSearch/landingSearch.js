export function landingSearch(name, categoryId, level, paymentType, paymentDurationDays, supplierId, supplyType, token , chabk) {
    const url = `https://${chabk}/LandingSearch/LandingSearch/SearchGoods`;

    const data = {
        "keyword": name,
        "categoryId": categoryId,
        "categoryLevel": level,
        "paymentType": paymentType,
        "paymentDurationDays": paymentDurationDays,
        "supplierId": supplierId,
        "supplyType": supplyType
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


export function landingSearchSuppliers(name, cityId, provinceId, categoryId, isImporter, isProducer, isSpreader, cachePayment, installmentPayment, paymentDuration, token, chabk) {
    const url = `https://${chabk}/LandingSearch/LandingSearch/SearchSuppliers`;

    const data = {
        "keyword": name,
        "cityId": cityId,
        "provinceId": provinceId,
        "categoryId": categoryId,
        "isImporter": isImporter,
        "isProducer": isProducer,
        "isSpreader": isSpreader,
        "cachePayment": cachePayment,
        "installmentPayment": installmentPayment,
        "paymentDuration": paymentDuration
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