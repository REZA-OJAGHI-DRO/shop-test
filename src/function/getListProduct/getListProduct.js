
import { fetchGetListProduct , fetchGetAllForSupplier } from "@/services/RegistrationGoods/RegistrationGoods";

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

export const GetAllForSupplier = async (token, chabk, setMessageData, setCheckData, setOptions, setIsLoading2) => {
    try {
        setIsLoading2(true); // شروع لودینگ
        const response = await fetchGetAllForSupplier(token, chabk, setMessageData, setCheckData);
        
        if (response?.isSuccess && Array.isArray(response.data)) {
            setOptions(response.data);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    } finally {
        setIsLoading2(false); // پایان لودینگ (در هر صورت)
    }
};

