import { Select } from "antd";
import React, { useState, useEffect, forwardRef } from "react";

const InputSelect = forwardRef(
  ({ options, data, setData, required, valid, isDisabled }, ref) => {
    const [selectedValue, setSelectedValue] = useState(null);

    // مقدار اولیه را از `data` تنظیم می‌کنیم
    useEffect(() => {
      if (data && options.length > 0) {
        const selectedOption = options.find((option) => option.key === data);
        if (selectedOption) {
          setSelectedValue(selectedOption.value); // مقدار مربوطه را در `Select` نمایش بده
        }
      }
    }, [data, options]);

    const handleChange = (value) => {
      const selectedOption = options.find((option) => option.value === value);
      if (selectedOption) {
        setSelectedValue(value);
        setData(selectedOption.key); // مقدار `key` را در `setData` ذخیره کن
      } else {
        setSelectedValue(null);
        setData(null);
      }
    };

    return (
      <>
        <Select
          ref={ref}
          showSearch
          className="custom-select"
          style={{
            width: "100%",
            height: 40,
            border:
              valid?.required?.required && required[valid?.required?.index] === 2
                ? "2px solid red"
                : "none",
            borderRadius: 10,
          }}
          placeholder="جستجو ..."
          optionFilterProp="label"
          onChange={handleChange}
          value={selectedValue || undefined} // مقدار مقداردهی اولیه نمایش داده شود
          options={options.map((option) => ({
            label: option.value,
            value: option.value,
          }))} // اصلاح ساختار options
          disabled={isDisabled}
        />
        {valid?.required?.required && required[valid?.required?.index] === 2 && (
          <p className="w-full text-red-500 text-[.8rem] flex px-5">
            {valid?.required?.error}
          </p>
        )}
      </>
    );
  }
);

export default InputSelect;
