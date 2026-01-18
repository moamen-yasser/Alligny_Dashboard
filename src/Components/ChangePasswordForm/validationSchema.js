import * as Yup from "yup";

export const getChangePasswordValidationSchema = (t) => Yup.object().shape({
  current_password: Yup.string()
    .required(t('current_password_required')),

  new_password: Yup.string()
    .required(t('new_password_required'))
    .min(8, t('password_min_length', { count: 8 }))
    .matches(/[0-9]/, t('password_number'))
    .matches(/[a-z]/, t('password_lowercase'))
    .matches(/[A-Z]/, t('password_uppercase'))
    .matches(/[$&+,:;=?@#|'<>.^*()%!-]/, t('password_special'))
    .notOneOf([Yup.ref('current_password')], t('new_password_same_as_current')),

  confirm_password: Yup.string()
    .required(t('confirm_password_required'))
    .oneOf([Yup.ref('new_password')], t('passwords_match'))
});