import {
    fetchGetAllBrand
} from '@/services/brand/brand.js'

import {
    postGoodList
} from '@/services/RegistrationGoods/RegistrationGoods.js'

export const GetAllBrand = async (token, chabk, setMessageData, setCheckData, setOptions, data) => {


    try {
        const response = await fetchGetAllBrand(
            token,
            chabk,
            setMessageData,
            setCheckData,
            data
        );

        if (response?.isSuccess && Array.isArray(response.data)) {
            setOptions(response.data);
        }

    } catch (error) {
        //   888
    }
};

export const GetListBrand = async (token, chabk, setMessageData, setCheckData, dataAll) => {


    try {
        const response = await postGoodList(
            token,
            chabk,
            setMessageData,
            setCheckData,
            dataAll,
        );

        if (response?.isSuccess && Array.isArray(response.data)) {
            setOptions(response.data);
        }

    } catch (error) {
        //   888
    }
};