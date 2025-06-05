import React, { useEffect, useState } from "react";
import {
  createNote,
  deleteNote,
  getNotes,
  updateNote,
} from "../services/noteServices";
import type { NoteType } from "../types/noteTypes";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { Link } from "react-router";
import { toast } from "react-toastify";

const NoteList = () => {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [msg, setMsg] = useState<string>("");
  const [refresh, setRefresh] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  // console.log("userInfo :", userInfo?.user?._id);

  const makeRefresh = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
        const data = await getNotes();
        setNotes(data);
      } catch (error) {
        console.log("Fail to fetch note :", error);
      } finally {
        setLoading(false);
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
        toast.success("Note updated successfully!");
      } else {
        await createNote(msg);
        toast.success("Note created successfully!");
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
      toast.success("Note deleted successfully!");
    } catch (error) {
      console.log("Fail to delete note :", error);
      throw new Error("Fail to delete note");
    }
  };

  const NoteSkeleton = () => {
    return (
      <li className="flex justify-between items-center bg-gray-200 animate-pulse rounded-xl px-4 py-3">
        <div className="h-4 bg-gray-400 rounded w-3/4 me-3"></div>
        <div className="h-4 bg-gray-400 rounded w-1/5"></div>
      </li>
    );
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Share List</h1>
      <ul className="space-y-2 w-3/4 md:w-2/3 mb-8">
        {loading
          ? Array.from({ length: notes.length || 3 }).map((_, idx) => (
              <NoteSkeleton key={idx} />
            ))
          : notes.map((note) => (
              <li
                key={note._id}
                className="bg-gray-200 shadow-md rounded-xl px-4 py-3 hover:bg-gray-300 transition duration-200"
              >
                {note.title}
                {note.userId === userInfo?.user?._id && (
                  <>
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
                  </>
                )}
              </li>
            ))}
      </ul>

      <>
        {userInfo ? (
          <form onSubmit={submitHandler}>
            <input
              type="text"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              className="w-2/4 md:w-1/3 border-2 border-gray-700 me-2 rounded px-2 py-1"
            />
            <button
              type="submit"
              className="text-white bg-black cursor-pointer py-1 px-2 rounded border-2 border-black active:scale-90 duration-200"
            >
              {editMode ? "Update" : "Create"}
            </button>
          </form>
        ) : (
          <p className="border-2 px-4 py-2 w-fit">
            <Link
              to={"/login"}
              className="underline text-red-600 font-bold text-lg"
            >
              Login
            </Link>{" "}
            for creating your own notes.
          </p>
        )}
      </>
    </div>
  );
};

export default NoteList;
