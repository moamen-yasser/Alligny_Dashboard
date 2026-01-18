import { Textarea, FileInput, Radio, Group, Stack, Text } from "@mantine/core";
import { HiOutlineVideoCamera, HiOutlineArrowUp, HiOutlineArrowDown } from "react-icons/hi2";
import { getUploadVideoValidationSchema } from "./validationSchema";
import { useUploadVideoMutation } from "../../Service/Apis/videosApi";
import { showNotification } from "../../utils/notification";
import { useTranslation } from "react-i18next";

const DynamicFormFields = () => {
    const { t } = useTranslation();
    const [uploadVideo, { isLoading }] = useUploadVideoMutation();

    const handleSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append('VideoFile', data.video);
            formData.append('Description', data.description);
            formData.append('Section', data.section);

            await uploadVideo(formData).unwrap();

            showNotification.success({
                title: t('video_uploaded_title'),
                message: t('video_uploaded_desc'),
            });
        } catch (error) {
            console.error("Error uploading video:", error);
            showNotification.error(error?.data?.message || t('error_uploading_video'));
        }
    };

    const form = {
        fields: [
            {
                id: "video",
                name: "video",
                condition: () => true,
                component: ({ field, error, setValue }) => (
                    <FileInput
                        label={t('video_file')}
                        placeholder={t('select_video_file')}
                        accept="video/mp4,video/quicktime,video/x-msvideo"
                        leftSection={<HiOutlineVideoCamera size={18} />}
                        error={error}
                        onChange={(file) => setValue('video', file)}
                        classNames={{
                            input: "!py-4 !rounded-lg dark:!bg-slate-800 dark:!text-white focus:!border-main transition-colors"
                        }}
                        withAsterisk
                    />
                ),
            },
            {
                id: "description",
                name: "description",
                condition: () => true,
                component: ({ field, error }) => (
                    <Textarea
                        {...field}
                        label={t('description')}
                        placeholder={t('enter_video_description')}
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
            {
                id: "section",
                name: "section",
                condition: () => true,
                component: ({ field, error }) => (
                    <div>
                        <Text size="sm" fw={500} mb={8} className="dark:text-white">
                            {t('video_position')} <span className="text-red-500">*</span>
                        </Text>
                        <Radio.Group
                            {...field}
                            error={error}
                            description={t('video_position_desc')}
                        >
                            <Stack gap="xs" mt={14}>
                                <Radio
                                    value="top"
                                    label={
                                        <Group gap="xs">
                                            <HiOutlineArrowUp size={18} className="text-blue-500" />
                                            <div>
                                                <Text size="sm" fw={600} className="dark:text-white">{t('top_section')}</Text>
                                                <Text size="xs" c="dimmed">{t('top_section_desc')}</Text>
                                            </div>
                                        </Group>
                                    }
                                    classNames={{
                                        radio: "!border-2 checked:!bg-main checked:!border-main",
                                        label: "!cursor-pointer"
                                    }}
                                />
                                <Radio
                                    value="down"
                                    label={
                                        <Group gap="xs">
                                            <HiOutlineArrowDown size={18} className="text-orange-500" />
                                            <div>
                                                <Text size="sm" fw={600} className="dark:text-white">{t('bottom_section')}</Text>
                                                <Text size="xs" c="dimmed">{t('bottom_section_desc')}</Text>
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
        ],
        validationSchema: getUploadVideoValidationSchema(t),
        onSubmit: handleSubmit,
        isLoading: isLoading,
        defaultValues: {
            video: null,
            description: "",
            section: "top",
        },
    };

    return { form };
};

export default DynamicFormFields;
