import * as yup from 'yup';

const getLoginSchema = (t) => yup.object().shape({
    email: yup
        .string()
        .trim()
        .required(t('email_required'))
        .email(t('invalid_email')),
    password: yup
        .string()
        .required(t('password_required'))
        .min(8, t('password_min_length', { count: 8 }))
        .max(32, t('password_max_length', { count: 32 }))
        .matches(/[a-z]/, t('password_lowercase'))
        .matches(/[A-Z]/, t('password_uppercase'))
        .matches(/\d/, t('password_number'))
        .matches(/[@$!%*?&#]/, t('password_special')),
});

export default getLoginSchema;




