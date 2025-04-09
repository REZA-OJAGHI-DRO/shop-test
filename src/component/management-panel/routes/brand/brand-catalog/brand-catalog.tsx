import { FC } from "react";
import {
  useEffect,
  useState,
  useRef,
  useCallback,
  useSelector,
  InputSelect,
  GetAllBrand,
} from "@/component/management-panel/import-management.js";

import Catalog from "./catalog";

interface CheckDataAll {
  check1: boolean;
  check2: boolean;
  check3: boolean;
  check4: boolean;
  check5: boolean;
  check6: boolean;
}

interface BrandOption {
  key: string;
  value: string;
}

interface State {
  product: {
    token: string;
    chabk: string;
  };
}

const BrandCatalog: FC = () => {
  const token = useSelector<State, string>((state) => state.product.token);
  const chabk = useSelector<State, string>((state) => state.product.chabk);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [messageData, setMessageData] = useState<any[]>([]);
  const [brandId, setBrandId] = useState<string | undefined>(undefined);
  const [brandName, setBrandName] = useState<string | undefined>(undefined); // اضافه کردن state برای نام برند
  const [checkData, setCheckData] = useState<boolean>(false);
  const [checkDataAll, setCheckDataAll] = useState<CheckDataAll>({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
    check5: false,
    check6: false,
  });

  const [options, setOptions] = useState<BrandOption[]>([
    { key: "", value: "" },
  ]);

  // State for toggling visibility of the next div
  const [isSelectVisible, setIsSelectVisible] = useState<boolean>(true);

  const GetBrand = useCallback(() => {
    setIsLoading(true);
    GetAllBrand(
      token,
      chabk,
      setMessageData,
      setCheckData,
      (data: BrandOption[]) => {
        setOptions(data);
        setCheckDataAll((r) => ({ ...r, check2: true }));
      }
    );
  }, [token, chabk]);

  const isFirstRender2 = useRef<boolean>(true);

  useEffect(() => {
    if (isFirstRender2.current) {
      GetBrand();
      isFirstRender2.current = false;
    }
  }, [GetBrand]);

  const handleBrandSelect = (selected: string) => {
    setBrandId(selected);
    const selectedBrand = options.find((option) => option.key === selected);
    setBrandName(selectedBrand ? selectedBrand.value : undefined);
    setIsSelectVisible(false);
  };

  return (
    <>
      <div className="w-full h-[100vh] flex justify-center items-center">
        {isSelectVisible ? (
          <div className="w-[250px] h-[70px] flex flex-wrap gap-2 content-center">
            <h4 className="w-full flex items-center text-[1.2rem]">برند :</h4>
            <div className="w-full flex-wrap flex justify-center content-center">
              <InputSelect
                options={options}
                data={brandId}
                setData={handleBrandSelect}
              />
            </div>
          </div>
        ) : (
          <div className="w-full flex justify-center items-center">
            <Catalog brandId={brandId} brandName={brandName} setIsSelectVisible={setIsSelectVisible}/>
          </div>
        )}
      </div>
    </>
  );
};

export default BrandCatalog;
