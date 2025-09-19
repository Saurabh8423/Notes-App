import React, { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar.js"
import GroupPopup from "../components/GroupPopup/GroupPopup.js";
import Notes from "../components/Notes/Notes.js";
import homeImage from "../assets/welcome.jpg";
import "./Home.css";

function Home() {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

    const handleCreateGroup = (name, color) => {
    const newGroup = {
      id: Date.now(),
      name,
      color,
      notes: [],
    };
    setGroups([...groups, newGroup]);
  };

  return (
    <div className="container">
      <Sidebar
        groups={groups}
        onSelectGroup={setSelectedGroup}
        onAddGroup={() => setShowPopup(true)}
      />

      <div className="notesArea">
        {selectedGroup ? (
          <Notes group={selectedGroup} />
        ) : (
          <div className="welcome">
            <img className="homeImages" src={homeImage} alt="Pocket Notes" />
            <h1>Pocket Notes</h1>
            <p>
              Send and receive messages without keeping your phone online. Use
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
