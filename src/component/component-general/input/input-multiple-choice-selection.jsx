import React from 'react';
import { Select, Space } from 'antd';

const InputMultipleChoiceSelection = ({ options, data, setData, placeholder = 'جستجو ...' }) => {
  const handleChange = (selectedValues) => {
    const selectedKeys = selectedValues.map(value => 
      options.find(option => option.key === value)?.key
    ).filter(Boolean);
    setData(selectedKeys);
  };

  return (
    <>
      <style>
        {`
          .custom-select {
            width: 100%;
            height: 40px;
            border-radius: 10px;
            backdrop-filter: blur(10px);
            background: rgba(255, 255, 255, 0.5);
          }
        `}
      </style>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Select
          mode="multiple"
          className="custom-select"
          options={options.map(opt => ({ label: opt.value, value: opt.key }))}
          value={data}
          onChange={handleChange}
          placeholder={placeholder}
          maxTagCount="responsive"
          showSearch
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())
          }
        />
      </Space>
    </>
  );
};

export default InputMultipleChoiceSelection;