import { useOutletContext } from "react-router-dom";
import { ConfirmModal } from "../../Components/ConfirmModal";
import { useCustomers } from "./useCustomers";
import CustomersHeader from "./CustomersHeader";
import CustomersTable from "./CustomersTable";
import { useTranslation } from "react-i18next";

const Customers = () => {
    const { searchQuery } = useOutletContext();
    const { t } = useTranslation();

    const {
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
    } = useCustomers(searchQuery);

    return (
        <>
            <>
                <CustomersHeader
                    subscriptionFilter={subscriptionFilter}
                    onFilterChange={handleSubscriptionFilterChange}
                    totalCount={allCustomers?.totalCount}
                />

                <CustomersTable
                    isLoading={isLoading}
                    customers={allCustomers}
                    activePage={activePage}
                    totalPages={allCustomers?.totalPages}
                    isActivating={isActivating}
                    isDeleting={isDeleting}
                    currentCustomerId={currentCustomerId}
                    onActivateClick={handleActivateClick}
                    onDeleteClick={handleDeleteClick}
                    onPageChange={setActivePage}
                />
            </>

            {/* Activate Modal */}
            <ConfirmModal
                opened={opened}
                close={close}
                title={t('activate_subscription')}
                description={t('activate_subscription_desc')}
                handleConfirm={handleConfirmActivate}
                actionText="activate"
                isLoading={isActivating && currentCustomerId}
            />

            {/* Delete Modal */}
            <ConfirmModal
                opened={deleteOpened}
                close={closeDelete}
                title={t('delete')}
                description={t('delete_customer_desc')}
                handleConfirm={handleConfirmDelete}
                actionText="delete"
                isLoading={isDeleting && currentCustomerId}
                color="red"
            />
        </>
    );
};

export default Customers;