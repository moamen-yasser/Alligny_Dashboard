import SharedTabs from '../Menu/SharedTabs';
import { useNavigate, useParams, Outlet, useLocation } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";
import Logo from '../Components/Logo';
import { IoIosArrowBack } from "react-icons/io";
import { useState, useEffect } from 'react';
import { FaDesktop, FaExclamationCircle } from 'react-icons/fa';
import NavBar from '../Header/NavBar';
import { HiOutlineBell, HiOutlineSquaresPlus, HiOutlineUsers, HiOutlineVideoCamera, HiOutlineXMark } from 'react-icons/hi2';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir() === "rtl";
    const { tabValue } = useParams();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    // Determine currentTab from path if tabValue is not available
    const currentTab = tabValue || pathname.split('/').pop();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const isSmallScreen = useMediaQuery("(max-width: 1350px)");
    const isMobileScreen = useMediaQuery("(max-width: 768px)");

    useEffect(() => {
        if (isSmallScreen && !isMobileScreen) {
            setIsSidebarOpen(false);
        } else {
            setIsSidebarOpen(true);
        }
    }, [isSmallScreen, isMobileScreen]);

    const tabValues = [
        {
            id: 1,
            value: "services",
            label: t('services'),
            icon: <HiOutlineSquaresPlus size={28} />,
        },
        {
            id: 2,
            value: "customers",
            label: t('customers'),
            icon: <HiOutlineUsers size={28} />,
        },
        {
            id: 3,
            value: "videos",
            label: t('videos'),
            icon: <HiOutlineVideoCamera size={28} />,
        },
        {
            id: 4,
            value: "notifications",
            label: t('notifications'),
            icon: <HiOutlineBell size={28} />,
        },
    ];

    // Remove the mobile block and let the dashboard render
    // Adjust sidebar state for mobile
    useEffect(() => {
        if (isMobileScreen) {
            setIsSidebarOpen(false);
        } else if (isSmallScreen) {
            setIsSidebarOpen(false);
        } else {
            setIsSidebarOpen(true);
        }
    }, [isMobileScreen, isSmallScreen]);

    return (
        <div className="h-screen w-full overflow-hidden">
            {isMobileScreen && isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-10"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Main layout */}
            <div className="w-full flex h-full">

                {(!isMobileScreen || (isMobileScreen && isSidebarOpen)) && (
                    <div
                        className={`
                            ${isMobileScreen
                                ? `fixed inset-y-0 ${isRTL ? 'right-0' : 'left-0'} w-[250px] z-20`
                                : isSidebarOpen
                                    ? 'w-[15.5%] min-w-[230px] relative'
                                    : 'w-[6%] min-w-[80px] relative'
                            } 
                            bg-gradient-to-b from-main to-subMain dark:bg-none dark:bg-slate-900 text-white px-2 py-6 flex flex-col justify-start items-start h-full
                            transition-all duration-300 ease-in-out
                        `}
                    >
                        {isMobileScreen && (
                            <button
                                onClick={() => setIsSidebarOpen(false)}
                                className={`
                                    absolute top-4 ${isRTL ? 'left-4' : 'right-4'}
                                    text-white hover:text-gray-200 transition-colors
                                    p-1 cursor-pointer z-50
                                `}
                            >
                                <HiOutlineXMark size={28} />
                            </button>
                        )}
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className={`
                                absolute top-1/2 transform -translate-y-1/2 z-30
                                ${isRTL ? '-left-4' : '-right-4'}
                                bg-[#F8F8F6] dark:bg-slate-800 hover:bg-opacity-90 transition-all duration-300
                                rounded-full p-2 cursor-pointer shadow-xl hidden md:flex items-center justify-center
                            `}
                        >
                            <IoIosArrowBack
                                size={20}
                                className={`text-main transition-transform duration-300 ${isRTL
                                    ? isSidebarOpen ? 'rotate-180' : 'rotate-0'
                                    : isSidebarOpen ? 'rotate-0' : 'rotate-180'
                                    }`}
                            />
                        </button>

                        <Logo showLabels={true} isSidebarOpen={isSidebarOpen} />
                        <SharedTabs
                            tabValue={currentTab}
                            onChange={(value) => {
                                setSearchQuery("");
                                navigate(`/dashboard/${value}`);
                                if (isMobileScreen) setIsSidebarOpen(false);
                            }}
                            tabValues={tabValues}
                            orientation={isSmallScreen ? "horizontal" : "vertical"}
                            defaultValue={"services"}
                            color={"#fff"}
                            variant={"pills"}
                            isSmallScreen={isSmallScreen}
                            showLabels={isSidebarOpen || isMobileScreen}
                        />
                    </div>
                )}

                <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                    <NavBar
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        setIsSidebarOpen={setIsSidebarOpen}
                        isSidebarOpen={isSidebarOpen}
                    />
                    <div
                        className={
                            `flex-1 w-full overflow-y-auto bg-[#F8F8F6] dark:bg-slate-800 transition-all duration-300 ease-in-out p-2 md:p-6`
                        }
                    >
                        <Outlet context={{ setIsSidebarOpen, isSidebarOpen, isMobileScreen, searchQuery }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;