import { useState, useEffect } from 'react';

const Loader = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 5000); 
        return () => clearTimeout(timer); 
    }, []);

    return (
        <div className="flex justify-center items-center h-screen w-full" >
            {loading ? (
                <div className="loader border-solid border-8 border-zinc-100 
                    border-t-8 border-t-main w-12 h-12 rounded-full animate-spin"></div>
            ) : (
                <div></div>
            )}
        </div>
    );
};

export default Loader;
