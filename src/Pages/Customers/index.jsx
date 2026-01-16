import { useOutletContext } from "react-router-dom";
import Breadcrumb from '../../Components/Breadcrumb';
import StudentApprove from './StudentApprove';

// Breadcrumb items
const breadcrumbItems = [
    { label: "Home", link: "/dashboard/home" },
    { label: "Students", link: "/dashboard/student" },
];

const Customers = () => {
    const { isMobileScreen, isSidebarOpen, setIsSidebarOpen } = useOutletContext();
    return (
        <>
            <Breadcrumb
                title={"Students"}
                items={breadcrumbItems}
                setIsSidebarOpen={setIsSidebarOpen}
                isSidebarOpen={isSidebarOpen}
                isMobileScreen={isMobileScreen}
            />
            <StudentApprove />
        </>
    )
}

export default Customers