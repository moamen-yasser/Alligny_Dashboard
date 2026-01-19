import { Table, ScrollArea } from "@mantine/core";
import TableHeader from "../../Components/Tables/TableHeader";
import TableBody from "../../Components/Tables/TableBody";
import TableFooter from "../../Components/Tables/TableFooter";
import Loader from "../../Components/Loader";
import CustomerRow from "./CustomerRow";
import { CUSTOMER_HEADER_COLUMNS } from "./customersConstants";
import { useTranslation } from "react-i18next";

const CustomersTable = ({
    isLoading,
    customers,
    activePage,
    totalPages,
    isActivating,
    isDeleting,
    currentCustomerId,
    onActivateClick,
    onDeleteClick,
    onPageChange,
}) => {
    const { t } = useTranslation();
    const translatedHeaders = CUSTOMER_HEADER_COLUMNS.map(header => t(header));

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
                        data={customers?.items}
                        colSpan={7}
                        renderRow={(customer, index) => (
                            <CustomerRow
                                key={customer?.id || index}
                                customer={customer}
                                index={index}
                                isActivating={isActivating}
                                isDeleting={isDeleting}
                                currentCustomerId={currentCustomerId}
                                onActivateClick={onActivateClick}
                                onDeleteClick={onDeleteClick}
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

export default CustomersTable;
