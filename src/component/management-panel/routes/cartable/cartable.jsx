import { useQuery } from "@tanstack/react-query";
import Requests from "./requests/requests";
import {
  useCallback,
  useEffect,
  useState,
  WithSupport2,
  Svg1,
  Svg2,
  Svg1Cartable,
  Svg2Cartable,
  Svg3Cartable,
  Svg4Cartable,
  loadUserGetAllPosition,
  useSelector,
  GetCookie,
  SelectInput,
} from "@/component/management-panel/import-management.js";
import supplierService from "@/services-v2/supplier-service";
function Cartable() {
  const token = useSelector((state) => state.product.token);
  const chabk = useSelector((state) => state.product.chabk);
  // *********roleCookie
  const [role, setRole] = useState("");
  useEffect(() => {
    const roleCookie = GetCookie("role");
    setRole(roleCookie);
  }, []);
  // *********UserGet
  const [id, setId] = useState(null);
  const [nameLogin, setNameLogin] = useState("");
  const UserGet = useCallback(() => {
    loadUserGetAllPosition(role, token, chabk, setId, setNameLogin);
  }, [role, token, chabk, setId, setNameLogin]);
  useEffect(() => {
    UserGet();
  }, [UserGet, id]);
  // *********menu
  const menu = [
    {
      id: 1,
      name: "درخواست ها",
      icon: <Svg1Cartable />,
    },
    {
      id: 2,
      name: "پذیرش شده ها",
      icon: <Svg2Cartable />,
    },
    {
      id: 3,
      name: "تامین اعتبار شده",
      icon: <Svg3Cartable />,
    },
    {
      id: 4,
      name: "حمل و تحویل",
      icon: <Svg4Cartable />,
    },
    {
      id: 5,
      name: "اتمام",
      icon: ``,
    },
  ];
  const [x, setX] = useState(1);
  function clickMenu(id) {
    setX(id);
  }
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const suppliersListQuery = useQuery({
    queryKey: ["get-all-suppliers"],
    queryFn: () => supplierService.getAll({ keyword: "" }),
  });

  return (
    <>
      <style>
        {`
          .boxFilter{
            background:#ffffff4f;
            backdrop-filter:blur(10px);
          }
          .boxFilter18{
            background:#ffffff4f;
            backdrop-filter:blur(10px);
            }
            .boxFilter4{
              backdrop-filter:blur(10px);
          }
          `}
      </style>
      <div className="w-full min-h-[100vh] overflow-hidden flex justify-center  flex-wrap content-between">
        <div className="w-[100%] flex justify-center flex-wrap">
          <>
            <div className=" w-full">
              <div
                className={`w-full flex py-2 px-4 mb-4 ${
                  role === "Admin" ? "justify-between" : "justify-end"
                }`}
              >
                {role == "Admin" && (
                  <div className="w-[50%] flex gap-3 content-center">
                    <div className="w-[48%] flex-wrap flex justify-start content-center">
                      <SelectInput
                        options={suppliersListQuery.data?.data}
                        data={selectedSupplier}
                        setData={setSelectedSupplier}
                        hasError={false}
                        placeholder={"انتخاب تامین کننده ..."}
                      />
                    </div>
                  </div>
                )}
                <div className="flex gap-2">
                  <div className="bg-[#B886FF] w-[30px] h-[30px] flex items-center justify-center rounded-lg">
                    <Svg1 />
                  </div>
                  <div className="bg-[#ffffff] w-[30px] h-[30px] flex items-center justify-center rounded-lg">
                    <Svg2 />
                  </div>
                  <p className=" h-[30px] text-[1.2rem] flex items-center justify-center">
                    {nameLogin}
                  </p>
                  <div className="w-[30px] h-[30px] flex items-center justify-center rounded-lg">
                    <i className="bi bi-chevron-down"></i>
                  </div>
                </div>
              </div>
              <div className="w-full h-[90px] flex flex-wrap justify-center gap-5 items-center  bg-[rgba(255,255,255,0.39)] py-2">
                {menu &&
                  menu.map((val) => {
                    return (
                      <>
                        <div className="w-fit h-full flex flex-wrap justify-center gap-2">
                          <div
                            key={val.id}
                            onClick={() => clickMenu(val.id)}
                            className="w-full h-[70px] gap-2 cursor-pointer transition-all duration-300 hover:scale-95 px-2 rounded-xl bg-[#B886FF] text-white  flex flex-wrap justify-center items-center"
                          >
                            <p>{val.name}</p>
                            {val.icon}
                          </div>
                          <div
                            style={{ display: val.id == x ? "flex" : "none" }}
                            className="w-full h-[4px] bg-[#B886FF] rounded-full"
                          ></div>
                        </div>
                      </>
                    );
                  })}
              </div>
            </div>
            <div className="w-full">
              <div className="w-full flex" dir="ltr">
                <section
                  dir="rtl"
                  className="w-full h-full flex flex-wrap justify-center content-start gap-8"
                >
                  {x == 1 ? (
                    <Requests supplierId={selectedSupplier || undefined} />
                  ) : (
                    ""
                  )}
                </section>
              </div>
            </div>
          </>
        </div>
        <div className="w-full h-[50px] flex justify-center items-center pt-1">
          <WithSupport2 />
        </div>
      </div>
    </>
  );
}

export default Cartable;
