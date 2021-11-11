import React, { useEffect, useState } from 'react';
import database from '../firebase';
import { useLocation, Link } from 'react-router-dom';
import { onValue, ref, query, equalTo, orderByChild,remove } from '@firebase/database';
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
    const onDelete = (id) =>{
        const dbDel = ref(database, `users/${id}`);
    
            if(window.confirm("Are you sure that you wanted to delete?")){
                remove(dbDel);
                toast.success("Student Deleted Successfully");
    
            }
        }
    return(
        <>
        <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="grid grid-rows-1 shadow-xl">
        <div className="grid grid-cols-6">
    
        <div class="h-14 w-44 bg-blue-400 flex items-center justify-center text-gray-50 " ></div>
        <div class="h-14 w-44 bg-blue-400 flex items-center justify-center text-gray-50 " >Student Number</div>
        <div class="h-14 w-44 bg-blue-400 flex items-center justify-center text-gray-50 ">First Name</div>
        <div class="h-14 w-44 bg-blue-400 flex items-center justify-center text-gray-50 ">Last Name</div>
        <div class="h-14 w-44 bg-blue-400 flex items-center justify-center text-gray-50 ">Section</div>
        <div class="h-14 w-44 bg-blue-400 flex items-center justify-center text-gray-50 ">Action</div>
          </div>
        {
        Object.keys(data).length==0 ? <div class='h-40 flex items-center justify-center'>No Search were found</div>
        :Object.keys(data).map((id,index)=>{
            return (
        <div key={id} className="grid grid-cols-6 shadow-xl">
        <div class="h-14 w-44 bg-gray-50 flex items-center justify-center text-gray-700 " >{index+1}</div>
        <div class="h-14 w-44 bg-gray-50 flex items-center justify-center text-gray-700 " >{data[id].studID}</div>
        <div class="h-14 w-44 bg-gray-50 flex items-center justify-center text-gray-700 " >{data[id].fname}</div>
        <div class="h-14 w-44 bg-gray-50 flex items-center justify-center text-gray-700 " >{data[id].lname}</div>
        <div class="h-14 w-44 bg-gray-50 flex items-center justify-center text-gray-700 " >{data[id].section}</div>
        <div class="h-14 w-44 bg-gray-50 flex items-center justify-center text-gray-700 " >
            <Link to={`/update/${id}`}>
                <button className="block cursor-pointer bg-blue-500 p-2 rounded-lg text-white font-bold hover:bg-blue-800">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                 </button>
                </Link>|  
                <button onClick={() =>onDelete(id)} className="block p-2 cursor-pointer bg-red-500 rounded-lg text-white font-bold hover:bg-red-800">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>

            </div>
        </div>
                
            )
        })}

          </div>
          </div>
          
        </>
    );
}
export default Search;