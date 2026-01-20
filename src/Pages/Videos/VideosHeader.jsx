import { Button, Tabs, Badge, Stack, Group, Text } from "@mantine/core";
import { HiOutlinePlus, HiOutlineVideoCamera } from "react-icons/hi2";
import { useTranslation } from "react-i18next";

const VideosHeader = ({ section, onSectionChange, totalCount, onUploadClick }) => {
    const { t } = useTranslation();
    return (
        <Stack gap="xl" mb="xl">
            {/* Header Info Section */}
            <Group justify="space-between" align="flex-end">
                <Stack gap={4}>
                    <Group gap="xs">
                        <div className="p-2 bg-main/10 rounded-lg">
                            <HiOutlineVideoCamera size={24} className="text-main" />
                        </div>
                        <Text size="xl" fw={800} className="text-slate-800 dark:text-white lg:text-3xl tracking-tight">
                            {t('all_videos')}
                        </Text>
                    </Group>
                    <Text size="sm" c="dimmed" className="font-medium lg:text-base opacity-80">
                        {t('manage_app_videos')}
                    </Text>
                </Stack>

                <Button
                    leftSection={<HiOutlinePlus size={20} />}
                    onClick={onUploadClick}
                    variant="filled"
                    color="#50C5C8"
                    radius="md"
                    size="md"
                    className="!font-bold shadow-sm hover:shadow-md transition-all active:scale-95 flex h-11"
                >
                    {t('upload_new_video')}
                </Button>
            </Group>

            {/* Filter and Stats Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 animate-[fadeIn_0.5s_ease-in]">
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <Tabs
                        value={section}
                        onChange={onSectionChange}
                        color="#50C5C8"
                        variant="pills"
                        radius="md"
                        className="flex-1 md:flex-none"
                    >
                        <Tabs.List className="bg-white dark:bg-slate-900 p-1 rounded-md border border-gray-100 dark:border-slate-700 w-full md:w-fit gap-1 min-h-[44px] flex flex-wrap items-center">
                            <Tabs.Tab value="all" className="dark:hover:bg-slate-800 h-full font-bold px-6 lg:px-8 flex-1 md:flex-none">
                                {t('all_videos')}
                            </Tabs.Tab>
                            <Tabs.Tab value="top" className="dark:hover:bg-slate-800 h-full font-bold px-6 lg:px-8 flex-1 md:flex-none">
                                {t('top_section')}
                            </Tabs.Tab>
                            <Tabs.Tab value="down" className="dark:hover:bg-slate-800 h-full font-bold px-6 lg:px-8 flex-1 md:flex-none">
                                {t('bottom_section')}
                            </Tabs.Tab>
                        </Tabs.List>
                    </Tabs>
                </div>

                <div className="bg-white dark:bg-slate-900 px-6 h-11 rounded-md border border-gray-100 dark:border-slate-700 shadow-sm flex items-center justify-center md:justify-start gap-4 w-full md:w-auto">
                    <Text size="sm" fw={600} className="text-slate-500 dark:text-slate-400 whitespace-nowrap">
                        {t('total_count')}:
                    </Text>
                    <Badge
                        variant="filled"
                        color="#50C5C8"
                        size="lg"
                        radius="sm"
                        className="h-7 text-xs min-w-[60px] flex justify-center font-bold"
                    >
                        {totalCount || 0}
                    </Badge>
                </div>
            </div>
        </Stack>
    );
};

export default VideosHeader;
