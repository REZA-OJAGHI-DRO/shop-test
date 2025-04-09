import { Controller, useForm } from "react-hook-form";
import { Image } from "antd";
import { useMutation } from "@tanstack/react-query";
import {
  React,
  useEffect,
  useState,
  InputNumber,
  useSelector,
  GetCookie,
  CheckBoxAccordion2,
  InputTextArea,
  ImageUpload,
  areArraysEqual,
  Price,
  postGoodUpdate,
} from "@/component/management-panel/import-management.js";

const FormUpdate = ({
  data,
  setData,
  setLoad,
  setLoad3,
  setCheck,
  setMessage,
  setUpdateTable,
  updateTable,
  setImage2,
  image2,
  setDataImages2,
  dataImages2,
  setImagesEdited,
  imagesEdited,
  setShowDeleteModalImg,
  setDataDeleteImg,
  setCheckData,
  setIsLoading,
  dataEditCheck,
  status,
  setShowEditModal,
  // setMessageData
}) => {
  const token = useSelector((state) => state.product.token);
  const chabk = useSelector((state) => state.product.chabk);

  const [roleCookie, setRoleCookie] = useState(GetCookie("role"));

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [supplierCode, setSupplierCode] = useState("");
  const [brand, setBrand] = useState("");
  const [unit, setUnit] = useState("");
  const [countInBox, setCountInBox] = useState("");
  const [packageType, setPackageType] = useState("");
  const [price, setPrice] = useState("");
  const [inStock, setInStock] = useState(true);
  const [inStockCount, setInStockCount] = useState("");
  const [description, setDescription] = useState("");
  // ********
  const [activeCheckbox1, setActiveCheckbox1] = useState(0);
  const [checked1, setChecked1] = useState(false);
  const [styleError1, setStyleError1] = useState(false);
  const [data1, setData1] = useState("");
  const handleCheck1 = (index) => {
    if (status == 1) {
      return;
    } else {
      if (index !== activeCheckbox1) {
        setActiveCheckbox1(index);
        setChecked1(true);
        setStyleError1(false);
        setData1(index === 0 ? 1 : 2);
      }
      if (index == 0) {
        setInStock(true);
      } else if (index == 1) {
        setInStock(false);
      }
    }
  };
  // ********
  const [dataT, setDataT] = useState();

  useEffect(() => {
    // if (data) {
      setName(data?.name);
      setCategory(data?.category?.value);
      setSupplierCode(data?.supplierCode);
      setBrand(data?.brand?.name);
      setPackageType(data?.packageType);
      setCountInBox(data?.countInBox);
      setUnit(data?.unit);
      setDataT(data);
      //   setEditFormData(data);
      setInStock(data?.inStock);
      setPrice(data?.price);
      setInStockCount(data?.inStockCount);
      setDescription(data?.description);
      setImage2(data?.files.map((file) => file.link));
      setDataImages2(data?.files.map((file) => file.fileId));
      setActiveCheckbox1(data?.inStock == true ? 0 : 1);
      setImagesEdited(false);
    // } else {
    //   setDataT();
    //   //   setEditFormData(data);
    //   setName("");
    //   setCategory([]);
    //   setSupplierCode("");
    //   setBrand([]);
    //   setPackageType("");
    //   setCountInBox("");
    //   setUnit("");
    //   setData();
    //   setInStock(true);
    //   setPrice("");
    //   setInStockCount("");
    //   setDescription("");
    //   setImage2([]);
    //   setDataImages2([]);
    //   setActiveCheckbox1(0);
    //   setImagesEdited();
    // }
  }, [data, dataEditCheck]);

  useEffect(() => {
    setImagesEdited(
      areArraysEqual(
        data?.files.map((file) => file.fileId),
        dataImages2
      ) == true
        ? true
        : false
    );
  }, [dataImages2]);
  //   **********
  const {
    control,
    // register, // برای ثبت کردن فیلدها
    handleSubmit, // برای هندل کردن سابمیت فرم
    formState: { errors }, // برای مدیریت خطاها
    reset,
  } = useForm({
    defaultValues: {
      name,
      category,
      supplierCode,
      brand,
      packageType,
      countInBox,
      unit,
      price,
      inStockCount,
      description,
    },
  });

  useEffect(() => {
    reset({
      name,
      category,
      supplierCode,
      brand,
      packageType,
      countInBox,
      unit,
      price,
      inStockCount,
      description,
    });
  }, [
    price,
    inStockCount,
    description,
    name,
    category,
    supplierCode,
    brand,
    packageType,
    countInBox,
    unit,
    reset,
  ]);

  const mutation = useMutation({
    mutationFn: postGoodUpdate,
    onMutate: () => {
      setIsLoading(true);
      setLoad3(true)
    },
    onSuccess: (result) => {
      setIsLoading(false);
      setMessage(result.error ? result.error : result.message);
      if (result.isSuccess) {
        setTimeout(() => {
          setUpdateTable(!updateTable);
        }, 1500);
        setCheck((prev) => ({ ...prev, check1: true }));
        setData();
        setInStock(false);
        setPrice("");
        setInStockCount("");
        setDescription("");
        setDataImages2([]);
        setImagesEdited(false);
        setShowEditModal(false)
        // setReset(true);
        setLoad3(false)
        setTimeout(() => {
          setMessage("");
          setCheck((prev) => ({ ...prev, check2: false }));
          setCheck((prev) => ({ ...prev, check1: false }));
        }, 5000);
      } else {
        setCheck((prev) => ({ ...prev, check1: true }));
        setLoad3(false)
        setTimeout(() => {
          setMessage("");
          setCheck((prev) => ({ ...prev, check2: false }));
          setCheck((prev) => ({ ...prev, check1: false }));
        }, 5000);
      }
    },
    onError: (error) => {
      setIsLoading(false);
      setLoad3(false)
      setMessage(error.message || "عملیات با خطا مواجه شد");
      setCheck((prev) => ({ ...prev, check4: true }));
      setTimeout(() => {
        setMessage("");
        setCheck((prev) => ({ ...prev, check4: false }));
      }, 5000);
    },
    onSettled: () => {
      setIsLoading(false);
      setLoad3(false)
    },
  });

  const onSubmit = async (dataAll) => {
    setCheck((r) => ({ ...r, check1: false }));
    setCheck((r) => ({ ...r, check2: false }));
    setCheck((r) => ({ ...r, check3: false }));
    setCheck((r) => ({ ...r, check4: false }));

    if (!dataT) {
      setMessage("لطفا از جدول پایین کالا خود را برای ویرایش انتخاب کنید");
      setCheck((r) => ({ ...r, check3: true }));
      setTimeout(() => {
        setCheck((r) => ({ ...r, check3: false }));
      }, 5000);
    } else {
      let hasChanged =
        dataT?.price.toLocaleString() !== dataAll?.price.toLocaleString() ||
        dataT?.inStock !== inStock ||
        dataT?.inStockCount !== Number(dataAll?.inStockCount) ||
        imagesEdited ||
        dataT?.description !== dataAll?.description;

      if (hasChanged) {
        setImagesEdited(
          areArraysEqual(
            dataT.files.map((file) => file.fileId),
            dataImages2
          ) == true
            ? true
            : false
        );

        const updatedDataAll = {
          dataEdit: {
            goodCodeId: dataT?.goodCodeId,
            price: dataAll?.price,
            inStock: inStock,
            inStockCount: Number(dataAll?.inStockCount),
            imagesEdited: imagesEdited,
            images:
              imagesEdited === true
                ? dataImages2 === undefined
                  ? []
                  : dataImages2
                : null,
            description: dataAll?.description,
          },
          token,
          chabk,
          setCheckData,
          setMessage,
        };
  
        mutation.mutate({updatedDataAll});
      } else {
        setCheck((r) => ({ ...r, check3: true }));
        setMessage("هیچ تغییری صورت نگرفته");
        setTimeout(() => {
          setCheck((r) => ({ ...r, check3: false }));
          setMessage("");
        }, 5000);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-wrap gap-4"
    >
      <article className="w-full px-4 py-2 flex gap-4 rounded-2xl shadow-custom-6 justify-around flex-wrap boxFilter ">
        <div className="w-[100%] lg:w-[45%] xl:w-[23%]">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <InputNumber
                {...field}
                type="text"
                placeholder={"ندارد"}
                label={"نام کالا :"}
                svg={false}
                width={"w-[100%]"}
                value={name}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 11) {
                    setName(value);
                    field.onChange(e);
                  }
                }}
                styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
                styleInput={
                  "text-[1rem] xl:text-[1rem] h-[40px] xl:h-[35px]  cursor-no-drop"
                }
                styleBox={"bg-[rgba(0,0,0,.1)]"}
                disabled={true}
              />
            )}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        </div>
        <div className="w-[100%] lg:w-[45%] xl:w-[23%]">
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <InputNumber
                {...field}
                type="text"
                placeholder={"ندارد"}
                label={"دسته بندی کالا :"}
                svg={false}
                width={"w-[100%]"}
                value={category}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 11) {
                    setCategory(value);
                    field.onChange(e);
                  }
                }}
                styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
                styleInput={
                  "text-[1rem] xl:text-[1rem] h-[40px] xl:h-[35px]  cursor-no-drop"
                }
                styleBox={"bg-[rgba(0,0,0,.1)]"}
                disabled={true}
              />
            )}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        </div>
        <div className="w-[100%] lg:w-[45%] xl:w-[23%]">
          <Controller
            name="supplierCode"
            control={control}
            render={({ field }) => (
              <InputNumber
                {...field}
                type="text"
                placeholder={"ندارد"}
                label={"شناسه کد کالا تامین کننده :"}
                svg={false}
                width={"w-[100%]"}
                value={supplierCode}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 11) {
                    setSupplierCode(value);
                    field.onChange(e);
                  }
                }}
                styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
                styleInput={
                  "text-[1rem] xl:text-[1rem] h-[40px] xl:h-[35px]  cursor-no-drop"
                }
                styleBox={"bg-[rgba(0,0,0,.1)]"}
                disabled={true}
              />
            )}
          />
          {errors.supplierCode && (
            <p style={{ color: "red" }}>{errors.supplierCode.message}</p>
          )}
        </div>
        <div className="w-[100%] lg:w-[45%] xl:w-[23%]">
          <Controller
            name="brand"
            control={control}
            render={({ field }) => (
              <InputNumber
                {...field}
                type="text"
                placeholder={"ندارد"}
                label={"برند کالا :"}
                svg={false}
                width={"w-[100%]"}
                value={brand}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 11) {
                    setBrand(value);
                    field.onChange(e);
                  }
                }}
                styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
                styleInput={
                  "text-[1rem] xl:text-[1rem] h-[40px] xl:h-[35px]  cursor-no-drop"
                }
                styleBox={"bg-[rgba(0,0,0,.1)]"}
                disabled={true}
              />
            )}
          />
          {errors.brand && (
            <p style={{ color: "red" }}>{errors.brand.message}</p>
          )}
        </div>
        <div className="w-[100%] lg:w-[45%] xl:w-[23%]">
          <Controller
            name="packageType"
            control={control}
            render={({ field }) => (
              <InputNumber
                {...field}
                type="text"
                placeholder={"ندارد"}
                label={"نوع بسته بندی کالا :"}
                svg={false}
                width={"w-[100%]"}
                value={packageType}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 11) {
                    setPackageType(value);
                    field.onChange(e);
                  }
                }}
                styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
                styleInput={
                  "text-[1rem] xl:text-[1rem] h-[40px] xl:h-[35px]  cursor-no-drop"
                }
                styleBox={"bg-[rgba(0,0,0,.1)]"}
                disabled={true}
              />
            )}
          />
          {errors.packageType && (
            <p style={{ color: "red" }}>{errors.packageType.message}</p>
          )}
        </div>
        <div className="w-[100%] lg:w-[45%] xl:w-[23%]">
          <Controller
            name="countInBox"
            control={control}
            render={({ field }) => (
              <InputNumber
                {...field}
                type="text"
                placeholder={"ندارد"}
                label={"تعداد در کارتن یا عدل :"}
                svg={false}
                width={"w-[100%]"}
                value={countInBox}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 11) {
                    setCountInBox(value);
                    field.onChange(e);
                  }
                }}
                styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
                styleInput={
                  "text-[1rem] xl:text-[1rem] h-[40px] xl:h-[35px]  cursor-no-drop"
                }
                styleBox={"bg-[rgba(0,0,0,.1)]"}
                disabled={true}
              />
            )}
          />
          {errors.countInBox && (
            <p style={{ color: "red" }}>{errors.countInBox.message}</p>
          )}
        </div>
        <div className="w-[100%] lg:w-[45%] xl:w-[23%]">
          <Controller
            name="unit"
            control={control}
            render={({ field }) => (
              <InputNumber
                {...field}
                type="text"
                placeholder={"ندارد"}
                label={"واحد کالا :"}
                svg={false}
                width={"w-[100%]"}
                value={unit}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 11) {
                    setUnit(value);
                    field.onChange(e);
                  }
                }}
                styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
                styleInput={
                  "text-[1rem] xl:text-[1rem] h-[40px] xl:h-[35px]  cursor-no-drop"
                }
                styleBox={"bg-[rgba(0,0,0,.1)]"}
                disabled={true}
              />
            )}
          />
          {errors.unit && <p style={{ color: "red" }}>{errors.unit.message}</p>}
        </div>
        <div className="w-[100%] lg:w-[45%] xl:w-[30%] flex flex-wrap">
          <Controller
            name="price"
            control={control}
            rules={{
              required: {
                value: data ? true : false,
                message: "وارد کردن قیمت اصلی بدون تخفیف الزامی است",
              },
            }}
            render={({ field }) => (
              <Price
                {...field}
                placeholder={"لطفا مبلغ را وارد کنید ..."}
                label={"قیمت اصلی بدون تخفیف :"}
                svg={false}
                width={"w-[100%]"}
                max={""}
                data={price}
                setData={(value) => {
                  setPrice(value)
                  if (/^[0-9]*$/.test(value)) {
                    field.onChange(value);
                  }
                }}
                styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
                styleInput={
                  status == 1
                    ? "text-[1rem] xl:text-[1rem] h-[35px] cursor-no-drop"
                    : "text-[1rem] xl:text-[1rem] h-[35px]"
                }
                styleBox={status == 1 ? "bg-[rgba(0,0,0,.1)]" : "bg-[#ffffff]"}
                disabled={status == 1 ? true : false}
              />
            )}
          />

          {/* نمایش پیام خطا */}
          {errors.price && (
            <p style={{ color: "red" }}>{errors.price.message}</p>
          )}
        </div>
        <div className="w-[100%] lg:w-[45%]  xl:w-[30%] flex justify-around flex-wrap gap-1">
          <p className="w-[100%] flex justify-start px-3 text-black text-[1rem] lg:text-[1rem] mb-2">
            موجودی کالا :
          </p>
          <div className="w-[40%]">
            <CheckBoxAccordion2
              label={"موجود"}
              isChecked={activeCheckbox1 === 0}
              onCheck={() => handleCheck1(0)}
            />
          </div>
          <div className="w-[40%]">
            <CheckBoxAccordion2
              label={"ناموجود"}
              isChecked={activeCheckbox1 === 1}
              onCheck={() => handleCheck1(1)}
            />
          </div>
        </div>
        <div className="w-[100%] lg:w-[45%] xl:w-[30%]">
          <Controller
            name="inStockCount"
            control={control}
            rules={{
              pattern: {
                value: /^[1-9][0-9]*$/,
                message:
                  "تعداد موجودی فقط باید شامل اعداد باشد و نباید با صفر شروع شود",
              },
            }}
            render={({ field }) => (
              <InputNumber
                {...field}
                type="text"
                placeholder={"لطفا تعداد موجودی را وارد کنید ..."}
                label={"تعداد موجودی :"}
                svg={false}
                width={"w-[100%]"}
                value={inStockCount}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, "");
                  if (value.startsWith("0")) {
                    value = value.slice(1);
                  }
                  setInStockCount(value);
                  field.onChange(value);
                }}
                styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
                styleInput={
                  status == 1
                    ? "text-[1rem] xl:text-[1rem] h-[35px] cursor-no-drop"
                    : "text-[1rem] xl:text-[1rem] h-[35px]"
                }
                styleBox={status == 1 ? "bg-[rgba(0,0,0,.1)]" : "bg-[#ffffff]"}
                disabled={status == 1 ? true : false}
              />
            )}
          />
          {errors.inStockCount && (
            <p style={{ color: "red" }}>{errors.inStockCount.message}</p>
          )}
        </div>
        <div className="w-[100%] lg:w-[60%] rounded-none">
          <Controller
            name="description"
            control={control}
            rules={{
              required: {
                value: false,
                message: "لطفاً توضیحات خود را وارد کنید",
              },
            }}
            render={({ field }) => (
              <InputTextArea
                {...field}
                type="text"
                label={"توضیحات :"}
                width={"w-[100%] rounded-none"}
                placeholder={"توضیحات خود را وارد کنید"}
                styleLabel={"black"}
                value={description}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 200) {
                    setDescription(value);
                    field.onChange(e);
                  }
                }}
                styleTextarea={
                  status == 1
                    ? " h-[100px] cursor-no-drop bg-[rgba(0,0,0,.1)]"
                    : "bg-white h-[100px]"
                }
                disabled={status == 1 ? true : false}
              />
            )}
          />
          {errors.description && (
            <p style={{ color: "red" }}>{errors.description.message}</p>
          )}
        </div>
        <div className="w-[100%] lg:w-[60%] rounded-none">
          {status == 1 ? (
            <>
              <p className="w-[100%] xl:w-[100%] rounded-lg overflow-hidden py-1 px-2">
                تصاویر کالا :
              </p>
              <Image.PreviewGroup
                preview={{
                  onChange: (current, prev) =>
                    console.log(
                      `current index: ${current}, prev index: ${prev}`
                    ),
                }}
              >
                <div className="w-full flex flex-wrap gap-3 ">
                  {image2 &&
                    image2?.map((val, i) => {
                      return (
                        <>
                          <Image key={i} height={100} src={val} />
                        </>
                      );
                    })}
                </div>
              </Image.PreviewGroup>
            </>
          ) : (
            <ImageUpload
              width={"w-[100%] "}
              label={"تصاویر کالا :"}
              setData={setDataImages2}
              data={dataImages2}
              styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
              styleBox={" boxFilter"}
              disabled={false}
              type={3}
              setLoad={setLoad}
              fileType={"image"}
              setCheck={setCheck}
              setMessage={setMessage}
              setShowDeleteModal={setShowDeleteModalImg}
              setDataDelete={setDataDeleteImg}
              setImage={setImage2}
              image={image2}
            />
          )}
        </div>
      </article>

      {/* دکمه ارسال */}
      {status == 1 ? (
        <></>
      ) : (
        <div className="w-full h-[100px] items-center flex justify-center">
          <button
            type="submit"
            className={
              " w-[25%] h-[35px] bg-custom-green shadow-custom-6 px-2 hover:scale-95  transition-all duration-300 text-white rounded-2xl text-[1.1rem] flex justify-center items-center"
            }
          >
            ثبت ویرایش
          </button>
        </div>
      )}
    </form>
  );
};

export default FormUpdate;
