export function supplierGet(id, token, chabk) {
    const url = `https://${chabk}/Profile/Supplier/Get`;

    const data = {
        "id": id,
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