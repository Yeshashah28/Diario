import axios from 'axios';
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./AddJournal.css";
import AlertBox from '../Alert/AlertBox';

const AddJournal = ({showModal,setShowModal}) => {
    const [newTitle,setNewTitle]=useState("");
    const [newDesc,setNewDesc]=useState("");
    const [newImage, setNewImage]=useState("");
    const [alert, setAlert] = useState({ message: "", show:false});
    const fileInputRef=useRef(null);
    const navigate=useNavigate();

    const handleSubmit=async()=>{
      try {
        const UserInfo=localStorage.getItem("userInfo");
       const ParsedInfo=JSON.parse(UserInfo);
       const res=await axios.post("/api/Journal/addJournal",{
        Title:newTitle,
        Description:newDesc,
        Author:ParsedInfo.user.name,
        Image:newImage,
       },{
        headers:{
          'Authorization':`Bearer ${ParsedInfo.token}`
        }
       })
       if(res.data.result===1){
         setAlert({
        message: "Entry added successfully",
        show:true,
      });
      setTimeout(() => {
        setAlert((prev) => ({ ...prev, show: false }));
        setShowModal(false);
        setNewDesc("");
        setNewTitle("");
        setNewImage("");
        navigate("/homepage");
      }, 1000);   
       }
      } catch (error) {
         setAlert({
        message: "Some error occured",
        show:true,
      });
      setTimeout(() => {
        setAlert((prev) => ({ ...prev, show: false }));
      }, 1000);   
      }
       
    }

    const handleClose=async()=>{
        setShowModal(false);
        navigate("/homepage");
    }

    const uploadPhotos=()=>{
      fileInputRef.current.click();
    }

    const onFileChange=async(event)=>{
        const file=event.target.files[0];
        if(!file){
          return
        }

        const formdata=new FormData();
        formdata.append('file',file);

        const res=await axios.post("/api/Journal/uploadPhoto",formdata,{
          headers:{
            'Content-Type':'multipart/form-data',
          }
        });

        if(res.data.result===1){
          setAlert({
        message: "Image successfully uploaded",
        show:true,
      });
      setTimeout(() => {
        setAlert((prev) => ({ ...prev, show: false }));
        setNewImage(res.data.data[0]);
      }, 1000);
        }
    }
  return (
    <div className='Homepage-container'>
        <div className='Homepage-background'></div>
        {alert.message && (
            <div className="mt-3">
              <AlertBox
                message={alert.message}
                show={alert.show}
              />
            </div>
          )}
      {showModal && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h2 style={{color:'#f5e6d391', padding:'20px'}}>New Entry</h2>
      <input
        type="text"
        placeholder="Title"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        className='newtitle'
      />
      <textarea
        placeholder="Description"
        rows="20"
        value={newDesc}
        onChange={(e) => setNewDesc(e.target.value)}
      />
      <div className="modal-buttons">
        <button onClick={handleSubmit} className='buttons'>Add</button>
        <button onClick={handleClose} className="buttons">Cancel</button>
        <input type='file' accept='image/*' onChange={onFileChange} style={{display: "none"}} ref={fileInputRef}/>
        <button onClick={uploadPhotos} className='buttons'>Add Images</button>
      </div>
    </div>
  </div>
)}

    </div>
  )
}

export default AddJournal
