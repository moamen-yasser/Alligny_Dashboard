import { Group, Stack, Text, Badge, Button, ActionIcon } from "@mantine/core";
import { HiArrowLeft, HiArrowRight, HiOutlineCheckCircle, HiOutlineXCircle } from "react-icons/hi2";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

const ServiceHeader = ({
    service,
    navigate,
    statusColors,
    handleActionClick,
    isApproveLoading,
    isRejectLoading
}) => {
    const { t } = useTranslation();
    const isAr = i18n.language === 'ar';

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
                        {isAr ? <HiArrowRight size={20} /> : <HiArrowLeft size={20} />}
                    </ActionIcon>
                    <Text size="xl" fw={800} className="text-slate-800 dark:text-white">
                        {t('service_details')}
                    </Text>
                </Group>
                <Text size="sm" c="dimmed" ml={isAr ? 0 : 32} mr={isAr ? 32 : 0}>
                    {t('manage_service_info')} <span className="text-main font-semibold">"{service.name}"</span>
                </Text>
            </Stack>

            <Group gap="md">
                <Badge
                    size="xl"
                    variant="filled"
                    color={statusColors[service?.status]}
                    className={`py-5 px-8 font-extrabold shadow-sm !text-white transition-all duration-300 ${service?.status === 'Pending' ? 'animate-pulse' : ''}`}
                    radius="xl"
                    leftSection={<span className={`w-2 h-2 rounded-full bg-white ${isAr ? 'ml-2' : 'mr-1'}`} />}
                >
                    {t(service?.status?.toLowerCase() || 'n_a')}
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
                            {t('approve')}
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
                            {t('reject')}
                        </Button>
                    )}
                </Group>
            </Group>
        </Group>
    );
};

export default ServiceHeader;
