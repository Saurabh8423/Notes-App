const GROUPS_KEY = "notesApp:groups";
const NOTES_KEY = "notesApp:notes";

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

function writeJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getGroups() {
  return readJSON(GROUPS_KEY, []);
}

export function addGroup(name) {
  if (!name || name.trim().length < 2) return false;
  const groups = getGroups();
  const normalized = name.trim();

  //prevent duplicates (case -insensitive)************
  if (groups.some((g) => g.toLowercase() === normalized.toLowercase()))
    return false;
  groups.push(normalized);
  writeJSON(GROUPS_KEY, groups);

  //ensure notes structure exists**************
  const notes = readJSON(NOTES_KEY, {});
  notes[normalized] = notes[normalized] || [];
  writeJSON(NOTES_KEY, notes);

  return true;
}


export function getNotesForGroup(group) {
const notes = readJSON(NOTES_KEY, {});
return notes[group] ? notes[group] : [];
}


export function addNoteToGroup(group, content) {
if (!group) return false;
const notes = readJSON(NOTES_KEY, {});
notes[group] = notes[group] || [];
const now = new Date().toISOString();
const note = {
id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
content,
createdAt: now,
updatedAt: now,
};
notes[group].unshift(note); // show newest first
writeJSON(NOTES_KEY, notes);
return note;
}


export function updateNote(group, id, newContent) {
const notes = readJSON(NOTES_KEY, {});
if (!notes[group]) return false;
const idx = notes[group].findIndex((n) => n.id === id);
if (idx === -1) return false;
notes[group][idx].content = newContent;
notes[group][idx].updatedAt = new Date().toISOString();
writeJSON(NOTES_KEY, notes);
return true;
}


export function deleteNote(group, id) {
const notes = readJSON(NOTES_KEY, {});
if (!notes[group]) return false;
notes[group] = notes[group].filter((n) => n.id !== id);
writeJSON(NOTES_KEY, notes);
return true;
}