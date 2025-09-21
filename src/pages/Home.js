import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar.js"
import GroupPopup from "../components/GroupPopup/GroupPopup.js";
import Notes from "../components/Notes/Notes.js";
import homeImage from "../assets/welcome.png";
import { getGroups, addGroup } from "../utils/storage";
import "./Home.css";

function Home() {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setGroups(getGroups());
  }, []);

  const handleCreateGroup = (name, color) => {
    const newGroup = addGroup(name, color);
    setGroups((prev) => [...prev, newGroup]);
  };

  const handleBack = () => {
    setSelectedGroup(null); 
  };


  return (
    <div className="container">
      <div className={`sidebar-wrapper ${selectedGroup ? "hide-mobile" : ""}`}>
      <Sidebar
        groups={groups}
        onSelectGroup={setSelectedGroup}
        onAddGroup={() => setShowPopup(true)}
      />
      </div>

      <div className={`notesArea ${!selectedGroup ? "hide-mobile" : ""}`}>

        {selectedGroup ? (
          <Notes group={selectedGroup} onBack={handleBack} />
        ) : (
          <div className="welcome">
            <img className="homeImages" src={homeImage} alt="Pocket Notes" />
            <h1>Pocket Notes</h1>
            <p>
              Send and receive messages without keeping your phone online. <br /> Use
              Pocket Notes on up to 4 linked devices and 1 mobile phone.
            </p>
            <small className="encrypt">🔒end-to-end encrypted</small>
          </div>
        )}
      </div>
      {showPopup && <GroupPopup closePopup={() => setShowPopup(false)}
        onCreate={handleCreateGroup}
      />}
    </div>
  );
};

export default Home;
