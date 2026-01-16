import { notifications } from '@mantine/notifications';

export const showNotification = {
    success: (response) => {
        const message = response?.data?.message || 
                      response?.message || 
                      'Operation completed successfully';
        notifications.show({
            title: 'Success',
            message,
            color: 'teal',
            autoClose: 3000,
        });
    },
    error: (error) => {
        const message = error?.data?.message || 
                      error?.message || 
                      'Something went wrong';
        notifications.show({
            title: 'Error',
            message,
            color: 'red',
            autoClose: 3000,
        });
    },
    warning: (message) => {
        notifications.show({
            title: 'Warning',
            message,
            color: 'yellow',
            autoClose: 3000,
        });
    },
    info: (message) => {
        notifications.show({
            title: 'Info',
            message,
            color: 'blue',
            autoClose: 3000,
        });
    },
};