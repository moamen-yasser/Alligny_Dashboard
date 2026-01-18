import { Paper, Stack, Box, Text, Button } from "@mantine/core";
import { HiOutlinePlus, HiOutlinePlay } from "react-icons/hi2";
import { useTranslation } from "react-i18next";

const EmptyState = ({ onUploadClick }) => {
    const { t } = useTranslation();
    return (
        <Paper
            shadow="sm"
            p="xl"
            radius="lg"
            withBorder
            className="bg-white dark:bg-slate-900 text-center"
        >
            <Stack align="center" gap="md">
                <Box className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    <HiOutlinePlay size={40} className="text-slate-400" />
                </Box>
                <div>
                    <Text size="lg" fw={600} className="text-slate-800 dark:text-white mb-2">
                        {t('no_videos_yet')}
                    </Text>
                    <Text size="sm" c="dimmed">
                        {t('upload_first_video_desc')}
                    </Text>
                </div>
                <Button
                    leftSection={<HiOutlinePlus size={18} />}
                    onClick={onUploadClick}
                    variant="light"
                    color="#50C5C8"
                    radius="md"
                >
                    {t('upload_video')}
                </Button>
            </Stack>
        </Paper>
    );
};

export default EmptyState;
