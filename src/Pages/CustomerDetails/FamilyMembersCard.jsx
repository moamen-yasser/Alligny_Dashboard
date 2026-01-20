import { Card, Text, SimpleGrid, Image, Badge, Stack, Group, Avatar } from "@mantine/core";
import { HiOutlineUsers, HiOutlineHeart } from "react-icons/hi2";
import { MdPets } from "react-icons/md";
import { useTranslation } from "react-i18next";

const FamilyMembersCard = ({ customer }) => {
    const { t } = useTranslation();
    const familyMembers = customer?.familyMembers || [];
    const hasMembers = familyMembers.length > 0;

    const getRelationIcon = (type) => {
        return type?.toLowerCase() === "pet" ? <MdPets size={14} /> : <HiOutlineHeart size={14} />;
    };

    const getRelationColor = (type) => {
        return type?.toLowerCase() === "pet" ? "orange" : "pink";
    };

    const getMemberInitials = (name) => {
        const words = name?.split(" ") || [];
        if (words.length >= 2) {
            return `${words[0].charAt(0)}${words[1].charAt(0)}`.toUpperCase();
        }
        return name?.charAt(0)?.toUpperCase() || "?";
    };

    return (
        <Card
            shadow="sm"
            padding={{ base: 4, md: 'lg' }}
            radius="lg"
            withBorder
            className="bg-white dark:bg-slate-900"
        >
            <Group justify="space-between" mb={{ base: 4, md: 'md' }}>
                <Group gap="xs">
                    <HiOutlineUsers className="text-main" size={24} />
                    <Text fw={700} size="lg" className="text-slate-800 dark:text-white">
                        {t('family_members')}
                    </Text>
                </Group>
                <Badge
                    variant="gradient"
                    gradient={{ from: '#50C5C8', to: '#26A69A', deg: 45 }}
                    size="xl"
                    radius="md"
                    className="py-1 px-4 !h-9 shadow-sm"
                >
                    {familyMembers.length} {familyMembers.length <= 1 ? t('member') : t('members')}
                </Badge>
            </Group>

            {hasMembers ? (
                <SimpleGrid
                    cols={{ base: 1, sm: 2, md: 3 }}
                    spacing={{ base: 'xs', md: 'lg' }}
                >
                    {familyMembers.map((member) => (
                        <Card
                            key={member.id}
                            padding={{ base: 4, md: 'md' }}
                            radius="md"
                            withBorder
                            className="bg-slate-50 dark:bg-slate-800/50 hover:shadow-md transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
                        >
                            <Group gap={{ base: 'xs', md: 'md' }} wrap="nowrap" align="center">
                                {/* Member Image/Avatar - Left Side */}
                                <div className="flex-shrink-0">
                                    {member.profileImageUrl ? (
                                        <Image
                                            src={member.profileImageUrl}
                                            h={{ base: 50, md: 80 }}
                                            w={{ base: 50, md: 80 }}
                                            fit="cover"
                                            radius="xl"
                                            alt={member.name}
                                            fallbackSrc="https://placehold.co/80x80?text=No+Image"
                                            className="group-hover:scale-110 transition-transform duration-300 shadow-sm border-2 border-white dark:border-slate-700"
                                        />
                                    ) : (
                                        <Avatar
                                            size="custom"
                                            radius="xl"
                                            color="main"
                                            className="shadow-sm border-2 border-white dark:border-slate-700 group-hover:scale-110 transition-transform duration-300 w-[50px] h-[50px] md:w-[80px] md:h-[80px]"
                                        >
                                            {getMemberInitials(member.name)}
                                        </Avatar>
                                    )}
                                </div>

                                {/* Member info - Right Side */}
                                <Stack gap={4} className="flex-1 min-w-0 text-start">
                                    <Text
                                        fw={700}
                                        size="md"
                                        className="text-slate-800 dark:text-white"
                                        lineClamp={1}
                                    >
                                        {member.name}
                                    </Text>

                                    <Group gap={6} wrap="wrap" justify="start">
                                        {/* Relation Badge */}
                                        <Badge
                                            variant="light"
                                            color={getRelationColor(member.type)}
                                            size="sm"
                                            radius="sm"
                                            leftSection={getRelationIcon(member.type)}
                                            className="font-semibold"
                                        >
                                            {t(member.relation?.toLowerCase()) || member.relation}
                                        </Badge>

                                        {/* Type Badge */}
                                        <Badge
                                            variant="dot"
                                            color={member.type?.toLowerCase() === "pet" ? "orange" : "blue"}
                                            size="sm"
                                            radius="sm"
                                        >
                                            {t(member.type?.toLowerCase()) || member.type}
                                        </Badge>
                                    </Group>
                                </Stack>
                            </Group>
                        </Card>
                    ))}
                </SimpleGrid>
            ) : (
                <div className="text-center py-12">
                    <HiOutlineUsers className="mx-auto text-slate-300 dark:text-slate-600 mb-3" size={48} />
                    <Text size="sm" c="dimmed">
                        {t('no_family_members')}
                    </Text>
                </div>
            )}
        </Card>
    );
};

export default FamilyMembersCard;
