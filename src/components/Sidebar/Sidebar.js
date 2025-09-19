import React from "react";
import "./Sidebar.css";

const Sidebar = ({ groups = [], onSelectGroup, onAddGroup }) => {

  return (
    <div className="sidebar">
      <h2>Pocket Notes</h2>
      <div className="group-list">
        {groups.map((g) => (
          <div
            key={g.id}
            className="groupItem"
            onClick={() => onSelectGroup(g)} // ✅ Calls parent handler
          >
            <div
              className="avatar"
              style={{ background: g.color || "red" }}
            >
              {g.name
                .split(" ")
                .map((w) => w[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)}
            </div>
            <span>{g.name}</span>
          </div>
        ))}
      </div>

      <button onClick={onAddGroup} className="addButton">+</button>
    </div>
  );
};

export default Sidebar;