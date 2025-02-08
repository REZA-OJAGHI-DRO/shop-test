
import { fetchGetListProduct } from "@/services/RegistrationGoods/RegistrationGoods";

export const GetListProduct = async (token, chabk, setMessageData, setCheckData, setOptions, data) => {


    try {
        const response = await fetchGetListProduct(
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
