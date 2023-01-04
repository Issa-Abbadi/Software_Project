import React, { useEffect, useRef, useState } from "react";
import { Line, Bar } from "react-chartjs-2";

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

function PriceChart() {
  const initialDates = [
    "2021-08-25",
    "2021-08-26",
    "2021-08-27",
    "2021-08-28",
    "2021-08-29",
    "2021-08-30",
    "2021-08-31",
  ];
  const initialDataPoints = [1, 2, 4, 9, 12, 15, 16];
  const [dates, setDates] = useState("");
  const [dataPoints, setDataPoints] = useState("");

  useEffect(() => {
    setDates(initialDates);
    setDataPoints(initialDataPoints);
  }, []);

  console.log(dates, dataPoints);

  const inputRef1 = useRef();
  const inputRef2 = useRef();

  function filterData() {
    const dates2 = [...dates];
    const dataPoints2 = [...dataPoints];

    //slice the array
    let value1 = inputRef1.current.value;
    let value2 = inputRef2.current.value;
    let indexstartdate = dates2.indexOf(value1);
    let indexenddate = dates2.indexOf(value2);

    //slice the array
    if (indexstartdate === -1) {
      indexstartdate = 0;
    }
    if (indexenddate === -1) {
      indexenddate = dates2.length;
    }
    console.log("start ", indexstartdate);
    console.log("end", indexenddate);
    const filterDate = dates2.slice(indexstartdate, indexenddate + 1);
    const filterDataPoints = dataPoints2.slice(
      indexstartdate,
      indexenddate + 1
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
      <div>
        {dataPoints !== "" && dates !== "" && (
          <Line
            data={{
              labels: dates,

              datasets: [
                {
                  label: "Sales",
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
                  display: true,
                  text: "Chart.js Line Chart",
                },
              },
            }}
            height={400}
            width={400}
          />
        )}
      </div>
      <input type="date" ref={inputRef1} />
      <input type="date" ref={inputRef2} />
      <button onClick={filterData}>Filter</button>
    </div>
  );
}

export default PriceChart;
