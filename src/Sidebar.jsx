import React from "react";
import styles from "./Sidebar.module.css";
import { IoIosApps } from "react-icons/io";

export default function Sidebar({ titles, changeApp, selectedTitle }) {
  return (
    <div className={styles.sidebar}>
      {titles.map((title) => {
        return (
          <div
            className={
              selectedTitle.id == title.id
                ? styles.titlecardSelected
                : styles.titlecard
            }
            key={title.id}
            onClick={() => {
              changeApp(title);
            }}
          >
            <IoIosApps style={{ paddingRight: ".5rem", fontSize: "1.5rem" }} />
            {title?.title}
          </div>
        );
      })}
    </div>
  );
}
