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
        currentCustomerId,
        isActivating,
        allCustomers,
        isLoading,
        handleSubscriptionFilterChange,
        handleActivateClick,
        handleConfirmActivate,
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
                    currentCustomerId={currentCustomerId}
                    onActivateClick={handleActivateClick}
                    onPageChange={setActivePage}
                />
            </>

            <ConfirmModal
                opened={opened}
                close={close}
                title={t('activate_subscription')}
                description={t('activate_subscription_desc')}
                handleConfirm={handleConfirmActivate}
                actionText="approve"
                isLoading={isActivating && currentCustomerId}
            />
        </>
    );
};

export default Customers;