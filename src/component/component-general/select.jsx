import { Select } from "antd";
import React, { useState, useEffect } from "react";
import "./componentGeneral.css";

const SelectInput = ({
  options,
  data,
  setData,
  hasError,
  isDisabled,
  placeholder,
}) => {
  const [selectedValue, setSelectedValue] = useState(data);

  useEffect(() => {
    if (data) {
      const selectedOption = options.find((option) => option.key === data);
      if (selectedOption) {
        setSelectedValue(selectedOption.value);
      }
    } else {
      setSelectedValue(null);
    }
  }, [data, options]);

  const handleChange = (value) => {
    const selectedOption = options.find((option) => option.value === value);
    if (selectedOption) {
      setSelectedValue(value);
      setData(selectedOption.key);
    } else {
      setSelectedValue(null);
      setData(null);
    }
  };

  return (
    <>
      <style>
        {`
          .boxFilter24 {
            backdrop-filter: blur(10px);
            background: rgba(255, 255, 255, 0.5);
          }
        `}
      </style>
      <Select
        showSearch
        className="custom-select"
        style={{
          width: "100%",
          height: 40,
          border: hasError ? "2px solid red" : "none",
          borderRadius: 10,
        }}
        placeholder={placeholder ? placeholder : "جستجو ..."}
        optionFilterProp="value"
        onChange={handleChange}
        value={selectedValue}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase())
        }
        options={options}
        disabled={isDisabled}
      />
    </>
  );
};

export default SelectInput;
