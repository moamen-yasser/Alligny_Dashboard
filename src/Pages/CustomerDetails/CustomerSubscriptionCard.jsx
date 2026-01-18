import { Card, Text, Badge, Group, Stack, Progress, ActionIcon } from "@mantine/core";
import { HiOutlineCalendarDays, HiOutlineCheckCircle, HiOutlineClock, HiOutlineXCircle } from "react-icons/hi2";
import { formatDateTime } from "../../utils/formatDateTime";
import { useTranslation } from "react-i18next";

const CustomerSubscriptionCard = ({ customer, className = "" }) => {
    const { t } = useTranslation();
    const isSubscribed = customer?.isSubscribed;

    // Parse and validate date
    const rawDate = customer?.subscriptionEndDate ? new Date(customer.subscriptionEndDate) : null;
    const endDate = rawDate && !isNaN(rawDate.getTime()) ? rawDate : null;

    const now = new Date();

    // Calculate days remaining
    const daysRemaining = endDate ? Math.ceil((endDate - now) / (1000 * 60 * 60 * 24)) : 0;
    const isExpired = daysRemaining < 0;
    const isExpiringSoon = daysRemaining > 0 && daysRemaining <= 7;

    // Calculate progress (assuming 365 days subscription)
    const totalDays = 365;
    const daysUsed = totalDays - daysRemaining;
    const progressValue = isSubscribed && endDate && !isExpired ? ((daysUsed / totalDays) * 100) : 0;

    const getStatusIcon = () => {
        if (!isSubscribed || isExpired) return <HiOutlineXCircle size={20} />;
        if (isExpiringSoon) return <HiOutlineClock size={20} />;
        return <HiOutlineCheckCircle size={20} />;
    };

    const getStatusColor = () => {
        if (!isSubscribed || isExpired) return "red";
        if (isExpiringSoon) return "yellow";
        return "teal";
    };

    const getStatusText = () => {
        if (!isSubscribed) return t('no_active_subscription');
        if (isExpired) return t('subscription_expired');
        if (isExpiringSoon) return t('expiring_soon');
        return t('active_subscription');
    };

    return (
        <Card
            shadow="sm"
            padding="lg"
            radius="lg"
            withBorder
            className={`bg-white dark:bg-slate-900 border-l-4 ${isSubscribed && !isExpired ? (isExpiringSoon ? 'border-l-yellow-500' : 'border-l-teal-500') : 'border-l-red-500'} ${className}`}
        >
            <Text fw={700} size="lg" mb="md" className="text-slate-800 dark:text-white">
                {t('subscription_status')}
            </Text>

            <Stack gap="md">
                {/* Status Badge */}
                <Group justify="space-between" align="center">
                    <Badge
                        color={getStatusColor()}
                        variant="light"
                        size="xl"
                        radius="md"
                        leftSection={getStatusIcon()}
                        className="py-1 px-3 !h-9 shadow-sm"
                    >
                        {getStatusText()}
                    </Badge>
                </Group>

                {/* Date Reference */}
                {endDate && (
                    <Group gap="md" className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                        <ActionIcon
                            variant="light"
                            color={getStatusColor()}
                            size="lg"
                            radius="md"
                        >
                            <HiOutlineCalendarDays size={20} />
                        </ActionIcon>
                        <div>
                            <Text size="xs" c="dimmed" tt="uppercase" fw={700} mb={2}>
                                {isExpired ? t('expired_on') : t('valid_until')}
                            </Text>
                            <Text fw={600} size="sm" className="text-slate-700 dark:text-slate-200">
                                {formatDateTime(customer?.subscriptionEndDate)}
                            </Text>
                        </div>
                    </Group>
                )}

                {/* Progress Tracking */}
                {isSubscribed && !isExpired && (
                    <div className="mt-2">
                        <Group justify="space-between" mb={8}>
                            <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                                {t('days_remaining')}
                            </Text>
                            <Text fw={700} size="sm" color={isExpiringSoon ? "yellow" : "main"}>
                                {daysRemaining} {t('days')}
                            </Text>
                        </Group>
                        <Progress
                            value={progressValue}
                            size="lg"
                            radius="xl"
                            color={isExpiringSoon ? "yellow" : "teal"}
                            animated={isExpiringSoon}
                            className="shadow-inner"
                        />
                    </div>
                )}
            </Stack>
        </Card>
    );
};

export default CustomerSubscriptionCard;
