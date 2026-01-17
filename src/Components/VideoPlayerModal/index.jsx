import { Modal, Stack, Text, Group, Badge, ActionIcon } from "@mantine/core";
import { HiOutlineXMark, HiOutlineCalendar, HiOutlineUser, HiOutlineDocumentText } from "react-icons/hi2";
import { formatDateTime } from "../../utils/formatDateTime";

const VideoPlayerModal = ({ opened, close, video }) => {
    if (!video) return null;

    return (
        <Modal
            opened={opened}
            onClose={close}
            size="xl"
            radius="lg"
            padding="0"
            centered
            withCloseButton={false}
            overlayProps={{
                backgroundOpacity: 0.75,
                blur: 4,
            }}
            classNames={{
                content: "dark:!bg-slate-900 !overflow-hidden",
                body: "!p-0",
            }}
        >
            <div className="relative">
                {/* Close Button */}
                <ActionIcon
                    onClick={close}
                    variant="filled"
                    color="dark"
                    size="lg"
                    radius="xl"
                    className="absolute top-4 left-4 z-10 !bg-black/70 hover:!bg-black/90 backdrop-blur-sm"
                >
                    <HiOutlineXMark size={20} className="text-white" />
                </ActionIcon>

                {/* Video Player */}
                <div className="bg-black">
                    <video
                        src={video.videoUrl}
                        controls
                        controlsList="nodownload"
                        className="w-full max-h-[70vh] object-contain"
                        autoPlay
                    />
                </div>

                {/* Video Info */}
                <div className="p-6 bg-white dark:bg-slate-900">
                    <Stack gap="md">
                        {/* Description */}
                        <div>
                            <Group gap="xs" mb={8}>
                                <HiOutlineDocumentText size={18} className="text-main" />
                                <Text size="sm" c="dimmed" tt="uppercase" fw={700}>
                                    Description
                                </Text>
                            </Group>
                            <Text size="md" fw={600} className="text-slate-800 dark:text-white">
                                {video.description}
                            </Text>
                        </div>

                        {/* Metadata */}
                        <Group gap="lg" wrap="wrap">
                            <div className="flex items-center gap-2">
                                <HiOutlineCalendar size={16} className="text-slate-400" />
                                <div>
                                    <Text size="xs" c="dimmed">Uploaded</Text>
                                    <Text size="sm" fw={500} className="text-slate-800 dark:text-white">
                                        {formatDateTime(video.createdAt)}
                                    </Text>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <HiOutlineUser size={16} className="text-slate-400" />
                                <div>
                                    <Text size="xs" c="dimmed">Uploaded By</Text>
                                    <Text size="sm" fw={500} className="text-slate-800 dark:text-white">
                                        {video.uploadedBy}
                                    </Text>
                                </div>
                            </div>

                            <div>
                                <Text size="xs" c="dimmed" mb={4}>File Size</Text>
                                <Badge
                                    variant="light"
                                    color="main"
                                    size="lg"
                                    radius="md"
                                >
                                    {video.formattedFileSize}
                                </Badge>
                            </div>

                            <div>
                                <Text size="xs" c="dimmed" mb={4}>Format</Text>
                                <Badge
                                    variant="light"
                                    color="gray"
                                    size="lg"
                                    radius="md"
                                >
                                    {video.contentType?.split('/')[1]?.toUpperCase() || 'MP4'}
                                </Badge>
                            </div>

                            <div>
                                <Text size="xs" c="dimmed" mb={4}>Position</Text>
                                <Badge
                                    variant="light"
                                    color={video.section === 'Top' ? 'blue' : 'orange'}
                                    size="lg"
                                    radius="md"
                                >
                                    {video.section === 'Top' ? '↑ Top Section' : '↓ Bottom Section'}
                                </Badge>
                            </div>
                        </Group>
                    </Stack>
                </div>
            </div>
        </Modal>
    );
};

export default VideoPlayerModal;
