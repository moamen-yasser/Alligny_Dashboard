import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'

const Logo = ({ showLabels = false, isSidebarOpen = false }) => {
    const navigate = useNavigate();
    return (
        <div
            className={`w-full flex items-center gap-2 cursor-pointer justify-center`}
            onClick={() => navigate('/dashboard')}
        >
            <div className={`${!showLabels ? "w-56 h-56 object-fit" : `w-16 h-16 lg:w-24 lg:h-24 ${!isSidebarOpen ? "rounded-lg" : "rounded-full"} bg-white p-2`} 
            transition-[all] duration-300 ease-in-out animate-[slideIn_0.5s_ease-out] transform-gpu`}>
                <img src={logo} alt="Alligny" className='w-full h-full object-contain' />
            </div>
            {showLabels && isSidebarOpen && (
                <div className='animate-[fadeIn_0.5s_ease-in]'>
                    <h1 className='text-xl font-bold dark:text-white'>Alligny</h1>
                    <p className='text-xs font-normal dark:text-gray-300'>let’s start the journey.</p>
                </div>
            )}
        </div>
    )
}

export default Logo
