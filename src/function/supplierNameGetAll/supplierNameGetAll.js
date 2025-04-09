import {
    FetchSupplierGetAll
} from '@/services/supplier/supplier.js'

export const supplierNameGetAll = async (keyword, token, chabk, setMessageData, setCheckData, setOptions) => {


    try {
        const response = await FetchSupplierGetAll(
            keyword,
            token,
            chabk,
            setMessageData,
            setCheckData
        );

        if (response?.isSuccess && Array.isArray(response.data)) {
            setOptions(response.data);
        }

    } catch (error) {
        //   888
    }
};

// ******** پروفایل تامین کننده

