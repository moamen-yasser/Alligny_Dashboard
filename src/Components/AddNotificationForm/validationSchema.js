import * as yup from 'yup';

export const getAddNotificationValidationSchema = (t) => yup.object().shape({
    title: yup.string()
        .required(t('title_required'))
        .min(5, t('title_min', { count: 5 }))
        .max(250, t('title_max', { count: 250 })),
    message: yup.string()
        .required(t('message_required'))
        .min(5, t('message_min', { count: 5 }))
        .max(200, t('message_max', { count: 200 })),
    target: yup.string()
        .required(t('target_required')),
});
