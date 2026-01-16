import React, { useEffect, useState } from 'react'
import { Button, FileInput, Image } from "@mantine/core";
import { Controller } from "react-hook-form";
import { TiDeleteOutline } from "react-icons/ti";
import { HiOutlinePhoto } from "react-icons/hi2";

const ImageBox = ({ control, name, error, label, setValue, resetTrigger }) => {
    const [previewImage, setPreviewImage] = useState(null);

    const handleImageChange = (file) => {
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
            setValue(name, file);
        }
    };

    const handleImageRemove = () => {
        setPreviewImage(null);
        setValue(name, null);
    };

    useEffect(() => {
        setPreviewImage(null);
        setValue(name, null);
    }, [resetTrigger, setValue, name]);

    return (
        <div>
            <label className="block text-lg font-bold text-main ml-4 mb-2">{label}</label>
            <Controller
                name={name}
                defaultValue={null}
                control={control}
                render={({ field }) => (
                    <>
                        {!previewImage ? (
                            <FileInput
                                type="file"
                                {...field}
                                onChange={(file) => {
                                    field.onChange(file);
                                    handleImageChange(file);
                                }}
                                placeholder={<HiOutlinePhoto size={160} color={error ? '#ef4444' : '#9ca3af'} />}
                                accept="image/png,image/jpeg,image/jpg,image/svg,image/gif"
                                value={previewImage}
                                error={error}
                                className={`w-48 h-48 flex flex-col justify-center items-start`}
                                classNames={{
                                    input: `!py-3 !rounded-xl !w-full !h-full bg-transparent outline-none border ${error ? "border-red-500" : "border-gray"}`,
                                    error: "text-red-500 text-xs ml-1",
                                }}
                            />
                        ) : (
                            <div className="relative w-48 h-48 border rounded-xl">
                                <img
                                    src={previewImage}
                                    alt="Preview"
                                    className="w-full h-full object-cover rounded-xl overflow-hidden"
                                />
                                <Button
                                    className="!absolute !top-0 !right-0"
                                    onClick={() => {
                                        field.onChange(null);
                                        handleImageRemove();
                                    }}
                                    variant="subtle"
                                    size="xs"
                                >
                                    <TiDeleteOutline color="red" size={18} />
                                </Button>
                            </div>
                        )}
                    </>
                )}
            />
        </div>
    );
};

export default ImageBox;