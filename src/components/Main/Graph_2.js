import React from "react";
import {
  Gp2Td,
  TOP,
  LEFT,
  RIGHT,
  BOTTOM,
  TR,
  TL,
  BL,
  BR,
  MainNav,
  Gp2Table,
} from "./GrMapStyle";
import workData from "../dummydata/WorkTime.json";
import goWorkData from "../dummydata/GoWorktime.json";
import DoneWorkData from "../dummydata/DoneWorkTime.json";

const graph_2 = () => {
  let avgGoTime = 0,
    Goi = 0;
  let avgWorkTime = 0,
    Worki = 0;
  let avgDoneTime = 0,
    Donei = 0;
  let TimeObj = workData;
  let GoTimeObj = goWorkData;
  let DoneTimeObj = DoneWorkData;
  GoTimeObj.map((e) => {
    avgGoTime = avgGoTime + e.time;
    Goi = Goi + 1;
  });
  TimeObj.map((e) => {
    avgWorkTime = avgWorkTime + e.time;
    Worki = Worki + 1;
  });
  DoneTimeObj.map((e) => {
    avgDoneTime = avgDoneTime + e.time;
    Donei = Donei + 1;
  });
  console.log(avgWorkTime, avgGoTime, avgDoneTime, Worki, Goi, Donei);
  return (
    <MainNav>
      <Gp2Table>
        <tr>
          <TL></TL>
          <TOP>월요일</TOP>
          <TOP>화요일</TOP>
          <TOP>수요일</TOP>
          <TOP>목요일</TOP>
          <TOP>금요일</TOP>
          <TOP>토요일</TOP>
          <TOP>일요일</TOP>
          <TR>평균</TR>
        </tr>
        <tr>
          <LEFT>출근시간</LEFT>
          {GoTimeObj.map((e, i) => (
            <Gp2Td key={"Go" + i}>{e.time}</Gp2Td>
          ))}
          <RIGHT>{Math.round(avgGoTime / 7)}</RIGHT>
        </tr>
        <tr>
          <LEFT>근무시간</LEFT>
          {TimeObj.map((e, i) => (
            <Gp2Td key={"Work" + i}>{e.time}</Gp2Td>
          ))}
          <RIGHT>{Math.round(avgWorkTime / 7)}</RIGHT>
        </tr>
        <tr>
          <BL>퇴근시간</BL>
          {DoneTimeObj.map((e, i) => (
            <BOTTOM key={"Done" + i}>{e.time}</BOTTOM>
          ))}
          <BR>{Math.round(avgDoneTime / 7)}</BR>
        </tr>
      </Gp2Table>
    </MainNav>
  );
};

export default graph_2;
