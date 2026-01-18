import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { useGetAllCustomersQuery, useActiveCustomerMutation } from '../../Service/Apis/customersApi';
import { showNotification } from '../../utils/notification';
import { useUrlPagination } from '../../utils/useUrlPagination';
import { useDebounce } from '../../utils/useDebounce';
import { useTranslation } from 'react-i18next';

export const useCustomers = (searchQuery) => {
    const { t } = useTranslation();
    const [activePage, setActivePage] = useUrlPagination("page", 1);
    const [subscriptionFilter, setSubscriptionFilter] = useState('all');
    const [opened, { open, close }] = useDisclosure(false);
    const [currentCustomerId, setCurrentCustomerId] = useState(null);

    // Fetch customers 
    const { data: allCustomers, isLoading, refetch } = useGetAllCustomersQuery({
        pageNumber: activePage,
        pageSize: 10,
        search: useDebounce(searchQuery, 500) || '',
        isSubscribed: subscriptionFilter === "all" ? undefined : subscriptionFilter === "subscribed" ? true : false,
    });

    // Activate subscription mutation
    const [activateSubscription, { isLoading: isActivating }] = useActiveCustomerMutation();

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
                title: t('subscription_activated_title'),
                message: t('subscription_activated_desc'),
            });
            close();
            refetch();
        } catch (error) {
            console.error('Error activating subscription:', error);
            showNotification.error(error?.data?.message || t('error_activating_subscription'));
        }
    };

    return {
        activePage,
        setActivePage,
        subscriptionFilter,
        opened,
        close,
        currentCustomerId,
        isActivating,
        allCustomers,
        isLoading,
        handleSubscriptionFilterChange,
        handleActivateClick,
        handleConfirmActivate,
    };
};
