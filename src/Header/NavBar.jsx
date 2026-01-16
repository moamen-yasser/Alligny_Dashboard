import { useState } from "react";
import SearchInput from "../Components/SearchInput";
import { MdOutlineLightMode, MdOutlineDarkMode, MdWavingHand } from "react-icons/md";
import { RiLockPasswordLine, RiGlobalLine } from "react-icons/ri";
import { ActionIcon, Tooltip, Avatar, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useTheme } from "../Context/ThemeContext";
import ChangePasswordForm from "../Components/ChangePasswordForm";

const NavBar = ({ setSearchQuery, searchQuery }) => {
    // Local state for UI toggles
    const { isDarkMode, toggleTheme } = useTheme();
    const [lang, setLang] = useState('en');
    const [opened, { open, close }] = useDisclosure(false);

    // Safe handlers
    const handleSearch = (e) => {
        if (setSearchQuery) setSearchQuery(e.target.value);
    };

    const handleClear = () => {
        if (setSearchQuery) setSearchQuery("");
    };

    return (
        <nav className="w-full h-20 bg-white dark:bg-slate-900 shadow-smoothCard flex justify-between items-center px-8 z-10 sticky top-0">
            {/* LEFT: Greeting / Context */}
            <div className="flex flex-col justify-center animate-[fadeIn_0.5s_ease-in]">
                <h1 className="text-xl font-extrabold flex items-center gap-2">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-main to-subMain">
                        Welcome back!
                    </span>
                    <MdWavingHand className="text-subMain animate-pulse" size={24} />
                </h1>
            </div>

            {/* CENTER: Search Bar */}
            <div className="w-1/3 hidden md:block animate-[slideIn_0.5s_ease-out]">
                <SearchInput
                    value={searchQuery || ""}
                    onChange={handleSearch}
                    onClear={handleClear}
                    placeholder="Search anything here..."
                    className="w-full shadow-sm transition-shadow duration-300"
                />
            </div>

            {/* RIGHT: Action Group */}
            <div className="flex items-center gap-3 animate-[fadeIn_0.5s_ease-in]">

                {/* Language Toggle */}
                <Tooltip label={lang === 'en' ? "Switch to Arabic" : "Switch to English"} withArrow transitionProps={{ duration: 200 }} position="bottom">
                    <ActionIcon
                        variant="subtle"
                        size="lg"
                        radius="md"
                        onClick={() => setLang(l => l === 'en' ? 'ar' : 'en')}
                        className="!w-16 !bg-gray/10 dark:!bg-white/10 !text-textSecondColor dark:!text-white hover:!bg-main hover:!text-white !transition-all !duration-300"
                    >
                        <div className="flex items-center gap-1 font-bold text-xs uppercase">
                            <RiGlobalLine size={18} />
                            <span className="dark:text-white">{lang}</span>
                        </div>
                    </ActionIcon>
                </Tooltip>

                {/* Theme Toggle */}
                <Tooltip label={isDarkMode ? "Light Mode" : "Dark Mode"} withArrow transitionProps={{ duration: 200 }} position="bottom">
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
                <Tooltip label="Change Password" withArrow transitionProps={{ duration: 200 }} position="bottom">
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

                {/* Admin Profile */}
                <Menu shadow="md" width={200} transitionProps={{ transition: 'pop-top-right' }}>
                    <Menu.Target>
                        <div className="flex items-center gap-3 cursor-pointer p-1 rounded-xl hover:bg-gray/5 transition-colors duration-300">
                            <Avatar
                                src={null}
                                alt="Admin"
                                radius="xl"
                                size="md"
                                className="!bg-gradient-to-tr !from-main !to-subMain !text-white !font-bold"
                                styles={{ placeholder: { color: 'white' } }}
                            >
                                AD
                            </Avatar>
                            <div className="hidden lg:flex flex-col items-start leading-tight">
                                <span className="text-sm font-bold text-textSecondColor dark:text-white">Admin</span>
                                <span className="text-[10px] text-gray dark:text-gray-400 font-medium">admin@Alligny.com</span>
                            </div>
                        </div>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item color="red">Logout</Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </div>

            {/* Change Password Modal */}
            <ChangePasswordForm opened={opened} close={close} />
        </nav>
    );
};

export default NavBar;