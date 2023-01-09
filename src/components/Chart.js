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

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData("00:00", 0),
  createData("03:00", 300),
  createData("06:00", 600),
  createData("09:00", 800),
  createData("12:00", 1500),
  createData("15:00", 2000),
  createData("18:00", 2400),
  createData("21:00", 2400),
  createData("24:00", undefined),
];

export default function Chart() {
  // let ratt = [];
  // let datess = [];
  // async function getRatings() {
  //   let date1 = new Date().toISOString();
  //   console.log("DAte ", date1.substring(0, date1.indexOf("T")));

  //   for (const market of props.markets) {
  //     await axios
  //       .post("http://localhost:4000/Ratings/Week", {
  //         email: market.email,
  //         dates: [date1.substring(0, date1.indexOf("T"))],
  //       })
  //       .then(({ data }) => {
  //         ratt = [...ratt, { rating: data.res, name: market.name }];

  //         console.log("EE:", ratt, datess);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  //   return true;
  // }

  // useEffect(async () => {
  //   let result = await getRatings();
  //   if (result) {
  //     ratt.sort((a, b) => b.rating - a.rating);
  //     setInitialDates(ratt.slice(0, 3).map((rating) => rating.name));
  //     setRatings(ratt.slice(0, 3).map((rating) => rating.rating));
  //     console.log(
  //       "HERE:",
  //       ratt,
  //       ratt.slice(0, 3).map((rating) => rating.name),
  //       ratt.slice(0, 3).map((rating) => rating.rating)
  //     );
  //   }
  // }, []);

  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>الأسبوع الماضي</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
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
    </React.Fragment>
  );
}
