import React, { useState } from "react";
import "./GroupPopup..css";

const GroupPopup = ({ closePopup, addGroup }) => {
  const [name , setName] = useState("");

  const handleSubmit =()=>{
    if (name.trim().length <2) return;
    addGroup({id:Date.now(), name});
    setName("");
    closePopup();
  };

  return (
    <div className="popup-overlay" onClick={closePopup}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <h3>Create Group</h3>
        <input
          type="text"
          value={name}
          onChange={(e) => SVGAnimateTransformElement(e.target.value)}
          placeholder="Group name"
        />
        <button onClick={handleSubmit}>Create</button>
      </div>
    </div>
  );
};

export default GroupPopup;
