import { Select } from 'antd';
import React, { useEffect, useState } from 'react';
import './componentGeneral.css';

const SelectInputMultiStage = ({ options1, options2, options3, setParentCategoryId, setParentCategoryId2, setData, hasError , data , parentCategoryId , parentCategoryId2}) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedValue2, setSelectedValue2] = useState(null);
  const [selectedValue3, setSelectedValue3] = useState(null);

  const [showSelect2, setShowSelect2] = useState(false);
  const [showSelect3, setShowSelect3] = useState(false);

  useEffect(()=>{
    if(parentCategoryId == null){
      setSelectedValue(null);
      setShowSelect2(false); 
      setShowSelect3(false); 
    }
    if(parentCategoryId2 == null){
      setSelectedValue2(null);
      setShowSelect3(false); 
    }
    if(data == null){
      setSelectedValue3(null);
    }
  },[parentCategoryId , parentCategoryId2 , data])

  const handleChange = (value) => {
    
    const selectedOption = options1.find(option => option.value === value);
    if (selectedOption) {
      setSelectedValue(value);
      setParentCategoryId(selectedOption.key);
      setSelectedValue2(null);
      setSelectedValue3(null);
      setParentCategoryId2(null);
      setData(null);
      
      setShowSelect2(true); 
      setShowSelect3(false); 
    }
  };

  const handleChange2 = (value) => {
    const selectedOption = options2.find(option => option.value === value);
    if (selectedOption) {
      setSelectedValue2(value);
      setParentCategoryId2(selectedOption.key);
      setSelectedValue3(null);
      setData(null);
      setShowSelect3(true); 
    }
  };

  const handleChange3 = (value) => {
    const selectedOption = options3.find(option => option.value === value);
    if (selectedOption) {
      setSelectedValue3(value);
      setData(selectedOption.key);
    }
  };

  return (
    <>
      <style>
        {`
          .boxFilter24{
            backdrop-filter:blur(10px);
            background:rgba(255,255,255,.5);
          }
       ` }
      </style>
      <Select
        showSearch
        className='custom-select' 
        style={{
          width: '100%',
          height: 40,
          border: hasError ? '2px solid red' : 'none',
          borderRadius: 10
        }}
        placeholder="جستجو ..."
        optionFilterProp="value"
        onChange={handleChange}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())
        }
        options={options1}
        value={selectedValue}
      />
      {showSelect2 && (
        <Select
          showSearch
          className='custom-select' 
          style={{
            width: '100%',
            height: 40,
            border: hasError ? '2px solid red' : 'none',
            borderRadius: 10
          }}
          placeholder="جستجو ..."
          optionFilterProp="value"
          onChange={handleChange2}
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())
          }
          options={options2}
          value={selectedValue2}
        />
      )}
      {showSelect3 && (
        <Select
          showSearch
          className='custom-select' 
          style={{
            width: '100%',
            height: 40,
            border: hasError ? '2px solid red' : 'none',
            borderRadius: 10
          }}
          placeholder="جستجو ..."
          optionFilterProp="value"
          onChange={handleChange3}
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())
          }
          options={options3}
          value={selectedValue3}
        />
      )}
    </>
  );
};

export default SelectInputMultiStage;