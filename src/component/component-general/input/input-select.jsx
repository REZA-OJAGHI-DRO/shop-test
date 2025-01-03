import { Select } from "antd";
import React, { useState, useEffect, forwardRef } from "react";

const InputSelect = forwardRef(
  ({ options, data, setData, required, setRequired, valid, isDisabled }, ref) => {
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
          ref={ref} 
          showSearch
          className="custom-select"
          style={{
            width: "100%",
            height: 40,
            border:
              valid?.required?.required === true
                ? required[valid?.required?.index] === 2
                  ? "2px solid red"
                  : "none"
                : "none",
            borderRadius: 10,
          }}
          placeholder="جستجو ..."
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
        <p className={`w-full text-red-500 text-[.8rem] flex px-5`}>
          {valid?.required?.required === true
            ? required[valid?.required?.index] === 2
              ? valid?.required?.error
              : ""
            : ""}
        </p>
      </>
    );
  }
);

export default InputSelect;
