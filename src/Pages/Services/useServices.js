import { useState } from "react";
import {
  useGetAllServicesQuery,
  useApproveServiceMutation,
  useRejectServiceMutation
} from "../../Service/Apis/servicesApi";
import { useDebounce } from "../../utils/useDebounce";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "../../utils/notification";
import { useUrlPagination } from "../../utils/useUrlPagination";
import { useTranslation } from "react-i18next";

export const useServices = (searchQuery) => {
  const { t } = useTranslation();
  // State
  const [activePage, setActivePage] = useUrlPagination("page", 1);
  const [status, setStatus] = useState("All");
  const [opened, { open, close }] = useDisclosure(false);
  const [currentAction, setCurrentAction] = useState(null);
  const [currentServiceId, setCurrentServiceId] = useState(null);
  const [loadingServiceId, setLoadingServiceId] = useState(null);
  const [loadingAction, setLoadingAction] = useState(null);

  // Context and API calls
  const debouncedSearch = useDebounce(searchQuery, 500);

  const { data: allServices, isLoading } = useGetAllServicesQuery({
    PageNumber: activePage,
    search: debouncedSearch && debouncedSearch.trim() !== "" ? debouncedSearch : undefined,
    Status: status === "All" ? undefined : status,
  });

  const [approveService] = useApproveServiceMutation();
  const [rejectService] = useRejectServiceMutation();

  // Handlers
  const handleStatusChange = (value) => {
    setStatus(value);
    setActivePage(1);
  };

  const handleActionClick = (id, action) => {
    setCurrentServiceId(id);
    setCurrentAction(action);
    open();
  };

  const handleConfirmAction = async () => {
    const id = currentServiceId;
    const action = currentAction;

    try {
      setLoadingServiceId(id);
      setLoadingAction(action);

      let response;
      if (action === "approve") {
        response = await approveService({ id }).unwrap();
        showNotification.success(response?.message || t('service_approved_success'));
      } else if (action === "reject") {
        response = await rejectService({ id }).unwrap();
        showNotification.success(response?.message || t('service_rejected_success'));
      }

      close();
      return response;
    } catch (error) {
      showNotification.error(error?.data?.message || t('failed_to_perform_action'));
      throw error;
    } finally {
      setLoadingServiceId(null);
      setLoadingAction(null);
      setCurrentServiceId(null);
      setCurrentAction(null);
    }
  };

  const getModalText = () => {
    if (currentAction === 'approve') {
      return {
        title: "approve_service_title",
        description: "approve_service_desc",
        actionText: "approve"
      };
    }
    return {
      title: "reject_service_title",
      description: "reject_service_desc",
      actionText: "reject"
    };
  };

  return {
    // State
    activePage,
    setActivePage,
    status,
    setStatus,
    opened,
    open,
    close,
    currentAction,
    currentServiceId,
    loadingServiceId,
    loadingAction,

    // Data
    allServices,
    isLoading,

    // Handlers
    handleStatusChange,
    handleActionClick,
    handleConfirmAction,
    getModalText,
  };
};