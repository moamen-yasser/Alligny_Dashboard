import { Table, Text, Badge, Button, Tooltip } from "@mantine/core";
import { HiOutlineCheckCircle, HiOutlineClock } from "react-icons/hi2";
import { formatDateTime } from "../../utils/formatDateTime";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft, MdContentCopy } from "react-icons/md";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

const CustomerRow = ({ customer, index, isActivating, currentCustomerId, onActivateClick }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const isAr = i18n.language === 'ar';
    const isSubscribed = customer.isSubscribed;
    const hasPromoCode = customer.ownPromoCode;

    return (
        <Table.Tr
            key={customer?.id || index}
            className="h-16 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
        >
            {/* Customer Name */}
            <Table.Td className="px-4 py-2 text-start">
                <div className="flex flex-col items-start gap-1">
                    <Text fw={700} size="sm" className="text-slate-900 dark:text-white">
                        {`${customer?.firstName || ''} ${customer?.lastName || ''}`.trim() || t('n_a')}
                    </Text>
                </div>
            </Table.Td>

            {/* Email */}
            <Table.Td className="px-4 py-2 text-start">
                <Text
                    component="a"
                    href={`mailto:${customer?.email}`}
                    fw={600}
                    size="sm"
                    className="text-slate-900 dark:text-white hover:text-main hover:underline transition-colors cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                >
                    {customer?.email || t('n_a')}
                </Text>
            </Table.Td>

            {/* Phone Number */}
            <Table.Td className="px-4 py-2 text-start">
                <Text
                    component="a"
                    href={`tel:${customer?.phoneNumber}`}
                    fw={600}
                    size="sm"
                    className="text-slate-900 dark:text-white hover:text-main hover:underline transition-colors cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                >
                    {customer?.phoneNumber || t('n_a')}
                </Text>
            </Table.Td>

            {/* Subscription Status */}
            <Table.Td className="px-4 py-2 text-start">
                <div className="flex flex-col items-start gap-1">
                    <Badge
                        variant="light"
                        color={isSubscribed ? "green" : "gray"}
                        size="md"
                        leftSection={isSubscribed ? <HiOutlineCheckCircle size={14} /> : <HiOutlineClock size={14} />}
                    >
                        {isSubscribed ? t('active') : t('inactive')}
                    </Badge>
                    {isSubscribed && customer?.subscriptionEndDate && !isNaN(new Date(customer.subscriptionEndDate).getTime()) && (
                        <Text size="xs" c="dimmed">
                            {t('valid_until')}: {formatDateTime(customer.subscriptionEndDate)}
                        </Text>
                    )}
                </div>
            </Table.Td>

            {/* Promo Code */}
            <Table.Td className="px-4 py-2 text-start">
                {hasPromoCode ? (
                    <Tooltip label={t('click_to_copy')} position="top">
                        <Badge
                            variant="filled"
                            color="#50C5C8"
                            size="lg"
                            className="!cursor-pointer hover:!opacity-80 !transition-opacity"
                            onClick={(e) => {
                                e.stopPropagation();
                                navigator.clipboard.writeText(customer.ownPromoCode);
                                notifications.show({
                                    title: t('copied'),
                                    message: t('promo_code_copied', { code: customer.ownPromoCode }),
                                    color: "teal",
                                    icon: <MdContentCopy size={18} />,
                                    autoClose: 2000,
                                });
                            }}
                        >
                            {customer.ownPromoCode}
                        </Badge>
                    </Tooltip>
                ) : (
                    <Text size="sm" c="dimmed">
                        {t('no_code')}
                    </Text>
                )}
            </Table.Td>

            {/* Actions */}
            <Table.Td className="px-4 py-2 text-start">
                {!isSubscribed ? (
                    <Button
                        variant="light"
                        color="green"
                        size="sm"
                        radius="md"
                        onClick={(e) => {
                            e.stopPropagation();
                            onActivateClick(customer.id);
                        }}
                        loading={isActivating && currentCustomerId === customer.id}
                        loaderProps={{ type: "dots" }}
                        disabled={isActivating}
                    >
                        {t('activate')}
                    </Button>
                ) : <Button
                    variant="transparent"
                    color="green"
                    size="sm"
                    radius="md"
                    onClick={(e) => e.stopPropagation()}
                >
                    {t('activated')}
                </Button>
                }
            </Table.Td>
            <Table.Td className="px-4 py-2 text-start" onClick={() => navigate(`/dashboard/customer/details?id=${customer?.id}`)}>
                {isAr ? <MdKeyboardArrowLeft size={20} className="text-main" /> : <MdKeyboardArrowRight size={20} className="text-main" />}
            </Table.Td>
        </Table.Tr>
    );
};

export default CustomerRow;
