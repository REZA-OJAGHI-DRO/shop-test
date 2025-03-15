import {
  React,
  useState,
  TextArea,
  Button,
} from '@/component/management-panel/import-management.js'

function Description({ description, setDescription}) {
  
  const [descriptionList, setDescriptionList] = useState([]);

  // function sendForm() {
  //   setShowDiscount(true)
  //   // if (description.trim()) {
  //   //   setDescriptionList([...descriptionList, description]);
  //   //   setDescription("");
  //   // }
  // }

  function removeItem(index) {
    // setDescriptionList(descriptionList.filter((_, i) => i !== index));
  }

  return (
    <div className="w-full flex flex-wrap justify-center">
      <div className="w-full px-10 py-3">
        <ul className="w-full min-h-[50px] flex flex-wrap gap-2">
          {descriptionList.map((desc, index) => (
            <li key={index} className="w-full flex items-center justify-between border-b border-zinc-500">
              <span className="w-[90%] break-words whitespace-normal">
               {index + 1} - {desc} 
              </span>
              <button
                onClick={() => removeItem(index)}
                className="text-red-500 ml-2"
              >
                <i className="bi bi-trash3-fill text-red-700" title="حذف"></i>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full flex gap-8 h-[120px]">
        <TextArea
          label={""}
          width={"w-[50%] h-[120px]"}
          placeholder={"توضیحات خود را وارد کنید"}
          checked={true}
          data={description}
          setData={setDescription}
          styleTextarea={"bg-white h-[120px]"}
          styleLabel={"black"}
        />
        {/* <div className="w-[150px] h-full flex flex-wrap justify-center content-center gap-2">
          <p className="w-full text-center">تخفیف را اضافه کنید</p>
          <div className="w-[50px] h-[50px]">
            <Button value={"+"} click={sendForm} styleButton={21} />
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Description;
