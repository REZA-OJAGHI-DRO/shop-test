import { Controller, useForm } from "react-hook-form";
import FormFeature from "./form-feature";
import { useMutation } from "@tanstack/react-query";
import {
  React,
  useEffect,
  useState,
  InputNumber,
  useSelector,
  GetCookie,
  InputSelect,
  SelectInputMultiStage,
  InputTextArea,
  ImageUpload,
  Button,
  sendRegisterOfGoods,
  CheckBoxAccordion2,
  Price,
} from "@/component/management-panel/import-management.js";

const FormRegister = ({
  data,
  setData,
  setLoad,
  setLoad3,
  setCheck,
  setMessage,
  setUpdateTable,
  updateTable,
  setCheckData,
  setIsLoading,
  dataEditCheck,
  status,
  // setMessageData
  options2,
  options4,
  options3,
  options1,
  options6,
  options7,
  parentCategoryId,
  parentCategoryId2,
  setParentCategoryId,
  setParentCategoryId2,
  setSubCategoryId,
  subCategoryId,
  dataImages,
  setDataImages,
  setShowDeleteModal,
  setDataDelete,
  setImage,
  image,
  supplierId,
}) => {
  const token = useSelector((state) => state.product.token);
  const chabk = useSelector((state) => state.product.chabk);

  const [roleCookie, setRoleCookie] = useState(GetCookie("role"));

  const [dataFeature, setDataFeature] = useState([]);
  const [name, setName] = useState("");
  const [brandId, setBrandId] = useState("");
  const [unitId, setUnitId] = useState("");
  const [packageTypeId, setPackageTypeId] = useState("");
  const [description, setDescription] = useState("");

  const [extendedPropertyTitle, setExtendedPropertyTitle] = useState("");
  const [supplierCode, setSupplierCode] = useState("");
  const [countInBox, setCountInBox] = useState("");
  const [price, setPrice] = useState("");
  const [inStock, setInStock] = useState(true);
  const [inStockCount, setInStockCount] = useState("");
  //   ********
  const [goodCodes, setGoodCodes] = useState(false);
  const [goodCodes2, setGoodCodes2] = useState(false);
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
    //   setName(data?.name);
    //   setCategory(data?.category?.value);
    //   setSupplierCode(data?.supplierCode);
    //   setBrand(data?.brand?.name);
    //   setPackageType(data?.packageType);
    //   setCountInBox(data?.countInBox);
    //   setUnit(data?.unit);
    //   setDataT(data);
    //   setEditFormData(data);
    //   setInStock(data?.inStock);
    //   setPrice(data?.price);
    //   setInStockCount(data?.inStockCount);
    //   setDescription(data?.description);
    //   setImage2(data?.files.map((file) => file.link));
    //   setDataImages2(data?.files.map((file) => file.fileId));
    //   setActiveCheckbox1(data?.inStock == true ? 0 : 1);
    //   setImagesEdited(false);
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
      dataImages,
      description,
      brandId,
      packageTypeId,
      subCategoryId,
      unitId,

      extendedPropertyTitle,
      supplierCode,
      countInBox,
      price,
      inStockCount,
    },
  });

  useEffect(() => {
    reset({
      name,
      dataImages,
      description,
      brandId,
      packageTypeId,
      subCategoryId,
      unitId,

      extendedPropertyTitle,
      supplierCode,
      countInBox,
      price,
      inStockCount,
    });
  }, [
    name,
    dataImages,
    description,
    brandId,
    packageTypeId,
    subCategoryId,
    unitId,

    extendedPropertyTitle,
    supplierCode,
    countInBox,
    price,
    inStockCount,
    reset,
  ]);

  const mutation = useMutation({
    mutationFn: sendRegisterOfGoods,
    onMutate: () => {
      //   setIsLoading(true);
      setLoad3(true);
    },
    onSuccess: (result) => {
      //   setIsLoading(false);
      setMessage(result.error ? result.error : result.message);
      if (result.isSuccess) {
        setTimeout(() => {
          setUpdateTable(!updateTable);
        }, 1500);
        setCheck((prev) => ({ ...prev, check1: true }));
        setData();
        setBrandId(null);
        setName("");
        setSubCategoryId(null);
        setParentCategoryId(null);
        setParentCategoryId2(null);
        setPackageTypeId(null);
        setDescription("");
        setExtendedPropertyTitle('')
        setPrice('')
        setCountInBox('')
        setInStock(true)
        setInStockCount('')
        setSupplierCode('')
        setUnitId("");
        setImage([]);
        setDataImages([]);
        setGoodCodes(false);
        setGoodCodes2(false);
        setDataFeature([]);
        setLoad3(false);
        setTimeout(() => {
          setMessage("");
          setCheck((prev) => ({ ...prev, check2: false }));
          setCheck((prev) => ({ ...prev, check1: false }));
        }, 5000);
      } else {
        setCheck((prev) => ({ ...prev, check1: true }));
        setLoad3(false);
        setTimeout(() => {
          setMessage("");
          setCheck((prev) => ({ ...prev, check2: false }));
          setCheck((prev) => ({ ...prev, check1: false }));
        }, 5000);
      }
    },
    onError: (error) => {
      //   setIsLoading(false);
      setLoad3(false);
      setMessage(error.message || "عملیات با خطا مواجه شد");
      setCheck((prev) => ({ ...prev, check4: true }));
      setTimeout(() => {
        setMessage("");
        setCheck((prev) => ({ ...prev, check4: false }));
      }, 5000);
    },
    onSettled: () => {
      //   setIsLoading(false);
      setLoad3(false);
    },
  });

  function submitAdd() {
    setGoodCodes(true);
    setGoodCodes2(true);
  }
  function deleteFeature(i) {
    setDataFeature((prev) => [...prev.slice(0, i), ...prev.slice(i + 1)]);
    setGoodCodes2(false);
  }

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
        supplierId: supplierId,
        name: dataAll?.name,
        categoryId: dataAll?.subCategoryId,
        brandId: dataAll?.brandId,
        packageTypeId: dataAll?.packageTypeId,
        unitId: dataAll?.unitId,
        images: dataAll?.dataImages,
        description: dataAll?.description,
        goodCodes:
          dataFeature.length === 0
            ? [
                {
                  extendedPropertyTitle: '',
                  supplierCode: dataAll?.supplierCode,
                  countInBox: dataAll?.countInBox,
                  price: dataAll?.price,
                  inStock: inStock,
                  inStockCount: dataAll?.inStockCount,
                },
              ]
            : dataFeature ,
      },
      token,
      chabk,
      setCheckData,
      setMessage,
    };

    mutation.mutate({ updatedDataAll });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-wrap gap-4"
    >
      <article className="w-full px-4 py-2 flex gap-4 rounded-2xl shadow-custom-6 justify-around flex-wrap boxFilter ">
        <div className="w-full flex flex-wrap items-start justify-between gap-4">
          <div className="w-[100%] lg:w-[45%] xl:w-[23%]">
            <Controller
              name="name"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "وارد کردن نام کالا الزامی است",
                },
              }}
              render={({ field }) => (
                <InputNumber
                  {...field}
                  type="text"
                  placeholder={"لطفا نام کالا را وارد کنید ..."}
                  label={"* نام کالا :"}
                  svg={false}
                  width={"w-[100%]"}
                  value={name}
                  onChange={(e) => {
                    let value = e.target.value;
                    setName(value);
                    field.onChange(value);
                  }}
                  styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
                  styleInput={
                    status == 1
                      ? "text-[1rem] xl:text-[1rem] h-[35px] cursor-no-drop"
                      : "text-[1rem] xl:text-[1rem] h-[35px]"
                  }
                  styleBox={
                    status == 1 ? "bg-[rgba(0,0,0,.1)]" : "bg-[#ffffff]"
                  }
                  disabled={status == 1 ? true : false}
                />
              )}
            />
            {errors.name && (
              <p style={{ color: "red" }}>{errors.name.message}</p>
            )}
          </div>
          <div className="w-[100%] lg:w-[45%] xl:w-[23%] flex flex-wrap gap-1 items-center">
            <p className="w-full">برند کالا :</p>
            <Controller
              name="brandId"
              control={control}
              rules={{}}
              render={({ field }) => (
                <InputSelect
                  options={options2}
                  data={brandId}
                  setData={(selected) => {
                    setBrandId(selected);
                    field.onChange(selected);
                  }}
                />
              )}
            />
            {errors.brandId && (
              <p style={{ color: "red" }}>{errors.brandId.message}</p>
            )}
          </div>
          <div className="w-[100%] lg:w-[45%] xl:w-[23%] flex flex-wrap gap-1 items-center">
            <p className="w-full">* نوع بسته بندی کالا :</p>
            <Controller
              name="packageTypeId"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "انتخاب نوع بسته بندی کالا الزامی است",
                },
              }}
              render={({ field }) => (
                <InputSelect
                  options={options4}
                  data={packageTypeId}
                  setData={(selected) => {
                    setPackageTypeId(selected);
                    field.onChange(selected);
                  }}
                />
              )}
            />
            {errors.packageTypeId && (
              <p style={{ color: "red" }}>{errors.packageTypeId.message}</p>
            )}
          </div>
          <div className="w-[100%] lg:w-[45%] xl:w-[23%] flex flex-wrap gap-1 items-center">
            <p className="w-full">* واحد کالا :</p>
            <Controller
              name="unitId"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "انتخاب نوع واحد کالا الزامی است",
                },
              }}
              render={({ field }) => (
                <InputSelect
                  options={options3}
                  data={unitId}
                  setData={(selected) => {
                    setUnitId(selected);
                    field.onChange(selected);
                  }}
                />
              )}
            />
            {errors.unitId && (
              <p style={{ color: "red" }}>{errors.unitId.message}</p>
            )}
          </div>
        </div>
        <div className="w-full flex flex-wrap items-start justify-between gap-4">
          <div className="w-[100%] lg:w-[45%] xl:w-[74%] rounded-none">
            <Controller
              name="description"
              control={control}
              rules={{}}
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
                      ? " h-[130px] cursor-no-drop bg-[rgba(0,0,0,.1)]"
                      : "bg-white h-[130px]"
                  }
                  disabled={status == 1 ? true : false}
                />
              )}
            />
            {errors.description && (
              <p style={{ color: "red" }}>{errors.description.message}</p>
            )}
          </div>
          <div className="w-[100%] lg:w-[45%] xl:w-[23%] flex flex-wrap gap-1 items-center">
            <p className="w-full">* نوع دسته بندی کالا :</p>
            <Controller
              name="subCategoryId"
              control={control}
              rules={{ required: "لطفاً یک دسته بندی کالا انتخاب کنید." }}
              render={({ field }) => (
                <SelectInputMultiStage
                  options1={options1}
                  options2={options6}
                  options3={options7}
                  setData={(selected) => {
                    setSubCategoryId(selected);
                    field.onChange(selected);
                  }}
                  setParentCategoryId={setParentCategoryId}
                  setParentCategoryId2={setParentCategoryId2}
                  data={subCategoryId}
                  parentCategoryId={parentCategoryId}
                  parentCategoryId2={parentCategoryId2}
                />
              )}
            />
            {errors.subCategoryId && (
              <p style={{ color: "red" }}>{errors.subCategoryId.message}</p>
            )}
          </div>
        </div>
        <div className="w-full flex flex-wrap items-start justify-between gap-4">
          <div className="w-[100%] flex flex-wrap gap-1 items-center">
            <Controller
              name="dataImages"
              control={control}
              rules={{}}
              render={({ field }) => (
                <ImageUpload
                  width={"w-[100%] "}
                  label={"تصاویر کالا :"}
                  setData={(uploadedImages) => {
                    setDataImages(uploadedImages);
                    field.onChange(uploadedImages);
                  }}
                  data={dataImages}
                  styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
                  styleBox={" boxFilter"}
                  disabled={false}
                  type={3}
                  setLoad={setLoad}
                  fileType={"image"}
                  setCheck={setCheck}
                  setMessage={setMessage}
                  setShowDeleteModal={setShowDeleteModal}
                  setDataDelete={setDataDelete}
                  setImage={setImage}
                  image={image}
                />
              )}
            />
            {errors.dataImages && (
              <p style={{ color: "red" }}>{errors.dataImages.message}</p>
            )}
          </div>
        </div>
        {dataFeature.length > 0 ? (
          <>
            <div className="w-full px-2 py-2 flex rounded-2xl shadow-custom-6 justify-around flex-wrap boxFilter">
              {/* اسکرول افقی برای عرض ثابت */}
              <div className="w-full overflow-x-auto xl:overflow-x-visible">
                {/* بخش سرفصل‌های جدول */}
                <div className="w-[800px] xl:w-full flex justify-between border-b">
                  <div className="w-[5%] flex justify-center items-center">
                    ردیف
                  </div>
                  <div className="w-[13%] flex justify-center items-center">
                    نام ویژگی
                  </div>
                  <div className="w-[13%] flex justify-center items-center">
                    شناسه کد کالا
                  </div>
                  <div className="w-[13%] flex justify-center items-center">
                    تعداد در کارتن
                  </div>
                  <div className="w-[13%] flex justify-center items-center">
                    قیمت اصلی
                  </div>
                  <div className="w-[13%] flex justify-center items-center">
                    موجودی
                  </div>
                  <div className="w-[13%] flex justify-center items-center">
                    تعداد موجودی
                  </div>
                  <div className="w-[13%] flex justify-center items-center">
                    حذف
                  </div>
                </div>

                {/* بخش لیست آیتم‌ها */}
                <div
                  className={`w-[800px] xl:w-full ${
                    dataFeature.length > 10
                      ? "max-h-[300px] overflow-y-auto"
                      : ""
                  }`}
                >
                  {dataFeature.map((val, i) => (
                    <div
                      key={i}
                      className="w-full flex justify-between h-[30px] border-b border-zinc-300"
                    >
                      <div className="w-[5%] flex justify-center items-center">
                        {i + 1}
                      </div>
                      <div className="w-[13%] flex justify-center items-center">
                        {val.extendedPropertyTitle}
                      </div>
                      <div className="w-[13%] flex justify-center items-center">
                        {val.supplierCode}
                      </div>
                      <div className="w-[13%] flex justify-center items-center">
                        {val.countInBox}
                      </div>
                      <div className="w-[13%] flex justify-center items-center">
                        {val.price}
                      </div>
                      <div className="w-[13%] flex justify-center items-center">
                        {val.inStock == true ? "دارد" : "ندارد"}
                      </div>
                      <div className="w-[13%] flex justify-center items-center">
                        {val.inStockCount}
                      </div>
                      <div className="w-[13%] flex justify-center items-center">
                        <i
                          className="bi bi-trash3-fill text-red-700 cursor-pointer"
                          onClick={() => deleteFeature(i)}
                          title="حذف"
                        ></i>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
        {goodCodes2 == false ? (
          dataFeature?.length == 0 ? (
            <>
              <div className="w-full flex flex-wrap items-start justify-center gap-4">
                <div className="w-[100%] lg:w-[45%] xl:w-[23%]">
                  <Controller
                    name="supplierCode"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message:
                          "وارد کردن شناسه کد کالا تامین کننده الزامی است",
                      },
                    }}
                    render={({ field }) => (
                      <InputNumber
                        {...field}
                        type="text"
                        placeholder={
                          "لطفا شناسه کد کالا تامین کننده را وارد کنید ..."
                        }
                        label={"* شناسه کد کالا تامین کننده :"}
                        svg={false}
                        width={"w-[100%]"}
                        value={supplierCode}
                        onChange={(e) => {
                          let value = e.target.value;
                            setSupplierCode(value);
                            field.onChange(value); 
                        }}
                        styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
                        styleInput={"text-[1rem] xl:text-[1rem] h-[35px]"}
                        styleBox={"bg-[#ffffff]"}
                        disabled={false}
                      />
                    )}
                  />
                  {errors.supplierCode && (
                    <p style={{ color: "red" }}>
                      {errors.supplierCode.message}
                    </p>
                  )}
                </div>
                <div className="w-[100%] lg:w-[45%] xl:w-[23%]">
                  <Controller
                    name="countInBox"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "وارد کردن تعداد در کارتن یا عدل الزامی است",
                      },
                    }}
                    render={({ field }) => (
                      <InputNumber
                        {...field}
                        type="number"
                        placeholder={
                          "لطفا تعداد در کارتن یا عدل را وارد کنید ..."
                        }
                        label={"* تعداد در کارتن یا عدل :"}
                        svg={false}
                        width={"w-[100%]"}
                        value={countInBox}
                        onChange={(e) => {
                          let value = e.target.value;
                          const regex = /^[0-9\u0660-\u0669\u06F0-\u06F9]*$/;
                          if (regex.test(value)) {
                            setCountInBox(value);
                            field.onChange(value);
                          }
                        }}
                        styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
                        styleInput={"text-[1rem] xl:text-[1rem] h-[35px]"}
                        styleBox={"bg-[#ffffff]"}
                        disabled={false}
                      />
                    )}
                  />
                  {errors.countInBox && (
                    <p style={{ color: "red" }}>{errors.countInBox.message}</p>
                  )}
                </div>
                <div className="w-[100%] lg:w-[45%] xl:w-[23%] flex flex-wrap">
                  <Controller
                    name="price"
                    control={control}
                    rules={{
                      required: {
                        value: true,
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
                          setPrice(value);
                          if (/^[0-9]*$/.test(value)) {
                            field.onChange(value);
                          }
                        }}
                        styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
                        styleInput={"text-[1rem] xl:text-[1rem] h-[35px]"}
                        styleBox={"bg-[#ffffff]"}
                        disabled={false}
                      />
                    )}
                  />

                  {/* نمایش پیام خطا */}
                  {errors.price && (
                    <p style={{ color: "red" }}>{errors.price.message}</p>
                  )}
                </div>
                <div className="w-[100%] lg:w-[45%]  xl:w-[30%] flex justify-around flex-wrap">
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
                <div className="w-[100%] lg:w-[45%] xl:w-[23%]">
                  <Controller
                    name="inStockCount"
                    control={control}
                    rules={{
                      required: {
                        value: inStock,
                        message: "وارد کردن تعداد موجودی الزامی است",
                      },
                    }}
                    render={({ field }) => (
                      <InputNumber
                        {...field}
                        type="number"
                        placeholder={
                          inStock == true
                            ? "لطفا تعداد موجودی را وارد کنید ..."
                            : ""
                        }
                        label={"* تعداد موجودی :"}
                        svg={false}
                        width={"w-[100%]"}
                        value={inStock == true ? inStockCount : ""}
                        onChange={(e) => {
                          let value = e.target.value;
                          const regex = /^[0-9\u0660-\u0669\u06F0-\u06F9]*$/;
                          if (regex.test(value)) {
                            setInStockCount(value);
                            field.onChange(value);
                          }
                        }}
                        styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
                        styleInput={
                          inStock == true
                            ? "text-[1rem] xl:text-[1rem] h-[35px]"
                            : "text-[1rem] xl:text-[1rem] h-[35px] cursor-no-drop"
                        }
                        styleBox={
                          inStock == true
                            ? "bg-[#ffffff]"
                            : "bg-[rgba(0,0,0,.1)]"
                        }
                        disabled={inStock == true ? false : true}
                      />
                    )}
                  />
                  {errors.inStockCount && (
                    <p style={{ color: "red" }}>
                      {errors.inStockCount.message}
                    </p>
                  )}
                </div>
              </div>
            </>
          ) : (
            ""
          )
        ) : (
          ""
        )}

        <div className="w-full flex flex-wrap items-start justify-center gap-4">
          <div className="px-2 w-[150px]">
            <Button
              value={"اضافه کردن ویژگی"}
              click={submitAdd}
              styleButton={18}
            />
          </div>
        </div>
        {goodCodes == true ? (
          <>
            <FormFeature
              dataFeature={dataFeature}
              setDataFeature={setDataFeature}
              setGoodCodes={setGoodCodes}
            />
          </>
        ) : (
          ""
        )}
      </article>

      {/* دکمه ارسال */}

      <div className="w-full h-[100px] items-center flex justify-center">
        <button
          type="submit"
          className={
            " w-[25%] h-[40px] bg-custom-green shadow-custom-6 px-2 hover:scale-95  transition-all duration-300 text-white rounded-2xl text-[1.1rem] flex justify-center items-center"
          }
        >
          ثبت نهایی
        </button>
      </div>
    </form>
  );
};

export default FormRegister;
