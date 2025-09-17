import { useEffect, useState } from "react";
import "./App.js";
import Sidebar from "./components/Sidebar/Sidebar";
import Notes from "./components/Notes/Notes";
import { getGroups, getNotesForGroup, addGroup } from "./utils/storage";

function App() {
  const [groups, setGroups] = useState([]);
  const [activeGroup, setActiveGroup] = useState(null);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const g = getGroups();
    setGroups(g);
    if (g.length > 0) {
      setActiveGroup((prev) => prev ?? g[0]);
    }
  }, []);

  useEffect(() => {
    if (activeGroup) {
      const n = getNotesForGroup(activeGroup);
      setNotes(n);
    } else {
      setNotes([]);
    }
  }, [activeGroup]);

  function handleAddGroup(name) {
    const added = addGroup(name);
    if (added) {
      const g = getGroups();
      setGroups(g);
      setActiveGroup(name);
    }
    return added;
  }

  function refreshNotes() {
    if (activeGroup) setNotes(getNotesForGroup(activeGroup));
  }

  return (
    <div className="app">
      <Sidebar
        groups={groups}
        activeGroup={activeGroup}
        setActiveGroup={setActiveGroup}
        onAddGroup={handleAddGroup}
      />

      <main className="main">
        {activeGroup ? (
          <Notes
            key={activeGroup}
            groupName={activeGroup}
            notes={notes}
            refreshNotes={refreshNotes}
          />
        ) : (
          <div className="empty">
            Create a group to start taking notes
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
