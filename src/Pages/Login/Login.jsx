import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Card, Button } from '@mantine/core';
import BackgroundImage from '../../assets/loginBG.png';
import { yupResolver } from '@hookform/resolvers/yup';
import Logo from '../../assets/logo.png';
import LoginSchema from './LoginSchema';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext/AuthProvider';
import PasswordInput from '../../Forms/PasswordInput';
import TextInputField from '../../Forms/TextInputField';
import { useLoginMutation } from '../../Service/Apis/authApi';
import { showNotification } from '../../utils/notification';

import { useTranslation } from 'react-i18next';

const Login = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [LoginApi, { isLoading: isLoadingLogin }] = useLoginMutation();

    const {
        control,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(LoginSchema(t)),
        mode: 'onChange',
    });

    const onSubmit = async (data) => {
        try {
            const result = await LoginApi({ email: data?.email, password: data?.password }).unwrap();

            if (!result?.isSuccess) {
                throw { data: result };
            }

            login(result);
            navigate('/dashboard');
            showNotification.success(result || t('login_success'));

        } catch (err) {
            console.error('Login Failed:', err);

            let errorMessage = t('login_failed');

            // Helper to translate common error messages
            const getTranslatedMessage = (message) => {
                if (!message) return t('something_went_wrong');
                const msg = message.toLowerCase();
                if (msg.includes('invalid credentials') || msg.includes('password') || msg.includes('email')) {
                    return t('invalid_credentials');
                } else if (msg.includes('not found')) {
                    return t('user_not_found');
                } else if (msg.includes('disabled')) {
                    return t('account_disabled');
                }
                return message;
            };

            if (err?.data?.errors) {
                Object.keys(err.data.errors).forEach((key) => {
                    const translatedMsg = getTranslatedMessage(err.data.errors[key]);
                    setError(key, { type: 'manual', message: translatedMsg });
                });
                errorMessage = t('operation_failed'); // General message if there are specific field errors
            } else if (err?.data?.message) {
                errorMessage = getTranslatedMessage(err.data.message);
                setError('email', { type: 'manual', message: errorMessage });
                setError('password', { type: 'manual', message: errorMessage });
            }

            showNotification.error({
                data: { message: errorMessage }
            });
        }
    };

    return (
        <section
            className='flex flex-col justify-center items-center w-full h-screen space-y-1 px-2'
            style={{
                backgroundImage: `url(${BackgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <Card className='!rounded-2xl !w-full !max-w-[500px] bg-white dark:!bg-slate-900 border border-transparent dark:border-slate-800 transition-colors duration-300 shadow-xl'>
                <div className="w-full flex justify-center items-center">
                    <img src={Logo} alt="Alligny" className="!w-48 !h-48 object-contain aspect-square" />
                </div>
                <form id="loginForm" onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }} className='space-y-4'>
                    <TextInputField
                        control={control}
                        name="email"
                        placeholder={t('enter_email')}
                        error={errors.email?.message}
                        label={t('email_label')}
                        login={true}
                    />

                    <PasswordInput
                        control={control}
                        name="password"
                        placeholder={t('enter_password')}
                        error={errors.password?.message}
                        label={t('password_label')}
                    />

                    <Button
                        type="submit"
                        className={`!w-full !text-center !bg-main !text-2xl !font-bold !rounded-lg !h-12  !mt-7 !text-white ${isLoadingLogin ? "!bg-subMain !cursor-not-allowed" : "!bg-main"}`}
                        disabled={isLoadingLogin}
                        loading={isLoadingLogin}
                        loaderProps={{ type: "dots" }}
                    >
                        {t('login')}
                    </Button>
                </form>
            </Card>
        </section>
    );
};

export default Login;
