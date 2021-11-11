
import './App.css';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {useHistory, useParams} from 'react-router-dom';
import Home from './pages/home';
import AddEdit from './pages/AddEdit';
import View from './pages/View';
import Search from './pages/search';
import auth from './firebase-config';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import { signInWithEmailAndPassword, signOut,onAuthStateChanged } from "firebase/auth";
import { useState } from 'react';
import { fireEvent } from '@testing-library/dom';

function App() {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      toast.success("Login Successful");
      setTimeout(()=> history.push("/home"),500);   

      console.log(user);
    } catch (error) {
      toast.warn("Invalid Email or Password");

    }
  };

  const logout = async () => {
    await signOut(auth);
    setTimeout(()=> history.push("/"),500);   

  };
    
  return (
   <div>
      <div className="App">
       { user?.email == null ? "" : <Header  logout={logout} /> }
        <ToastContainer position="top-center" />
        <Switch>
    <Route exact path='/'>
    { user?.email == null ? 

    <div className="min-h-screen flex items-center justify-center bg-white ">
        <div className="bg-white p-10 rounded shadow-2xl w-4/5 md:w-1/2 space-y-6">
        <h2 className="text-lg md:text-2xl font-bold mb-4 text-blue-500">Admin Login</h2>
            <div>
                <label for="email" className="block mb-2 font-bold text-gray-500 text-left">Email:</label>
                <input type="text" onChange={(event) => {
            setEmail(event.target.value);
          }} id="email" name="email" placeholder="Enter Email Address" className="w-full border border-gray-400 p-3 rounded-lg outline-none focus:border-blue-500"></input>
            </div>
            <div>
                <label for="name" className="block mb-2 font-bold text-gray-500 text-left">Password:</label>
                <input type="password" onChange={(event) => {
            setPassword(event.target.value);
          }} id="password" name="pasword" placeholder="Enter password" className="w-full border border-gray-400 p-3 rounded-lg outline-none focus:border-blue-500"></input>
            </div>

            <button onClick={login} className="block w-full cursor-pointer bg-blue-500 p-4 rounded-lg text-white font-bold hover:bg-blue-900 animate-bounce transition duration-300">Login</button>
        </div>
    </div>:
           <Home/>
          }
    </Route>
 
    <Route exact path='/home'>
      <Home/>
    </Route>
    <Route exact path='/add'>
      <AddEdit/>
    </Route>
    <Route exact path='/update/:id'>
      <AddEdit/>
    </Route>
    <Route exact path='/view/:id'>
      <View/>
    </Route>
    <Route exact path='/search'>
      <Search/>
    </Route>
    </Switch>
      </div>
   </div>
  );
}

export default App;

