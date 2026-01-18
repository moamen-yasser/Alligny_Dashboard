import React from "react";
import { Textarea, TextInput } from "@mantine/core";
import { Controller } from "react-hook-form";

const TextInputField = ({ control, name, placeholder, error, label, login, title }) => {
    return (
        <div className="mb-2">
            <Controller
                name={name}
                defaultValue=""
                control={control}
                render={({ field }) => (
                    login || title ? (
                        <TextInput
                            {...field}
                            label={label}
                            placeholder={placeholder}
                            className="w-full"
                            classNames={{
                                input: `!py-6 !rounded-lg !text-base !w-full !h-[40px] dark:!bg-slate-800 dark:!text-white dark:!border-slate-700 focus:!border-main transition-colors`,
                                error: "text-red-500 text-xs",
                                label: '!text-lg !font-bold !text-main dark:!text-main',
                            }}
                            error={error}
                        />
                    ) : (
                        <Textarea
                            {...field}
                            placeholder={placeholder}
                            className="w-full"
                            classNames={{
                                input: `!py-6 !rounded-lg !text-base !w-full dark:!bg-slate-800 dark:!text-white dark:!border-slate-700 focus:!border-main transition-colors`,
                                error: "text-red-500 text-xs ms-1",
                            }}
                            autosize
                            minRows={4}
                            error={error}
                        />
                    )
                )}
            />
        </div>
    );
};

export default TextInputField;