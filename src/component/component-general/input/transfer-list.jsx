import React, { useEffect, useState } from "react";

const TransferList = ({ options, data, setData, onReset, isLoading }) => {
  const [leftItems, setLeftItems] = useState(options);
  const [rightItems, setRightItems] = useState([]);

  const [checkedItems, setCheckedItems] = useState({});

  const itemIndexMap = new Map(options.map((item, index) => [item.key, index]));

  useEffect(() => {
    if (
      JSON.stringify(data) !==
      JSON.stringify(rightItems.map((item) => item.key))
    ) {
      setData(rightItems.map((item) => item.key));
    }
  }, [rightItems, data]);

  useEffect(() => {
    setLeftItems(options);
  }, [options]);
  

  useEffect(() => {
      if (onReset) {
          onReset(() => () => {
          setLeftItems(options);
        setRightItems([]);
        setCheckedItems({});
      });
    }
  }, [onReset, options]);

  const handleToggle = (key) => {
    setCheckedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const moveRight = () => {
    const selected = leftItems.filter((item) => checkedItems[item.key]);
    setLeftItems(leftItems.filter((item) => !checkedItems[item.key]));
    setRightItems(
      [...rightItems, ...selected].sort(
        (a, b) => itemIndexMap.get(a.key) - itemIndexMap.get(b.key)
      )
    );
    clearCheckedItems();
  };

  const moveLeft = () => {
    const selected = rightItems.filter((item) => checkedItems[item.key]);
    setRightItems(rightItems.filter((item) => !checkedItems[item.key]));
    setLeftItems(
      [...leftItems, ...selected].sort(
        (a, b) => itemIndexMap.get(a.key) - itemIndexMap.get(b.key)
      )
    );
    clearCheckedItems();
  };

  const clearCheckedItems = () => {
    setCheckedItems({});
  };

  const toggleSelectAllLeft = () => {
    const allSelected = leftItems.every((item) => checkedItems[item.key]);
    const newChecked = {};
    if (!allSelected) {
      leftItems.forEach((item) => {
        newChecked[item.key] = true;
      });
    }
    setCheckedItems(newChecked);
  };


  const toggleSelectAllRight = () => {
    const allSelected = rightItems.every((item) => checkedItems[item.key]);
    const newChecked = {};
    if (!allSelected) {
      rightItems.forEach((item) => {
        newChecked[item.key] = true;
      });
    }
    setCheckedItems(newChecked);
  };

  return (
    <div className="w-full h-[320px] flex justify-between bg-zinc-100 rounded-lg overflow-hidden p-2">
      <div className="w-[40%] h-full shadow-custom-6 rounded-lg">
        <div className="w-full h-[40px] flex justify-center items-center">
          <p className="text-[18px] font-bold">لیست کالاهای شروط</p>
        </div>
        <div className="w-full h-[30px] flex items-center px-5">
          <button
            type="button"
            className="text-blue-500 hover:text-blue-700 text-sm"
            onClick={toggleSelectAllLeft}
          >
            {leftItems.every((item) => checkedItems[item.key])
              ? "لغو انتخاب همه"
              : "انتخاب همه"}
          </button>
        </div>
        {isLoading ? (
          <div className="w-full h-[320px] flex justify-center items-center bg-zinc-100 rounded-lg">
            <p className="text-lg font-semibold text-gray-600">
              در حال بارگذاری...
            </p>
          </div>
        ) : (
          <ul
            dir="ltr"
            className="w-full h-[233px] overflow-hidden overflow-y-auto"
          >
            {leftItems.map((item) => (
              <li
                key={item.key}
                className="w-full flex justify-start gap-2 items-center rounded-lg p-2 cursor-pointer hover:bg-zinc-200"
                dir="rtl"
                onClick={() => handleToggle(item.key)}
              >
                <input
                  type="checkbox"
                  className="cursor-pointer"
                  checked={checkedItems[item.key] || false}
                  onChange={() => handleToggle(item.key)}
                  onClick={(e) => e.stopPropagation()}
                />
                <p className="text-[14px]">{item.value}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="w-[20%] h-full flex flex-col items-center justify-center gap-4">
        <button
          className="w-[80px] h-[40px] bg-blue-500 text-white rounded-lg hover:bg-blue-700 text-[30px] cursor-pointer"
          onClick={moveRight}
          disabled={!leftItems.some((item) => checkedItems[item.key])}
        >
          ←
        </button>
        <button
          className="w-[80px] h-[40px] bg-red-500 text-white rounded-lg hover:bg-red-700 text-[30px] cursor-pointer"
          onClick={moveLeft}
          disabled={!rightItems.some((item) => checkedItems[item.key])}
        >
          →
        </button>
      </div>
      <div className="w-[40%] h-full shadow-custom-6 rounded-lg">
        <div className="w-full h-[40px] flex justify-center items-center">
          <p className="text-[18px] font-bold">لیست کالاهای انتخاب شده</p>
        </div>
        <div className="w-full h-[30px] flex items-center px-5">
          <button
            type="button"
            className="text-blue-500 hover:text-blue-700 text-sm"
            onClick={toggleSelectAllRight}
          >
            {rightItems.every((item) => checkedItems[item.key])
              ? "لغو انتخاب همه"
              : "انتخاب همه"}
          </button>
        </div>
        <ul dir="ltr" className="w-full h-[233px] overflow-y-auto">
          {rightItems.map((item) => (
            <li
              key={item.key}
              className="w-full h-[40px] flex justify-start gap-2 items-center rounded-lg p-2 cursor-pointer hover:bg-zinc-200"
              dir="rtl"
              onClick={() => handleToggle(item.key)}
            >
              <input
                type="checkbox"
                className="cursor-pointer"
                checked={checkedItems[item.key] || false}
                onChange={() => handleToggle(item.key)}
                onClick={(e) => e.stopPropagation()}
              />
              <p className="text-[14px]">{item.value}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TransferList;
