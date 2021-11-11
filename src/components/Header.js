import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";

const Header = ({logout}) =>{
    const [activeTab, setActiveTab]= useState("Home")
    return(
        <nav className="flex justify-between items-center h-16 bg-white text-black relative font-sans">
        <Link to='/home' className='pl-8'> Admin Panel</Link>
            <div className="px-4 cursor-pointer md:hidden">
            <svg 
            class="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" 
                stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </div>
        <div className="pr-8 md:block hidden text-gray-400">
            <Link className="p-4 hover:text-gray-700 active:text-gray-700" to="/home">
                HOME</Link>
            <Link className="p-4 hover:text-gray-700 active:text-gray-700" to="/add">
                CREATE
                </Link>
        <button className="p-4 hover:text-gray-700 active:text-gray-700" onClick={logout}> SIGN OUT </button>
       
        </div>
        </nav>
    );
}

export default Header;