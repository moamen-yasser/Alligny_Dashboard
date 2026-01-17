import { Textarea, FileInput, Radio, Group, Stack, Text } from "@mantine/core";
import { HiOutlineVideoCamera, HiOutlineArrowUp, HiOutlineArrowDown } from "react-icons/hi2";
import { uploadVideoValidationSchema } from "./validationSchema";
import { useUploadVideoMutation } from "../../Service/Apis/videosApi";
import { showNotification } from "../../utils/notification";

const DynamicFormFields = () => {
    const [uploadVideo, { isLoading }] = useUploadVideoMutation();

    const handleSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append('VideoFile', data.video);
            formData.append('Description', data.description);
            formData.append('Section', data.section);

            await uploadVideo(formData).unwrap();

            showNotification.success({
                title: "Video Uploaded",
                message: "Your video has been uploaded successfully.",
            });
        } catch (error) {
            console.error("Error uploading video:", error);
            showNotification.error(error?.data?.message || "Error uploading video");
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
                        label="Video File"
                        placeholder="Select video file"
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
                        label="Description"
                        placeholder="Enter video description"
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
                            Video Position <span className="text-red-500">*</span>
                        </Text>
                        <Radio.Group
                            {...field}
                            error={error}
                            description="Choose where this video will appear in the mobile app"
                        >
                            <Stack gap="xs" mt={14}>
                                <Radio
                                    value="top"  
                                    label={
                                        <Group gap="xs">
                                            <HiOutlineArrowUp size={18} className="text-blue-500" />
                                            <div>
                                                <Text size="sm" fw={600} className="dark:text-white">Top Section</Text>
                                                <Text size="xs" c="dimmed">Video will appear at the top of the list</Text>
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
                                                <Text size="sm" fw={600} className="dark:text-white">Bottom Section</Text>
                                                <Text size="xs" c="dimmed">Video will appear at the bottom of the list</Text>
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
        validationSchema: uploadVideoValidationSchema,
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
