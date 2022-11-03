import React from "react";
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from "recharts";
import data from "../dummydata/WorkTime.json";
import margin from "../dummydata/GpMargin.json";
import { NavWork, SpanTitle, SpanSubTitle, MainNav } from "./GrMapStyle";

const graph_1 = () => {
  let dataArr = data;
  let avg = 0,
    index = 0;
  dataArr.map((e) => {
    avg = avg + e.time;
    index = index + 1;
  });
  avg = avg / index;
  return (
    <MainNav>
      <NavWork>
        <div>
          <SpanTitle>근무 시간</SpanTitle>
          <SpanSubTitle>
            평균 근무 시간 : 약 {Math.round(avg * 100) / 100}
          </SpanSubTitle>
        </div>
      </NavWork>
      <BarChart width={900} height={430} data={data} margin={margin}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="time" fill="#5853ED" />
      </BarChart>
    </MainNav>
  );
};

export default graph_1;
