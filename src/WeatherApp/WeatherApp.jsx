import React, { useEffect, useState } from "react";
import styles from "./WeatherApp.module.css";

import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export default function WeatherApp() {
  const [data, setData] = useState([]);
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let newLocations = locations?.filter((location) => {
      if (location?.city?.toLowerCase()?.includes(search?.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    });
    setFilteredLocations(newLocations);
  }, [search]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://freetestapi.com/api/v1/weathers`)
      .then((response) => {
        setLocations(
          response.data?.map((location) => ({ city: location.city }))
        );
        setLoading(false);
      })
      .catch(() => {
        console.error("Error Occurred");
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      axios
        .get(`https://freetestapi.com/api/v1/weathers?search=New York`)
        .then((response) => {
          setData(response.data?.[0]);
          setSearch("");
          setLoading(false);
        })
        .catch(() => {
          console.error("Error Occurred");
        });
    }, 3000);
  }, []);

  const searchLocation = (name) => {
    setLoading(true);
    setTimeout(() => {
      axios
        .get(`https://freetestapi.com/api/v1/weathers?search=${name}`)
        .then((response) => {
          setData(response.data?.[0]);
          setSearch("");
          setLoading(false);
        })
        .catch(() => {
          console.error("Error Occurred");
        });
    }, 3000);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Weather in</h1>
      <div className={styles.inputContainer}>
        <div
          className={styles.inputIcon}
          onClick={() => {
            searchLocation();
          }}
        >
          <FaSearch />
        </div>
        <input
          type="text"
          className={styles.search}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search?.length > 0 && !loading && (
          <div className={styles.optionWrapper}>
            {filteredLocations?.map((location) => {
              return (
                <div
                  className={styles.optionValue}
                  onClick={() => {
                    searchLocation(location.city);
                  }}
                >
                  {location.city}
                </div>
              );
            })}
          </div>
        )}
      </div>
      {loading && (
        <div style={{ padding: "1rem" }}>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        </div>
      )}
      {!loading && (
        <div className={styles.weathercontainer}>
          <div className={styles.city}>{data.city}</div>
          <div className={styles.temp}>{data.temperature}'C</div>
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
      )}
    </div>
  );
}
