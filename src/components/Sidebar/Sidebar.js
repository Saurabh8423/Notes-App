import React, { useState } from "react";
import './Sidebar.css';
import GroupPopup from "../GroupPopup/GroupPopup";

export default function Sidebar({ groups, activeGroup, setActiveGroup, onAddGroup }) {
  const [isPopupOpen, setIsPopupOpen]= useState(false);

  function openPopup(){
    setIsPopupOpen(true);
  }

  function closePopup(){
    setIsPopupOpen(false)
  }

  function handleCreate(name) {
    const ok = onAddGroup(name);
    if (ok) closePopup();
    return ok;
  }



  return (
    <aside className="sidebar">
      <div className="header">
        <h2 className="title">Notes</h2>
        <button className="createBtn" onClick={openPopup}>
          +
        </button>
      </div>

      <div className="groupsList">
        {groups.map((g) => (
          <div
            key={g}
            className={`$ "groupItem" ${
              activeGroup === g ? "active" : ""
            }`}
            onClick={() => setActiveGroup(g)}
          >
            <div className="avatar">{getAvatarLetters(g)}</div>
            <div className="groupName">{g}</div>
          </div>
        ))}
      </div>
      {isPopupOpen && (
        <GroupPopup onClose={closePopup} onCreate={handleCreate} />
      )}
    </aside>
  );
};

function getAvatarLetters(name) {
  const trimmed = name.trim();
  const letters = trimmed.slice(0, 2).toUpperCase();
  return letters;
}
