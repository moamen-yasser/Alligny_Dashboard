import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetCustomerQuery, useActiveCustomerMutation } from "../../Service/Apis/customersApi";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";

export const useCustomerDetails = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const customerId = searchParams.get("id");

    // Modal state
    const [opened, { open, close }] = useDisclosure(false);

    // Fetch customer data
    const { data: customer, isLoading, isError, error } = useGetCustomerQuery(customerId, {
        skip: !customerId,
    });

    // Activate customer mutation
    const [activateCustomer, { isLoading: isActivating }] = useActiveCustomerMutation();

    // Calculate subscription status
    const getSubscriptionStatus = () => {
        if (!customer?.isSubscribed || !customer?.subscriptionEndDate) return "Inactive";

        const endDate = new Date(customer.subscriptionEndDate);
        if (isNaN(endDate.getTime())) return "Inactive";

        const now = new Date();
        const daysRemaining = Math.ceil((endDate - now) / (1000 * 60 * 60 * 24));

        if (daysRemaining < 0) return "Expired";
        if (daysRemaining <= 7) return "Expiring Soon";
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
            notifications.show({
                title: "Success!",
                message: `Subscription activated for ${customer?.firstName} ${customer?.lastName}`,
                color: "green",
                autoClose: 3000,
            });
            close();
        } catch (error) {
            notifications.show({
                title: "Error",
                message: error?.data?.message || "Failed to activate subscription",
                color: "red",
                autoClose: 4000,
            });
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
        isActivating,
        handleActivateClick,
        handleConfirmActivation,
    };
};
