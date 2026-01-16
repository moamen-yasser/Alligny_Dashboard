import React from 'react';
import logo from '../assets/logo.svg'
import { FiEdit3 } from "react-icons/fi";

const UserLogo = () => {
return (
    <div className='w-full flex items-center gap-4 pb-8 pt-20'>
        <div className='relative'>
            <img
                src={logo}
                alt="User Avatar"
                className='w-20 h-20 rounded-full object-cover'
            />
            <div className='absolute bottom-0 right-0 bg-slate-200 p-1 rounded-full shadow-md cursor-pointer'>
                <FiEdit3 size={15} className=' text-main' />
            </div>
        </div>
        <h1 className='text-md font-semibold text-white'>Hello, QUERIUM</h1>
    </div>
);
};

export default UserLogo;
