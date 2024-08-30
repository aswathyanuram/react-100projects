import React, { useState } from "react";
import styles from "./Calculator.module.css";

const ITEMS = ["1", "C"];

export default function Calculator() {
  const [data, setData] = useState("");
  const [error, setError] = useState(false);

  const ITEMS = [
    { id: 1, value: "1" },
    { id: 2, value: "2" },
    { id: 3, value: "3" },
    { id: "op+", value: "+" },
    { id: 4, value: "4" },
    { id: 5, value: "5" },
    { id: 6, value: "6" },
    { id: "op-", value: "-" },
    { id: 7, value: "7" },
    { id: 8, value: "8" },
    { id: 9, value: "9" },
    { id: "op*", value: "*" },
    { id: "c", value: "c" },
    { id: 0, value: "0" },
    { id: "op=", value: "=" },
    { id: "op/", value: "/" },
  ];

  const onBtnClick = (value) => {
    setData(data + String(value));
  };

  const isError = () => {
    let last = data[data.length - 1];
    return last == "+" || last == "-" || last == "*" || last == "/";
  };

  const isSpecialButton = (id) => {
    return (
      id == "op+" ||
      id == "op-" ||
      id == "op*" ||
      id == "op/" ||
      id == "c" ||
      id == "op="
    );
  };
  return (
    <div className={styles.container}>
      {console.log(error)}
      <input
        type="text"
        className={error ? styles.inputError : styles.input}
        value={data}
      />
      <div className={styles.innercontainer}>
        {ITEMS.map((item) => {
          let { id, value } = item;
          return (
            <button
              className={isSpecialButton(id) ? styles.opbtn : styles.numbtn}
              onClick={() => {
                if (id == "c") {
                  setData("");
                } else if (id == "op=") {
                  if (isError()) {
                    setError(true);
                  } else {
                    setError(false);
                    setData(eval(data));
                  }
                } else {
                  onBtnClick(item.value);
                }
              }}
            >
              {item.value}
            </button>
          );
        })}
      </div>
    </div>
  );
}
