import { useSearchParams, useNavigate } from "react-router-dom";
import { useGetServiceQuery, useApproveServiceMutation, useRejectServiceMutation } from "../../Service/Apis/servicesApi";
import {
    Container,
    Grid,
    Card,
    Text,
    Badge,
    Group,
    Stack,
    Button,
    Image,
    Tabs,
    ThemeIcon,
    Divider,
    Paper,
    ScrollArea,
    ActionIcon,
    Tooltip
} from "@mantine/core";
import {
    HiArrowLeft,
    HiCalendar,
    HiOutlineEnvelope,
    HiOutlinePhone,
    HiOutlineMapPin,
    HiOutlineGlobeAlt,
    HiOutlineClock,
    HiOutlineCheckCircle,
    HiOutlineXCircle,
    HiOutlineTruck,
    HiOutlineCreditCard,
} from "react-icons/hi2";
import {
    FaFacebook,
    FaInstagram,
    FaTiktok,
    FaYoutube,
    FaWhatsapp
} from "react-icons/fa";
import Loader from "../../Components/Loader";
import { extractDate } from "../../utils/extractDate";
import { showNotification } from "../../utils/notification";
import { useState } from "react";
import { ConfirmModal } from "../../Components/ConfirmModal";
import { useDisclosure } from "@mantine/hooks";

