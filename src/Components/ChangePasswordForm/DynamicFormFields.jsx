import { useCallback, useMemo } from "react";
import {
    PasswordInput,
    Group,
    Progress,
} from "@mantine/core";
import { getChangePasswordValidationSchema } from "./validationSchema";
import VisibilityToggleIcon from "./Hook/VisibilityToggleIcon";
import { useChangePasswordMutation } from "../../Service/Apis/authApi";
import { showNotification } from "../../utils/notification";
import { useTranslation } from "react-i18next";

const DynamicFormFields = () => {
    const { t } = useTranslation();
    // -- API Mutations --
    const [changePassword, { isLoading: isLoadingChangePassword }] = useChangePasswordMutation();
    const isLoading = isLoadingChangePassword;

    // -- Password Logic --
    const requirements = useMemo(() => [
        { re: /[0-9]/, label: t('includes_number') },
        { re: /[a-z]/, label: t('includes_lowercase') },
        { re: /[A-Z]/, label: t('includes_uppercase') },
        { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: t('includes_special_symbol') },
    ], [t]);

    const getStrength = useCallback((password) => {
        if (password.length < 8) return 10;
        let multiplier = password.length > 8 ? 0 : 1;
        requirements.forEach((requirement) => {
            if (!requirement.re.test(password)) multiplier += 1;
        });
        return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
    }, [requirements]);

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
                title: t('password_changed_title'),
                message: t('password_changed_desc'),
            });
        } catch (error) {
            console.error("Error resetting password:", error);
            showNotification.error(error?.data?.message || t('error_changing_password'));
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
                                label={t('current_password')}
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
                                label={t('new_password')}
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
                                label={t('confirm_password')}
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
        validationSchema: getChangePasswordValidationSchema(t),
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