import { useOutletContext } from "react-router-dom";
import { ConfirmModal } from "../../Components/ConfirmModal";
import { useServices } from "./useServices.js";
import ServicesHeader from "./ServicesHeader";
import ServicesTable from "./ServicesTable";
import { useTranslation } from "react-i18next";

const Services = () => {
    const { searchQuery } = useOutletContext();
    const { t } = useTranslation();

    const {
        activePage,
        setActivePage,
        status,
        opened,
        close,
        currentAction,
        currentServiceId,
        loadingServiceId,
        loadingAction,
        allServices,
        isLoading,
        handleStatusChange,
        handleActionClick,
        handleConfirmAction,
        getModalText,
    } = useServices(searchQuery);

    const modalText = getModalText();

    return (
        <>
            <>
                <ServicesHeader
                    status={status}
                    onStatusChange={handleStatusChange}
                    totalCount={allServices?.totalCount}
                />

                <ServicesTable
                    isLoading={isLoading}
                    services={allServices}
                    activePage={activePage}
                    totalPages={allServices?.totalPages}
                    loadingServiceId={loadingServiceId}
                    loadingAction={loadingAction}
                    onActionClick={handleActionClick}
                    onPageChange={setActivePage}
                />
            </>

            <ConfirmModal
                opened={opened}
                close={close}
                title={t(modalText.title)}
                description={t(modalText.description)}
                handleConfirm={handleConfirmAction}
                actionText={modalText.actionText}
                isLoading={loadingServiceId === currentServiceId && loadingAction === currentAction}
            />
        </>
    );
};

export default Services;
