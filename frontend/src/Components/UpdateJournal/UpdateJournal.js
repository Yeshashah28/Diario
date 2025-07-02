import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import AlertBox from '../Alert/AlertBox';

const UpdateJournal = ({showModal,setShowModal}) => {
    const [newTitle,setNewTitle]=useState("");
    const [newDesc,setNewDesc]=useState("");
    const [newImage, setNewImage]=useState("");
    const [alert, setAlert] = useState({ message: "", show:false});
    const fileInputRef=useRef(null);
    const navigate=useNavigate();
    const location=useLocation();
    const entry=location.state?.entry;
    const UserInfo=JSON.parse(localStorage.getItem("userInfo"));

    useEffect(()=>{
        setNewTitle(entry.title);
        setNewDesc(entry.description);
        setNewImage(entry.image);
    },[]);

    const handleSubmit=async ()=>{
        
        const res=await axios.put("/api/Journal/updateJournal",{
            Id:entry.id,
            Title:newTitle,
            Description:newDesc,
            Author:UserInfo.user.name,
            Image:newImage,
        },{
          headers:{
            'Authorization':`Bearer ${UserInfo.token}`
          }
        })
        if(res.data.result===1){
           setAlert({
        message: "Entry successfully updated",
        show:true,
      });
      setTimeout(() => {
        setAlert((prev) => ({ ...prev, show: false }));
        setShowModal(false);
            setNewTitle("");
            setNewDesc("");
            setNewImage("");
            navigate("/homePage");
      }, 1000);
        }
    }

    const handleClose=()=>{
        setShowModal(false);
        navigate("/homePage");
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
      <h2 style={{color:'#f5e6d391', padding:'20px'}}>Update Entry</h2>
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
        <button onClick={handleSubmit} className='buttons'>Update</button>
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

export default UpdateJournal
