import React from "react";
import { Input } from "@mantine/core";

const SearchInput = ({
    placeholder = "Search...",
    value,
    onChange,
    onClear,
    className,
}) => {
    return (
        <Input
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            rightSectionPointerEvents="all"
            className={`flex items-center justify-center relative ${className}`}
            classNames={{
                input: `!py-2 !px-10 !rounded-lg !w-full placeholder:text-base outline-none focus:ring-0 dark:!bg-slate-800 dark:!text-white dark:!border-slate-700 dark:placeholder:text-gray-500`,
            }}
            rightSection={
                <i
                    className="bi bi-x-lg text-base font-bold font-paragarphFont cursor-pointer text-main "
                    aria-label="Clear input"
                    style={{
                        display: value ? undefined : "none",
                    }}
                    onClick={onClear}
                ></i>
            }
            leftSection={
                <i className="bi bi-search text-base font-paragarphFont text-submain font-bold text-main"></i>
            }
        />
    );
};

export default SearchInput;