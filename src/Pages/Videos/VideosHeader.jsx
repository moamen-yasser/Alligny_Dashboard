import { Button, Tabs, Badge } from "@mantine/core";
import { HiOutlinePlus } from "react-icons/hi2";

const VideosHeader = ({ section, onSectionChange, totalCount, onUploadClick }) => {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <Button
                leftSection={<HiOutlinePlus size={20} />}
                onClick={onUploadClick}
                variant="filled"
                color="#50C5C8"
                radius="md"
                size="md"
                className="!font-semibold shadow-sm hover:shadow-md transition-shadow"
            >
                Upload New Video
            </Button>

            <Tabs
                value={section}
                onChange={onSectionChange}
                color="#50C5C8"
                variant="pills"
                radius="md"
            >
                <Tabs.List className="bg-white dark:bg-slate-900 p-1 rounded-md border border-gray-100 dark:border-slate-700 w-fit gap-1 h-11 flex items-center">
                    <Tabs.Tab value="all" className="dark:hover:bg-slate-800 h-full">
                        All Videos
                    </Tabs.Tab>
                    <Tabs.Tab value="top" className="dark:hover:bg-slate-800 h-full">
                        Top Section
                    </Tabs.Tab>
                    <Tabs.Tab value="down" className="dark:hover:bg-slate-800 h-full">
                        Bottom Section
                    </Tabs.Tab>
                </Tabs.List>
            </Tabs>

            <div className="bg-white dark:bg-slate-900 px-6 h-11 rounded-md border border-gray-100 dark:border-slate-700 shadow-sm flex items-center gap-3">
                <span className="text-slate-500 dark:text-slate-400 font-medium text-sm lg:text-base">
                    Total Count:
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

export default VideosHeader;
