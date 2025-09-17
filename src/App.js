import { useEffect, useState } from "react";
import "./App.js";
import Sidebar from "./components/Sidebar/Sidebar";
import GroupPopup from "./components/GroupPopup/GroupPopup.js";
import Notes from "./components/Notes/Notes";
import { getGroups, getNotesForGroup, addGroup } from "./utils/storage";
import "./App.css";

function App() {
  const [groups, setGroups] = useState([]);
  const [activeGroup, setActiveGroup] = useState(null);
  const [notes, setNotes] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const g = getGroups();
    setGroups(g);
    if (g.length > 0) {
      setActiveGroup((prev) => prev ?? g[0]);
    }
  }, []);

 useEffect(() => {
    if (activeGroup) setNotes(getNotesForGroup(activeGroup));
  }, [activeGroup]);

  const handleAddGroup= (name) => {
    const added = addGroup(name);
    if (added) {
      const g = getGroups();
      setGroups(g);
      setActiveGroup(name);
    }
    return added;
  }


  return (
    <div className="app">
      <Sidebar
        groups={groups}
        activeGroup={activeGroup}
        setActiveGroup={setActiveGroup}
        onAddGroup={handleAddGroup}
        setPopupOpen={setPopupOpen}
      />

     {activeGroup ? (
      <Notes groupName={activeGroup} notes={notes} refreshNotes={()=> setNotes(getNotesForGroup(activeGroup))} />
     ) : (
      <div className="empty">Create a group to start taking notes </div>
     )}
     {popupOpen && (
      <GroupPopup closePopup={() => setPopupOpen(false)} onCreate ={handleAddGroup} />
     )}
    </div>
  );
}

export default App;
