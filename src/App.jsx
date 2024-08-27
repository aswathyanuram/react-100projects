import React, { useState } from "react";
import Sidebar from "./Sidebar";
import styles from "./App.module.css";

export default function App() {
  const titles = [
    {
      id: 1,
      title: "Hello World",
      app: "Hello World !",
    },
    {
      id: 2,
      title: "ToDo",
      app: "ToDo App",
    },
  ];
  const [selectedTitle, setSelectedTitle] = useState(titles?.[0]);

  const changeApp = (title) => {
    setSelectedTitle(title);
  };
  return (
    <div className={styles.container}>
      <Sidebar titles={titles} changeApp={changeApp} />
      <div className={styles.content}>{selectedTitle?.app}</div>
    </div>
  );
}
