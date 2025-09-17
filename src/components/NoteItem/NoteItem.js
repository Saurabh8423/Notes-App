import React, { useState } from "react";
import {updateNote, deleteNote} from "../../utils/storage";
import "./NoteItem.css";

const NoteItem = ({ note, group }) => {

    const [editing, setEditing] = useState(false);
    const [content, setContent] = useState(note.content);
    
    const handleUpdate =() =>{
        if (content.trim()) {
            updateNote(group, note.id, content);
            setEditing(false);
        }
    };

  return (
    <div className="note-item">
      {editing ? (
        <>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button onClick={handleUpdate}>Save</button>
        </>
      ) : (
        <>
          <p>{note.content}</p>
          <small>Created: {new Date(note.createdAt).toLocaleString()}</small>
          <br />
          <small>Updated: {new Date(note.updatedAt).toLocaleString()}</small>
          <div className="note-actions">
            <button onClick={() => setEditing(true)}>Edit</button>
            <button onClick={() => deleteNote(group, note.id)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
};

export default NoteItem;
