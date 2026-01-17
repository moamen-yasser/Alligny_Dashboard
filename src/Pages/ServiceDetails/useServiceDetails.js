import { useSearchParams, useNavigate } from "react-router-dom";
import { useGetServiceQuery, useApproveServiceMutation, useRejectServiceMutation } from "../../Service/Apis/servicesApi";
import { showNotification } from "../../utils/notification";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";

export const useServiceDetails = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const navigate = useNavigate();

    // API Queries/Mutations
    const { data: service, isLoading, refetch } = useGetServiceQuery(id, { skip: !id });
    const [approveService, { isLoading: isApproveLoading }] = useApproveServiceMutation();
    const [rejectService, { isLoading: isRejectLoading }] = useRejectServiceMutation();

    // Modal State
    const [opened, { open, close }] = useDisclosure(false);
    const [currentAction, setCurrentAction] = useState(null);

    // Constants
    const statusColors = {
        Pending: "yellow",
        Approved: "green",
        Rejected: "red",
        active: "green"
    };

    // Handlers
    const handleActionClick = (action) => {
        setCurrentAction(action);
        open();
    };

    const handleConfirmAction = async () => {
        try {
            if (currentAction === 'approve') {
                await approveService({ id }).unwrap();
                showNotification.success("Service approved successfully");
            } else {
                await rejectService({ id }).unwrap();
                showNotification.success("Service rejected successfully");
            }
            refetch();
            close();
        } catch (error) {
            showNotification.error(error?.data?.message || "Failed to perform action");
        }
    };

    // Helper to parse specific fields
    const getSpecificFields = () => {
        try {
            return JSON.parse(service?.specificFieldsAsJson || "{}");
        } catch (e) {
            return {};
        }
    };

    const specificFields = getSpecificFields();

    return {
        // State
        service,
        isLoading,
        opened,
        currentAction,
        isApproveLoading,
        isRejectLoading,
        navigate,
        specificFields,
        statusColors,

        // Handlers
        handleActionClick,
        handleConfirmAction,
        close,
    };
};
