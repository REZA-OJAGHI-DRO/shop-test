import {
    fetchGoodGetAll
} from '@/services/salesRules/salesRules.js'

export const GoodGetAll = async (token, chabk, setMessageData, setCheckData, setOptions, data) => {


    try {
        const response = await fetchGoodGetAll(
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