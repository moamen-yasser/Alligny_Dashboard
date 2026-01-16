import { useEffect, useState } from 'react'
import logo from '../assets/loadingLogo.svg'

const Loading = () => {
const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 10000); 
        return () => clearTimeout(timer); 
    }, []);

    return (
        <div className="flex justify-center items-center h-screen w-full ">
            {loading && (
                <img
                    src={logo}
                    alt="Querium Logo"
                    className={`animate-pulse w-full h-full`}
                />
            )}
        </div>
    )
}

export default Loading
