import React, { useEffect, useState } from "react";
import {
  createNote,
  deleteNote,
  getNotes,
  updateNote,
} from "../services/noteServices";
import type { NoteType } from "../types/noteTypes";

const NoteList = () => {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [msg, setMsg] = useState<string>("");
  const [refresh, setRefresh] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>("");

  const makeRefresh = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await getNotes();
        setNotes(data);
      } catch (error) {
        console.log("Fail to fetch note :", error);
      }
    };
    fetchNotes();
  }, [refresh]);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (msg.trim().length === 0) return;
    try {
      if (editMode) {
        await updateNote(editId, msg);
        setEditMode(false);
      } else {
        await createNote(msg);
      }
      setMsg("");
      makeRefresh();
    } catch (error) {
      console.log("Fail to save note :", error);
      throw new Error("Fail to save note");
    }
  };

  const handleModeChange = (title: string, id: string) => {
    setEditMode(true);
    setMsg(title);
    setEditId(id);
  };

  // const handleUpdateNote = async (id: string) => {
  //   setEditMode(true);
  //   try {
  //     if (editMode) {
  //     } else {
  //       await updateNote(id, msg);
  //       setMsg("");
  //       makeRefresh();
  //     }
  //   } catch (error) {
  //     console.log("Fail to update note :", error);
  //     throw new Error("Fail to update note");
  //   }
  // };

  const handleDeleteNote = async (id: string) => {
    try {
      await deleteNote(id);
      makeRefresh();
    } catch (error) {
      console.log("Fail to delete note :", error);
      throw new Error("Fail to delete note");
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Share List</h1>
      <ul className="space-y-2 w-3/4 md:w-1/3 mb-8">
        {notes.map((note) => (
          <li
            key={note._id}
            className="bg-gray-200 shadow-md rounded-xl px-4 py-3 hover:bg-gray-300 transition duration-200"
          >
            {note.title}
            <button
              type="button"
              className="text-white bg-red-600 cursor-pointer px-2 py-1 rounded active:scale-90 duration-200 float-right"
              onClick={() => handleDeleteNote(note._id)}
            >
              Delete
            </button>
            <button
              type="button"
              className="text-white bg-emerald-700 mx-2 cursor-pointer px-2 py-1 rounded active:scale-90 duration-200 float-right"
              onClick={() => handleModeChange(note.title, note._id)}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
      <form action="" onSubmit={submitHandler}>
        <input
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          className="border-2 border-gray-700 me-2 rounded px-2 py-1"
        />
        <button
          type="submit"
          className="text-white bg-black cursor-pointer py-1 px-2 rounded border-2 border-black active:scale-90 duration-200"
        >
          {editMode ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default NoteList;
