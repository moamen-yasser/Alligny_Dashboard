
import { Card, Text, Badge, Group, Tabs, Grid, Stack, Divider, Paper, Button } from "@mantine/core";
import { HiOutlineMapPin, HiOutlinePhone, HiOutlineGlobeAlt, HiOutlineClock } from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa";
import { getGovernorateName, getCityName } from "../../utils/locationMappings";

const ServiceBranchesCard = ({ service }) => {
    return (
        <Card shadow="sm" padding="0" radius="lg" withBorder className="bg-white dark:bg-slate-900 overflow-hidden">
            <div className="p-6 pb-0">
                <Group justify="space-between">
                    <Text fw={700} size="lg" className="text-slate-800 dark:text-white">Service Branches</Text>
                    <Badge
                        variant="gradient"
                        gradient={{ from: '#50C5C8', to: '#26A69A', deg: 45 }}
                        size="xl"
                        radius="md"
                        className="py-1 px-4 !h-9 shadow-sm"
                    >
                        {service?.branches?.length} {service?.branches?.length === 1 ? 'Branch' : 'Branches'} Available
                    </Badge>
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
                            Branch #{idx + 1}
                        </Tabs.Tab>
                    ))}
                </Tabs.List>

                {service?.branches?.map((branch) => (
                    <Tabs.Panel key={branch.id} value={branch.id} p="xl">
                        <Grid gutter="xl">
                            <Grid.Col span={{ base: 12, sm: 7 }}>
                                <Stack gap="md">
                                    <div>
                                        <Text size="xs" c="dimmed" tt="uppercase" fw={700} mb={4}>Location</Text>
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
                                            <Text size="xs" c="dimmed" tt="uppercase" fw={700} mb={4}>Contact</Text>
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
                                                        href={`https://wa.me/${branch.whatsAppNumber.replace(/\s+/g, '')}`}
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
                                                View on Map
                                            </Button>
                                        )}
                                    </Group>
                                </Stack>
                            </Grid.Col>

                            <Grid.Col span={{ base: 12, sm: 5 }}>
                                <Paper withBorder p="md" radius="md" className="bg-slate-50 dark:bg-slate-800">
                                    <Group gap="xs" mb="sm">
                                        <HiOutlineClock className="text-main" size={18} />
                                        <Text fw={700} size="sm">Working Hours</Text>
                                    </Group>
                                    <Stack gap={6}>
                                        {[...(branch.workingHours || [])]?.sort((a, b) => ((a?.dayOfWeek + 1) % 7) - ((b?.dayOfWeek + 1) % 7))?.map((hour, idx) => (
                                            <Group key={idx} justify="space-between">
                                                <Text size="xs" fw={500}>{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][hour?.dayOfWeek]}</Text>
                                                {hour?.isOpen ? (
                                                    <Text size="xs" c="main" fw={600}>{hour?.fromTime} - {hour?.toTime}</Text>
                                                ) : (
                                                    <Text size="xs" c="red" fw={600}>Closed</Text>
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