const ServiceDetails = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const navigate = useNavigate();

    // API Queries/Mutations
    const { data: service, isLoading, refetch } = useGetServiceQuery(id, { skip: !id });
    const [approveService, { isLoading: isApproveLoading }] = useApproveServiceMutation();
    const [rejectService, { isLoading: isRejectLoading }] = useRejectServiceMutation();

    // Modal State
    const [opened, { open, close }] = useDisclosure(false);
    const [currentAction, setCurrentAction] = useState(null);

    if (isLoading) return (
        <div className="h-[80vh] flex items-center justify-center">
            <Loader isLoading={true} />
        </div>
    );

    if (!service) return (
        <div className="p-10 text-center">
            <Text size="xl" fw={700} c="dimmed">Service not found</Text>
            <Button variant="subtle" leftSection={<HiArrowLeft />} onClick={() => navigate(-1)} mt="md">
                Go Back
            </Button>
        </div>
    );

    const handleActionClick = (action) => {
        setCurrentAction(action);
        open();
    };

    const handleConfirmAction = async () => {
        try {
            if (currentAction === 'approve') {
                await approveService({ id }).unwrap();
                showNotification.success("Service approved successfully");
            } else {
                await rejectService({ id }).unwrap();
                showNotification.success("Service rejected successfully");
            }
            refetch();
            close();
        } catch (error) {
            showNotification.error(error?.data?.message || "Failed to perform action");
        }
    };

    const statusColors = {
        Pending: "yellow",
        Approved: "green",
        Rejected: "red",
        active: "green"
    };

    // Helper to parse specific fields
    const getSpecificFields = () => {
        try {
            return JSON.parse(service.specificFieldsAsJson || "{}");
        } catch (e) {
            return {};
        }
    };

    const statusTextColors = {
        Pending: "!text-yellow-600",
        Approved: "!text-green-600",
        active: "!text-green-600",
        Rejected: "!text-red-600",
    };

    const specificFields = getSpecificFields();

    return (
        <Container size="xl" py="xl">
            {/* Header / Breadcrumbs Area */}
            <Group justify="space-between" mb="xl">
                <Stack gap={4}>
                    <Group gap="xs">
                        <ActionIcon
                            variant="subtle"
                            color="gray"
                            onClick={() => navigate(-1)}
                            className="hover:scale-110 transition-transform"
                        >
                            <HiArrowLeft size={20} />
                        </ActionIcon>
                        <Text size="xl" fw={800} className="text-slate-800 dark:text-white">
                            Service Details
                        </Text>
                    </Group>
                    <Text size="sm" c="dimmed" ml={32}>
                        View and manage service information for <span className="text-main font-semibold">"{service.name}"</span>
                    </Text>
                </Stack>

                <Group gap="md">
                    <Badge
                        size="xl"
                        variant="dot"
                        color={statusColors[service?.status]}
                        className={`py-4 px-6 font-bold ${statusTextColors[service?.status] || "!text-main"}`}
                    >
                        {service?.status}
                    </Badge>

                    <Group gap="xs">
                        {(service?.status === "Pending" || service?.status === "Rejected") && (
                            <Button
                                color="green"
                                radius="md"
                                leftSection={<HiOutlineCheckCircle size={18} />}
                                onClick={() => handleActionClick('approve')}
                                loading={isApproveLoading}
                            >
                                Approve
                            </Button>
                        )}
                        {(service?.status === "Pending" || service?.status === "Approved") && (
                            <Button
                                color="red"
                                variant="light"
                                radius="md"
                                leftSection={<HiOutlineXCircle size={18} />}
                                onClick={() => handleActionClick('reject')}
                                loading={isRejectLoading}
                            >
                                Reject
                            </Button>
                        )}
                    </Group>
                </Group>
            </Group>

            <Grid gutter="xl">
                {/* Left Column - Image and Primary Info */}
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Stack gap="lg">
                        <Card shadow="sm" padding="md" radius="lg" withBorder className="bg-white dark:bg-slate-900 overflow-hidden">
                            <Card.Section>
                                <Image
                                    src={service.imageUrl}
                                    height={280}
                                    alt={service.name}
                                    fallbackSrc="https://placehold.co/600x400?text=No+Image"
                                    className="hover:scale-105 transition-transform duration-500"
                                />
                            </Card.Section>

                            <Stack mt="md" gap="xs">
                                <Text fw={700} size="lg" className="text-slate-800 dark:text-white">
                                    {service.name}
                                </Text>
                                <Group gap="xs">
                                    <HiCalendar className="text-main" size={16} />
                                    <Text size="sm" c="dimmed">Submitted: {extractDate(service.createdAt)}</Text>
                                </Group>
                                <Group gap="xs">
                                    <ThemeIcon variant="light" color="main" size="sm" radius="xl">
                                        <HiOutlineGlobeAlt size={12} />
                                    </ThemeIcon>
                                    <Text size="sm" c="dimmed">{service.categoryName} • {service.specializationName}</Text>
                                </Group>
                            </Stack>

                            <Divider my="md" />

                            <Group justify="space-between">
                                <Tooltip label="Home Delivery Availability">
                                    <Group gap={6}>
                                        <HiOutlineTruck size={18} className={service.isDeliveryAvailable ? "text-green-500" : "text-slate-300"} />
                                        <Text size="xs" fw={500} c={service.isDeliveryAvailable ? "green" : "dimmed"}>
                                            Delivery: {service.isDeliveryAvailable ? "Yes" : "No"}
                                        </Text>
                                    </Group>
                                </Tooltip>
                                <Tooltip label="Discount Card Usage">
                                    <Group gap={6}>
                                        <HiOutlineCreditCard size={18} className={service.canUseDiscountCard ? "text-blue-500" : "text-slate-300"} />
                                        <Text size="xs" fw={500} c={service.canUseDiscountCard ? "blue" : "dimmed"}>
                                            Discount Card: {service.canUseDiscountCard ? "Yes" : "No"}
                                        </Text>
                                    </Group>
                                </Tooltip>
                            </Group>
                        </Card>

                        {/* Provider Contact Information */}
                        <Card shadow="sm" padding="lg" radius="lg" withBorder className="bg-white dark:bg-slate-900 border-l-4 border-l-main">
                            <Text fw={700} mb="md" className="text-slate-800 dark:text-white flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-main"></span>
                                Provider Details
                            </Text>
                            <Stack gap="sm">
                                <Paper p="xs" radius="md" withBorder className="bg-slate-50/50 dark:bg-slate-800/50">
                                    <Group gap="sm" wrap="nowrap">
                                        <ThemeIcon color="main" variant="light" size="md">
                                            <HiOutlineEnvelope size={16} />
                                        </ThemeIcon>
                                        <div className="overflow-hidden">
                                            <Text size="xs" c="dimmed">Email Address</Text>
                                            <Text
                                                component="a"
                                                href={`mailto:${service.providerEmail}`}
                                                size="sm"
                                                fw={600}
                                                className="truncate hover:text-main transition-colors"
                                            >
                                                {service.providerEmail}
                                            </Text>
                                        </div>
                                    </Group>
                                </Paper>

                                <Paper p="xs" radius="md" withBorder className="bg-slate-50/50 dark:bg-slate-800/50">
                                    <Group gap="sm" wrap="nowrap">
                                        <ThemeIcon color="main" variant="light" size="md">
                                            <HiOutlinePhone size={16} />
                                        </ThemeIcon>
                                        <div>
                                            <Text size="xs" c="dimmed">Phone Number</Text>
                                            <Text
                                                component="a"
                                                href={`tel:${service.providerPhoneNumber}`}
                                                size="sm"
                                                fw={600}
                                                className="hover:text-main transition-colors"
                                            >
                                                {service.providerPhoneNumber}
                                            </Text>
                                        </div>
                                    </Group>
                                </Paper>
                            </Stack>
                        </Card>

                        {/* Social Links */}
                        <Card shadow="sm" padding="md" radius="lg" withBorder className="bg-white dark:bg-slate-900">
                            <Text fw={700} mb="md" className="text-slate-800 dark:text-white flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-main"></span>
                                Provider Social Media
                            </Text>
                            <Group justify="center" gap="lg">
                                {service.facebookUrl && (
                                    <Tooltip label="Facebook">
                                        <ActionIcon component="a" href={service.facebookUrl} target="_blank" size="xl" radius="xl" color="#0866ff" variant="light">
                                            <FaFacebook size={22} className="text-[#0866ff]" />
                                        </ActionIcon>
                                    </Tooltip>
                                )}
                                {service.instagramUrl && (
                                    <Tooltip label="Instagram">
                                        <ActionIcon component="a" href={service.instagramUrl} target="_blank" size="xl" radius="xl" color="pink" variant="light">
                                            <FaInstagram size={22} className="text-[#e1306c]" />
                                        </ActionIcon>
                                    </Tooltip>
                                )}
                                {service.tikTokUrl && (
                                    <Tooltip label="TikTok">
                                        <ActionIcon component="a" href={service.tikTokUrl} target="_blank" size="xl" radius="xl" color="dark" variant="light">
                                            <FaTiktok size={22} className="text-[#000]" />
                                        </ActionIcon>
                                    </Tooltip>
                                )}
                                {service.youTubeUrl && (
                                    <Tooltip label="YouTube">
                                        <ActionIcon component="a" href={service.youTubeUrl} target="_blank" size="xl" radius="xl" color="red" variant="light">
                                            <FaYoutube size={22} className="text-[#ff0000]" />
                                        </ActionIcon>
                                    </Tooltip>
                                )}
                            </Group>
                        </Card>
                    </Stack>
                </Grid.Col>

                {/* Right Column - Tabs and Details */}
                <Grid.Col span={{ base: 12, md: 8 }}>
                    <Stack gap="lg">
                        {/* Description Section */}
                        <Card shadow="sm" padding="xl" radius="lg" withBorder className="bg-white dark:bg-slate-900">
                            <Text fw={700} size="lg" mb="sm" className="text-slate-800 dark:text-white">About the Service</Text>
                            <ScrollArea h={120}>
                                <Text size="sm" className="whitespace-pre-line leading-relaxed text-slate-600 dark:text-slate-300">
                                    {service.description}
                                </Text>
                            </ScrollArea>

                            {Object.keys(specificFields).length > 0 && (
                                <Group mt="xl" gap="xs">
                                    {Object.entries(specificFields).map(([key, value]) => (
                                        <Badge key={key} color="main" variant="light" size="lg" className="capitalize">
                                            {key.replace('_', ' ')}: {value}
                                        </Badge>
                                    ))}
                                </Group>
                            )}
                        </Card>

                        {/* Branches Section */}
                        <Card shadow="sm" padding="0" radius="lg" withBorder className="bg-white dark:bg-slate-900 overflow-hidden">
                            <div className="p-6 pb-0">
                                <Group justify="space-between">
                                    <Text fw={700} size="lg" className="text-slate-800 dark:text-white">Service Branches</Text>
                                    <Badge variant="light" size="lg" color="#26A69A">{service?.branches?.length} Branches</Badge>
                                </Group>
                            </div>

                            <Tabs defaultValue={service.branches?.[0]?.id} mt="sm" color="#50C5C8" variant="default">
                                <Tabs.List px="md" className="!border-b-0">
                                    {service?.branches?.map((branch, idx) => (
                                        <Tabs.Tab
                                            key={branch?.id}
                                            value={branch?.id}
                                            className="px-6 py-4 font-semibold data-[active]:!text-main"
                                        >
                                            Branch #{idx + 1}
                                        </Tabs.Tab>
                                    ))}
                                </Tabs.List>

                                {service?.branches?.map((branch) => (
                                    <Tabs.Panel key={branch.id} value={branch.id} p="xl">
                                        <Grid gutter="xl">
                                            <Grid.Col span={{ base: 12, sm: 7 }}>
                                                <Stack gap="md">
                                                    <div>
                                                        <Text size="xs" c="dimmed" tt="uppercase" fw={700} mb={4}>Location</Text>
                                                        <Group gap="xs" wrap="nowrap" align="start">
                                                            <HiOutlineMapPin size={20} className="text-main mt-1" />
                                                            <div>
                                                                <Text fw={600}>{branch.governorate} • {branch.city}</Text>
                                                                <Text size="sm" c="dimmed">{branch.address}</Text>
                                                            </div>
                                                        </Group>
                                                    </div>

                                                    <Divider />

                                                    <Group grow>
                                                        <div>
                                                            <Text size="xs" c="dimmed" tt="uppercase" fw={700} mb={4}>Contact</Text>
                                                            <Stack gap={8}>
                                                                <Group gap="xs">
                                                                    <HiOutlinePhone size={16} className="text-main" />
                                                                    <Text
                                                                        component="a"
                                                                        href={`tel:${branch.phoneNumber}`}
                                                                        size="sm"
                                                                        className="hover:text-main transition-colors font-medium"
                                                                    >
                                                                        {branch.phoneNumber}
                                                                    </Text>
                                                                </Group>
                                                                <Group gap="xs">
                                                                    <FaWhatsapp size={16} className="text-green-500" />
                                                                    <Text
                                                                        component="a"
                                                                        href={`https://wa.me/${branch.whatsAppNumber.replace(/\s+/g, '')}`}
                                                                        target="_blank"
                                                                        size="sm"
                                                                        className="hover:text-green-600 transition-colors font-medium"
                                                                    >
                                                                        {branch.whatsAppNumber}
                                                                    </Text>
                                                                </Group>
                                                            </Stack>
                                                        </div>
                                                        {branch.locationUrl && (
                                                            <Button
                                                                component="a"
                                                                href={branch.locationUrl}
                                                                target="_blank"
                                                                variant="light"
                                                                color="main"
                                                                leftSection={<HiOutlineGlobeAlt />}
                                                            >
                                                                View on Map
                                                            </Button>
                                                        )}
                                                    </Group>
                                                </Stack>
                                            </Grid.Col>

                                            <Grid.Col span={{ base: 12, sm: 5 }}>
                                                <Paper withBorder p="md" radius="md" className="bg-slate-50 dark:bg-slate-800">
                                                    <Group gap="xs" mb="sm">
                                                        <HiOutlineClock className="text-main" size={18} />
                                                        <Text fw={700} size="sm">Working Hours</Text>
                                                    </Group>
                                                    <Stack gap={6}>
                                                        {branch.workingHours?.map((hour, idx) => (
                                                            <Group key={idx} justify="space-between">
                                                                <Text size="xs" fw={500}>{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][hour.dayOfWeek]}</Text>
                                                                {hour.isOpen ? (
                                                                    <Text size="xs" c="main" fw={600}>{hour.fromTime} - {hour.toTime}</Text>
                                                                ) : (
                                                                    <Text size="xs" c="red" fw={600}>Closed</Text>
                                                                )}
                                                            </Group>
                                                        ))}
                                                    </Stack>
                                                </Paper>
                                            </Grid.Col>
                                        </Grid>
                                    </Tabs.Panel>
                                ))}
                            </Tabs>
                        </Card>
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