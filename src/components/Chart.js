import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";
import Title from "./Title";
import axios from "axios";

import { useState, useEffect } from "react";
// Generate Sales Data

export default function Chart(props) {
  function createData(time, amount) {
    return { time, amount };
  }

  const [data2, setData2] = useState([]);

  let ratt = [];
  let datess = [0, 1, 2, 3, 4, 5, 6];
  let datess2 = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29,
  ];
  async function getRatings() {
    for (const aaa of datess) {
      let date = new Date();
      date.setDate(date.getDate() - aaa);
      let date1 = date.toISOString();
      console.log("Date", date1);

      // .substring(0, date1.indexOf("T"))
      await axios
        .post("http://localhost:4000/Payments/Week", {
          name: JSON.parse(localStorage.getItem("Profile")).name,
          dates: [date1],
        })
        .then(({ data }) => {
          ratt = [
            ...ratt,
            createData(date1.substring(0, date1.indexOf("T")), data.res),
          ];

          console.log("EE:  ", ratt, datess);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return true;
  }

  async function getRatings2() {
    for (const aaa of datess2) {
      let date = new Date();
      date.setDate(date.getDate() - aaa);
      let date1 = date.toISOString();
      console.log("Date", date1);

      // .substring(0, date1.indexOf("T"))
      await axios
        .post("http://localhost:4000/Payments/Month", {
          name: JSON.parse(localStorage.getItem("Profile")).name,
          dates: [date1],
        })
        .then(({ data }) => {
          ratt = [
            ...ratt,
            createData(date1.substring(0, date1.indexOf("T")), data.res),
          ];

          console.log("EE:  ", ratt, datess);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return true;
  }

  useEffect(() => {
    if (props.value === "الشهر") {
      getRatings2().then((result) => {
        if (result) {
          setData2(ratt);
        }
      });
    } else {
      getRatings().then((result) => {
        if (result) {
          setData2(ratt);
        }
      });
    }
  }, []);

  const theme = useTheme();

  return (
    <React.Fragment>
      {props.value !== "الشهر" && <Title>الأسبوع الماضي</Title>}
      {props.value === "الشهر" && <Title>الشهر الماضي</Title>}

      {data2.length !== 0 && (
        <ResponsiveContainer>
          <LineChart
            data={data2}
            margin={{
              top: 16,
              right: 16,
              bottom: 0,
              left: 24,
            }}
          >
            <XAxis
              dataKey="time"
              stroke={theme.palette.text.secondary}
              style={theme.typography.body2}
            />
            <YAxis
              stroke={theme.palette.text.secondary}
              style={theme.typography.body2}
            >
              <Label
                angle={270}
                position="left"
                style={{
                  textAnchor: "middle",
                  fill: theme.palette.text.primary,
                  ...theme.typography.body1,
                }}
              >
                المبيعات ($)
              </Label>
            </YAxis>
            <Line
              isAnimationActive={false}
              type="monotone"
              dataKey="amount"
              stroke={theme.palette.primary.main}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </React.Fragment>
  );
}
