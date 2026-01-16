import React from 'react';
import { Select } from '@mantine/core';
import { Controller } from 'react-hook-form';

const SelectBox = ({ name, control, label, placeholder, data, rules, required, mt }) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState: { error } }) => (
                <Select
                    {...field}
                    label={label}
                    placeholder={placeholder}
                    data={data}
                    error={error?.message}
                    required={required}
                    mt={mt}
                    classNames={{
                        input: '!rounded-lg !w-full !py-5',
                    }}
                />
            )}
        />
    );
};

export default SelectBox;
