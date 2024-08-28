import React, { useState } from "react";
import styles from "./ToDo.module.css";
import { v4 as uuidv4 } from "uuid";
import { MdOutlineDelete, MdOutlineEdit, MdOutlineSave } from "react-icons/md";
import { Checkbox } from "antd";

export default function ToDo() {
  const [value, setValue] = useState("");
  const [todoLists, setTodoLists] = useState([]);

  return (
    <div className={styles.container}>
      <div className={styles.inputcontainer}>
        <input
          className={styles.input}
          type="text"
          placeholder="Add your new todo here"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <button
          className={styles.add}
          onClick={() => {
            setTodoLists((old) => {
              return [
                ...old,
                { list: value, id: uuidv4(), isRead: true, isChecked: false },
              ];
            });
            setValue("");
          }}
        >
          Add
        </button>
      </div>

      <div className={styles.listscontainer}>
        {todoLists.map((todoList) => {
          return (
            <div className={styles.list}>
              <Checkbox
                className={styles.checkbox}
                onChange={(e) => {
                  let checked = e.target.checked;
                  setTodoLists((old) => {
                    return old.map((item) => {
                      if (item.id == todoList.id) {
                        return { ...item, isChecked: checked };
                      } else {
                        return item;
                      }
                    });
                  });
                }}
              />
              <span
                className={
                  todoList.isChecked ? styles.taskdone : styles.tasknotdone
                }
              >
                {todoList.isRead && todoList.list}
              </span>

              {!todoList.isRead && (
                <input
                  type="text"
                  value={todoList.list}
                  className={styles.editInput}
                  onChange={(e) => {
                    let editInput = e.target.value;
                    setTodoLists((old) => {
                      return old.map((item) => {
                        if (item.id == todoList.id) {
                          return { ...item, list: editInput };
                        } else {
                          return item;
                        }
                      });
                    });
                  }}
                />
              )}
              {!todoList.isRead && (
                <MdOutlineSave
                  className={styles.save}
                  onClick={() => {
                    setTodoLists((old) => {
                      return old.map((item) => {
                        if (item.id == todoList.id) {
                          return { ...item, isRead: true };
                        } else {
                          return item;
                        }
                      });
                    });
                  }}
                />
              )}
              {todoList.isRead && (
                <MdOutlineEdit
                  className={styles.edit}
                  onClick={() => {
                    setTodoLists((old) => {
                      return old.map((item) => {
                        if (item.id == todoList.id) {
                          return { ...item, isRead: false };
                        } else {
                          return item;
                        }
                      });
                    });
                  }}
                />
              )}

              <MdOutlineDelete
                className={styles.delete}
                onClick={() => {
                  setTodoLists((old) => {
                    return old.filter((item) => {
                      if (item.id == todoList.id) {
                        return todoList.id != item.id;
                      } else {
                        return item;
                      }
                    });
                  });
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
