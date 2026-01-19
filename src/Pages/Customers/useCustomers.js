import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { useGetAllCustomersQuery, useActiveCustomerMutation, useDeleteCustomerMutation } from '../../Service/Apis/customersApi';
import { showNotification } from '../../utils/notification';
import { useUrlPagination } from '../../utils/useUrlPagination';
import { useDebounce } from '../../utils/useDebounce';
import { useTranslation } from 'react-i18next';

export const useCustomers = (searchQuery) => {
    const { t } = useTranslation();
    const [activePage, setActivePage] = useUrlPagination("page", 1);
    const [subscriptionFilter, setSubscriptionFilter] = useState('all');
    const [opened, { open, close }] = useDisclosure(false);
    const [deleteOpened, { open: openDelete, close: closeDelete }] = useDisclosure(false);
    const [currentCustomerId, setCurrentCustomerId] = useState(null);

    const debouncedSearch = useDebounce(searchQuery, 500) || '';
    
    // Fetch customers 
    const { data: allCustomers, isLoading, refetch } = useGetAllCustomersQuery({
        pageNumber: activePage,
        pageSize: 10,
        search: debouncedSearch && debouncedSearch.trim() !== "" ? debouncedSearch : undefined,
        isSubscribed: subscriptionFilter === "all" ? undefined : subscriptionFilter === "subscribed" ? true : false,
    });

    // Mutations
    const [activateSubscription, { isLoading: isActivating }] = useActiveCustomerMutation();
    const [deleteCustomer, { isLoading: isDeleting }] = useDeleteCustomerMutation();

    // Handlers
    const handleSubscriptionFilterChange = (value) => {
        setSubscriptionFilter(value);
        setActivePage(1);
    };

    const handleActivateClick = (id) => {
        setCurrentCustomerId(id);
        open();
    };

    const handleConfirmActivate = async () => {
        try {
            await activateSubscription({ id: currentCustomerId }).unwrap();
            showNotification.success({
                data: {
                    message: t('subscription_activated_desc')
                }
            });
            close();
            refetch();
        } catch (error) {
            console.error('Error activating subscription:', error);
            showNotification.error(error);
        }
    };

    const handleDeleteClick = (id) => {
        setCurrentCustomerId(id);
        openDelete();
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteCustomer({ id: currentCustomerId }).unwrap();
            showNotification.success({
                data: {
                    message: t('operation_success')
                }
            });
            closeDelete();
            refetch();
        } catch (error) {
            console.error('Error deleting customer:', error);
            showNotification.error(error);
        }
    };

    return {
        activePage,
        setActivePage,
        subscriptionFilter,
        opened,
        close,
        deleteOpened,
        closeDelete,
        currentCustomerId,
        isActivating,
        isDeleting,
        allCustomers,
        isLoading,
        handleSubscriptionFilterChange,
        handleActivateClick,
        handleConfirmActivate,
        handleDeleteClick,
        handleConfirmDelete,
    };
};
