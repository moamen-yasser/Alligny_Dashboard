import { Tabs } from "@mantine/core";

export default function SharedTabs({
    tabValue,
    onChange,
    tabValues,
    orientation,
    defaultValue,
    variant,
    showLabels
}) {
    return (
        <div className="h-full w-full mt-20">
            <Tabs
                value={tabValue}
                onChange={onChange}
                orientation={orientation}
                defaultValue={defaultValue}
                variant={variant}
            >
                <Tabs.List className={`!flex ${orientation === "horizontal" ? "!flex-row" : "!flex-col"} !items-start !gap-4`}>
                    {tabValues?.map((tab) => (
                        <Tabs.Tab
                            key={tab?.id}
                            value={tab?.value}
                            className={`!flex !justify-start !items-center 
                            ${!showLabels ? "!min-w-[20px] !py-2 " : "!min-w-[200px] !py-3 "}  
                                !rounded-lg !transition-all 
                                !duration-300 !cursor-pointer !font-bold !text-lg 
                            ${tabValue === tab?.value
                                    ? "!bg-white dark:!bg-white !font-[800] !text-xl"
                                    : "!text-white hover:!bg-hoverColor dark:hover:!bg-white/10"
                                }`}
                        >
                            <div className={`w-full gap-3 flex ${!showLabels ? "justify-start" : "justify-between"} items-center`}>
                                <span className={tabValue === tab?.value ? "text-subMain" : ""}>{tab?.icon}</span>
                                {showLabels && (
                                    <span className={tabValue === tab?.value ? "bg-gradient-to-r from-main to-subMain bg-clip-text text-transparent" : ""}>
                                        {tab?.label}
                                    </span>
                                )}
                            </div>
                        </Tabs.Tab>
                    ))}
                </Tabs.List>
            </Tabs>
        </div>
    );
}
