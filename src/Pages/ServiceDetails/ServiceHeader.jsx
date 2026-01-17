import { Group, Stack, Text, Badge, Button, ActionIcon } from "@mantine/core";
import { HiArrowLeft, HiOutlineCheckCircle, HiOutlineXCircle } from "react-icons/hi2";

const ServiceHeader = ({
    service,
    navigate,
    statusColors,
    handleActionClick,
    isApproveLoading,
    isRejectLoading
}) => {
    return (
        <Group justify="space-between" mb="xl">
            <Stack gap={4}>
                <Group gap="xs">
                    <ActionIcon
                        variant="subtle"
                        color="gray"
                        onClick={() => navigate(-1)}
                        className="hover:scale-110 transition-transform"
                    >
                        <HiArrowLeft size={20} />
                    </ActionIcon>
                    <Text size="xl" fw={800} className="text-slate-800 dark:text-white">
                        Service Details
                    </Text>
                </Group>
                <Text size="sm" c="dimmed" ml={32}>
                    View and manage service information for <span className="text-main font-semibold">"{service.name}"</span>
                </Text>
            </Stack>

            <Group gap="md">
                <Badge
                    size="xl"
                    variant="filled"
                    color={statusColors[service?.status]}
                    className={`py-5 px-8 font-extrabold shadow-sm !text-white transition-all duration-300 ${service?.status === 'Pending' ? 'animate-pulse' : ''}`}
                    radius="xl"
                    leftSection={<span className="w-2 h-2 rounded-full bg-white mr-1" />}
                >
                    {service?.status}
                </Badge>

                <Group gap="xs">
                    {(service?.status === "Pending" || service?.status === "Rejected") && (
                        <Button
                            color="green"
                            radius="md"
                            leftSection={<HiOutlineCheckCircle size={18} />}
                            onClick={() => handleActionClick('approve')}
                            loading={isApproveLoading}
                        >
                            Approve
                        </Button>
                    )}
                    {(service?.status === "Pending" || service?.status === "Approved") && (
                        <Button
                            color="red"
                            variant="light"
                            radius="md"
                            leftSection={<HiOutlineXCircle size={18} />}
                            onClick={() => handleActionClick('reject')}
                            loading={isRejectLoading}
                        >
                            Reject
                        </Button>
                    )}
                </Group>
            </Group>
        </Group>
    );
};

export default ServiceHeader;
