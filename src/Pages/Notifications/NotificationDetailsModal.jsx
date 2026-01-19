import { Modal, Stack, Text, Divider, Group, Badge } from "@mantine/core";
import { HiOutlineBell, HiOutlineClock, HiOutlineUsers } from "react-icons/hi2";
import { HiOutlineMailOpen } from "react-icons/hi";
import { formatDateTime } from "../../utils/formatDateTime";
import { useTranslation } from "react-i18next";

const NotificationDetailsModal = ({ opened, onClose, notification }) => {
    const { t, i18n } = useTranslation();

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-main/10 rounded-md">
                        <HiOutlineBell size={18} className="text-main" />
                    </div>
                    <span className="font-bold text-lg">{notification?.title}</span>
                </div>
            }
            centered
            radius="lg"
            size="lg"
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <Stack gap="md" py="xs">
                <Divider variant="dashed" />

                <Group gap="sm">
                    <Badge variant="light" color="blue" size="lg" radius="md" leftSection={<HiOutlineUsers size={16} />}>
                        {t('recipients_count')}: {notification?.totalRecipients || 0}
                    </Badge>
                    <Badge variant="light" color="green" size="lg" radius="md" leftSection={<HiOutlineMailOpen size={16} />}>
                        {t('read_count')}: {notification?.totalRead || 0}
                    </Badge>
                </Group>

                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-100 dark:border-slate-700 shadow-inner">
                    <Text size="md" className="whitespace-pre-wrap leading-relaxed text-slate-700 dark:text-slate-300 !break-all">
                        {notification?.message}
                    </Text>
                </div>

                <Group justify="flex-end" mt="xs" gap="xs" opacity={0.7}>
                    <HiOutlineClock size={14} className="text-slate-500" />
                    <Text size="xs" fw={700} c="dimmed">
                        {t('sent_label')}: <span dir="ltr">{formatDateTime(notification?.dateSent, i18n.language)}</span>
                    </Text>
                </Group>
            </Stack>
        </Modal>
    );
};

export default NotificationDetailsModal;
