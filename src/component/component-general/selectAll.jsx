import { Select } from 'antd';
import React, { useEffect, useState } from 'react';
import './componentGeneral.css';

const SelectAllInput = ({ options, data, setData, hasError, disabled }) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [dataAll, setDataAll] = useState([]);

  useEffect(() => {
    if (Array.isArray(data) && data.length === 0) {
      setSelectedValue(null);
      setDataAll([]);
    }
  }, [data]);

  const handleSelectAll = () => {
    if (disabled) return; // اگر غیرفعال باشد، هیچ کاری انجام نمی‌شود
    const allOptions = options.filter(option => option.value !== 'selectAll');
    const newItems = allOptions.filter(option => !dataAll.some(item => item.key === option.key));
    if (newItems.length > 0) {
      setDataAll(prevDataAll => [
        ...prevDataAll,
        ...newItems.map(item => ({ key: item.key, value: item.value }))
      ]);
      setData(prevData => [
        ...(Array.isArray(prevData) ? prevData : []),
        ...newItems.map(item => item.key)
      ]);
    }
  };

  const handleChange = (value) => {
    if (disabled) return; // اگر غیرفعال باشد، هیچ کاری انجام نمی‌شود
    if (value === 'selectAll') {
      handleSelectAll();
      setSelectedValue(null);
      return;
    }

    const selectedOption = options.find(option => option.value === value);
    if (selectedOption) {
      const isDuplicate = dataAll.some(item => item.key === selectedOption.key);
      if (!isDuplicate) {
        setDataAll(prevDataAll => {
          const updatedData = [
            ...prevDataAll,
            { key: selectedOption.key, value: selectedOption.value }
          ];
          setData(updatedData.map(item => item.key));
          return updatedData;
        });
        setSelectedValue(null);
      }
    }
  };

  const handleDelete = (key) => {
    if (disabled) return; // اگر غیرفعال باشد، هیچ کاری انجام نمی‌شود
    setDataAll(prevDataAll => {
      const updatedData = prevDataAll.filter(item => item.key !== key);
      setData(updatedData.map(item => item.key));
      return updatedData;
    });
  };

  useEffect(() => {
    const filteredOptions = options.filter((option) => data?.includes(option.key));
    setDataAll(filteredOptions);
  }, [data, options]);

  return (
    <>
      <style>
        {`
          .boxFilter24 {
            backdrop-filter: blur(10px);
            background: rgba(255, 255, 255, .5);
          }
        `}
      </style>

      <Select
        showSearch
        value={selectedValue}
        className="custom-select"
        style={{
          width: '100%',
          height: 40,
          border: hasError ? '2px solid red' : 'none',
          borderRadius: 10,
        }}
        placeholder="جستجو ..."
        optionFilterProp="value"
        onChange={handleChange}
        disabled={disabled} // اضافه کردن Prop غیرفعال
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())
        }
      >
        <Select.Option value="selectAll">انتخاب همه</Select.Option>
        {options.map(option => (
          <Select.Option key={option.key} value={option.value}>
            {option.label}
          </Select.Option>
        ))}
      </Select>

      <div
        className={`w-full h-[100px] overflow-hidden shadow-inner-custom-2 z-40 px-1 ${
          disabled ? 'bg-gray-300' : 'bg-[#ababab]'
        } rounded-xl boxFilter24`}
        style={{ marginTop: '10px', pointerEvents: disabled ? 'none' : 'auto' }} // غیرفعال کردن تعامل در حالت دیزیبل
      >
        <div className="w-full h-full lg:h-full overflow-y-auto myElement px-2">
          {dataAll.map(item => (
            <div
              key={item.key}
              className={`px-2 h-[40px] xl:h-[40px] flex justify-between text-zinc-600 ${
                disabled ? 'bg-gray-200' : 'bg-[#fff]'
              } gap-4 items-center rounded-xl shadow-lg text-[1rem] my-2`}
            >
              <span>{item.value}</span>
              {!disabled && (
                <i
                  onClick={() => handleDelete(item.key)}
                  className="bi cursor-pointer text-red-600 bi-trash3-fill text-[1.2rem]"
                ></i>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* {hasError && <p style={{ color: 'red', fontSize: '12px' }}>لطفاً یک گزینه انتخاب کنید!</p>} */}
    </>
  );
};

export default SelectAllInput;