import React,{useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {toast} from "react-toastify";
import database from '../firebase';
import { getDatabase, ref, push, set,onValue } from "firebase/database";
const initialState = {
    fname: "",
    lname:"",
    studID :"",
    section: "",
}

const AddEdit = () =>{
    const db = ref(database, 'users');

    const [state, setState] = useState(initialState);
    const [data, setData] = useState({});
    const {fname,lname, studID,section} = state;
    const history = useHistory();
    const {id} = useParams();
    useEffect(()=>{
        const studs = db;
        onValue(studs, (snapshot) => {
        setData({...snapshot.val()});
        });
    },[id]); 
    useEffect(()=> {
        if(id){
            setState({...data[id]});
        }else{
            setState({...initialState});

        }
        return ()=>{
            setState({...initialState});
        }
    },[id,data]);
    const handleInputChange= (e)=>{
        const {name, value} = e.target;
        setState({...state,[name]:value});
    };
    const handleSubmit= (e)=>{
        e.preventDefault();

        if(!fname || !lname || !studID || !section){
            toast.error("Please provide value in each field");
        }
        else{
            if(!id){
                const db = ref(database, 'users');

                const adb = push(db);
                set(adb,{
                    fname: state.fname,
                    lname: state.lname,
                    section: state.section,
                    studID: state.studID,
                });
                toast.success("Student Created Successfully");
                setTimeout(()=> history.push("/home"),500);
            }else{
                const db = ref(database, `users/${id}`);

                const adb = push(db);
                set(db,{
                    fname: state.fname,
                    lname: state.lname,
                    section: state.section,
                    studID: state.studID,
                });
                toast.success("Student Updated Successfully");
                setTimeout(()=> history.push("/home"),500);   
            }
         
        }
    };
    return(
        <>
          <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="bg-white p-10 rounded shadow-2xl w-4/5 md:w-1/2">
        <h2 className="text-lg md:text-2xl font-bold mb-4 text-blue-500">{id ? "Update Student" :"Create Student"}</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
                <label for="fname" className="block mb-2 font-bold text-gray-500 text-left">First Name:</label>
                <input type="text" id="fname" name="fname" value={fname || ""} onChange={handleInputChange} placeholder="Enter your input here" className="w-full border border-gray-400 p-3 rounded-lg outline-none focus:border-blue-500"></input>
            </div>
            <div>
                <label for="fname" className="block mb-2 font-bold text-gray-500 text-left">Last Name:</label>
                <input type="text" id="lname" name="lname" value={lname || ""} onChange={handleInputChange} placeholder="Enter your input here" className="w-full border border-gray-400 p-3 rounded-lg outline-none focus:border-blue-500"></input>
            </div>
            <div>
                <label for="studID" className="block mb-2 font-bold text-gray-500 text-left">Student Number:</label>
                <input type="text" id="studID" name="studID" value={studID || ""} onChange={handleInputChange} placeholder="Enter your input here" className="w-full border border-gray-400 p-3 rounded-lg outline-none focus:border-blue-500"></input>
            </div>
            <div>
                <label for="section" className="block mb-2 font-bold text-gray-500 text-left">Section:</label>
                <input type="text" id="section" name="section" value={section || ""} onChange={handleInputChange} placeholder="Enter your input here" className="w-full border border-gray-400 p-3 rounded-lg outline-none focus:border-blue-500"></input>
            </div>
            <input type="submit" value={id ? "Update Student" :"Create Student"} className="block w-full cursor-pointer bg-blue-500 p-4 rounded-lg text-white font-bold hover:bg-blue-800 animate-pulse transition duration-300" />
        </form>
        </div>
    </div>    
        </>
    );
}

export default AddEdit;