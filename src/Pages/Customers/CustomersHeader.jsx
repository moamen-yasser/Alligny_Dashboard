import { Tabs, Badge, Stack, Group, Text } from "@mantine/core";
import { SUBSCRIPTION_TABS } from "./customersConstants";
import { useTranslation } from "react-i18next";
import { HiOutlineUsers } from "react-icons/hi2";

const CustomersHeader = ({ subscriptionFilter, onFilterChange, totalCount }) => {
    const { t } = useTranslation();
    return (
        <Stack gap="xl" mb="xl">
            {/* Header Info Section */}
            <Group justify="space-between" align="flex-end">
                <Stack gap={4}>
                    <Group gap="xs">
                        <div className="p-2 bg-main/10 rounded-lg">
                            <HiOutlineUsers size={24} className="text-main" />
                        </div>
                        <Text size="xl" fw={800} className="text-slate-800 dark:text-white lg:text-3xl tracking-tight">
                            {t('all_customers')}
                        </Text>
                    </Group>
                    <Text size="sm" c="dimmed" className="font-medium lg:text-base opacity-80">
                        {t('manage_app_customers')}
                    </Text>
                </Stack>
            </Group>

            {/* Filter and Stats Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 animate-[fadeIn_0.5s_ease-in]">
                <Tabs
                    value={subscriptionFilter}
                    onChange={onFilterChange}
                    color="#50C5C8"
                    variant="pills"
                    radius="md"
                    className="w-full md:w-auto"
                >
                    <Tabs.List className="bg-white dark:bg-slate-900 p-1 rounded-md border border-gray-100 dark:border-slate-700 w-full md:w-fit gap-1 min-h-[44px] flex flex-wrap items-center">
                        {SUBSCRIPTION_TABS?.map((tab) => (
                            <Tabs.Tab
                                key={tab?.value}
                                value={tab?.value}
                                className="dark:hover:bg-slate-800 h-full font-bold px-6 lg:px-8 flex-1 md:flex-none"
                            >
                                {t(tab?.label)}
                            </Tabs.Tab>
                        ))}
                    </Tabs.List>
                </Tabs>

                <div className="bg-white dark:bg-slate-900 px-6 h-11 rounded-md border border-gray-100 dark:border-slate-700 shadow-sm flex items-center justify-center md:justify-start gap-4 w-full md:w-auto">
                    <Text size="sm" fw={600} className="text-slate-500 dark:text-slate-400 whitespace-nowrap">
                        {t('total_count')}:
                    </Text>
                    <Badge
                        variant="filled"
                        color="#50C5C8"
                        size="lg"
                        radius="sm"
                        className="h-7 text-xs min-w-[60px] flex justify-center font-bold"
                    >
                        {totalCount || 0}
                    </Badge>
                </div>
            </div>
        </Stack>
    );
};

export default CustomersHeader;
