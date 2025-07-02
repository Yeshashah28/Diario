import React from 'react';
import "./NavBar.css";
import {useNavigate} from "react-router-dom";

const Navbar = ({setShowModal}) => {
  const navigate=useNavigate();
  const onAdd=async()=>{
    setShowModal(true);
    navigate("/addJournal");
  }
  const onView=async()=>{
    navigate("/ViewJournal");
  }
  const onLogout=async()=>{
    localStorage.removeItem('userInfo');
    navigate("/");
  }
  return (
    <nav className="custom-navbar">
      <div className="navbar-container">
        <button onClick={onAdd} className="buttons"> + Add </button>
        <div>
           <button onClick={onView} className="buttons"> View </button>
           <button onClick={onLogout} className='buttons'>Log out</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
