import { Card, Text, Badge, Group, Tabs, Grid, Stack, Divider, Paper, Button } from "@mantine/core";
import { HiOutlineMapPin, HiOutlinePhone, HiOutlineGlobeAlt, HiOutlineClock } from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa";
import { getGovernorateName, getCityName } from "../../utils/locationMappings";
import { useTranslation } from "react-i18next";

const ServiceBranchesCard = ({ service }) => {
    const { t } = useTranslation();
    const days = [t('sun'), t('mon'), t('tue'), t('wed'), t('thu'), t('fri'), t('sat')];

    const formatTime = (time) => {
        if (!time) return "";
        let formattedTime = time;
        if (time.includes("AM")) {
            formattedTime = time.replace("AM", t('am'));
        } else if (time.includes("PM")) {
            formattedTime = time.replace("PM", t('pm'));
        }
        return formattedTime;
    };

    return (
        <Card shadow="sm" padding="0" radius="lg" withBorder className="bg-white dark:bg-slate-900 overflow-hidden">
            <div className="p-6 pb-0">
                <Group justify="space-between">
                    <Text fw={700} size="lg" className="text-slate-800 dark:text-white">
                        {t('service_branches')}
                    </Text>
                    {service?.branches?.length > 0 && (
                        <Badge
                            variant="gradient"
                            gradient={{ from: '#50C5C8', to: '#26A69A', deg: 45 }}
                            size="xl"
                            radius="md"
                            className="py-1 px-4 !h-9 shadow-sm"
                        >
                            {t('branches_count', { count: service?.branches?.length })}
                        </Badge>
                    )}
                </Group>
            </div>

            <Tabs defaultValue={service.branches?.[0]?.id} mt="sm" color="#50C5C8" variant="default">
                <Tabs.List px="md" className="!border-b-0">
                    {service?.branches?.map((branch, idx) => (
                        <Tabs.Tab
                            key={branch?.id}
                            value={branch?.id}
                            className="px-6 py-4 font-semibold data-[active]:!text-main"
                        >
                            {t('branch_number', { number: idx + 1 })}
                        </Tabs.Tab>
                    ))}
                </Tabs.List>

                {service?.branches?.map((branch) => (
                    <Tabs.Panel key={branch.id} value={branch.id} p={{ base: 'xs', md: 'xl' }}>
                        <Grid gutter={{ base: 'md', md: 'xl' }}>
                            <Grid.Col span={{ base: 12, sm: 7 }}>
                                <Stack gap="md">
                                    <div>
                                        <Text size="xs" c="dimmed" tt="uppercase" fw={700} mb={4}>{t('location')}</Text>
                                        <Group gap="xs" wrap="nowrap" align="start">
                                            <HiOutlineMapPin size={20} className="text-main mt-1" />
                                            <div>
                                                <Text fw={600}>{getGovernorateName(branch.governorate)} • {getCityName(branch.city)}</Text>
                                                <Text size="sm" c="dimmed">{branch.address}</Text>
                                            </div>
                                        </Group>
                                    </div>

                                    <Divider />

                                    <Group grow>
                                        <div>
                                            <Text size="xs" c="dimmed" tt="uppercase" fw={700} mb={4}>{t('contact')}</Text>
                                            <Stack gap={8}>
                                                <Group gap="xs">
                                                    <HiOutlinePhone size={16} className="text-main" />
                                                    <Text
                                                        component="a"
                                                        href={`tel:${branch.phoneNumber}`}
                                                        size="sm"
                                                        className="hover:text-main transition-colors font-medium"
                                                    >
                                                        {branch.phoneNumber}
                                                    </Text>
                                                </Group>
                                                <Group gap="xs">
                                                    <FaWhatsapp size={16} className="text-green-500" />
                                                    <Text
                                                        component="a"
                                                        href={`https://wa.me/${branch?.whatsAppNumber?.replace(/\s+/g, '')}`}
                                                        target="_blank"
                                                        size="sm"
                                                        className="hover:text-green-600 transition-colors font-medium"
                                                    >
                                                        {branch.whatsAppNumber}
                                                    </Text>
                                                </Group>
                                            </Stack>
                                        </div>
                                        {branch.locationUrl && (
                                            <Button
                                                component="a"
                                                href={branch.locationUrl}
                                                target="_blank"
                                                variant="light"
                                                color="main"
                                                leftSection={<HiOutlineGlobeAlt />}
                                            >
                                                {t('view_on_map')}
                                            </Button>
                                        )}
                                    </Group>
                                </Stack>
                            </Grid.Col>

                            <Grid.Col span={{ base: 12, sm: 5 }}>
                                <Paper withBorder p="md" radius="md" className="bg-slate-50 dark:bg-slate-800">
                                    <Group gap="xs" mb="sm">
                                        <HiOutlineClock className="text-main" size={18} />
                                        <Text fw={700} size="sm">{t('working_hours')}</Text>
                                    </Group>
                                    <Stack gap={6}>
                                        {[...(branch.workingHours || [])]?.sort((a, b) => ((a?.dayOfWeek + 1) % 7) - ((b?.dayOfWeek + 1) % 7))?.map((hour, idx) => (
                                            <Group key={idx} justify="space-between">
                                                <Text size="xs" fw={500}>{days[hour?.dayOfWeek]}</Text>
                                                {hour?.isOpen ? (
                                                    <Group gap={4} wrap="nowrap">
                                                        <Text size="xs" c="dimmed">{t('from')}</Text>
                                                        <Text size="xs" c="main" fw={600} className="dark:text-main" dir="ltr">
                                                            {formatTime(hour?.fromTime)}
                                                        </Text>
                                                        <span className="text-[10px] text-slate-400 mx-0.5">•</span>
                                                        <Text size="xs" c="dimmed">{t('to')}</Text>
                                                        <Text size="xs" c="main" fw={600} className="dark:text-main" dir="ltr">
                                                            {formatTime(hour?.toTime)}
                                                        </Text>
                                                    </Group>
                                                ) : (
                                                    <Text size="xs" c="red" fw={600}>{t('closed')}</Text>
                                                )}
                                            </Group>
                                        ))}
                                    </Stack>
                                </Paper>
                            </Grid.Col>
                        </Grid>
                    </Tabs.Panel>
                ))}
            </Tabs>
        </Card>
    );
};

export default ServiceBranchesCard;
