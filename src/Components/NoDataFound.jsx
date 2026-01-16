import { Paper, Text, Button } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { FiDatabase } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function NoDataFound({ home }) {
    const isMobile = useMediaQuery("(max-width: 768px)");

    return (
        <div className="flex items-center justify-center px-4">
            <Paper
                shadow="md"
                radius="lg"
                p="xl"
                className="text-center w-full max-w-md border border-gray-200 dark:border-gray-700 dark:!bg-slate-900"
            >
                <div className="flex justify-center mb-6">
                    <FiDatabase size={64} className="text-gray-400" />
                </div>
                <Text size="xl" weight={700} className="mb-2">
                    No Data Found
                </Text>
                <Text size="sm" color="dimmed" className="mb-6">
                    We couldn't find any matching records. Try adjusting your search or filters.
                </Text>
                {!home && (
                    <Link to="/dashboard/home">
                        <Button
                            className={`!mt-2 !bg-textSecondColor !text-white hover:!bg-hoverColor !w-[50%] !mb-2 !rounded-lg ${isMobile ? '!py-1 !text-sm' : '!py-1.5'}`}
                        >
                            Go To Home
                        </Button>
                    </Link>
                )}
            </Paper>
        </div>
    );
}
