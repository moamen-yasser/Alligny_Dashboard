import { Card, Stack, Group, Badge, ActionIcon, Tooltip, Text } from "@mantine/core";
import { HiOutlinePlay, HiOutlineTrash, HiOutlineCalendar, HiOutlineUser, HiOutlineDocumentText } from "react-icons/hi2";
import { formatDateTime } from "../../utils/formatDateTime";

const VideoCard = ({ video, onPlay, onDelete }) => {
    return (
        <Card
            shadow="sm"
            padding="0"
            radius="lg"
            withBorder
            className="bg-white dark:bg-slate-900 overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
            {/* Video Preview */}
            <Card.Section className="relative bg-slate-900 group">
                <video
                    src={video.videoUrl}
                    className="w-full h-48 object-cover"
                    controls={false}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-center justify-center">
                    <button
                        onClick={() => onPlay(video)}
                        className="w-16 h-16 rounded-full bg-main/90 hover:bg-main flex items-center justify-center transition-all transform hover:scale-110 cursor-pointer"
                    >
                        <HiOutlinePlay size={28} className="text-white ml-1" />
                    </button>
                </div>
            </Card.Section>

            {/* Content */}
            <div className="relative">
                <Stack gap="sm" p="md">
                    {/* Description with Delete Icon */}
                    <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                            <Group gap="xs" mb={4}>
                                <HiOutlineDocumentText size={16} className="text-main" />
                                <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                                    Description
                                </Text>
                            </Group>
                            <Text
                                size="sm"
                                fw={600}
                                className="text-slate-800 dark:text-white line-clamp-2"
                                title={video.description}
                            >
                                {video.description}
                            </Text>
                        </div>

                        {/* Delete Icon */}
                        <Tooltip label="Delete Video">
                            <ActionIcon
                                variant="light"
                                color="red"
                                size="lg"
                                radius="md"
                                onClick={() => onDelete(video.id)}
                            >
                                <HiOutlineTrash size={18} />
                            </ActionIcon>
                        </Tooltip>
                    </div>

                    {/* Metadata */}
                    <Stack gap={6}>
                        <Group gap="xs">
                            <HiOutlineCalendar size={14} className="text-slate-400" />
                            <Text size="xs" c="dimmed">
                                {formatDateTime(video.createdAt)}
                            </Text>
                        </Group>
                        <Group gap="xs">
                            <HiOutlineUser size={14} className="text-slate-400" />
                            <Text size="xs" c="dimmed">
                                {video.uploadedBy}
                            </Text>
                        </Group>
                        <Group gap="xs" wrap="nowrap">
                            <Badge
                                variant="light"
                                color="gray"
                                size="sm"
                                radius="sm"
                            >
                                {video.formattedFileSize}
                            </Badge>
                            <Badge
                                variant="light"
                                color={video.section === 'Top' ? 'blue' : 'orange'}
                                size="sm"
                                radius="sm"
                            >
                                {video.section === 'Top' ? '↑ Top' : '↓ Bottom'}
                            </Badge>
                        </Group>
                    </Stack>
                </Stack>
            </div>
        </Card>
    );
};

export default VideoCard;
