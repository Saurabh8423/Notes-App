import React from "react";
import "./Sidebar.css";

const Sidebar = ({ groups = [], onSelectGroup, onAddGroup }) => {

  return (
    <div className="sidebar">
      <div className="sidebar-header">Pocket Notes</div>
      <div className="group-list">
        {groups.map((g) => (
          <div
            key={g.id}
            className="group-item"
            onClick={() => onSelectGroup(g)}
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
            <span className="group-name">{g.name}</span>
          </div>
        ))}
      </div>

      <button onClick={onAddGroup} className="addButton">+</button>
    </div>
  );
};

export default Sidebar;
