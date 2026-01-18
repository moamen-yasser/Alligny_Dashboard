import { Table, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import TableActions from "../../Components/Actions.jsx/index.jsx";
import { formatDateTime } from "../../utils/formatDateTime";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

const ServiceRow = ({ service, index, loadingServiceId, loadingAction, onActionClick }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const isAr = i18n.language === 'ar';

    return (
        <Table.Tr
            key={service?._id || service?.id || index}
            className="h-16 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
        >
            <Table.Td className="px-4 py-2 text-start">
                <div className="flex flex-col items-start gap-1">
                    <Text fw={700} size="sm" className="text-slate-900 dark:text-white">
                        {service?.providerName || "N/A"}
                    </Text>
                    <Text
                        component="a"
                        href={`mailto:${service?.providerEmail}`}
                        size="xs"
                        c="dimmed"
                        className="hover:text-main hover:underline transition-colors cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {service?.providerEmail || "N/A"}
                    </Text>
                </div>
            </Table.Td>
            <Table.Td className="px-4 py-2 text-start">
                <Text
                    component="a"
                    href={`tel:${service?.providerPhoneNumber}`}
                    fw={600}
                    size="sm"
                    className="text-slate-900 dark:text-white hover:text-main hover:underline transition-colors cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                >
                    {service?.providerPhoneNumber || "N/A"}
                </Text>
            </Table.Td>
            <Table.Td className="px-4 py-2 text-slate-900 dark:text-white font-semibold text-start">
                {service?.name || "N/A"}
            </Table.Td>
            <Table.Td className="px-4 py-2 text-slate-900 dark:text-white font-semibold text-start">
                {formatDateTime(service?.dateSubmitted)}
            </Table.Td>
            <Table.Td className="px-4 py-2 text-start">
                <span className={`font-semibold ${service?.status === 'Approved'
                    ? 'text-green-600'
                    : service?.status === 'Rejected'
                        ? 'text-red-600'
                        : 'text-yellow-600'
                    }`}>
                    {t(service?.status?.toLowerCase() || "n_a")}
                </span>
            </Table.Td>
            <Table.Td className="px-4 py-2 text-start">
                <TableActions
                    id={service?.id}
                    status={service?.status}
                    handleAction={onActionClick}
                    isLoadingApprove={loadingServiceId === service?.id && loadingAction === 'approve'}
                    isLoadingReject={loadingServiceId === service?.id && loadingAction === 'reject'}
                />
            </Table.Td>
            <Table.Td className="px-4 py-2 text-start" onClick={() => navigate(`/dashboard/service/details?id=${service?.id}`)}>
                {isAr ? <MdKeyboardArrowLeft size={20} className="text-main" /> : <MdKeyboardArrowRight size={20} className="text-main" />}
            </Table.Td>
        </Table.Tr>
    );
};

export default ServiceRow;
