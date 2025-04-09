import {
    fetchUnitGetAll
} from '@/services/basicDefinitions/unit.js'

export const GetAllUnit = async (token, chabk, setMessageData, setCheckData, setOptions, data) => {


    try {
        const response = await fetchUnitGetAll(
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