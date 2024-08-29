import React, { useEffect, useState } from "react";
import styles from "./WeatherApp.module.css";

import axios from "axios";

export default function WeatherApp() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://freetestapi.com/api/v1/weathers/1")
      .then((response) => {
        setData(response.data);
      })
      .catch(() => {
        console.error("Error Occurred");
      });
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Weather in</h1>
      <input type="search" className={styles.search} value={data.city} />
      <div className={styles.weathercontainer}>
        <div className={styles.city}>{data.city}</div>
        <div className={styles.temp}>{data.temperature}'</div>
        <div className={styles.climate}>{data.weather_description}</div>
        <div className={styles.maxtemp}>Max: 28'C</div>
        <div className={styles.mintemp}>Min: 23'C</div>
        <img
          src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTo__5-oZ5BpcEsEXD7PjNnOwxchR6Rfkc-V42DGwS7rALtHA1o"
          className={styles.image}
        />

        <div className={styles.feelsliketemp}>
          <div className={styles.degree}>24'C</div>
          <h6>Feels like</h6>
        </div>
        <div className={styles.humidity}>
          <div className={styles.percentage}> {data.humidity}%</div>
          <h6>Humidity</h6>
        </div>
      </div>
    </div>
  );
}
