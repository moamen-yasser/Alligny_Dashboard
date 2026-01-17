import { Container, Grid, Stack } from "@mantine/core";
import Loader from "../../Components/Loader";
import { ConfirmModal } from "../../Components/ConfirmModal";
import NotFound from "../../Components/NotFound";

// Import custom hook
import { useServiceDetails } from "./useServiceDetails";

// Import component sections
import ServiceHeader from "./ServiceHeader";
import ServiceImageCard from "./ServiceImageCard";
import ProviderContactCard from "./ProviderContactCard";
import ProviderSocialCard from "./ProviderSocialCard";
import ServiceDescriptionCard from "./ServiceDescriptionCard";
import ServiceBranchesCard from "./ServiceBranchesCard";

const ServiceDetails = () => {
    const {
        service,
        isLoading,
        opened,
        currentAction,
        isApproveLoading,
        isRejectLoading,
        navigate,
        specificFields,
        statusColors,
        handleActionClick,
        handleConfirmAction,
        close,
    } = useServiceDetails();

    // Loading State
    if (isLoading) return (
        <div className="h-[80vh] flex items-center justify-center">
            <Loader isLoading={true} />
        </div>
    );

    // Not Found State
    if (!service) return <NotFound />;

    return (
        <Container size="xl" py="xl">
            {/* Header Section */}
            <ServiceHeader
                service={service}
                navigate={navigate}
                statusColors={statusColors}
                handleActionClick={handleActionClick}
                isApproveLoading={isApproveLoading}
                isRejectLoading={isRejectLoading}
            />

            <Grid gutter="xl">
                {/* Left Column - Image and Provider Info */}
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Stack gap="lg">
                        <ServiceImageCard service={service} />
                        <ProviderContactCard service={service} />
                        <ProviderSocialCard service={service} />
                    </Stack>
                </Grid.Col>

                {/* Right Column - Description and Branches */}
                <Grid.Col span={{ base: 12, md: 8 }}>
                    <Stack gap="lg">
                        <ServiceDescriptionCard service={service} specificFields={specificFields} />
                        <ServiceBranchesCard service={service} />
                    </Stack>
                </Grid.Col>
            </Grid>

            {/* Confirmation Modal */}
            <ConfirmModal
                opened={opened}
                close={close}
                title={currentAction === 'approve' ? 'Approve Service' : 'Reject Service'}
                description={`Are you sure you want to ${currentAction} "${service.name}"?`}
                handleConfirm={handleConfirmAction}
                actionText={currentAction === 'approve' ? 'Approve' : 'Reject'}
                isLoading={isApproveLoading || isRejectLoading}
            />
        </Container>
    );
};

export default ServiceDetails;