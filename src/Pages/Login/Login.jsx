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

const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [LoginApi, { isLoading: isLoadingLogin }] = useLoginMutation();

    const {
        control,
        handleSubmit,
        setError,
        formState: { errors, isValid },
    } = useForm({
        resolver: yupResolver(LoginSchema),
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
            showNotification.success(result?.message || 'Login successful');

        } catch (err) {
            console.error('Login Failed:', err);

            if (err?.data?.errors) {
                Object.keys(err.data.errors).forEach((key) => {
                    setError(key, { type: 'manual', message: err.data.errors[key] });
                });
            } else if (err?.data?.message) {
                setError('email', { type: 'manual', message: err.data.message });
                setError('password', { type: 'manual', message: err.data.message });
            }

            showNotification.error(err || 'Login Failed');
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
                        placeholder="Enter Admin Email"
                        error={errors.email?.message}
                        label="Email"
                        login={true}
                    />

                    <PasswordInput
                        control={control}
                        name="password"
                        placeholder="Enter Admin Password"
                        error={errors.password?.message}
                        label="Password"
                    />

                    <Button
                        type="submit"
                        className={`!w-full !text-center !bg-main !text-2xl !font-bold !rounded-lg !h-12  !mt-7 !text-white ${isLoadingLogin ? "!bg-subMain !cursor-not-allowed" : "!bg-main"}`}
                        disabled={isLoadingLogin}
                        loading={isLoadingLogin}
                        loaderProps={{ type: "dots" }}
                    >
                        Login
                    </Button>
                </form>
            </Card>
        </section>
    );
};

export default Login;
