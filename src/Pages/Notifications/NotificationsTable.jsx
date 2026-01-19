import { Table, ScrollArea } from "@mantine/core";
import TableHeader from "../../Components/Tables/TableHeader";
import TableBody from "../../Components/Tables/TableBody";
import TableFooter from "../../Components/Tables/TableFooter";
import Loader from "../../Components/Loader";
import NotificationRow from "./NotificationRow";
import { NOTIFICATION_HEADER_COLUMNS } from "./notificationsConstants";
import { useTranslation } from "react-i18next";

const NotificationsTable = ({
    isLoading,
    notifications,
    activePage,
    totalPages,
    onPageChange,
    onRowClick,
}) => {
    const { t } = useTranslation();
    const translatedHeaders = NOTIFICATION_HEADER_COLUMNS.map(header => t(header));

    if (isLoading) {
        return (
            <div className="bg-white dark:bg-slate-900 rounded-md shadow-sm border border-transparent dark:border-slate-700 overflow-hidden">
                <div className="flex justify-center items-center py-20">
                    <Loader isLoading={true} />
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-slate-900 rounded-md shadow-sm border border-transparent dark:border-slate-700 overflow-hidden">
            <ScrollArea type="native">
                <Table
                    className="text-left px-6 w-full"
                    verticalSpacing="md"
                    horizontalSpacing="lg"
                    highlightOnHover
                    miw={1000}
                >
                    <TableHeader headers={translatedHeaders} />
                    <TableBody
                        data={notifications?.items}
                        colSpan={5}
                        renderRow={(notification, index) => (
                            <NotificationRow
                                key={index}
                                notification={notification}
                                index={index}
                                onClick={onRowClick}
                            />
                        )}
                    />
                    <TableFooter
                        activePage={activePage}
                        setPage={onPageChange}
                        total={totalPages}
                        colSpan={5}
                    />
                </Table>
            </ScrollArea>
        </div>
    );
};

export default NotificationsTable;
