import React, { useState } from "react";
import Graph1 from "./Graph_1";
import Graph2 from "./Graph_2";
import Map from "./Map";
import { Body_out, Btn, Btn_n, BtnNavBox } from "./MainStyle";
const Main = () => {
  const [page, setPage] = useState(0);
  const BtnCl_0 = () => {
    setPage(0);
    console.log(page);
  };
  const BtnCl_1 = () => {
    setPage(1);
    console.log(page);
  };
  const BtnCl_2 = () => {
    setPage(2);
    console.log(page);
  };

  return (
    <>
      <Body_out>
        <BtnNavBox>
          {page == 0 ? (
            <Btn>그래프</Btn>
          ) : (
            <Btn_n onClick={BtnCl_0}>그래프</Btn_n>
          )}
          {page == 1 ? <Btn>표</Btn> : <Btn_n onClick={BtnCl_1}>표</Btn_n>}
          {page == 2 ? (
            <Btn>현재 위치</Btn>
          ) : (
            <Btn_n onClick={BtnCl_2}>현재 위치</Btn_n>
          )}
        </BtnNavBox>
        <nav>
          {parseInt(page) === 0 ? (
            <Graph1 />
          ) : parseInt(page) === 1 ? (
            <Graph2 />
          ) : (
            <Map />
          )}
        </nav>
      </Body_out>
    </>
  );
};

export default Main;

// import React, { useState, useEffect, memo } from "react";

// //타이머
// const Main = () => {
//   const [leftHours, setLeftHour] = useState(8);
//   const [leftMinutes, setLeftMinutes] = useState(0);
//   const [leftSeconds, setLeftSeconds] = useState(0);

//   const [hours, setHour] = useState(0);
//   const [minutes, setMinutes] = useState(0);
//   const [seconds, setSeconds] = useState(0);

//   //시간 확인용
//   const [btnCh, setBtnCh] = useState(true);
//   /*
//   // 시, 분, 초 -> 초 변환
//   const secondsCal = (e) => {
//     console.log(e[0]);
//     let allSeconds = 0;
//     allSeconds = allSeconds + e[0] * 3600 + e[1] * 60 + e[2];
//     console.log(allSeconds);
//     return allSeconds;
//   };
// */
//   /**
//   // 초 -> 시, 분, 초 변환
//   const HMSCal = (e) => {
//     let Hour = 0,
//       Minute = 0,
//       Second = 0;
//     Hour = e / 3600;
//     Minute = (e % 3600) / 60;
//     Second = (e % 3600) % 60;
//     console.log(Hour, Minute, Second);
//     return [parseInt(Hour), parseInt(Minute), parseInt(Second)];
//   };
// */

//   useEffect(() => {
//     const countdown = setInterval(() => {
//       if (btnCh) {
//         if (btnCh) {
//         }
//       }
//     }, 1000);
//     return () => clearInterval(countdown);
//   }, [hours, minutes, seconds, btnCh]);

//   const BtnClick = () => {
//     if (btnCh) {
//       setBtnCh(false);
//       console.log(btnCh);
//     } else {
//       setBtnCh(true);
//       console.log(btnCh);
//     }
//   };

//   return (
//     <div className="main">
//       <div>
//         <h2>
//           {hours}:{minutes < 10 ? `0${minutes}` : minutes}:
//           {seconds < 10 ? `0${seconds}` : seconds}
//         </h2>
//       </div>
//       <div>
//         <h2>
//           <span>남은시간 </span>
//           {leftHours}:{leftMinutes < 10 ? `0${leftMinutes}` : leftMinutes}:
//           {leftSeconds < 10 ? `0${leftSeconds}` : leftSeconds}
//         </h2>
//       </div>
//       <button onClick={BtnClick}>시작</button>
//     </div>
//   );
// };

// export default Main;
