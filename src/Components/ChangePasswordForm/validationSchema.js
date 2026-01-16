import * as Yup from "yup";

export const changePasswordValidationSchema = Yup.object().shape({
  current_password: Yup.string()
    .required("Current password is required"),

  new_password: Yup.string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[0-9]/, "Password must include at least one number")
    .matches(/[a-z]/, "Password must include at least one lowercase letter")
    .matches(/[A-Z]/, "Password must include at least one uppercase letter")
    .matches(/[$&+,:;=?@#|'<>.^*()%!-]/, "Password must include at least one special character")
    .notOneOf([Yup.ref('current_password')], "New password cannot be the same as current password"),

  confirm_password: Yup.string()
    .required("Please confirm your new password")
    .oneOf([Yup.ref('new_password')], "Passwords must match")
});