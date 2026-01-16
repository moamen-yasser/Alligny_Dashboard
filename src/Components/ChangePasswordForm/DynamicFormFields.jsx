import { useCallback, useMemo } from "react";
import {
    PasswordInput,
    Group,
    Progress,
} from "@mantine/core";
import { changePasswordValidationSchema } from "./validationSchema";
import VisibilityToggleIcon from "./Hook/VisibilityToggleIcon";
import { useChangePasswordMutation } from "../../Service/Apis/authApi";
import { showNotification } from "../../utils/notification";

const DynamicFormFields = () => {
    // -- API Mutations --
    const [changePassword, { isLoading: isLoadingChangePassword }] = useChangePasswordMutation();
    const isLoading = isLoadingChangePassword;

    // -- Password Logic --
    const requirements = useMemo(() => [
        { re: /[0-9]/, label: "Includes number" },
        { re: /[a-z]/, label: "Includes lowercase letter" },
        { re: /[A-Z]/, label: "Includes uppercase letter" },
        { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" },
    ], []);

    const getStrength = useCallback((password) => {
        if (password.length < 8) return 10;
        let multiplier = password.length > 8 ? 0 : 1;
        requirements.forEach((requirement) => {
            if (!requirement.re.test(password)) multiplier += 1;
        });
        return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
    }, []);

    const getStrengthColor = useCallback((strength) => {
        if (strength < 30) return "red";
        if (strength < 50) return "orange";
        if (strength < 90) return "yellow";
        return "teal";
    }, []);

    // -- Submission Logic --
    const handleSubmit = async (data) => {
        try {
            await changePassword({
                oldPassword: data.current_password,
                newPassword: data.new_password,
                confirmNewPassword: data.confirm_password,
            }).unwrap();
            showNotification.success({
                title: "Password Changed",
                message: "Your password has been changed successfully.",
            });
        } catch (error) {
            console.error("Error resetting password:", error);
            showNotification.error(error?.data?.message || "Error resetting password");
        }
    };

    const form = {
        fields: [
            {
                id: "current_password",
                name: "current_password",
                condition: () => true,
                component: ({ field, error }) => {
                    const strength = getStrength(field.value || "");
                    const color = getStrengthColor(strength);
                    return (
                        <div>
                            <PasswordInput
                                {...field}
                                label="Current Password"
                                placeholder="••••••••"
                                error={error}
                                classNames={{ input: "!py-6 !rounded-lg dark:!bg-slate-800 dark:!text-white focus:!border-main transition-colors" }}
                                withAsterisk
                                visibilityToggleIcon={({ reveal }) => field?.value?.length > 0 ? VisibilityToggleIcon({ reveal }) : null}
                            />
                            {field.value?.length > 0 && (
                                <Group gap={5} grow mt="xs">
                                    <Progress size="xs" color={color} value={100} transitionDuration={0} />
                                    <Progress size="xs" color={color} value={strength < 30 ? 0 : 100} transitionDuration={0} />
                                    <Progress size="xs" color={color} value={strength < 50 ? 0 : 100} transitionDuration={0} />
                                    <Progress size="xs" color={color} value={strength < 70 ? 0 : 100} transitionDuration={0} />
                                </Group>
                            )}
                        </div>
                    )
                },
            },
            {
                id: "new_password",
                name: "new_password",
                condition: () => true,
                component: ({ field, error }) => {
                    const strength = getStrength(field.value || "");
                    const color = getStrengthColor(strength);
                    return (
                        <div>
                            <PasswordInput
                                {...field}
                                label="New Password"
                                placeholder="••••••••"
                                error={error}
                                classNames={{ input: "!py-6 !rounded-lg dark:!bg-slate-800 dark:!text-white focus:!border-main transition-colors" }}
                                withAsterisk
                                visibilityToggleIcon={({ reveal }) => field?.value?.length > 0 ? VisibilityToggleIcon({ reveal }) : null}
                            />
                            {field.value?.length > 0 && (
                                <Group gap={5} grow mt="xs">
                                    <Progress size="xs" color={color} value={100} transitionDuration={0} />
                                    <Progress size="xs" color={color} value={strength < 30 ? 0 : 100} transitionDuration={0} />
                                    <Progress size="xs" color={color} value={strength < 50 ? 0 : 100} transitionDuration={0} />
                                    <Progress size="xs" color={color} value={strength < 70 ? 0 : 100} transitionDuration={0} />
                                </Group>
                            )}
                        </div>
                    )
                },
            },
            {
                id: "confirm_password",
                name: "confirm_password",
                condition: () => true,
                component: ({ field, error }) => {
                    const strength = getStrength(field.value || "");
                    const color = getStrengthColor(strength);
                    return (
                        <div>
                            <PasswordInput
                                {...field}
                                label="Confirm Password"
                                placeholder="••••••••"
                                error={error}
                                classNames={{ input: "!py-6 !rounded-lg dark:!bg-slate-800 dark:!text-white focus:!border-main transition-colors" }}
                                withAsterisk
                                visibilityToggleIcon={({ reveal }) => field?.value?.length > 0 ? VisibilityToggleIcon({ reveal }) : null}
                            />
                            {field.value?.length > 0 && (
                                <Group gap={5} grow mt="xs">
                                    <Progress size="xs" color={color} value={100} transitionDuration={0} />
                                    <Progress size="xs" color={color} value={strength < 30 ? 0 : 100} transitionDuration={0} />
                                    <Progress size="xs" color={color} value={strength < 50 ? 0 : 100} transitionDuration={0} />
                                    <Progress size="xs" color={color} value={strength < 70 ? 0 : 100} transitionDuration={0} />
                                </Group>
                            )}
                        </div>
                    )
                },
            },
        ],
        validationSchema: changePasswordValidationSchema,
        onSubmit: handleSubmit,
        isLoading: isLoading,
        defaultValues: {
            current_password: "",
            new_password: "",
            confirm_password: "",
        },
    };

    return { form };
};

export default DynamicFormFields;