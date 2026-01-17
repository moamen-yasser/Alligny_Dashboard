import { Card, Text, Stack, Paper, Group, ThemeIcon } from "@mantine/core";
import { HiOutlineEnvelope, HiOutlinePhone } from "react-icons/hi2";

const ProviderContactCard = ({ service }) => {
    return (
        <Card shadow="sm" padding="lg" radius="lg" withBorder className="bg-white dark:bg-slate-900 border-l-4 border-l-main">
            <Text fw={700} mb="md" className="text-slate-800 dark:text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-main"></span>
                Provider Contact Details
            </Text>
            <Stack gap="sm">
                <Paper p="xs" radius="md" withBorder className="bg-slate-50/50 dark:bg-slate-800/50">
                    <Group gap="sm" wrap="nowrap">
                        <ThemeIcon color="main" variant="light" size="md">
                            <HiOutlineEnvelope size={16} />
                        </ThemeIcon>
                        <div className="overflow-hidden">
                            <Text size="xs" c="dimmed">Email Address</Text>
                            <Text
                                component="a"
                                href={`mailto:${service.providerEmail}`}
                                size="sm"
                                fw={600}
                                className="truncate hover:text-main transition-colors"
                            >
                                {service.providerEmail}
                            </Text>
                        </div>
                    </Group>
                </Paper>

                <Paper p="xs" radius="md" withBorder className="bg-slate-50/50 dark:bg-slate-800/50">
                    <Group gap="sm" wrap="nowrap">
                        <ThemeIcon color="main" variant="light" size="md">
                            <HiOutlinePhone size={16} />
                        </ThemeIcon>
                        <div>
                            <Text size="xs" c="dimmed">Phone Number</Text>
                            <Text
                                component="a"
                                href={`tel:${service.providerPhoneNumber}`}
                                size="sm"
                                fw={600}
                                className="hover:text-main transition-colors"
                            >
                                {service.providerPhoneNumber}
                            </Text>
                        </div>
                    </Group>
                </Paper>
            </Stack>
        </Card>
    );
};

export default ProviderContactCard;
