import { Paper, Stack, Box, Text, Button } from "@mantine/core";
import { HiOutlinePlus, HiOutlinePlay } from "react-icons/hi2";

const EmptyState = ({ onUploadClick }) => {
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
                        No Videos Yet
                    </Text>
                    <Text size="sm" c="dimmed">
                        Upload your first video to get started
                    </Text>
                </div>
                <Button
                    leftSection={<HiOutlinePlus size={18} />}
                    onClick={onUploadClick}
                    variant="light"
                    color="#50C5C8"
                    radius="md"
                >
                    Upload Video
                </Button>
            </Stack>
        </Paper>
    );
};

export default EmptyState;
