import { useState, useMemo } from 'react';
import { TextInput, Progress, Group } from '@mantine/core';
import { Controller } from 'react-hook-form';
import { IoEye, IoEyeOff } from 'react-icons/io5';

const PasswordInput = ({ control, name, placeholder, error, label }) => {
    const [passwordVisibility, setPasswordVisibility] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisibility((prev) => !prev); // Toggle visibility
    };

    const requirements = useMemo(() => [
        { re: /[0-9]/, label: "Includes number" },
        { re: /[a-z]/, label: "Includes lowercase letter" },
        { re: /[A-Z]/, label: "Includes uppercase letter" },
        { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" },
    ], []);

    const getStrength = (password) => {
        if (password.length < 8) return 10;
        let multiplier = 0;
        requirements.forEach((requirement) => {
            if (!requirement.re.test(password)) {
                multiplier += 1;
            }
        });
        return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
    };

    const getStrengthColor = (strength) => {
        if (strength < 30) return "red";
        if (strength < 50) return "orange";
        if (strength < 90) return "yellow";
        return "teal";
    };

    return (
        <div className='md-2'>
            <Controller
                name={name}
                defaultValue=""
                control={control}
                render={({ field }) => {
                    const strength = getStrength(field.value || "");
                    const color = getStrengthColor(strength);

                    return (
                        <div>
                            <TextInput
                                {...field}
                                label={label}
                                placeholder={placeholder}
                                type={passwordVisibility ? 'text' : 'password'}
                                className="w-full"
                                classNames={{
                                    input: `!py-6 !rounded-lg !text-base !w-full !h-[40px] dark:!bg-slate-800 dark:!text-white dark:!border-slate-700 focus:!border-main transition-colors`,
                                    error: 'text-red-500 text-xs',
                                    label: '!text-lg !font-bold !text-main dark:!text-main',
                                }}
                                error={error}
                                rightSection={
                                    field.value && field.value.length > 0 && (
                                        <div
                                            onClick={togglePasswordVisibility}
                                            className='cursor-pointer'
                                        >
                                            {passwordVisibility ? (
                                                <IoEye size={18} className="!text-main" />
                                            ) : (
                                                <IoEyeOff size={18} className="!text-main" />
                                            )}
                                        </div>
                                    )
                                }
                            />
                            {field.value?.length > 0 && (
                                <Group gap={5} grow mt="xs">
                                    <Progress size="xs" color={color} value={strength > 0 ? 100 : 0} transitionDuration={0} />
                                    <Progress size="xs" color={color} value={strength > 30 ? 100 : 0} transitionDuration={0} />
                                    <Progress size="xs" color={color} value={strength > 50 ? 100 : 0} transitionDuration={0} />
                                    <Progress size="xs" color={color} value={strength > 70 ? 100 : 0} transitionDuration={0} />
                                </Group>
                            )}
                        </div>
                    )
                }}
            />
        </div>
    );
};

export default PasswordInput;