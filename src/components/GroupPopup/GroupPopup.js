import React, { useEffect, useRef, useState } from "react";
import { addGroup, getGroups } from "../../utils/storage";
import "./GroupPopup.css";

const GroupPopup = ({ closePopup, onCreate }) => {
  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const popupRef = useRef(null);

  const colors = [
    "#d17bff",
    "#f18fb0",
    "#f16d6d",
    "#58c9b9",
    "#ffa559",
    "#2f27ce",
    "#00bcd4",
  ];


  useEffect(() => {
    function handleClickOutside(e) {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        closePopup();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closePopup]);

  const handleCreate = () => {
    if (groupName.trim().length < 2) {
      alert("Group name must be at least 2 characters");
    return;
    }
    const existing = getGroups();
    if (
      existing.find((g) => g.name.toLowerCase() === groupName.toLowerCase())
    ) {
      alert("Group already exists!");
      return;
    }
    addGroup(groupName, selectedColor);
    if (onCreate) {
    onCreate(groupName, selectedColor);
  }

  closePopup();
  };

  return (
    <div className="popup-overlay">
      <div className="popup" ref={popupRef}>
        <h3 className="popup-title">Create New Group</h3>
        <div className="form-group">
          <label className="label">Group Name</label>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Enter group name"
            className="popup-input"
          />
        </div>
        <div className="form-group">
          <label className="label">Choose Color</label>
          <div className="color-list">
            {colors.map((c) => (
              <div
                key={c}
                className={`colorCircle ${selectedColor === c ? "selected" : ""}`}
                style={{ background: c }}
                onClick={() => setSelectedColor(c)}
              />
            ))}
          </div>
        </div>
        <div className="popup-actions">
          <button className="createBtn" onClick={handleCreate}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupPopup;
