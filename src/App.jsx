import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import styles from "./App.module.css";
import ToDo from "./ToDo/ToDo";
import WeatherApp from "./WeatherApp/WeatherApp";
import Calculator from "./calculator/Calculator";
import Notes from "./notes/Notes";

export default function App() {
  const titles = [
    {
      id: 1,
      title: "ToDo",
      app: <ToDo />,
    },
    {
      id: 2,
      title: "Weather App",
      app: <WeatherApp />,
    },
    {
      id: 3,
      title: "Calculator",
      app: <Calculator />,
    },
    {
      id: 4,
      title: "Notes",
      app: <Notes />,
    },
  ];
  const [selectedTitle, setSelectedTitle] = useState(titles?.[0]);

  const changeApp = (title) => {
    setSelectedTitle(title);
  };
  return (
    <div className={styles.container}>
      <Sidebar
        titles={titles}
        changeApp={changeApp}
        selectedTitle={selectedTitle}
      />
      <div className={styles.content}>{selectedTitle?.app}</div>
    </div>
  );
}
