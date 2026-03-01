import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { useSelector,useDispatch } from "react-redux";
import { logout } from "./slices/AuthSlices";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "./slices/AuthSlices";
import { useEffect } from "react";
import { set } from "mongoose";
import About from "./pages/About";
import PrivateRoute from "./components/PrivateRoute";


export default function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  useEffect(()=>{
    if(localStorage.getItem('token')){ 
      dispatch(fetchUser())
  }
  },[])
  if(localStorage.getItem('token')&& !isLoggedIn){
    return <p>Loading...</p>
  }
  return (
    <>
      <nav>
        <ul>
          {isLoggedIn&&<li><Link to="/">Home</Link></li>}
          {!isLoggedIn && <li><Link to="/login">Login</Link></li>}
          {!isLoggedIn && <li><Link to="/register">Register</Link></li>}
          {<li><Link to="/contact">Contact</Link></li>}
          {isLoggedIn && <li><Link to="/dashboard">Dashboard</Link></li>}
          {isLoggedIn && <li><Link to="/about">About</Link></li>}
          {isLoggedIn && <li><Link to="/login" onClick={()=>{
            localStorage.removeItem("token");
            dispatch(logout())
          }}>LogOut</Link></li>}
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard  user={user} />
          </PrivateRoute>
        } />
      </Routes>
    </>
  );
}