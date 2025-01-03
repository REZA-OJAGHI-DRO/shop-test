import {
    fetchPackageTypeGetAll
} from '@/services/basicDefinitions/packageTypeGetAll.js'

export const PackageTypeGetAll = async (token, chabk, setMessageData, setCheckData, setOptions, data) => {


    try {
        const response = await fetchPackageTypeGetAll(
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