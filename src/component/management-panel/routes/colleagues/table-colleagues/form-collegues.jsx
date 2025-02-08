import "@/style/management-panel.css";
import {
  React,
  useEffect,
  useState,
  Button,
  TextFull,
  TextArea,
  City,
  SelectInput,
  TextNumber,
  Load,
  CheckMessage,
  GetCookie,
  postRelationshipCreate,
  postRelationshipSearchMembers,
} from '@/component/management-panel/import-management.js'

function FormCollegues({type, token, chabk, userId, id , updateTable, setUpdateTable }) {
  const [fName, setFName] = useState("");
  const [codeNational, setCodeNational] = useState("");
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [searchCodeNational, setSearchCodeNational] = useState("");
  const [description, setDescription] = useState("");
  const [dataCityId, setDataCityId] = useState();
  const [dataCityId2, setDataCityId2] = useState();
  const [relationshipType, setRelationshipType] = useState();
  const [acceptorType, setAcceptorType] = useState();
  const [load, setLoad] = useState();
  const [load2, setLoad2] = useState();
  const [styleError1, setStyleError1] = useState(false);
  const [styleError2, setStyleError2] = useState(false);
  const [styleError3, setStyleError3] = useState(false);
  const [options, setOptions] = useState([
    { key: "0", value: "همکاری" },
    { key: "1", value: "نمایندگی" },
    { key: "2", value: "خدمات پس از فروش" },
  ]);
  const [options2, setOptions2] = useState([
    { key: "0", value: "تامین کننده" },
    { key: "1", value: "خریدار" },
  ]);

  const [messageData, setMessageData] = useState([]);
  const [messageSearch, setMessageSearch] = useState();
  const [messageSend, setMessageSend] = useState([]);
  const [checkData, setCheckData] = useState(false);
  const [checkDataAll, setCheckDataAll] = useState({
    check1: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(!Object.values(checkDataAll).every((value) => value === true));
  }, [checkDataAll]);
  const [message, setMessage] = useState("");
  const [check, setCheck] = useState({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
  });
  const [dataAll, setDataAll] = useState({});
  const [dataSearch, setDataSearch] = useState([]);

  const roleCookie = GetCookie("role");

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const openForm = () => {
    setOpen(!open);
  };

  const sendSearch = async () => {
    setLoad2(true);
    
    if(searchPhone || searchCodeNational){
      postRelationshipSearchMembers(
        searchPhone,
        searchCodeNational,
        token,
        chabk,
        setMessage,
        setDataSearch,
        setLoad2,
        setCheck
      );
      if(dataSearch.length>0){
        setMessageSearch('')
      }else{
        setMessageSearch('فردی با این اطلاعات در سیستم وجود ندارد')
      }
    }else{
      setLoad2(false);
      setFName();
      setCodeNational();
      setPhone1();
      setAcceptorType()
      setDataSearch([])
      setMessageSearch('فردی با این اطلاعات در سیستم وجود ندارد')
    }
    setOpen2(true);
  };
  
  useEffect(() => {
    if(dataSearch.length>0){
      setFName(dataSearch[0]?.name);
      setCodeNational(dataSearch[0]?.nationalId);
      setPhone1(dataSearch[0]?.mobile);
      setPhone2(dataSearch[0]?.phone);
      setAcceptorType(dataSearch[0]?.type)
      setDescription(dataSearch[0]?.description)
      setMessageSearch('')
    }else{
      setFName('');
      setCodeNational('');
      setPhone1('');
      setAcceptorType('')
      setDataCityId()
      setDataCityId2()
      setPhone2('')
      setRelationshipType()
      setDescription('')
      setAcceptorType()
    }
  }, [dataSearch]);

  useEffect(() => {
    setDataAll({
      requesterId: userId,
      requesterType:
        roleCookie == "Supplier"
          ? 0
          : roleCookie == "Shopper"
          ? 1
          : roleCookie == "Shopper"
          ? 2
          : null,
      acceptorId: dataSearch.length>0 ? dataSearch[0]?.id : '',
      acceptorType:type==0 ? acceptorType : type==1 ? 1 : type==2 && 2 ,
      acceptorExists: dataSearch.length>0 ? true : false,
      acceptorName: fName,
      acceptorCityId:dataSearch.length>0 ? '': dataCityId2,
      acceptorPhoneNumber: phone1,
      acceptorNationalId: codeNational,
      relationshipType: type==0 ? relationshipType : type==1 ? 1 : type==2 && 2,
      description: description,
    });
  }, [
    userId,
    fName,
    dataCityId2,
    phone1,
    phone2,
    codeNational,
    relationshipType,
    description,
  ]);

  
  const sendForm = async () => {
    setStyleError1(false)
    setStyleError2(false)
    setStyleError3(false)
    
    setMessageSend([])
    if(!fName){
      setStyleError1(true)
      setMessageSend((prevData) => [...prevData, 'نام و نام خانوادگی یا نام شرکت'])
    } 
    if(!phone1){
        setStyleError2(true)
        setMessageSend((prevData) => [...prevData, 'تلفن همراه مسئول مجموعه'])
      } 
      if(dataSearch.length==0){
        if(!dataCityId2){
          setStyleError3(true)
          setMessageSend((prevData) => [...prevData, 'استان و شهر'])
        }
      }
      const isValidCity = dataSearch.length>0 ? true  : dataCityId2 ;
      if(fName && phone1 && isValidCity){
    setLoad(true);
    try {
      const result = await postRelationshipCreate(
        dataAll,
        token,
        chabk,
        setMessage
      );
      if (result.isSuccess == true) {
        setTimeout(() => {
          setCheck((r) => ({ ...r, check1: true }));

          setFName('');
          setCodeNational('');
          setPhone1('');
          setAcceptorType('')
          setDataCityId()
          setDataCityId2()
          setPhone2('')
          setRelationshipType()
          setDescription('')
          setAcceptorType()
          setDataSearch([])
          setSearchCodeNational('')
          setSearchPhone('')
          setOpen2(false)
          setMessageSearch('')

          setLoad(false);
          setUpdateTable(!updateTable);
          setMessage(result.errors ? result.error : result.message);
        }, 2000);
      } else if (result.isSuccess == false) {
        setTimeout(() => {
          setCheck((r) => ({ ...r, check4: true }));
          setLoad(false);
          setUpdateTable(!updateTable);
          setMessage(result.errors ? result.error : result.message);
          
          setFName('');
          setCodeNational('');
          setPhone1('');
          setAcceptorType('')
          setDataCityId()
          setDataCityId2()
          setPhone2('')
          setRelationshipType()
          setDescription('')
          setAcceptorType()
          setDataSearch([])
          setSearchCodeNational('')
          setSearchPhone('')
          setMessageSearch('')

          setOpen2(false)
          
        }, 2000);
      }
    } catch (error) {
      setTimeout(() => {
        setCheck((r) => ({ ...r, check4: true }));
        setLoad(false);
      }, 2000);
    } finally {
      setTimeout(() => {
        setLoad(false);
        setTimeout(() => {
          setMessage("");
          setCheck((r) => ({ ...r, check4: false }));
          setCheck((r) => ({ ...r, check1: false }));
        }, 5000);
      }, 2000);
    }
    }
  };


  return (
    <>
      <style>
        {`
      .boxFilter{
      background:#ffffff4f;
      backdrop-filter:blur(10px);
      }
      .boxFilter4{
    //   background:#ffffff4f;
      backdrop-filter:blur(10px);
      }
      `}
      </style>
      <CheckMessage message={message} check={check} />
      <div className="w-full flex flex-wrap gap-5">
        <div className="w-full flex justify-center items-center">
          <div className="w-[200px] *:text-[1.1rem]">
            <Button
              value={"معرفی فرد جدید"}
              click={() => openForm(event)}
              styleButton={18}
            />
          </div>
        </div>
        {open == true ? (
          <div className="w-full flex justify-center items-center flex-wrap">
            <div className="w-full pb-4 flex flex-wrap justify-center gap-5">
              <TextNumber
                placeholder={"جستجو تلفن همراه"}
                label={""}
                svg={true}
                width={"w-[100%] lg:w-[45%] xl:w-[30%] h-[40px]"}
                max={"11"}
                data={searchPhone}
                setData={setSearchPhone}
                styleLabel={"text-[.9rem] xl:text-[.9rem] text-black hidden"}
                styleInput={"text-[.9rem] xl:text-[.9rem] h-[30px]"}
                //   styleError={false}
                styleBox={"bg-[#ffffff]"}
                //   disabled={roleCookie === "Supplier" ? true : false}
              />
              <TextNumber
                placeholder={"جستجو با کد ملی"}
                label={""}
                svg2={true}
                width={"w-[100%] lg:w-[45%] xl:w-[30%] h-[40px]"}
                max={10}
                data={searchCodeNational}
                setData={setSearchCodeNational}
                styleLabel={"text-[.9rem] xl:text-[.9rem] text-black hidden"}
                styleInput={"text-[.9rem] xl:text-[.9rem] h-[30px]"}
                //   styleError={isPerson == true ? styleError.styleError1 : false}
                styleBox={"bg-[#ffffff]"}
                //   disabled={roleCookie === "Supplier" ? true : false}
              />
              <div className="w-full justify-center flex">
                <Button
                  value={"جستجو"}
                  click={() => sendSearch(event)}
                  styleButton={7}
                />
              </div>
              <p className="w-full flex justify-center text-red-500">{messageSearch}</p>
            </div>

            {open2 == true ? (
              <>
                <div className="w-[100%] py-4 rounded-2xl shadow-custom-7 boxFilter px-5 xl:px-2 flex gap-5 xl:gap-5 flex-wrap justify-around content-center">
               <div className="w-full flex flex-wrap  justify-around">
                  <TextFull
                    pattern={/^[\u0600-\u06FF\u0660-\u0669\u0030-\u0039\s]+$/}
                    placeholder={"لطفا نام خود را وارد کنید"}
                    label={"نام و نام خانوادگی/ نام شرکت :"}
                    svg={false}
                    width={`w-[100%] lg:w-[45%] xl:w-[22%] flex`}
                    data={fName}
                    setData={setFName}
                    styleLabel={"text-[.9rem] xl:text-[.9rem] text-black"}
                    styleInput={
                      "text-[.9rem] xl:text-[.9rem] h-[30px] xl:h-[30px] placeholder:text-[.9rem]"
                    }
                    styleError={dataSearch.length>0 ? false :styleError1}
                    styleBox={` ${dataSearch.length>0 ? '' : 'bg-[#ffffff]'} `}
                    disabled={dataSearch.length>0 ? true : false}
                  />
                  <TextNumber
                    placeholder={"لطفا شناسه کد ملی را وارد کنید ..."}
                    label={"شناسه کد / کد ملی :"}
                    svg={false}
                    width={"w-[100%] lg:w-[45%] xl:w-[22%] "}
                    max={10}
                    data={codeNational}
                    setData={setCodeNational}
                    styleLabel={"text-[.9rem] xl:text-[.9rem] text-black"}
                    styleInput={"text-[.9rem] xl:text-[.9rem] h-[30px]"}
                    //   styleError={isPerson == true ? styleError.styleError1 : false}
                    styleBox={` ${dataSearch.length>0 ? '' : 'bg-[#ffffff]'} `}
                      disabled={dataSearch.length>0 ? true : false}
                  />
                  <TextNumber
                    placeholder={"لطفا تلفن همراه را وارد کنید ..."}
                    label={"تلفن همراه مسئول مجموعه :"}
                    svg={false}
                    width={"w-[100%] lg:w-[45%] xl:w-[22%] "}
                    max={"11"}
                    data={phone1}
                    setData={setPhone1}
                    styleLabel={"text-[.9rem] xl:text-[.9rem] text-black"}
                    styleInput={"text-[.9rem] xl:text-[.9rem] h-[30px]"}
                    styleError={dataSearch.length>0 ? false :styleError2}
                    styleBox={` ${dataSearch.length>0 ? '' : 'bg-[#ffffff]'} `}
                      disabled={dataSearch.length>0 ? true : false}
                  />
                  <TextNumber
                    placeholder={"لطفا تلفن ثابت را وارد کنید ..."}
                    label={"تلفن ثابت :"}
                    svg={false}
                    width={"w-[100%] lg:w-[45%] xl:w-[22%] "}
                    max={""}
                    data={phone2}
                    setData={setPhone2}
                    styleLabel={"text-[.9rem] xl:text-[.9rem] text-black"}
                    styleInput={"text-[.9rem] xl:text-[.9rem] h-[30px]"}
                    //   styleError={false}
                    styleBox={` ${dataSearch.length>0 ? '' : 'bg-[#ffffff]'} `}
                    disabled={dataSearch.length>0 ? true : false}
                  />
                  </div>
                  <div className="w-full lg:w-[45%] flex flex-wrap justify-center items-center gap-5">

                    {dataSearch.length>0 ?
                  <>
                  <div className="w-full flex justify-center item-center gap-5">
                  <p>استان : {dataSearch[0]?.provinceName}</p>
                  <p>شهر : {dataSearch[0]?.cityName}</p>
                  </div>
                  </>
                  :
                  <div className="w-full flex flex-wrap justify-center ">
                  <City
                  dataCityId={dataCityId}
                  setDataCityId={setDataCityId}
                  dataCityId2={dataCityId2}
                  setDataCityId2={setDataCityId2}
                  styleError={styleError3}
                  />
                  </div>
                  }
                <div className="w-[250px] flex-wrap flex justify-center content-center gap-2">
                 {
                    type==0?<>
                  <SelectInput
                    options={options2}
                    setData={setAcceptorType}
                  />
                    </>
                    :<>  <p className="w-full">
                    <span className="text-red-500">*</span> نوع کاربر : <span>{type==1?'خریدار':type==2&&'تعمیر کار'}</span>
                  </p></>}
                </div>
                </div>
                  <TextArea
                    label={"توضیحات خود را وارد کنید :"}
                    width={"w-[100%] lg:w-[45%]  h-[140px] rounded-none"}
                    placeholder={"توضیحات ..."}
                    checked={true}
                    data={description}
                    setData={setDescription}
                    styleTextarea={"bg-white h-[110px]"}
                    styleLabel={"text-black px-4"}
                  />
                </div>
                <div className="w-[250px] flex-wrap h-[100px] flex justify-center content-center gap-2">
                  <p className="w-full">
                    <span className="text-red-500">*</span> نوع رابطه : <span>{type==0?'همکاری':type==1?'نمایندگی':type==2&&'خدمات پس از فروش'}</span>
                  </p>
                  {/* {type==0&&<>
                  <SelectInput
                    options={options}
                    setData={setRelationshipType}
                    />
                    </>} */}
                </div>
               {messageSend.length>0? <p className="w-full flex justify-center text-red-500"> لطفا {messageSend&&messageSend.map((val)=>{return(<> {val} - </>)})} را وارد کنید</p>:''}
                <div className="w-full h-[80px] flex justify-center ">
                  <div className="w-[300px]">
                    <Button
                      value={"ثبت"}
                      click={() => sendForm(event)}
                      styleButton={8}
                    />
                  </div>
                </div>
              </>
            ) : null}
          </div>
        ) : null}
      </div>
      <Load load={load} text={"در حال ثبت فرد جدید لطفا منتظر بمانید ..."} />
      <Load load={load2} text={"در حال جستجو لطفا منتظر بمانید ..."} />
    </>
  );
}

export default FormCollegues





