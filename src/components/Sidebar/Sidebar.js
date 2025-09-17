import React from 'react';
import './Sidebar.css';

export default function Sidebar({ groups, activeGroup, setActiveGroup, onAddGroup, setPopupOpen }) {
  return (
    <div className="sidebar">
      <h2>Groups</h2>
      <button onClick={() => setPopupOpen(true)} className="add-group-btn">+ Add Group</button>
      <ul>
        {groups.map((g, idx) => (
          <li key={idx} className={activeGroup === g ? 'active' : ''} onClick={() => setActiveGroup(g)}>
            <div className="group-avatar">{g.slice(0, 2).toUpperCase()}</div>
            <span>{g}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}