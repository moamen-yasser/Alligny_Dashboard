import { Tabs, Badge } from "@mantine/core";
import { SUBSCRIPTION_TABS } from "./customersConstants";
import { useTranslation } from "react-i18next";

const CustomersHeader = ({ subscriptionFilter, onFilterChange, totalCount }) => {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <Tabs
                value={subscriptionFilter}
                onChange={onFilterChange}
                color="#50C5C8"
                variant="pills"
                radius="md"
            >
                <Tabs.List className="bg-white dark:bg-slate-900 p-1 rounded-md border border-gray-100 dark:border-slate-700 w-fit gap-1 h-11 flex items-center">
                    {SUBSCRIPTION_TABS?.map((tab) => (
                        <Tabs.Tab
                            key={tab?.value}
                            value={tab?.value}
                            className="dark:hover:bg-slate-800 h-full"
                        >
                            {t(tab?.label)}
                        </Tabs.Tab>
                    ))}
                </Tabs.List>
            </Tabs>

            <div className="bg-white dark:bg-slate-900 px-6 h-11 rounded-md border border-gray-100 dark:border-slate-700 shadow-sm flex items-center gap-3">
                <span className="text-slate-500 dark:text-slate-400 font-medium text-sm lg:text-base">
                    {t('total_count')}:
                </span>
                <Badge
                    variant="filled"
                    color="#50C5C8"
                    size="lg"
                    radius="sm"
                    className="h-7 text-xs min-w-[60px] flex justify-center"
                >
                    {totalCount || 0}
                </Badge>
            </div>
        </div>
    );
};

export default CustomersHeader;
