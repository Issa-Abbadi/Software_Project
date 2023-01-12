import React, { useEffect, useRef, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import axios from "axios";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function PriceChart(props) {
  const [initialDates, setInitialDates] = useState("");
  const [initialDataPoints, setInitialDataPoints] = useState("");
  const [dates, setDates] = useState("");
  const [dataPoints, setDataPoints] = useState("");
  const [Ratings, setRatings] = useState("");
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
    const dates2 = [...initialDates];
    const dataPoints2 = [...initialDataPoints];

    //slice the array
    let indexstartdate = event.target.value;
    if (indexstartdate > dates2.length) {
      indexstartdate = 0;
    } else {
      indexstartdate = dates2.length - indexstartdate;
    }
    const filterDate = dates2.slice(indexstartdate, dates2.length + 1);
    const filterDataPoints = dataPoints2.slice(
      indexstartdate,
      dates2.length + 1
    );

    setDates(filterDate);
    setDataPoints(filterDataPoints);
    console.log("isis", dates, dataPoints);
  };

  useEffect(() => {
    axios
      .post("http://localhost:4000/Ratings/", { email: props.email })
      .then(({ data }) => {
        setRatings(data);
        console.log("dat", data);
        setInitialDates(
          data.map((rat) =>
            rat.created_on.substring(0, rat.created_on.indexOf("T"))
          )
        );
        setInitialDataPoints(data.map((rat) => rat.market_rating));
        setDates(
          data.map((rat) =>
            rat.created_on.substring(0, rat.created_on.indexOf("T"))
          )
        );
        setDataPoints(data.map((rat) => rat.market_rating));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(dates, dataPoints);

  const inputRef1 = useRef();
  const inputRef2 = useRef();

  function filterData() {
    const dates2 = [...dates];
    const dataPoints2 = [...dataPoints];

    //slice the array
    let value1 = inputRef1.current.value;
    // let value2 = inputRef2.current.value;
    let indexstartdate = dates2.indexOf(value1);
    // let indexenddate = dates2.indexOf(value2);

    //slice the array
    if (indexstartdate === -1) {
      indexstartdate = 0;
    }
    // if (indexenddate === -1) {
    //   indexenddate = dates2.length;
    // }
    console.log("start ", indexstartdate);
    // console.log("end", indexenddate);
    const filterDate = dates2.slice(indexstartdate, dates2.length + 1);
    const filterDataPoints = dataPoints2.slice(
      indexstartdate,
      dates2.length + 1
    );

    console.log(filterDate, filterDataPoints);

    //replace label in the chart
    //HELP HERE!!!

    setDates(filterDate);
    setDataPoints(filterDataPoints);
    console.log("isis", dates, dataPoints);
  }

  return (
    <div>
      <div
        style={{
          direction: "ltr",
        }}
      >
        {/* <input type="date" ref={inputRef1} />
        <input type="date" ref={inputRef2} />
        <button onClick={filterData}>Filter</button> */}
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="demo-simple-select-autowidth-label">
            الفترة
          </InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={age}
            onChange={handleChange}
            autoWidth
            label="الفترة"
          >
            <MenuItem value={999999}>كل الوقت</MenuItem>
            <MenuItem value={7}>الأسبوع السابق</MenuItem>
            <MenuItem value={30}>الشهر السابق</MenuItem>
            <MenuItem value={365}>السنة السابقة</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="priceChart">
        {dataPoints !== "" && dates !== "" && (
          <Line
            data={{
              labels: dates,

              datasets: [
                {
                  label: "التقييم",
                  data: dataPoints,
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                  ],
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: false,
                  text: "Chart.js Line Chart",
                },
              },
            }}
            height={400}
            width={400}
          />
        )}
      </div>
    </div>
  );
}

export default PriceChart;
