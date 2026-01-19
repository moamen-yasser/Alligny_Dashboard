import { TextInput, Textarea, Radio, Group, Stack, Text } from "@mantine/core";
import { HiOutlineUserGroup, HiOutlineShieldCheck } from "react-icons/hi2";
import { getAddNotificationValidationSchema } from "./validationSchema";
import { useSendUserNotificationMutation, useSendProviderNotificationMutation } from "../../Service/Apis/notificationsApi";
import { showNotification } from "../../utils/notification";
import { useTranslation } from "react-i18next";

const DynamicFormFields = () => {
    const { t } = useTranslation();
    const [sendUserNotification, { isLoading: isSendingUser }] = useSendUserNotificationMutation();
    const [sendProviderNotification, { isLoading: isSendingProvider }] = useSendProviderNotificationMutation();

    const handleSubmit = async (data) => {
        try {
            if (data.target === 'User') {
                await sendUserNotification({
                    title: data.title,
                    message: data.message
                }).unwrap();
            } else {
                await sendProviderNotification({
                    title: data.title,
                    message: data.message
                }).unwrap();
            }

            showNotification.success({
                data: {
                    message: t('operation_success')
                }
            });
        } catch (error) {
            console.error("Error sending notification:", error);
            showNotification.error(error);
            throw error; // Re-throw to prevent modal from closing if someone is catching it
        }
    };

    const form = {
        fields: [
            {
                id: "target",
                name: "target",
                condition: () => true,
                component: ({ field, error }) => (
                    <div className="mb-4">
                        <Text size="sm" fw={500} mb={8} className="dark:text-white">
                            {t('send_to')} <span className="text-red-500">*</span>
                        </Text>
                        <Radio.Group
                            {...field}
                            error={error}
                        >
                            <Stack gap="xs" mt={10}>
                                <Radio
                                    value="User"
                                    label={
                                        <Group gap="xs">
                                            <HiOutlineUserGroup size={18} className="text-blue-500" />
                                            <div>
                                                <Text size="sm" fw={600} className="dark:text-white">{t('users')}</Text>
                                                <Text size="xs" c="dimmed">{t('send_to_users_desc')}</Text>
                                            </div>
                                        </Group>
                                    }
                                    classNames={{
                                        radio: "!border-2 checked:!bg-main checked:!border-main",
                                        label: "!cursor-pointer"
                                    }}
                                />
                                <Radio
                                    value="Provider"
                                    label={
                                        <Group gap="xs">
                                            <HiOutlineShieldCheck size={18} className="text-orange-500" />
                                            <div>
                                                <Text size="sm" fw={600} className="dark:text-white">{t('providers')}</Text>
                                                <Text size="xs" c="dimmed">{t('send_to_providers_desc')}</Text>
                                            </div>
                                        </Group>
                                    }
                                    classNames={{
                                        radio: "!border-2 checked:!bg-main checked:!border-main",
                                        label: "!cursor-pointer"
                                    }}
                                />
                            </Stack>
                        </Radio.Group>
                    </div>
                ),
            },
            {
                id: "title",
                name: "title",
                condition: () => true,
                component: ({ field, error }) => (
                    <TextInput
                        {...field}
                        label={t('notification_title')}
                        placeholder={t('enter_notification_title')}
                        error={error}
                        classNames={{
                            input: "!py-4 !rounded-lg dark:!bg-slate-800 dark:!text-white focus:!border-main transition-colors"
                        }}
                        withAsterisk
                    />
                ),
            },
            {
                id: "message",
                name: "message",
                condition: () => true,
                component: ({ field, error }) => (
                    <Textarea
                        {...field}
                        label={t('notification_message')}
                        placeholder={t('enter_notification_message')}
                        error={error}
                        minRows={5}
                        maxRows={10}
                        autosize
                        classNames={{
                            input: "!rounded-lg dark:!bg-slate-800 dark:!text-white focus:!border-main transition-colors"
                        }}
                        withAsterisk
                    />
                ),
            },
        ],
        validationSchema: getAddNotificationValidationSchema(t),
        onSubmit: handleSubmit,
        isLoading: isSendingUser || isSendingProvider,
        defaultValues: {
            target: "User",
            title: "",
            message: "",
        },
    };

    return { form };
};

export default DynamicFormFields;
