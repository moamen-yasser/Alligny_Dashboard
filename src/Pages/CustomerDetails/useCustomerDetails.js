import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetCustomerQuery, useActiveCustomerMutation, useDeleteCustomerMutation } from "../../Service/Apis/customersApi";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "../../utils/notification";
import { useTranslation } from "react-i18next";

export const useCustomerDetails = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const customerId = searchParams.get("id");

    // Modal state
    const [opened, { open, close }] = useDisclosure(false);
    const [deleteOpened, { open: openDelete, close: closeDelete }] = useDisclosure(false);

    // Fetch customer data
    const { data: customer, isLoading, isError, error } = useGetCustomerQuery(customerId, {
        skip: !customerId,
    });

    // Mutations
    const [activateCustomer, { isLoading: isActivating }] = useActiveCustomerMutation();
    const [deleteCustomer, { isLoading: isDeleting }] = useDeleteCustomerMutation();

    // Calculate subscription status
    const getSubscriptionStatus = () => {
        if (!customer?.isSubscribed || !customer?.subscriptionEndDate) return "Inactive";

        const endDate = new Date(customer.subscriptionEndDate);
        if (isNaN(endDate.getTime())) return "Inactive";

        const now = new Date();
        const daysRemaining = Math.ceil((endDate - now) / (1000 * 60 * 60 * 24));

        if (daysRemaining < 0) return "Expired";
        if (daysRemaining <= 10) return "Expiring Soon";
        return "Active";
    };

    const getStatusColor = () => {
        const status = getSubscriptionStatus();
        switch (status) {
            case "Active":
                return "green";
            case "Expiring Soon":
                return "yellow";
            case "Expired":
                return "red";
            default:
                return "gray";
        }
    };

    // Handle activate button click
    const handleActivateClick = () => {
        open();
    };

    // Handle confirm activation
    const handleConfirmActivation = async () => {
        try {
            await activateCustomer({ id: customerId }).unwrap();
            showNotification.success({
                data: {
                    message: t('subscription_activated_desc')
                }
            });
            close();
        } catch (error) {
            showNotification.error(error);
        }
    };

    // Handle delete button click
    const handleDeleteClick = () => {
        openDelete();
    };

    // Handle confirm deletion
    const handleConfirmDeletion = async () => {
        try {
            await deleteCustomer({ id: customerId }).unwrap();
            showNotification.success({
                data: {
                    message: t('operation_success')
                }
            });
            closeDelete();
            navigate('/dashboard/customers');
        } catch (error) {
            showNotification.error(error);
        }
    };

    return {
        customer,
        isLoading,
        isError,
        error,
        navigate,
        customerId,
        subscriptionStatus: getSubscriptionStatus(),
        statusColor: getStatusColor(),
        opened,
        close,
        deleteOpened,
        closeDelete,
        isActivating,
        isDeleting,
        handleActivateClick,
        handleConfirmActivation,
        handleDeleteClick,
        handleConfirmDeletion,
    };
};
