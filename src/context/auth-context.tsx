import { createContext, ReactNode, useContext, useState } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { UserRelatedType } from "@/types/user-types";

import { SupplierType } from "@/types/supplier-types";

type AuthProviderProps = {
  children: ReactNode;
};

type AuthContext = {
  userData: UserRelatedType | null;
  setUserData: React.Dispatch<React.SetStateAction<UserRelatedType | null>>;
  supplierData: SupplierType | null;
  setSupplierData: React.Dispatch<React.SetStateAction<SupplierType | null>>;
};

const AuthContext = createContext({} as AuthContext);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [supplierData, setSupplierData] = useLocalStorage<SupplierType | null>(
    "supplier-info",
    null
  );
  const [userData, setUserData] = useLocalStorage<UserRelatedType | null>(
    "user-info",
    null
  );

  return (
    <AuthContext.Provider
      value={{
        userData,
        supplierData,
        setUserData,
        setSupplierData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
