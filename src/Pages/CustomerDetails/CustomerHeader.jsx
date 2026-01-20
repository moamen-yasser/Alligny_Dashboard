import { Group, Stack, Text, Badge, ActionIcon, Button, Tooltip } from "@mantine/core";
import { HiArrowLeft, HiArrowRight, HiOutlineCheckCircle, HiOutlineTrash } from "react-icons/hi2";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

const CustomerHeader = ({
    customer,
    navigate,
    subscriptionStatus,
    statusColor,
    onActivateClick,
    isActivating,
    onDeleteClick,
    isDeleting
}) => {
    const { t } = useTranslation();
    const canActivate = !customer?.isSubscribed || subscriptionStatus === "Expired";
    const isAr = i18n.language === 'ar';

    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
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
                        {t('customer_details')}
                    </Text>
                </Group>
                <Text size="sm" c="dimmed" ml={isAr ? 0 : 32} mr={isAr ? 32 : 0}>
                    {t('manage_customer_info')}{" "}
                    <span className="text-main font-semibold">
                        "{customer?.firstName} {customer?.lastName}"
                    </span>
                </Text>
            </Stack>

            <Group gap="md">
                <Badge
                    size="xl"
                    variant="filled"
                    color={statusColor}
                    className={`py-5 px-8 font-extrabold shadow-sm !text-white transition-all duration-300 ${subscriptionStatus === "Expiring Soon" ? "animate-pulse" : ""
                        }`}
                    radius="xl"
                    leftSection={<span className={`w-2 h-2 rounded-full bg-white ${isAr ? 'ml-2' : 'mr-1'}`} />}
                >
                    {t(subscriptionStatus.toLowerCase().replace(/\s+/g, '_'))}
                </Badge>

                {canActivate && (
                    <Button
                        color="green"
                        size="md"
                        radius="md"
                        leftSection={<HiOutlineCheckCircle size={18} />}
                        onClick={onActivateClick}
                        loading={isActivating}
                        loaderProps={{ type: "dots" }}
                        className="transition-all duration-200 hover:scale-105 active:scale-95 font-semibold shadow-md hover:shadow-lg"
                    >
                        {t('activate_subscription')}
                    </Button>
                )}

                <Tooltip label={t('delete')} position="top">
                    <ActionIcon
                        variant="light"
                        color="red"
                        size="xl"
                        radius="md"
                        onClick={onDeleteClick}
                        loading={isDeleting}
                        className="h-[42px] w-[42px] transition-all hover:scale-105 active:scale-95 shadow-sm"
                    >
                        <HiOutlineTrash size={22} />
                    </ActionIcon>
                </Tooltip>
            </Group>
        </div>
    );
};

export default CustomerHeader;
