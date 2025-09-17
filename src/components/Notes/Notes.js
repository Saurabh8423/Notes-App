import React, { useState } from "react";
import NoteItem from "../NoteItem/NoteItem";
import {addNoteToGroup} from "../../utils/storage";
import "./Notes..css"

const Notes = ({groupName, notes, refreshNotes}) => {
  const [input, setInput] = useState("");

  const handleAdd =()=>{
    if (!input.trim()) return;
    addNoteToGroup(groupName, input);
    setInput('');
    refreshNotes();
  }

  return (
    <div className="notes">
      <h2>{groupName}</h2>
      <div className="notes-list">
        {notes.map((note) => (
          <NoteItem key={note.id} note={note} group={groupName} />
        ))}
      </div>

      <div className="note-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="Type Your note..."
        />
        <button onClick={handleAdd} disabled={!input.trim()}>
          ➤
        </button>
      </div>
    </div>
  );
};

export default Notes;
