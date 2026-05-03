import { Clock, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import NotesHistory from "./NotesHistory";

export default function FitNotes() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);
  const [noteAdded, setNoteAdded] = useState(false);
  const [tab, setTab] = useState("today");

  const handleAdd = async () => {
    setNotes([{ title, content }]);
    setNoteAdded(true);
    try {
      const res = await fetch(
        "http://10.186.250.225:5000/api/v1/track/add-notes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            title,
            content,
            id: uuidv4(),
            date: new Date(),
          }),
        },
      );
      const data = await res.json();
      alert(data.message);
    } catch (error) {
      alert("An error had occured while saving the fitNotes");
      console.log(error);
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <span className="w-full flex gap-1 items-center my-3 px-2 font-semibold">
        <Clock size={19} className={tab === "history" ? "text-pink-500" : ""} />
        <p
          className={tab === "history" ? "text-pink-500 underline" : ""}
          onClick={() => setTab("history")}
        >
          History
        </p>
        <p className="mx-3">|</p>
        <p
          className={tab === "today" ? "text-pink-500 underline" : ""}
          onClick={() => setTab("today")}
        >
          Add note
        </p>
      </span>
      {tab === "today" ? (
        <div className="px-6 md:px-10 py-12 w-full mx-auto h-[75%] overflow-y-scroll md:w-1/2  bg-gradient-to-br from-violet-900/20 to-purple-950/30 rounded-xl shadow-inner shadow-white/20">
          {/* Title */}
          <h2 className="text-white text-xl font-semibold mb-4">
            Fit Notes 📝
          </h2>

          {noteAdded ? (
            <>
              <div className="w-full flex gap-3">
                <p className="px-4 py-2 text-white"> {notes.title} </p>
              </div>
              <p className="px-4 py-2 my-5 text-white"> {notes.content} </p>
            </>
          ) : (
            <>
              <div className="w-full flex gap-3">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title..."
                  className="w-[95%] px-4 py-2 rounded-lg 
            bg-transparent text-white placeholder-gray-400
            outline-none 
            "
                />
                <button
                  onClick={handleAdd}
                  className="px-5 py-1 rounded-lg text-white
            bg-gradient-to-r from-pink-600 to-purple-600
            hover:scale-105 transition"
                >
                  Add
                </button>
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
                placeholder="Write your notes here..."
                className="w-[95%] my-5 px-4 py-2 rounded-lg 
             bg-transparent text-white placeholder-gray-400
            outline-none 
            "
              />
            </>
          )}
        </div>
      ) : (
        <NotesHistory />
      )}
    </div>
  );
}
