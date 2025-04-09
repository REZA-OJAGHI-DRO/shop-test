import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import {
  React,
  useEffect,
  useRef,
  useState,
  useCallback,
  InputSelect,
  GetListProduct,
  City,
  Button,
  useSelector,
  SuggestionCreate,
  supplierNameGetAll,
  GetProductClassification,
} from "@/component/management-panel/import-management.js";

const FormAdminSuggestions = ({
  setLoad,
  setIsLoading,
  setMessage,
  setCheck,
  setUpdateTable,
  setCheckDataAll,
  updateTable,
  setCheckData,
  setMessageData,
}) => {
  const token = useSelector((state) => state.product.token);
  const chabk = useSelector((state) => state.product.chabk);
  const [entityType, setEntityType] = useState(1);
  function openForm(x) {
    setEntityType(x);
  }

  // ******

  const [options, setOptions] = useState([{ key: "", value: "" }]);
  const [supplierId, setSupplierId] = useState("");
  const GetSupplier = useCallback(() => {
    const keyword = "";
    supplierNameGetAll(
      keyword,
      token,
      chabk,
      setMessageData,
      setCheckData,
      (data) => {
        setOptions(data);
        setCheckDataAll((r) => ({ ...r, check5: true }));
      }
    );
  }, [token, chabk]);
  
  const isFirstRender5 = useRef(true);
  useEffect(() => {
    if (isFirstRender5.current) {
      GetSupplier();
      isFirstRender5.current = false;
    }
  }, [GetSupplier]);
  
  // ***********GetListProduct
  const [options6, setOptions6] = useState([{ key: "", value: "" }]);
  const [commodity, setCommodity] = useState("");

        const GetProduct = useCallback(() => {
          setIsLoading(true);
          GetListProduct(token, chabk, setMessageData, setCheckData, (data) => {
            setOptions6(data);
            setCheckDataAll((r) => ({ ...r, check6: true }));
          });
        }, [token, chabk]);

        const isFirstRender6 = useRef(true);
        useEffect(() => {
          if (isFirstRender6.current) {
            GetProduct();
            isFirstRender6.current = false;
          }
        }, [GetProduct]);

  // ********
  const [dataCityId2, setDataCityId2] = useState("");
  const [dataCityId, setDataCityId] = useState('');
  // ********
  const [options2, setOptions2] = useState([{ key: "1", value: "سطح یک" },{ key: "2", value: "سطح دو" },{ key: "3", value: "سطح سه" }]);
  const [level, setLevel] = useState();
  const [category1, setCategory1] = useState();
  const [category2, setCategory2] = useState();
  const [category3, setCategory3] = useState();
  const [options3, setOptions3] = useState([{ key: "", value: "" }]);
  const [options4, setOptions4] = useState([{ key: "", value: "" }]);
  const [options5, setOptions5] = useState([{ key: "", value: "" }]);
  const UserGet = useCallback(() => {
    // setIsLoading(true);
    GetProductClassification(
      token,
      chabk,
      1,
      null,
      setMessageData,
      setCheckData,
      (data) => {
        setOptions3(data);
        setCheckDataAll((r) => ({ ...r, check1: true }));
      }
    );
  }, []);
  const isFirstRender1 = useRef(true);

  useEffect(() => {
    if (isFirstRender1.current) {
      UserGet();
      isFirstRender1.current = false;
    }
  }, [UserGet]);

  useEffect(()=>{
    setCategory1('')
    setCategory2('')
    setCategory3('')
  },[level])
  useEffect(()=>{
    setCategory2('')
    setCategory3('')
  },[category1])
  useEffect(()=>{
    setCategory3('')
  },[category2])

    const UserGet2 = useCallback(() => {
      // setIsLoading(true);
      GetProductClassification(
        token,
        chabk,
        2,
        category1,
        setMessageData,
        setCheckData,
        (data) => {
          setOptions4(data);
          setCheckDataAll((r) => ({ ...r, check1: true }));
        }
      );
    }, [category1]);
  
    useEffect(() => {
      UserGet2();
    }, [UserGet2]);

      const UserGet3 = useCallback(() => {
        // setIsLoading(true);
        GetProductClassification(
          token,
          chabk,
          3,
          category2,
          setMessageData,
          setCheckData,
          (data) => {
            setOptions5(data);
            setCheckDataAll((r) => ({ ...r, check1: true }));
          }
        );
      }, [category2]);
    
      useEffect(() => {
        UserGet3();
      }, [UserGet3]);


  // Form control using react-hook-form
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      supplierId,
      commodity,
      dataCityId2,
      level,
      category1,
      category2,
      category3
    },
  });


  // Update form fields if needed
  useEffect(() => {
    reset({supplierId , commodity , dataCityId2 , level , category1 , category2 , category3});
  }, [supplierId , commodity , dataCityId2 , level , category1 , category2 , category3 ,reset]);

  const mutation = useMutation({
    mutationFn: SuggestionCreate,
    onMutate: () => {
      //   setIsLoading(true);
      setLoad(true);
    },
    onSuccess: (result) => {
      //   setIsLoading(false);
      setMessage(result.error ? result.error : result.message);
      if (result.isSuccess) {
        reset({supplierId , commodity , dataCityId2 , level , category1 , category2 , category3});
        setCommodity('')
        setCategory1('')
        setCategory2('')
        setCategory3('')
        setDataCityId2('')
        setDataCityId('')
        setSupplierId('')
        setLevel()
        setTimeout(() => {
          setUpdateTable(!updateTable);
          setLoad(false);
        }, 1500);
        setCheck((prev) => ({ ...prev, check1: true }));
        setTimeout(() => {
          setMessage("");
          setCheck((prev) => ({ ...prev, check2: false }));
          setCheck((prev) => ({ ...prev, check1: false }));
        }, 5000);
      } else {
        setCheck((prev) => ({ ...prev, check1: true }));
        setLoad(false);
        setTimeout(() => {
          setMessage("");
          setCheck((prev) => ({ ...prev, check2: false }));
          setCheck((prev) => ({ ...prev, check1: false }));
        }, 5000);
      }
    },
    onError: (error) => {
      //   setIsLoading(false);
      setLoad(false);
      setMessage(error.message || "عملیات با خطا مواجه شد");
      setCheck((prev) => ({ ...prev, check4: true }));
      setTimeout(() => {
        setMessage("");
        setCheck((prev) => ({ ...prev, check4: false }));
      }, 5000);
    },
    onSettled: () => {
      //   setIsLoading(false);
      setLoad(false);
    },
  });

  const onSubmit = async (dataAll) => {
    setCheck((prev) => ({
      ...prev,
      check1: false,
      check2: false,
      check3: false,
      check4: false,
    }));

    const updatedDataAll = {
      data: {
        suggestedEntityId:entityType == 1 ? commodity : entityType==2 ? supplierId : '',
        entityType:entityType,
        categoryId:level==1?category1:level==2?category2:level==3?category3:'',
        categoryLevel:level,
        cityId:dataCityId2
      },
      token,
      chabk,
      setCheckData,
      setMessage,
    };
    
    mutation.mutate({updatedDataAll});
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-wrap gap-4 justify-center "
    >
      <div className="w-full px-4 py-2 flex gap-4 justify-center flex-wrap ">
        <div className="w-[100%] md:w-[45%] xl:w-[30%] flex justify-center">
          <Button
            value={"کالا"}
            click={() => openForm(1)}
            styleButton={entityType == 1 ? 24 : 18}
          />
        </div>
        <div className="w-[100%] md:w-[45%] xl:w-[30%] flex justify-center">
          <Button
            value={"تامین کننده"}
            click={() => openForm(2)}
            styleButton={entityType == 2 ? 24 : 18}
          />
        </div>
      </div>
      {entityType == 1 ? (
          <div className="w-[100%] lg:w-[32%] flex flex-wrap items-end pb-[3px]">
          <p className="w-full text-[1.2rem] xl:text-[1rem]">* کالا :</p>
          <Controller
            name="commodity"
            control={control}
            rules={{
              required: {
                value:entityType==1 ? true : false,
                message: "انتخاب کالا الزامی است",
              },
            }}
            render={({ field }) => (
              <InputSelect
                options={options6}
                data={commodity}
                setData={(selected) => {
                  setCommodity(selected);
                  field.onChange(selected);
                }}
              />
            )}
          />
          {errors.commodity && (
            <p style={{ color: "red" }}>{errors.commodity.message}</p>
          )}
        </div>
      ) : (
        <div className="w-[100%] lg:w-[32%] flex flex-wrap items-end pb-[3px]">
          <p className="w-full text-[1.2rem] xl:text-[1rem]">* تامین کننده :</p>
          <Controller
            name="supplierId"
            control={control}
            rules={{
              required: {
                value:entityType==2 ? true : false,
                message: "انتخاب نام تامین کننده الزامی است",
              },
            }}
            render={({ field }) => (
              <InputSelect
                options={options}
                data={supplierId}
                setData={(selected) => {
                  setSupplierId(selected);
                  field.onChange(selected);
                }}
              />
            )}
          />
          {errors.supplierId && (
            <p style={{ color: "red" }}>{errors.supplierId.message}</p>
          )}
        </div>
      )}
            <div className="w-[100%] lg:w-[64%] ">
        <Controller
          name="dataCityId2"
          control={control}
          rules={{
            required: {
              value: false,
              message: "لطفاً شهر خود را انتخاب کنید",
            },
          }}
          render={({ field }) => (
            <City
              {...field}
              control={control}
              name="dataCityId2"
              dataCityId={dataCityId}
              setDataCityId={setDataCityId}
              dataCityId2={dataCityId2}
              setDataCityId2={setDataCityId2}
              selectedProvinceData={dataCityId}
              selectedCityData={''}
              styleLabel={"text-[1.2rem] xl:text-[1rem] text-black"}
            />
          )}
        />
        {errors.dataCityId2 && (
          <p style={{ color: "red" }}>{errors.dataCityId2.message}</p>
        )}
      </div>
      <div className="w-[100%] lg:w-[32%] flex flex-wrap items-end pb-[3px]">
          <p className="w-full text-[1.2rem] xl:text-[1rem]">* سطح دسته بندی :</p>
          <Controller
            name="level"
            control={control}
            rules={{
              required: {
                value: false,
                message: "انتخاب دسته بندی  الزامی است",
              },
            }}
            render={({ field }) => (
              <InputSelect
                options={options2}
                data={level}
                setData={(selected) => {
                  setLevel(selected);
                  field.onChange(selected);
                }}
              />
            )}
          />
          {errors.level && (
            <p style={{ color: "red" }}>{errors.level.message}</p>
          )}
        </div>
        {level==1?
          <div className="w-[100%] lg:w-[32%] flex flex-wrap items-end pb-[3px]">
          <p className="w-full text-[1.2rem] xl:text-[1rem]">* دسته بندی سطح یک:</p>
          <Controller
            name="category1"
            control={control}
            rules={{
              required: {
                value: level==1? true : false,
                message: "انتخاب دسته بندی سطح یک الزامی است",
              },
            }}
            render={({ field }) => (
              <InputSelect
                options={options3}
                data={category1}
                setData={(selected) => {
                  setCategory1(selected);
                  field.onChange(selected);
                }}
              />
            )}
          />
          {errors.category1 && (
            <p style={{ color: "red" }}>{errors.category1.message}</p>
          )}
        </div>
        :level==2?
        <>
        <div className="w-[100%] lg:w-[32%] flex flex-wrap items-end pb-[3px]">
        <p className="w-full text-[1.2rem] xl:text-[1rem]">* دسته بندی سطح یک:</p>
        <Controller
          name="category1"
          control={control}
          rules={{
            required: {
              value: level==2? true : false,
              message: "انتخاب دسته بندی سطح یک الزامی است",
            },
          }}
          render={({ field }) => (
            <InputSelect
              options={options3}
              data={category1}
              setData={(selected) => {
                setCategory1(selected);
                field.onChange(selected);
              }}
            />
          )}
        />
        {errors.category1 && (
          <p style={{ color: "red" }}>{errors.category1.message}</p>
        )}
      </div>
      {category1?
        <div className="w-[100%] lg:w-[32%] flex flex-wrap items-end pb-[3px]">
        <p className="w-full text-[1.2rem] xl:text-[1rem]">* دسته بندی سطح دو:</p>
        <Controller
          name="category2"
          control={control}
          rules={{
            required: {
              value: level==2? true : false,
              message: "انتخاب دسته بندی سطح دو الزامی است",
            },
          }}
          render={({ field }) => (
            <InputSelect
              options={options4}
              data={category2}
              setData={(selected) => {
                setCategory2(selected);
                field.onChange(selected);
              }}
            />
          )}
        />
        {errors.category2 && (
          <p style={{ color: "red" }}>{errors.category2.message}</p>
        )}
      </div>
        :''}
        </>
        :level==3?
        <>
           <div className="w-[100%] lg:w-[32%] flex flex-wrap items-end pb-[3px]">
        <p className="w-full text-[1.2rem] xl:text-[1rem]">* دسته بندی سطح یک:</p>
        <Controller
          name="category1"
          control={control}
          rules={{
            required: {
              value: level==3? true : false,
              message: "انتخاب دسته بندی سطح یک الزامی است",
            },
          }}
          render={({ field }) => (
            <InputSelect
              options={options3}
              data={category1}
              setData={(selected) => {
                setCategory1(selected);
                field.onChange(selected);
              }}
            />
          )}
        />
        {errors.category1 && (
          <p style={{ color: "red" }}>{errors.category1.message}</p>
        )}
      </div>
      {category1?
        <div className="w-[100%] lg:w-[32%] flex flex-wrap items-end pb-[3px]">
        <p className="w-full text-[1.2rem] xl:text-[1rem]">* دسته بندی سطح دو:</p>
        <Controller
          name="category2"
          control={control}
          rules={{
            required: {
              value: level==3? true : false,
              message: "انتخاب دسته بندی سطح دو الزامی است",
            },
          }}
          render={({ field }) => (
            <InputSelect
              options={options4}
              data={category2}
              setData={(selected) => {
                setCategory2(selected);
                field.onChange(selected);
              }}
            />
          )}
        />
        {errors.category2 && (
          <p style={{ color: "red" }}>{errors.category2.message}</p>
        )}
      </div>
        :''}
         {category2?
        <div className="w-[100%] lg:w-[32%] flex flex-wrap items-end pb-[3px]">
        <p className="w-full text-[1.2rem] xl:text-[1rem]">* دسته بندی سطح سه:</p>
        <Controller
          name="category3"
          control={control}
          rules={{
            required: {
              value: level==3? true : false,
              message: "انتخاب دسته بندی سطح سه الزامی است",
            },
          }}
          render={({ field }) => (
            <InputSelect
              options={options5}
              data={category3}
              setData={(selected) => {
                setCategory3(selected);
                field.onChange(selected);
              }}
            />
          )}
        />
        {errors.category3 && (
          <p style={{ color: "red" }}>{errors.category3.message}</p>
        )}
      </div>
        :''}
        </>
        :""}

      <div className="w-full h-[100px] items-center flex justify-center">
        <button
          type="submit"
          className="w-[25%] h-[35px] bg-custom-green shadow-custom-6 px-2 hover:scale-95 transition-all duration-300 text-white rounded-2xl text-[1.1rem] flex justify-center items-center"
        >
          ثبت
        </button>
      </div>
    </form>
  );
};

export default FormAdminSuggestions;
