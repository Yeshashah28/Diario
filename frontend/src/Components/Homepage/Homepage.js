import React, { useEffect, useState } from 'react'
import "./Homepage.css"
import Navbar from '../NavBar/NavBar';
import axios from 'axios';
import {FaEdit, FaTrash} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import AlertBox from '../Alert/AlertBox';
import InfiniteScroll from "react-infinite-scroll-component";

const Homepage = ({showModal,setShowModal}) => {
    const [entries,setEntries]=useState([]);
const [page, setPage] = useState(1);
const [hasMore, setHasMore] = useState(true);
    const [view,setView]=useState();
    const [selectedIndex,setSelectedIndex]=useState('');
    const [alert, setAlert] = useState({ message: "", show:false});
    const navigate=useNavigate();
    const UserInfo=localStorage.getItem("userInfo");
    const ParsedInfo=JSON.parse(UserInfo);

       const fetchentries=async()=>{
        if(!hasMore) return;
         try {
          const res=await axios.post("/api/Journal/GetAllJournals",{
            Id:ParsedInfo.user.Id,
            Email:ParsedInfo.user.email,
            Name:ParsedInfo.user.name,
            Page:page,
           Offset:5},{
            headers:{
              'Authorization':`Bearer ${ParsedInfo.token}`
            }
           });
           const newentries=res.data.data.data;
         setEntries((prev)=>
        {
          const existingid=new Set(prev.map((entry)=>entry.id));
          const uniqueentries=newentries.filter((entry)=>!existingid.has(entry.id));
          return [...prev,...uniqueentries];
        });

         const IsLastPage=page>=res.data.data.totalpages;
         setHasMore(!IsLastPage);
         setPage((prev)=>prev+1);
         } catch (error) {
          if(error.response.status===401){
            localStorage.removeItem('userInfo');
            navigate("/")
          }
         }
         
    };

      useEffect(()=>{
        if (!UserInfo) {
         navigate("/");
        }else{
        fetchentries();
        }
      },[])

    const handleUpdate=(entry)=>{
      setShowModal(true);
      navigate("/updateJournal", {state:{entry}});
    }
    const handleDelete=async(id)=>{
      try {
         const res=await axios.delete(`/api/Journal/deleteJournal/${id}`,{
        id
      },{
            headers:{
              'Authorization':`Bearer ${ParsedInfo.token}`
            }
           });
      if(res.data.result===1){
         setAlert({
        message: "Entry successfully deleted",
        show:true,
      });
      setEntries((prev)=>prev.filter(x=>x.id!==id));
      setTimeout(() => {
        setAlert((prev) => ({ ...prev, show: false }));
      }, 1000); 
      }
      } catch (error) {
        if(error.response.status===401){
            localStorage.removeItem('userInfo');
            navigate("/")
          }
      }
     
    }

    const toggleToolKit=(index)=>{
      setSelectedIndex((prev)=>(prev===index?null:index));
    }

  return (
    <div className='Homepage-container'>
      <Navbar view={view} setView={setView} setShowModal={setShowModal}/>
       {alert.message && (
            <div className="mt-3">
              <AlertBox
                message={alert.message}
                show={alert.show}
              />
            </div>
          )}
     <div className="Homepage-background"></div>
     <div className='Journal-entries'>
       <InfiniteScroll
  dataLength={entries.length}
  next={fetchentries}
  hasMore={hasMore}
  loader={<h4>Loading more...</h4>}
  endMessage={<p style={{ textAlign: "center" }}>No more entries</p>}
>
       {entries.length>0?(entries.map((entry,index)=>(
        <div className={`entries-container ${selectedIndex===index?'selected':''}`} key={entry.id} onClick={()=>toggleToolKit(index)}>
        <div className='each-entry'>
        <div className='heading'>
          <div><h1 className='entry-title'>{entry.title}</h1></div>
          <div style={{display:'flex', flexDirection:'column', justifyContent:'center'}}><h6 style={{fontFamily:'Vivaldi'}}>{new Date(entry.createdAt).toLocaleDateString()}</h6></div>
          </div>
        
        <div className='entry-description'>{entry.description.length>200?entry.description.slice(0,200)+'...':entry.description}</div>
        </div>
        <div className={`toolkit-drawer ${selectedIndex === index ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
                <FaEdit className="tool-icon" onClick={()=>handleUpdate(entry)} />
                <FaTrash className="tool-icon" onClick={()=>handleDelete(entry.id)} />
              </div>
        </div>
       ))):(<p>"no entries found"</p>)}
             </InfiniteScroll>
      </div>
    </div>
  )
}

export default Homepage
