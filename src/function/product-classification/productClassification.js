import {
    ProductClassification
} from '@/services/basicDefinitions/ClassificationOfGoods'

export const GetProductClassification = async (token, chabk, level, parentCategoryId, setMessageData,setCheckData, setOptions) => {
    try {
        const response = await ProductClassification(
            token,
            chabk,
            level,
            parentCategoryId,
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