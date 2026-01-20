import { useState } from "react";
import SearchInput from "../Components/SearchInput";
import { MdOutlineLightMode, MdOutlineDarkMode, MdWavingHand } from "react-icons/md";
import { RiLockPasswordLine, RiGlobalLine } from "react-icons/ri";
import { HiMenuAlt2 } from "react-icons/hi";
import { ActionIcon, Tooltip, Avatar, Menu, Loader } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useTheme } from "../Context/ThemeContext";
import { useLanguage } from "../Context/LanguageContext";
import { useTranslation } from "react-i18next";
import ChangePasswordForm from "../Components/ChangePasswordForm";
import { useLogoutMutation } from "../Service/Apis/authApi";
import { useContext } from "react";
import { showNotification } from "../utils/notification";
import { AuthContext } from "../AuthContext/AuthProvider";


const NavBar = ({ setSearchQuery, searchQuery, setIsSidebarOpen, isSidebarOpen }) => {
    // Local state for UI toggles
    const { isDarkMode, toggleTheme } = useTheme();
    const { language, changeLanguage } = useLanguage();
    const { t, i18n } = useTranslation();
    const [opened, { open, close }] = useDisclosure(false);
    const { logout } = useContext(AuthContext);
    const [logoutApi, { isLoading: isLogoutLoading }] = useLogoutMutation();


    // Safe handlers
    const handleSearch = (e) => {
        if (setSearchQuery) setSearchQuery(e.target.value);
    };

    const handleClear = () => {
        if (setSearchQuery) setSearchQuery("");
    };

    const toggleLanguage = () => {
        changeLanguage(language === 'en' ? 'ar' : 'en');
    };

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
        <nav className="w-full h-20 bg-white dark:bg-slate-900 shadow-smoothCard flex justify-between items-center px-4 md:px-8 z-10 sticky top-0">
            {/* LEFT: Menu Toggle & Greeting */}
            <div className="flex items-center gap-2 md:gap-4">
                <div className="md:hidden">
                    <ActionIcon
                        variant="subtle"
                        size="lg"
                        className="!text-main dark:!text-white"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        <HiMenuAlt2 size={24} />
                    </ActionIcon>
                </div>

                <div className="hidden md:flex flex-col justify-center animate-[fadeIn_0.5s_ease-in]">
                    <h1 className="text-xl font-extrabold flex items-center gap-2">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-main to-subMain whitespace-nowrap">
                            {t('welcome')}
                        </span>
                        <MdWavingHand className="text-subMain animate-pulse" size={24} />
                    </h1>
                </div>
            </div>

            {/* CENTER: Search Bar */}
            <div className="flex-1 max-w-md mx-2 md:mx-4 animate-[slideIn_0.5s_ease-out]">
                <SearchInput
                    value={searchQuery || ""}
                    onChange={handleSearch}
                    onClear={handleClear}
                    placeholder={t('search')}
                    className="w-full shadow-sm transition-shadow duration-300"
                />
            </div>

            {/* RIGHT: Action Group */}
            <div className="flex items-center gap-1 md:gap-3 animate-[fadeIn_0.5s_ease-in]">

                <div className="hidden md:flex items-center gap-3">
                    {/* Language Toggle */}
                    <Tooltip label={language === 'en' ? t('switch_to_arabic') : t('switch_to_english')} withArrow transitionProps={{ duration: 200 }} position="bottom">
                        <ActionIcon
                            variant="subtle"
                            size="lg"
                            radius="md"
                            onClick={toggleLanguage}
                            className="!w-16 !bg-gray/10 dark:!bg-white/10 !text-textSecondColor dark:!text-white hover:!bg-main hover:!text-white !transition-all !duration-300"
                        >
                            <div className="flex items-center gap-1 font-bold text-xs uppercase">
                                <RiGlobalLine size={18} />
                                <span className="dark:text-white uppercase">{language}</span>
                            </div>
                        </ActionIcon>
                    </Tooltip>

                    {/* Theme Toggle */}
                    <Tooltip label={isDarkMode ? t('light_mode') : t('dark_mode')} withArrow transitionProps={{ duration: 200 }} position="bottom">
                        <ActionIcon
                            variant="subtle"
                            size="lg"
                            radius="md"
                            onClick={toggleTheme}
                            className="!bg-gray/10 dark:!bg-white/10 !text-textSecondColor dark:!text-white hover:!bg-main hover:!text-white !transition-all !duration-300"
                        >
                            {isDarkMode ? <MdOutlineLightMode size={20} /> : <MdOutlineDarkMode size={20} />}
                        </ActionIcon>
                    </Tooltip>

                    {/* Change Password */}
                    <Tooltip label={t('change_password')} withArrow transitionProps={{ duration: 200 }} position="bottom">
                        <ActionIcon
                            variant="subtle"
                            size="lg"
                            radius="md"
                            onClick={open}
                            className="!bg-gray/10 dark:!bg-white/10 !text-textSecondColor dark:!text-white hover:!bg-main hover:!text-white !transition-all !duration-300"
                        >
                            <RiLockPasswordLine size={20} />
                        </ActionIcon>
                    </Tooltip>

                    {/* Vertical Divider */}
                    <div className="h-8 w-[1px] bg-gray/20 dark:bg-white/20 mx-1"></div>
                </div>

                {/* Admin Profile */}
                <Menu shadow="md" width={200} transitionProps={{ transition: i18n.dir() === 'rtl' ? 'pop-top-left' : 'pop-top-right' }}>
                    <Menu.Target>
                        <div className="flex items-center gap-3 cursor-pointer p-1 rounded-xl hover:bg-gray/5 transition-colors duration-300">
                            <Avatar
                                src={null}
                                alt={t('admin')}
                                radius="xl"
                                size="md"
                                className="!bg-gradient-to-tr !from-main !to-subMain !text-white !font-bold"
                                styles={{ placeholder: { color: 'white' } }}
                            >
                                {t('admin_initials')}
                            </Avatar>
                            <div className="hidden sm:flex flex-col items-start leading-tight">
                                <span className="text-sm font-bold text-textSecondColor dark:text-white">{t('admin')}</span>
                                <span className="text-[10px] text-gray dark:text-gray-400 font-medium whitespace-nowrap">admin@Alligny.com</span>
                            </div>
                        </div>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <div className="md:hidden">
                            <Menu.Item
                                onClick={toggleLanguage}
                                leftSection={<RiGlobalLine size={16} />}
                            >
                                {language === 'en' ? t('switch_to_arabic') : t('switch_to_english')}
                            </Menu.Item>
                            <Menu.Item
                                onClick={toggleTheme}
                                leftSection={isDarkMode ? <MdOutlineLightMode size={16} /> : <MdOutlineDarkMode size={16} />}
                            >
                                {isDarkMode ? t('light_mode') : t('dark_mode')}
                            </Menu.Item>
                            <Menu.Item
                                onClick={open}
                                leftSection={<RiLockPasswordLine size={16} />}
                            >
                                {t('change_password')}
                            </Menu.Item>
                            <Menu.Divider />
                        </div>
                        <Menu.Item
                            color="red"
                            onClick={handleLogout}
                            disabled={isLogoutLoading}
                            leftSection={isLogoutLoading ? <Loader size={14} color="red" /> : null}
                        >
                            {isLogoutLoading ? t('logging_out') : t('logout')}
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </div>

            {/* Change Password Modal */}
            <ChangePasswordForm opened={opened} close={close} />
        </nav>
    );
};

export default NavBar;