
import * as yup from 'yup';

const LoginSchema = yup.object().shape({
    email: yup
        .string()
        .trim()
        .required('Email is required')
        .email('Please enter a valid email address'),
    password: yup
        .string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .max(32, 'Password cannot exceed 32 characters')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/\d/, 'Password must contain at least one number')
        .matches(/[@$!%*?&#]/, 'Password must contain at least one special character (@$!%*?&#)'),
});

export default LoginSchema;




