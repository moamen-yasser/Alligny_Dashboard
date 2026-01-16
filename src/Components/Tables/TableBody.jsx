import { Table } from "@mantine/core";

const TableBody = ({ data, renderRow, colSpan, emptyMessage = "No Data Found" }) => {
    return (
        // <tbody>
        //     {data && data?.length > 0 ? (
        //         data?.map((item, index) => renderRow(item, index))
        //     ) : (
        //         <tr>
        //             <td
        //                 colSpan={colSpan}
        //                 className="p-4 text-center text-gray-500 font-medium dark:text-gray-400"
        //             >
        //                 {emptyMessage}
        //             </td>
        //         </tr>
        //     )}
        // </tbody>
        <Table.Tbody>
            {data && data?.length > 0 ? (
                data?.map((item, index) => renderRow(item, index))
            ) : (
                <tr>
                    <td
                        colSpan={colSpan}
                        className="p-4 text-center text-gray-500 font-medium dark:text-gray-400"
                    >
                        {emptyMessage}
                    </td>
                </tr>
            )}  
        </Table.Tbody>

    );
};

export default TableBody;
