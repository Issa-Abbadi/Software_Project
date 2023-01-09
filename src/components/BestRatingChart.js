import React, { useEffect, useRef, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import axios from "axios";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
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
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BestRatingChart(props) {
  const [initialDates, setInitialDates] = useState([]);
  const [initialDataPoints, setInitialDataPoints] = useState("");
  const [dates, setDates] = useState("");
  const [dataPoints, setDataPoints] = useState("");
  const [ratings, setRatings] = useState([]);
  const [age, setAge] = useState("");

  // const handleChange = (event) => {
  //   setAge(event.target.value);
  //   const dates2 = [...initialDates];
  //   const dataPoints2 = [...initialDataPoints];

  //   //slice the array
  //   let indexstartdate = event.target.value;
  //   if (indexstartdate > dates2.length) {
  //     indexstartdate = 0;
  //   } else {
  //     indexstartdate = dates2.length - indexstartdate;
  //   }
  //   const filterDate = dates2.slice(indexstartdate, dates2.length + 1);
  //   const filterDataPoints = dataPoints2.slice(
  //     indexstartdate,
  //     dates2.length + 1
  //   );

  //   setDates(filterDate);
  //   setDataPoints(filterDataPoints);
  //   console.log("isis", dates, dataPoints);
  // };

  let ratt = [];
  let datess = [];
  async function getRatings() {
    let date1 = new Date().toISOString();
    console.log("DAte ", date1.substring(0, date1.indexOf("T")));

    for (const market of props.markets) {
      await axios
        .post("http://localhost:4000/Ratings/Week", {
          email: market.email,
          dates: [date1.substring(0, date1.indexOf("T"))],
        })
        .then(({ data }) => {
          ratt = [...ratt, { rating: data.res, name: market.name }];

          console.log("EE:", ratt, datess);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return true;
  }

  useEffect(async () => {
    let result = await getRatings();
    if (result) {
      ratt.sort((a, b) => b.rating - a.rating);
      setInitialDates(ratt.slice(0, 3).map((rating) => rating.name));
      setRatings(ratt.slice(0, 3).map((rating) => rating.rating));
      console.log(
        "HERE:",
        ratt,
        ratt.slice(0, 3).map((rating) => rating.name),
        ratt.slice(0, 3).map((rating) => rating.rating)
      );
    }
  }, []);

  useEffect(() => {
    // setInitialDates(datess);
    // setRatings(ratt);
    // console.log("HERE: ", ratt, datess);
  }, [ratt]);

  console.log(dates, dataPoints);

  const inputRef1 = useRef();
  const inputRef2 = useRef();

  // function filterData() {
  //   const dates2 = [...dates];
  //   const dataPoints2 = [...dataPoints];

  //   //slice the array
  //   let value1 = inputRef1.current.value;
  //   // let value2 = inputRef2.current.value;
  //   let indexstartdate = dates2.indexOf(value1);
  //   // let indexenddate = dates2.indexOf(value2);

  //   //slice the array
  //   if (indexstartdate === -1) {
  //     indexstartdate = 0;
  //   }
  //   // if (indexenddate === -1) {
  //   //   indexenddate = dates2.length;
  //   // }
  //   console.log("start ", indexstartdate);
  //   // console.log("end", indexenddate);
  //   const filterDate = dates2.slice(indexstartdate, dates2.length + 1);
  //   const filterDataPoints = dataPoints2.slice(
  //     indexstartdate,
  //     dates2.length + 1
  //   );

  //   console.log(filterDate, filterDataPoints);

  //   //replace label in the chart
  //   //HELP HERE!!!

  //   setDates(filterDate);
  //   setDataPoints(filterDataPoints);
  //   console.log("isis", dates, dataPoints);
  // }

  return (
    <div>
      <div style={{ direction: "ltr" }} className="priceChart">
        {/* <input type="date" ref={inputRef1} />
        <input type="date" ref={inputRef2} />
        <button onClick={filterData}>Filter</button> */}
        {/* <FormControl sx={{ m: 1, minWidth: 80 }}>
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
        </FormControl> */}

        {ratings.length !== 0 && initialDates.length !== 0 && (
          <Bar
            data={{
              labels: initialDates,

              datasets: [
                {
                  label: "التقييم",
                  data: ratings,
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
                  text: "Chart.js Bar Chart",
                },
              },
            }}
          />
        )}
      </div>
    </div>
  );
}

export default BestRatingChart;
