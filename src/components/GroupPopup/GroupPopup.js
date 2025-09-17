import React, { useState } from "react";
import "./GroupPopup..css";

const GroupPopup = ({ closePopup, onCreate }) => {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (name.trim().length < 2) return;
    const ok = onCreate(name);
    if (ok) {
      setName("");
      closePopup();
    }
  };

  return (
    <div className="popup-overlay" onClick={closePopup}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <h3>Create Group</h3>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Group name"
        />
        <button onClick={handleSubmit}>Create</button>
      </div>
    </div>
  );
};

export default GroupPopup;
