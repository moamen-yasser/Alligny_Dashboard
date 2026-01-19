import { Table, Text, Badge } from "@mantine/core";
import { formatDateTime } from "../../utils/formatDateTime";
import { HiOutlineMailOpen, HiOutlineUsers } from "react-icons/hi";
import { useTranslation } from "react-i18next";

const NotificationRow = ({ notification, index, onClick }) => {
    const { i18n } = useTranslation();
    const isAr = i18n.language === 'ar';

    return (
        <Table.Tr key={index} onClick={() => onClick(notification)} className="h-16 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
            {/* Title */}
            <Table.Td className="px-4 py-2 text-start max-w-[200px]">
                <Text fw={700} size="sm" className="text-slate-900 dark:text-white truncate" title={notification.title}>
                    {notification.title}
                </Text>
            </Table.Td>

            {/* Message */}
            <Table.Td
                className="px-4 py-2 text-start max-w-[300px] cursor-pointer transition-colors group"
            >
                <Text size="sm" className="text-slate-600 dark:text-slate-400 truncate" title={notification.message}>
                    {notification.message}
                </Text>
            </Table.Td>

            {/* Recipients */}
            <Table.Td className="px-4 py-2 text-start">
                <Badge variant="light" color="blue" size="lg" w={80} leftSection={<HiOutlineUsers size={16} />}>
                    {notification.totalRecipients || 0}
                </Badge>
            </Table.Td>

            {/* Read */}
            <Table.Td className="px-4 py-2 text-start">
                <Badge variant="light" color="green" size="lg" w={80} leftSection={<HiOutlineMailOpen size={16} />}>
                    {notification.totalRead || 0}
                </Badge>
            </Table.Td>

            {/* Sent At */}
            <Table.Td className="px-4 py-2 text-slate-900 dark:text-white font-semibold text-start">
                <Text size="md" dir="ltr" className={isAr ? "!text-right" : ""}>
                    {formatDateTime(notification.dateSent, i18n.language)}
                </Text>
            </Table.Td>
        </Table.Tr>
    );
};

export default NotificationRow;
