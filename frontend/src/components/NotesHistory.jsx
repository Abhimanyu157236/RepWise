import React, { useEffect, useState } from "react";

const NotesHistory = () => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const res = await fetch(
        "https://repwise-58m2.onrender.com/api/v1/fetch/fetch-notes",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      const data = await res.json();
      if (data.existingNote) {
        const result = data.existingNote.map((note) =>
          setNotes((prev) => [...prev, note]),
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  console.log(notes);

  return (
    <div className="w-full h-[80vh] flex flex-wrap my-3">
      {notes.map((note, index) => (
        <div className="px-6 md:px-10 py-7 w-full mx-auto md:mx-4 h-[45%] md:h-[40%] overflow-y-scroll md:w-[30%] md:hover:h-[55%]  bg-gradient-to-br from-violet-900/20 to-purple-950/30 rounded-xl shadow-inner shadow-white/20 md:hover:scale-110 transition-all duration-200">
          {/* Title */}
          <h2 className="text-white text-xl font-semibold mb-1">
            {note.title}
          </h2>
          <p className="text-white/50 text-xs mb-4">
            {note.date
              ? new Date(note.date).toLocaleDateString()
              : "Unknown date"}
          </p>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  );
};

export default NotesHistory;
