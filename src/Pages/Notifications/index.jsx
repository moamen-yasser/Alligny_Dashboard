import { useOutletContext } from "react-router-dom";
import { useNotifications } from "./useNotifications";
import NotificationsHeader from "./NotificationsHeader";
import NotificationsTable from "./NotificationsTable";
import AddNotificationForm from "../../Components/AddNotificationForm";
import NotificationDetailsModal from "./NotificationDetailsModal";

const Notifications = () => {
    const { searchQuery } = useOutletContext();

    const {
        activePage,
        setActivePage,
        role,
        handleRoleChange,
        opened,
        close,
        detailsOpened,
        closeDetails,
        selectedNotification,
        allNotifications,
        isLoading,
        refetch,
        handleAddClick,
        handleViewDetails,
    } = useNotifications(searchQuery);

    return (
        <>
            <NotificationsHeader
                totalCount={allNotifications?.totalCount}
                onAddClick={handleAddClick}
                role={role}
                onRoleChange={handleRoleChange}
            />

            <NotificationsTable
                isLoading={isLoading}
                notifications={allNotifications}
                activePage={activePage}
                totalPages={allNotifications?.totalPages}
                onPageChange={setActivePage}
                onRowClick={handleViewDetails}
            />

            <AddNotificationForm
                opened={opened}
                close={close}
                refetch={refetch}
            />

            <NotificationDetailsModal
                opened={detailsOpened}
                onClose={closeDetails}
                notification={selectedNotification}
            />
        </>
    );
};

export default Notifications;
