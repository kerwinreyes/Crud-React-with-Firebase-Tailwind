import React , {useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify';

//Login script
const Login = () =>{
    const [user,setUser] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [emailError,setEmailError] = useState('');
    const [passwordError,setPasswordError] = useState('');
    const [hasAccount,setHasAccount] = useState(false);
    
    return(
        <div>
            <h2>Login</h2>
        </div>
    );
}
export default Login;