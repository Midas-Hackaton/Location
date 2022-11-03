import React, { useState, useEffect } from "react";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { getLocation } from "../../util/map";
import * as S from "./timer.style";

const Main = () => {
  const db = getDatabase();
  const [isSpace, setIsSpace] = React.useState(false);
  const [mylocation, setMylocation] = React.useState({
    latitude: 37.402031,
    longitude: 127.1013722,
  });
  const userRef = ref(
    db,
    `userInfo/${JSON.parse(localStorage.getItem("user")).uid}`
  );
  const setData = () => {
    getLocation().then((response) => {
      setMylocation(response);

      onValue(userRef, (response) => {
        const gap =
          Math.abs(mylocation.latitude - response.val().space[0]) +
          Math.abs(mylocation.longitude - response.val().space[1]);
        console.log(gap);
        if (gap > 0.3) {
          setIsSpace(false);
        } else {
          setIsSpace(true);
        }
      });
    });
  };
  let [localLeftTime, setLocalLeftTime] = useState(28800);
  let arrSeconds = [],
    arrLeftSeconds = [];
  let sendSeconds = 0,
    sendLeftSeconds = 0;
  const [leftHours, setLeftHour] = useState(8);
  const [leftMinutes, setLeftMinutes] = useState(0);
  const [leftSeconds, setLeftSeconds] = useState(0);

  const [hours, setHour] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [btnCh, setBtnCh] = useState(false);

  // [시, 분, 초] -> 초 변환
  const secondsCal = (e) => {
    console.log(e[0]);
    let allSeconds = 0;
    allSeconds = allSeconds + e[0] * 3600 + e[1] * 60 + e[2];
    console.log(allSeconds);
    return allSeconds;
  };

  // 초 -> [시, 분, 초] 변환
  const HMSCal = (e) => {
    let Hour = 0,
      Minute = 0,
      Second = 0;
    Hour = e / 3600;
    Minute = (e % 3600) / 60;
    Second = (e % 3600) % 60;
    console.log(Hour, Minute, Second);
    return [parseInt(Hour), parseInt(Minute), parseInt(Second)];
  };

  useEffect(() => {
    setData();
    const countdown = setInterval(() => {
      if (parseInt(seconds) < 60 && btnCh) {
        setSeconds(parseInt(seconds) + 1);
      }
      if (parseInt(seconds) === 59) {
        if (parseInt(minutes) === 59) {
          setHour(parseInt(hours) + 1);
          setMinutes(0);
          setSeconds(0);
        } else {
          setMinutes(parseInt(minutes) + 1);
          setSeconds(0);
        }
      }

      if (btnCh) {
        arrSeconds.push(hours, minutes, seconds);
        arrLeftSeconds.push(leftHours, leftMinutes, leftSeconds);
        sendSeconds = secondsCal(arrSeconds);
        sendLeftSeconds = secondsCal(arrLeftSeconds);
        console.log("send", sendSeconds);
        sendLeftSeconds = localLeftTime - 1;
        sendLeftSeconds = sendLeftSeconds - sendSeconds;
        console.log("send", sendLeftSeconds);
        arrLeftSeconds = HMSCal(sendLeftSeconds);
        console.log("arrl", arrLeftSeconds);
        setLeftHour(arrLeftSeconds[0]);
        setLeftMinutes(arrLeftSeconds[1]);
        setLeftSeconds(arrLeftSeconds[2]);
        arrSeconds = [];
        arrLeftSeconds = [];
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [seconds, btnCh]);

  const BtnClick = () => {
    console.log("btnCh", btnCh);
    if (isSpace) {
      setBtnCh(!btnCh);
    } else {
      alert("지정된 장소를 벗어나서 업무를 할 수 없습니다.");
    }
  };

  return (
    <div className="main" style={{ marginLeft: "50px" }}>
      {isSpace ? (
        <div>지정된 장소입니다.</div>
      ) : (
        <div>지정된 장소가 아닙니다.</div>
      )}
      <div>
        <h2>
          현재 상태 :
          {isSpace ? (
            <span style={{ color: "green" }}>
              {btnCh ? <span>업무</span> : <span>출근</span>} 중
            </span>
          ) : (
            <span style={{ color: "red" }}> 휴식 중</span>
          )}
        </h2>
        <h2>
          <span>남은 출근 시간 : </span>
          {leftHours}:{leftMinutes < 10 ? `0${leftMinutes}` : leftMinutes}:
          {leftSeconds < 10 ? `0${leftSeconds}` : leftSeconds}
        </h2>
        <h2>
          <span>현재 근무 시간 : </span>
          {hours}:{minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </h2>

        <button onClick={BtnClick}>
          {btnCh ? <span>휴식하기</span> : <span>근무하기</span>}
        </button>
      </div>
    </div>
  );
};

export default Main;
