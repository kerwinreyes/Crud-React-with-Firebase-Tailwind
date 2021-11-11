import React, { useEffect, useState } from 'react';
import database from '../firebase';
import { useLocation, Link } from 'react-router-dom';
import { onValue, ref, query, equalTo, orderByChild } from '@firebase/database';
import { toast } from 'react-toastify';
const Search = () =>{
    const db = query(ref(database, 'users'), orderByChild("studID"));

    const [data,setData] = useState({});
    const useQuery = () =>{
        return new URLSearchParams(useLocation().search);
    }
    let queryy = useQuery();
    let search = queryy.get('name');
    console.log("search",search);
    useEffect(()=>{
        searchData();
    },[search]);
    const searchData = () =>{
        const studs = query(db,  equalTo(search));
        onValue(studs, (snapshot) => {
        setData({...snapshot.val()});
        });
    };
    return(
        <>
        <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="grid grid-rows-1 shadow-xl">
        <div className="grid grid-cols-5">
    
        <div class="h-14 w-44 bg-blue-400 flex items-center justify-center text-gray-50 " ></div>
        <div class="h-14 w-44 bg-blue-400 flex items-center justify-center text-gray-50 " >Student Number</div>
        <div class="h-14 w-44 bg-blue-400 flex items-center justify-center text-gray-50 ">First Name</div>
        <div class="h-14 w-44 bg-blue-400 flex items-center justify-center text-gray-50 ">Last Name</div>
        <div class="h-14 w-44 bg-blue-400 flex items-center justify-center text-gray-50 ">Section</div>
          </div>
        {
        Object.keys(data).length==0 ? <div class='h-40 flex items-center justify-center'>No Search were found</div>
        :Object.keys(data).map((id,index)=>{
            return (
        <div key={id} className="grid grid-cols-5 shadow-xl">
        <div class="h-14 w-44 bg-gray-50 flex items-center justify-center text-gray-700 " >{index+1}</div>
        <div class="h-14 w-44 bg-gray-50 flex items-center justify-center text-gray-700 " >{data[id].studID}</div>
        <div class="h-14 w-44 bg-gray-50 flex items-center justify-center text-gray-700 " >{data[id].fname}</div>
        <div class="h-14 w-44 bg-gray-50 flex items-center justify-center text-gray-700 " >{data[id].lname}</div>
        <div class="h-14 w-44 bg-gray-50 flex items-center justify-center text-gray-700 " >{data[id].section}</div>
       
        </div>
                
            )
        })}

          </div>
          </div>
          
        </>
    );
}
export default Search;