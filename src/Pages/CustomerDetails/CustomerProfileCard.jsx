import { Card, Stack, Image, Text, Group, Avatar, Divider, Badge, Tooltip } from "@mantine/core";
import { HiCalendar, HiOutlineIdentification } from "react-icons/hi2";
import { MdContentCopy } from "react-icons/md";
import { notifications } from "@mantine/notifications";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

const CustomerProfileCard = ({ customer }) => {
    const { t } = useTranslation();
    const getInitials = () => {
        const firstName = customer?.firstName || "";
        const lastName = customer?.lastName || "";
        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || "?";
    };

    const handleCopyPromoCode = () => {
        navigator.clipboard.writeText(customer.ownPromoCode);
        notifications.show({
            title: t('copied'),
            message: t('promo_code_copied', { code: customer.ownPromoCode }),
            color: "teal",
            icon: <MdContentCopy size={18} />,
            autoClose: 2000,
        });
    };

    return (
        <Card
            shadow="sm"
            padding="lg"
            radius="lg"
            withBorder
            h="100%"
            className="bg-white dark:bg-slate-900 overflow-hidden flex flex-col"
        >
            {/* Profile Image Section */}
            <Card.Section
                className="bg-gradient-to-br from-main/10 to-subMain/10 dark:from-main/20 dark:to-subMain/20 p-8 flex-1"
                style={{ display: 'flex', flexDirection: 'column' }}
            >
                <div className="flex-1 flex items-center justify-center">
                    {customer?.profileImageUrl ? (
                        <Image
                            src={customer.profileImageUrl}
                            h={250}
                            w={250}
                            fit="cover"
                            radius="xl"
                            alt={`${customer.firstName} ${customer.lastName}`}
                            fallbackSrc="https://placehold.co/250x250?text=No+Image"
                            className="hover:scale-105 transition-transform duration-500 shadow-xl border-4 border-white dark:border-slate-800"
                        />
                    ) : (
                        <Avatar
                            size={250}
                            radius="xl"
                            color="main"
                            className="shadow-xl border-4 border-white dark:border-slate-800 text-5xl font-bold"
                        >
                            {getInitials()}
                        </Avatar>
                    )}
                </div>
            </Card.Section>

            <Stack mt="lg" gap="md">
                {/* Customer Name */}
                <div className="text-center">
                    <Text fw={700} size="xl" className="text-slate-800 dark:text-white">
                        {customer?.firstName} {customer?.lastName}
                    </Text>
                    <Group gap="xs" justify="center" mt={4}>
                        <HiOutlineIdentification className="text-slate-400" size={16} />
                        <Text size="sm" c="dimmed" className="font-mono">
                            {t('id')}: {customer?.id}
                        </Text>
                    </Group>
                </div>

                <Divider />

                {/* Promo Code */}
                {customer?.ownPromoCode && (
                    <div>
                        <Text size="xs" c="dimmed" mb={6} fw={600} className="uppercase tracking-wide">
                            {t('personal_promo_code')}
                        </Text>
                        <Tooltip
                            label="Click to copy"
                            position="top"
                            withArrow
                            transitionProps={{ transition: "pop", duration: 200 }}
                        >
                            <Badge
                                variant="gradient"
                                gradient={{ from: "#50C5C8", to: "#26A69A", deg: 135 }}
                                size="xl"
                                radius="md"
                                fullWidth
                                className="!cursor-pointer hover:scale-105 active:scale-95 !transition-all !duration-200 shadow-md hover:shadow-lg font-mono font-bold !py-3"
                                onClick={handleCopyPromoCode}
                                leftSection={<MdContentCopy size={16} />}
                            >
                                {customer.ownPromoCode}
                            </Badge>
                        </Tooltip>
                    </div>
                )}

                {/* Member Since */}
                {customer?.subscriptionEndDate && !isNaN(new Date(customer.subscriptionEndDate).getTime()) && (
                    <Group gap="xs" className="text-slate-600 dark:text-slate-400">
                        <HiCalendar className="text-main" size={18} />
                        <Text size="sm" fw={500}>
                            {t('member_since')} {new Date(customer.subscriptionEndDate).toLocaleDateString(i18n.language === 'ar' ? 'ar-EG' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </Text>
                    </Group>
                )}
            </Stack>
        </Card>
    );
};

export default CustomerProfileCard;
