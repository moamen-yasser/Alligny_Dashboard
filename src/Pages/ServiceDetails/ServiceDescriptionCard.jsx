import { Card, Text, ScrollArea, Divider, Paper, Group, ThemeIcon, Stack } from "@mantine/core";
import {
    HiOutlineCurrencyDollar,
    HiOutlineTruck,
    HiOutlineHome,
    HiOutlineTicket,
    HiOutlineShieldCheck,
    HiOutlineStar,
    HiOutlineSquaresPlus
} from "react-icons/hi2";
import { getMappedValue } from "../../utils/serviceMappings";

const ServiceDescriptionCard = ({ service, specificFields }) => {
    const getIcon = (k) => {
        const lowKey = k.toLowerCase();
        if (lowKey.includes('price')) return <HiOutlineCurrencyDollar size={18} />;
        if (lowKey.includes('delivery')) return <HiOutlineTruck size={18} />;
        if (lowKey.includes('visit') || lowKey.includes('home')) return <HiOutlineHome size={18} />;
        if (lowKey.includes('discount')) return <HiOutlineTicket size={18} />;
        if (lowKey.includes('insurance')) return <HiOutlineShieldCheck size={18} />;
        if (lowKey.includes('subscription')) return <HiOutlineStar size={18} />;
        return <HiOutlineSquaresPlus size={18} />;
    };

    return (
        <Card shadow="sm" padding="xl" radius="lg" withBorder className="bg-white dark:bg-slate-900 border-t-4 border-t-main">
            <Text fw={800} size="lg" mb="md" className="text-slate-800 dark:text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-main"></span>
                About the Service
            </Text>

            {service.description ? (
                <ScrollArea h={120} offsetScrollbars>
                    <Text size="sm" className="whitespace-pre-line leading-relaxed text-slate-600 dark:text-slate-300 pr-4">
                        {service.description}
                    </Text>
                </ScrollArea>
            ) : (
                <div className="py-8 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
                    <Text size="sm" fs="italic" c="dimmed">No description provided for this service.</Text>
                </div>
            )}

            {Object.keys(specificFields).length > 0 && (
                <>
                    <Divider
                        my="xl"
                        label={<Text size="xs" fw={700} c="dimmed" tt="uppercase" className="tracking-widest">Additional Service Specs</Text>}
                        labelPosition="center"
                        className="opacity-60"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {Object.entries(specificFields).map(([key, value]) => (
                            <Paper
                                key={key}
                                withBorder
                                radius="md"
                                p="md"
                                className="bg-slate-50/50 dark:bg-slate-800/30 border-slate-100 dark:border-slate-700/50 hover:border-main/50 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 group"
                            >
                                <Group wrap="nowrap" align="start" gap="md">
                                    <ThemeIcon
                                        variant="light"
                                        color="main"
                                        size="lg"
                                        radius="md"
                                        className="group-hover:scale-110 transition-transform duration-300 shadow-sm"
                                    >
                                        {getIcon(key)}
                                    </ThemeIcon>
                                    <Stack gap={2} className="flex-1">
                                        <Text size="xs" fw={700} c="dimmed" className="tracking-tight opacity-80 leading-snug">
                                            {getMappedValue(key)}
                                        </Text>
                                        <Text size="sm" fw={800} className="text-textSecondColor dark:text-white leading-tight">
                                            {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : getMappedValue(value)}
                                        </Text>
                                    </Stack>
                                </Group>
                            </Paper>
                        ))}
                    </div>
                </>
            )}
        </Card>
    );
};

export default ServiceDescriptionCard;
