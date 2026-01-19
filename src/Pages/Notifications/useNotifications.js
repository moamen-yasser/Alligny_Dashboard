import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import {
    useGetUserNotificationsQuery,
    useGetProviderNotificationsQuery,
} from '../../Service/Apis/notificationsApi';
import { useUrlPagination } from '../../utils/useUrlPagination';
import { useDebounce } from '../../utils/useDebounce';

export const useNotifications = (searchQuery) => {
    const [activePage, setActivePage] = useUrlPagination("page", 1);
    const [role, setRole] = useState('User'); // 'User' or 'Provider'
    const [opened, { open, close }] = useDisclosure(false);
    const [detailsOpened, { open: openDetails, close: closeDetails }] = useDisclosure(false);
    const [selectedNotification, setSelectedNotification] = useState(null);

    const debouncedSearch = useDebounce(searchQuery, 500) || '';

    // User Notifications Query
    const userQuery = useGetUserNotificationsQuery({
        pageNumber: activePage,
        pageSize: 10,
        search: debouncedSearch,
    }, { skip: role !== 'User' });

    // Provider Notifications Query
    const providerQuery = useGetProviderNotificationsQuery({
        pageNumber: activePage,
        pageSize: 10,
        search: debouncedSearch && debouncedSearch.trim() !== "" ? debouncedSearch : undefined,
    }, { skip: role !== 'Provider' });

    // Determine current data and loading state
    const isUserRole = role === 'User';
    const allNotifications = isUserRole ? userQuery.data : providerQuery.data;
    const isLoading = isUserRole ? userQuery.isLoading : providerQuery.isLoading;
    const refetch = isUserRole ? userQuery.refetch : providerQuery.refetch;

    const handleRoleChange = (newRole) => {
        setRole(newRole);
        setActivePage(1);
    };

    const handleAddClick = () => {
        open();
    };

    const handleViewDetails = (notification) => {
        setSelectedNotification(notification);
        openDetails();
    };

    return {
        activePage,
        setActivePage,
        role,
        handleRoleChange,
        opened,
        open,
        close,
        detailsOpened,
        openDetails,
        closeDetails,
        selectedNotification,
        allNotifications,
        isLoading,
        handleAddClick,
        handleViewDetails,
        refetch,
    };
};
