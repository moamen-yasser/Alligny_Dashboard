import SharedTabs from '../Menu/SharedTabs';
import { useNavigate, useParams, Outlet, useLocation } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";
import Logo from '../Components/Logo';
import { PiUsersThree } from "react-icons/pi";
import { TbCloudUpload } from "react-icons/tb";
import { IoIosArrowBack } from "react-icons/io";
import { useState, useEffect } from 'react';
import { FaDesktop, FaExclamationCircle } from 'react-icons/fa';
import NavBar from '../Header/NavBar';
import { MdOutlineMedicalServices } from 'react-icons/md';

const Dashboard = () => {
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
            label: "Services",
            icon: <MdOutlineMedicalServices size={28} />,
        },
        {
            id: 2,
            value: "customers",
            label: "Customers",
            icon: <PiUsersThree size={28} />,
        },
        {
            id: 3,
            value: "videos",
            label: "Videos",
            icon: <TbCloudUpload size={28} />,
        },
    ];

    if (isMobileScreen) {
        return (
            <div
                className="h-screen w-full flex items-center justify-center px-2 bg-[#F8F8F6] dark:bg-slate-900"
            >
                <div className='flex flex-col items-center justify-center p-4 sm:p-8 bg-white dark:bg-slate-800 shadow-lg rounded-lg max-w-md mx-auto border border-transparent dark:border-slate-700'>
                    <Logo />
                    <FaDesktop size={64} className="text-gray-600 dark:text-slate-400 mt-6" />
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mt-4 text-center">
                        Please Use a Larger Screen
                    </h1>
                    <p className="text-base sm:text-lg text-gray-600 dark:text-slate-400 max-w-md mt-2 text-center">
                        This dashboard is optimized for larger screens. Please switch to a PC or tablet for the best experience.
                    </p>
                    <div className='flex items-center gap-2 mt-4'>
                        <FaExclamationCircle size={20} className="text-yellow-500" />
                        <p className="text-sm text-gray-500 dark:text-slate-500">
                            Mobile view is not supported at this time.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

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
                                ? 'fixed inset-y-0 left-0 w-[250px] z-20'
                                : isSidebarOpen
                                    ? 'w-[15.5%] min-w-[230px] relative'
                                    : 'w-[6%] min-w-[80px] relative'
                            } 
                            bg-gradient-to-b from-main to-subMain dark:bg-none dark:bg-slate-900 text-white px-2 py-6 flex flex-col justify-start items-start h-full
                            transition-all duration-300 ease-in-out
                        `}
                    >
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className={`
                                ${isMobileScreen
                                    ? 'absolute -right-12 top-4'
                                    : 'absolute -right-4 top-1/2 transform -translate-y-1/2'
                                } 
                                bg-[#F8F8F6] hover:bg-opacity-90 rounded-full p-2 cursor-pointer shadow-xl z-30
                            `}
                        >
                            <IoIosArrowBack
                                size={20}
                                className={`text-main transition-transform duration-300 ${!isSidebarOpen ? 'rotate-180' : ''}`}
                            />
                        </button>

                        <Logo showLabels={true} isSidebarOpen={isSidebarOpen} />
                        <SharedTabs
                            tabValue={currentTab}
                            onChange={(value) => {
                                navigate(`/dashboard/${value}`);
                                if (isMobileScreen) setIsSidebarOpen(false);
                            }}
                            tabValues={tabValues}
                            orientation={isSmallScreen ? "horizontal" : "vertical"}
                            defaultValue={"home"}
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
                    />
                    <div
                        className={
                            `flex-1 w-full overflow-y-auto bg-[#F8F8F6] dark:bg-slate-800 transition-all duration-300 ease-in-out px-6 pb-8`
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