import { Card, Stack, Image, Text, Group, ThemeIcon, Divider, Tooltip } from "@mantine/core";
import { HiCalendar, HiOutlineGlobeAlt, HiOutlineTruck, HiOutlineCreditCard } from "react-icons/hi2";
import { formatDateTime } from "../../utils/formatDateTime";
import { getMappedValue } from "../../utils/serviceMappings";

const ServiceImageCard = ({ service }) => {
    return (
        <Card shadow="sm" padding="md" radius="lg" withBorder className="bg-white dark:bg-slate-900 overflow-hidden">
            <Card.Section className="bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center overflow-hidden">
                <Image
                    src={service.imageUrl}
                    mah={500}
                    fit="contain"
                    alt={service.name}
                    fallbackSrc="https://placehold.co/600x400?text=No+Image"
                    className="hover:scale-105 transition-transform duration-500 p-2"
                />
            </Card.Section>

            <Stack mt="md" gap="xs">
                <Text fw={700} size="lg" className="text-slate-800 dark:text-white">
                    {service.name}
                </Text>
                <Group gap="xs">
                    <HiCalendar className="text-main" size={16} />
                    <Text size="sm" c="dimmed">Submitted: {formatDateTime(service.createdAt)}</Text>
                </Group>
                <Group gap="xs">
                    <ThemeIcon variant="light" color="main" size="sm" radius="xl">
                        <HiOutlineGlobeAlt size={12} />
                    </ThemeIcon>
                    <Text size="sm" c="dimmed">
                        {getMappedValue(service.categoryName)} • {getMappedValue(service.specializationName)}
                    </Text>
                </Group>
            </Stack>

            <Divider my="md" />

            <Group justify="space-between">
                <Tooltip label="Home Delivery Availability">
                    <Group gap={6}>
                        <HiOutlineTruck size={18} className={service.isDeliveryAvailable ? "text-green-500" : "text-slate-300"} />
                        <Text size="xs" fw={500} c={service.isDeliveryAvailable ? "green" : "dimmed"}>
                            Delivery: {service.isDeliveryAvailable ? "Yes" : "No"}
                        </Text>
                    </Group>
                </Tooltip>
                <Tooltip label="Discount Card Usage">
                    <Group gap={6}>
                        <HiOutlineCreditCard size={18} className={service.canUseDiscountCard ? "text-blue-500" : "text-slate-300"} />
                        <Text size="xs" fw={500} c={service.canUseDiscountCard ? "blue" : "dimmed"}>
                            Discount Card: {service.canUseDiscountCard ? "Yes" : "No"}
                        </Text>
                    </Group>
                </Tooltip>
            </Group>
        </Card>
    );
};

export default ServiceImageCard;
