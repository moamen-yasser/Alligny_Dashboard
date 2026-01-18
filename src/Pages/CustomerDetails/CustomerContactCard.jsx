import { Card, Text, Group, Stack, ActionIcon, Tooltip } from "@mantine/core";
import { HiOutlineMail, HiOutlinePhone, HiOutlineUser } from "react-icons/hi";
import { useTranslation } from "react-i18next";

const CustomerContactCard = ({ customer, className = "" }) => {
    const { t } = useTranslation();
    return (
        <Card
            shadow="sm"
            padding="lg"
            radius="lg"
            withBorder
            className={`bg-white dark:bg-slate-900 ${className}`}
        >
            <Text fw={700} size="lg" mb="md" className="text-slate-800 dark:text-white">
                {t('contact_information')}
            </Text>

            <Stack gap="lg">
                {/* Full Name */}
                <Group gap="md">
                    <ActionIcon
                        variant="light"
                        color="main"
                        size="xl"
                        radius="md"
                        className="flex-shrink-0"
                    >
                        <HiOutlineUser size={24} />
                    </ActionIcon>
                    <div className="flex-1">
                        <Text size="xs" c="dimmed" tt="uppercase" fw={700} mb={2}>
                            {t('full_name')}
                        </Text>
                        <Text fw={600} size="md" className="text-slate-700 dark:text-slate-200">
                            {customer?.firstName} {customer?.lastName}
                        </Text>
                    </div>
                </Group>

                {/* Email Address */}
                <Group gap="md">
                    <Tooltip label={`Send email to ${customer?.email}`} position="right">
                        <ActionIcon
                            variant="light"
                            color="main"
                            size="xl"
                            radius="md"
                            component="a"
                            href={`mailto:${customer?.email}`}
                            className="flex-shrink-0"
                        >
                            <HiOutlineMail size={24} />
                        </ActionIcon>
                    </Tooltip>
                    <div className="flex-1">
                        <Text size="xs" c="dimmed" tt="uppercase" fw={700} mb={2}>
                            {t('email_address')}
                        </Text>
                        <Text
                            component="a"
                            href={`mailto:${customer?.email}`}
                            fw={600}
                            size="md"
                            className="text-main hover:underline decoration-2"
                        >
                            {customer?.email}
                        </Text>
                    </div>
                </Group>

                {/* Phone Number */}
                <Group gap="md">
                    <Tooltip label={`Call ${customer?.phoneNumber}`} position="right">
                        <ActionIcon
                            variant="light"
                            color="main"
                            size="xl"
                            radius="md"
                            component="a"
                            href={`tel:${customer?.phoneNumber}`}
                            className="flex-shrink-0"
                        >
                            <HiOutlinePhone size={24} />
                        </ActionIcon>
                    </Tooltip>
                    <div className="flex-1">
                        <Text size="xs" c="dimmed" tt="uppercase" fw={700} mb={2}>
                            {t('phone_number')}
                        </Text>
                        <Text
                            component="a"
                            href={`tel:${customer?.phoneNumber}`}
                            fw={600}
                            size="md"
                            className="text-main hover:underline decoration-2"
                        >
                            {customer?.phoneNumber}
                        </Text>
                    </div>
                </Group>
            </Stack>
        </Card>
    );
};

export default CustomerContactCard;
