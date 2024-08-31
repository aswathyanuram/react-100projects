import React, { useState } from "react";
import styles from "./Notes.module.css";
import { v4 as uuidv4 } from "uuid";

export default function Notes() {
  const [value, setValue] = useState("");
  const [notes, setNotes] = useState([]);
  const [id, setId] = useState(null);

  const currentNote = notes.find((note) => {
    return note.id == id;
  });

  return (
    <div className={styles.container}>
      <div className={styles.listContainer}>
        <div>
          <input
            className={styles.createInput}
            type="text"
            value={value}
            placeholder="Enter your note title here"
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <button
            className={styles.create}
            onClick={() => {
              setNotes((old) => {
                return [
                  ...old,
                  { title: value, id: uuidv4(), note: value + " Note" },
                ];
              });
            }}
          >
            Create
          </button>
          <div className={styles.notes}>
            {notes.map((note) => {
              return (
                <div
                  className={styles.note}
                  onClick={() => {
                    setId(note.id);
                  }}
                >
                  {note.title}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className={styles.contentContainer}>
        <textarea
          className={styles.textarea}
          value={currentNote?.note}
          onChange={(e) => {
            setNotes((old) => {
              return old.map((item) => {
                if (item.id == id) {
                  return { ...item, note: e.target.value };
                } else {
                  return item;
                }
              });
            });
          }}
        />
      </div>
    </div>
  );
}
