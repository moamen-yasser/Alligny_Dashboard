import { useContext } from 'react';
import { MdLogout } from 'react-icons/md';
import { AuthContext } from '../AuthContext/AuthProvider';
import { useLogoutMutation } from '../Service/Apis/authApi';
import { showNotification } from '../utils/notification';
import { Loader } from '@mantine/core';

const Logout = ({ showLabels }) => {
    const { logout } = useContext(AuthContext);
    const [logoutApi, { isLoading }] = useLogoutMutation();


    const handleLogout = async () => {
        try {
            const response = await logoutApi().unwrap();
            showNotification.success(response);
            logout();
        } catch (error) {
            showNotification.error(error);
        }
    };

    return (
        <div
            onClick={isLoading ? null : handleLogout}
            className={`flex gap-3 items-center font-medium text-lg 
            ${!showLabels ? "!min-w-[50px] !py-2 justify-center " : "!min-w-[200px] !py-3 justify-start  "} 
            mt-32 text-logout dark:text-red-500 cursor-pointer hover:!bg-logout hover:text-white transition-[width] duration-300 ease-in-out
            animate-[slideIn_0.5s_ease-out] transform-gpu rounded-lg px-4 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {isLoading ? <Loader size={24} color="red" /> : <MdLogout size={28} />} {showLabels && (isLoading ? "Logging out..." : "Logout")}
        </div>
    );
};

export default Logout;