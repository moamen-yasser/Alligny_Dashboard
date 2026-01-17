import { Table, ScrollArea, Tabs, Badge, Text } from "@mantine/core";
import TableHeader from "../../Components/Tables/TableHeader";
import TableBody from "../../Components/Tables/TableBody";
import TableFooter from "../../Components/Tables/TableFooter";
import Loader from "../../Components/Loader";
import { ConfirmModal } from "../../Components/ConfirmModal";
import TableActions from "../../Components/Actions.jsx/index.jsx";
import { useOutletContext, useNavigate } from "react-router-dom";
import { useServices } from "./useServices.js";
import { HEADER_COLUMNS, STATUS_TABS } from "./servicesConstants.js";
import { MdKeyboardArrowRight } from "react-icons/md";
import { formatDateTime } from "../../utils/formatDateTime";

const Services = () => {
    const navigate = useNavigate();
    const { searchQuery } = useOutletContext();

    const {
        activePage,
        setActivePage,
        status,
        opened,
        close,
        currentAction,
        currentServiceId,
        loadingServiceId,
        loadingAction,
        allServices,
        isLoading,
        handleStatusChange,
        handleActionClick,
        handleConfirmAction,
        getModalText,
    } = useServices(searchQuery);

    const modalText = getModalText();

    return (
        <>
            <section className="mt-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <Text className="!text-2xl !font-bold !text-main">Services</Text>
                    <Tabs
                        value={status}
                        onChange={handleStatusChange}
                        color="#50C5C8"
                        variant="pills"
                        radius="md"
                    >
                        <Tabs.List className="bg-white dark:bg-slate-900 p-1 rounded-md border border-gray-100 dark:border-slate-700 w-fit gap-1 h-11 flex items-center">
                            {STATUS_TABS?.map((tab) => (
                                <Tabs.Tab
                                    key={tab?.value}
                                    value={tab?.value}
                                    className="dark:hover:bg-slate-800 h-full"
                                >
                                    {tab?.label}
                                </Tabs.Tab>
                            ))}
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
                            {allServices?.totalCount || 0}
                        </Badge>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-md shadow-sm border border-transparent dark:border-slate-700 overflow-hidden">
                    {isLoading ? (
                        <div className="flex justify-center items-center py-20">
                            <Loader isLoading={true} />
                        </div>
                    ) : (
                        <ScrollArea type="native">
                            <Table
                                className="text-left px-6 w-full"
                                verticalSpacing="md"
                                horizontalSpacing="lg"
                                highlightOnHover
                                miw={1000}
                            >
                                <TableHeader headers={HEADER_COLUMNS} />
                                <TableBody
                                    data={allServices?.items}
                                    colSpan={7}
                                    renderRow={(service, index) => (
                                        <Table.Tr
                                            key={service?._id || service?.id || index}
                                            className="h-16 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                                        >
                                            <Table.Td className="px-4 py-2">
                                                <div className="flex flex-col gap-1">
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
                                            <Table.Td className="px-4 py-2">
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
                                            <Table.Td className="px-4 py-2 text-slate-900 dark:text-white font-semibold">
                                                {service?.name || "N/A"}
                                            </Table.Td>
                                            <Table.Td className="px-4 py-2 text-slate-900 dark:text-white font-semibold">
                                                {formatDateTime(service?.dateSubmitted)}
                                            </Table.Td>
                                            <Table.Td className="px-4 py-2">
                                                <span className={`font-semibold ${service?.status === 'Approved'
                                                    ? 'text-green-600'
                                                    : service?.status === 'Rejected'
                                                        ? 'text-red-600'
                                                        : 'text-yellow-600'
                                                    }`}>
                                                    {service?.status || "N/A"}
                                                </span>
                                            </Table.Td>
                                            <Table.Td className="px-4 py-2">
                                                <TableActions
                                                    id={service?.id}
                                                    status={service?.status}
                                                    handleAction={handleActionClick}
                                                    isLoadingApprove={loadingServiceId === service?.id && loadingAction === 'approve'}
                                                    isLoadingReject={loadingServiceId === service?.id && loadingAction === 'reject'}
                                                />
                                            </Table.Td>
                                            <Table.Td className="px-4 py-2" onClick={() => navigate(`/dashboard/service/details?id=${service?.id}`)}>
                                                <MdKeyboardArrowRight size={20} className="text-main" />
                                            </Table.Td>
                                        </Table.Tr>
                                    )}
                                />
                                <TableFooter
                                    activePage={activePage}
                                    setPage={setActivePage}
                                    total={allServices?.totalPages}
                                    colSpan={7}
                                />
                            </Table>
                        </ScrollArea>
                    )}
                </div>
            </section>

            <ConfirmModal
                opened={opened}
                close={close}
                title={modalText.title}
                description={modalText.description}
                handleConfirm={handleConfirmAction}
                actionText={modalText.actionText}
                isLoading={loadingServiceId === currentServiceId && loadingAction === currentAction}
            />
        </>
    );
};

export default Services;