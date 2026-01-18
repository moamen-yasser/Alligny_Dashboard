import { Container, Grid, Stack } from "@mantine/core";
import Loader from "../../Components/Loader";
import NotFound from "../../Components/NotFound";
import { ConfirmModal } from "../../Components/ConfirmModal";

// Import custom hook
import { useCustomerDetails } from "./useCustomerDetails";

// Import component sections
import CustomerHeader from "./CustomerHeader";
import CustomerProfileCard from "./CustomerProfileCard";
import CustomerContactCard from "./CustomerContactCard";
import CustomerSubscriptionCard from "./CustomerSubscriptionCard";
import FamilyMembersCard from "./FamilyMembersCard";

const CustomerDetails = () => {
    const {
        customer,
        isLoading,
        isError,
        navigate,
        subscriptionStatus,
        statusColor,
        opened,
        close,
        isActivating,
        handleActivateClick,
        handleConfirmActivation,
    } = useCustomerDetails();

    // Loading State
    if (isLoading) {
        return (
            <div className="h-[80vh] flex items-center justify-center">
                <Loader isLoading={true} />
            </div>
        );
    }

    // Error or Not Found State
    if (isError || !customer) {
        return <NotFound />;
    }

    return (
        <Container size="xl" py={0}>
            {/* Header Section */}
            <CustomerHeader
                customer={customer}
                navigate={navigate}
                subscriptionStatus={subscriptionStatus}
                statusColor={statusColor}
                onActivateClick={handleActivateClick}
                isActivating={isActivating}
            />

            {/* Main Content Grid */}
            <Grid gutter="xl" mb="xl" align="stretch">
                {/* Left Column - Profile Card */}
                <Grid.Col span={{ base: 12, md: 5, lg: 4 }}>
                    <CustomerProfileCard customer={customer} />
                </Grid.Col>

                {/* Right Column - Contact and Subscription Cards */}
                <Grid.Col span={{ base: 12, md: 7, lg: 8 }}>
                    <Stack gap="lg" h="100%">
                        <CustomerContactCard customer={customer} />
                        <CustomerSubscriptionCard customer={customer} />
                    </Stack>
                </Grid.Col>

                {/* Full Width Row - Family Members */}
                <Grid.Col span={12}>
                    <FamilyMembersCard customer={customer} />
                </Grid.Col>
            </Grid>

            {/* Confirmation Modal */}
            <ConfirmModal
                opened={opened}
                close={close}
                title="Activate Subscription"
                description={`Are you sure you want to activate subscription for "${customer?.firstName} ${customer?.lastName}"?`}
                handleConfirm={handleConfirmActivation}
                actionText="Approve"
                isLoading={isActivating}
            />
        </Container>
    );
};

export default CustomerDetails;