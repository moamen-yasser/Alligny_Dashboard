import { Table } from "@mantine/core";

const TableHeader = ({ headers }) => {
    return (
        <Table.Thead>
            <Table.Tr>
                {headers?.map((head, index) => (
                    <Table.Th
                        key={index}
                        className="p-2 min-w-[80px] text-left text-main dark:!text-main font-bold text-lg"
                    >
                        {head}
                    </Table.Th>
                ))}
            </Table.Tr>
        </Table.Thead>
    );
};

export default TableHeader;
