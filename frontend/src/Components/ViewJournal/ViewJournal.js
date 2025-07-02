import React, { useEffect, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import JournalPage from "../JournalPage/JournalPage";
import "./ViewJournal.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewJournal = () => {
  const [journalEntries, setJournalEntries] = useState([]);
  const [author, setAuthor] = useState("");
  const navigate=useNavigate();

  useEffect(() => {
    const fetchEntries = async () => {
      const UserInfo = localStorage.getItem("userInfo");
      const ParsedInfo = JSON.parse(UserInfo);
      const res = await axios.post("/api/Journal/GetAllJournals", {
        Id: ParsedInfo.user.Id,
        Email: ParsedInfo.user.email,
        Name: ParsedInfo.user.name,
      },{
        headers:{
          'Authorization':`Bearer ${ParsedInfo.token}`
        }
      });
      setJournalEntries(res.data.data.data);
      setAuthor(ParsedInfo.user.name);
    };
    fetchEntries();
  }, []);

  const pages = [
    <div key="cover-front" className="page cover-page">
      <h1 className="journal-name" style={{ textAlign: "center", marginTop: "50%" }}>
        {author}'s Journal
      </h1>
    </div>,
    ...journalEntries.flatMap((entry, index) => [
      <div key={`image-${index}`} className="page">
        {entry.image ? (
          <img
            src={entry.image}
            alt="journal"
            className="postcard-image"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        ) : (
          <p style={{ textAlign: "center", marginTop: "50%" }}>No Image</p>
        )}
      </div>,
      <div key={`text-${index}`} className="page">
        <JournalPage title={entry.title} content={entry.description} on/>
      </div>,
    ]),
  ];

  pages.push(
    <div key="cover-back" className="page cover-page">
      <h2 style={{ textAlign: "center", marginTop: "50%" }}> </h2>
    </div>
  );

  const totalPages = pages.length;
  if (totalPages % 2 !== 0) {
    pages.splice(pages.length - 1, 0, <div key="blank" className="page" />);
  }

  const handleFlip=async(e)=>{
    const currentpage=e.data;
    if(currentpage>=totalPages-2){
      setTimeout(() => {
        navigate("/homepage");
      }, 1000);
    }  
}

  return (
    <div className="book-container" style={{overflow:"hidden"}}>
      <div className="page-background"></div>
      {journalEntries.length > 0 && (
        <HTMLFlipBook
          width={400}
          height={600}
          className="flipbook"
          startPage={0}
          showCover={true}
           onFlip={handleFlip}
        >
          {pages}
        </HTMLFlipBook>
      )}
    </div>
  );
};

export default ViewJournal;
