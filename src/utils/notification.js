import { notifications } from '@mantine/notifications';
import i18next from 'i18next';

export const showNotification = {
    success: (response) => {
        const message = response?.data?.message ||
            response?.message ||
            i18next.t('operation_success');
        notifications.show({
            title: i18next.t('success'),
            message,
            color: 'teal',
            autoClose: 3000,
        });
    },
    error: (error) => {
        const message = error?.data?.message ||
            error?.message ||
            i18next.t('something_went_wrong');
        notifications.show({
            title: i18next.t('error'),
            message,
            color: 'red',
            autoClose: 3000,
        });
    },
    warning: (message) => {
        notifications.show({
            title: i18next.t('warning'),
            message,
            color: 'yellow',
            autoClose: 3000,
        });
    },
    info: (message) => {
        notifications.show({
            title: i18next.t('info'),
            message,
            color: 'blue',
            autoClose: 3000,
        });
    },
};