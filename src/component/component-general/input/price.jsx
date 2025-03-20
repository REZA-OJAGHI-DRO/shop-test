import React, { useEffect, useState } from 'react';

function Price({
    placeholder,
    label,
    svg,
    width,
    max,
    data,
    setData,
    styleLabel,
    styleInput,
    styleError,
    styleBox,
    disabled
}) {
    const [value, setValue] = useState(data);

    const handleChange = (e) => {
        let inputValue = e.target.value;
        const pattern = /^[0-9,]*$/;  

        if (pattern.test(inputValue)) {
            const rawValue = inputValue.replace(/,/g, ''); 
            const formattedValue = Number(rawValue).toLocaleString('en-US');

            setValue(formattedValue); 
            setData(Number(rawValue));  
        } else {
            setValue(inputValue);  
            setData(Number(inputValue.replace(/[^\d]/g, '').replace(/,/g, ''))); 
        }
    };

    useEffect(() => {
        if (data) {
            const numericValue = Number(data);
            if (!isNaN(numericValue)) {
           
                setValue(numericValue.toLocaleString('en-US')); 
            } else {
                setValue(''); 
            }
        } else {
            setValue('');
        }
    }, [data]); 

    return (
        <div className={`${width} flex flex-wrap gap-1 lg:gap-1`}>
            <label htmlFor="" className={`${styleLabel} w-full`}>
                {label}
            </label>
            <div
                className={`${styleError ? 'border-2 border-red-500' : ''} ${styleBox} w-full rounded-xl px-2 gap-3 py-1 shadow-inner-custom-2 flex justify-between items-center`}
            >
                <input
                    onChange={handleChange}
                    value={value} 
                    type="text"
                    className={`${styleInput} placeholder:text-[.9rem] bg-transparent w-full text-right px-4 focus:border-transparent focus:outline-none placeholder:text-center`}
                    maxLength={max}
                    placeholder={placeholder}
                    disabled={disabled}
                />
                {svg && (
                    <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '30px', height: '30px' }} viewBox="0 0 23 22" fill="none">
                        <path d="M22.8541 16.6187C22.6502 18.1093 21.8893 19.4775 20.7135 20.4677C19.5378 21.458 18.0275 22.0027 16.4648 22C7.3863 22 1.03461e-05 14.8939 1.03461e-05 6.15984C-0.00279093 4.65644 0.563343 3.20347 1.59267 2.0723C2.62201 0.941132 4.04414 0.209117 5.59347 0.0129775C5.98525 -0.0330459 6.38201 0.0440659 6.72449 0.232802C7.06698 0.421538 7.33684 0.711775 7.49378 1.06019L9.90862 6.24674V6.25994C10.0288 6.52664 10.0784 6.81782 10.0531 7.10747C10.0277 7.39712 9.92821 7.67623 9.76341 7.91985C9.74283 7.94955 9.7211 7.97705 9.69823 8.00455L7.3177 10.7194C8.1741 12.3936 9.99437 14.1294 11.7575 14.9555L14.5405 12.6774C14.5678 12.6553 14.5964 12.6347 14.6262 12.6158C14.8793 12.4534 15.1704 12.3543 15.4732 12.3274C15.7761 12.3006 16.0811 12.3467 16.3608 12.4618L16.3756 12.4684L21.7621 14.7905C22.1249 14.941 22.4273 15.2004 22.6242 15.5299C22.821 15.8594 22.9016 16.2414 22.8541 16.6187Z" fill="#535353"/>
                    </svg>
                )}
            </div>
        </div>
    );
}

export default Price;
