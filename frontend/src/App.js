import './App.css';
import {Routes, Route} from "react-router-dom";
import Login from "./Components/Authentication/Login";
import Signin from "./Components/Authentication/Signin";
import Homepage from './Components/Homepage/Homepage';
import ViewJournal from './Components/ViewJournal/ViewJournal';
import AddJournal from './Components/AddJournal/AddJournal';
import UpdateJournal from './Components/UpdateJournal/UpdateJournal';
import { useState } from 'react';

function App() {
  const [showModal,setShowModal]=useState(false);
  return (
    <div className="App">  
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/homepage" element={<Homepage showModal={showModal} setShowModal={setShowModal}/>}/>
      <Route path='/addJournal' element={<AddJournal showModal={showModal} setShowModal={setShowModal}/>}/>
      <Route path='/viewJournal' element={<ViewJournal/>}/>
      <Route path='/updateJournal' element={<UpdateJournal showModal={showModal} setShowModal={setShowModal}/>}/>
    </Routes>    
    </div>
  );
}

export default App;
