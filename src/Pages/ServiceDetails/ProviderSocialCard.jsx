import { Card, Text, Group, ActionIcon, Tooltip } from "@mantine/core";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

const ProviderSocialCard = ({ service }) => {
    return (
        <Card shadow="sm" padding="md" radius="lg" withBorder className="bg-white dark:bg-slate-900">
            <Text fw={700} mb="md" className="text-slate-800 dark:text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-main"></span>
                Provider Social Media
            </Text>
            {service.facebookUrl || service.instagramUrl || service.tikTokUrl || service.youTubeUrl ? (
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
            ) : (
                <Text size="sm" c="dimmed" ta="center" fs="italic">
                    No social media links provided
                </Text>
            )}
        </Card>
    );
};

export default ProviderSocialCard;
