import React from "react";
import styles from "./Sidebar.module.css";

export default function Sidebar({ titles, changeApp }) {
  return (
    <div className={styles.sidebar}>
      {titles.map((title) => {
        return (
          <div
            className={styles.titlecard}
            key={title.id}
            onClick={() => {
              changeApp(title);
            }}
          >
            {title?.title}
          </div>
        );
      })}
    </div>
  );
}
