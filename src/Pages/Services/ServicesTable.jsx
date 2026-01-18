import { Table, ScrollArea } from "@mantine/core";
import TableHeader from "../../Components/Tables/TableHeader";
import TableBody from "../../Components/Tables/TableBody";
import TableFooter from "../../Components/Tables/TableFooter";
import Loader from "../../Components/Loader";
import ServiceRow from "./ServiceRow";
import { HEADER_COLUMNS } from "./servicesConstants";
import { useTranslation } from "react-i18next";

const ServicesTable = ({
    isLoading,
    services,
    activePage,
    totalPages,
    loadingServiceId,
    loadingAction,
    onActionClick,
    onPageChange,
}) => {
    const { t } = useTranslation();
    const translatedHeaders = HEADER_COLUMNS.map(header => t(header));

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
                    className="text-start px-6 w-full"
                    verticalSpacing="md"
                    horizontalSpacing="lg"
                    highlightOnHover
                    miw={1000}
                >
                    <TableHeader headers={translatedHeaders} />
                    <TableBody
                        data={services?.items}
                        colSpan={7}
                        renderRow={(service, index) => (
                            <ServiceRow
                                key={service?._id || service?.id || index}
                                service={service}
                                index={index}
                                loadingServiceId={loadingServiceId}
                                loadingAction={loadingAction}
                                onActionClick={onActionClick}
                            />
                        )}
                    />
                    <TableFooter
                        activePage={activePage}
                        setPage={onPageChange}
                        total={totalPages}
                        colSpan={7}
                    />
                </Table>
            </ScrollArea>
        </div>
    );
};

export default ServicesTable;
