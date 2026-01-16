import { useEffect } from "react";
import { Pagination, Table } from "@mantine/core";

const TableFooter = ({ activePage, setPage, total, colSpan, size = "md" }) => {
    if (!total || total <= 0) return null;

    useEffect(() => {
        if (total < activePage) {
            setPage(total);
        }
    }, [total, activePage, setPage]);

    const handlePageChange = (page) => {
        setPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <Table.Tfoot>
            <Table.Tr className="border-b border-gray-200 dark:border-slate-700">
                <Table.Td colSpan={colSpan}>
                    <div className="flex justify-center p-4">
                        <Pagination
                            value={activePage || 1}
                            onChange={handlePageChange}
                            total={total}
                            color="#50C5C8"
                            size={size}
                            className="flex justify-center items-center"
                        />
                    </div>
                </Table.Td>
            </Table.Tr>
        </Table.Tfoot>
    );
};

export default TableFooter;
