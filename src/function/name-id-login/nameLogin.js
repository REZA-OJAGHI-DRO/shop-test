
import {userGetAllPosition} from '../../data.js'
export const loadUserGetAllPosition = async (roleCookie, token, chabk, setId, setNameLogin) => {
  if (roleCookie === "Supplier") {
    try {
      const response = await userGetAllPosition(token, chabk);

      if (response && typeof response === "object") {
        setId(response?.data?.suppliers[0]?.key);
        setNameLogin(response?.data?.suppliers[0]?.value);
      } else {
        console.error("Invalid data format:", response);
      }
    } catch (error) {
      console.error("Error fetching provinces:", error);
    }
  } else if (roleCookie === "Shopper") {
    try {
      const response = await userGetAllPosition(token, chabk);

      if (response && typeof response === "object") {
        setNameLogin(
          response?.data?.isAdmin
            ? "ادمین"
            : response?.data?.shoppers[0]?.value
        );
      } else {
        console.error("Invalid data format:", response);
      }
    } catch (error) {
      console.error("Error fetching provinces:", error);
    }
  } else {
    setNameLogin("ادمین");
  }
};