import React, { useState } from "react";
import useDidMountEffect from "../../hooks/useDidMountEffect";
//타이머
const Main = () => {
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
  const [btnCh, setBtnCh] = useState(true);

  // 시, 분, 초 -> 초 변환
  const secondsCal = (e) => {
    console.log(e[0]);
    let allSeconds = 0;
    allSeconds = allSeconds + e[0] * 3600 + e[1] * 60 + e[2];
    console.log(allSeconds);
    return allSeconds;
  };

  // 초 -> 시, 분, 초 변환
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

  useDidMountEffect(() => {
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
      arrSeconds.push(hours, minutes, seconds);
      arrLeftSeconds.push(leftHours, leftMinutes, leftSeconds);
      sendSeconds = secondsCal(arrSeconds);
      sendLeftSeconds = secondsCal(arrLeftSeconds);
      console.log("send", sendSeconds);
      sendLeftSeconds = 28800 - 1;
      sendLeftSeconds = sendLeftSeconds - sendSeconds;
      console.log("send", sendLeftSeconds);
      arrLeftSeconds = HMSCal(sendLeftSeconds);
      console.log("arrl", arrLeftSeconds);
      setLeftHour(arrLeftSeconds[0]);
      setLeftMinutes(arrLeftSeconds[1]);
      setLeftSeconds(arrLeftSeconds[2]);
      arrSeconds = [];
      arrLeftSeconds = [];
    }, 1000);
    return () => clearInterval(countdown);
  }, [hours, minutes, seconds, btnCh]);

  const BtnClick = () => {
    if (btnCh) {
      setBtnCh(false);
      arrSeconds.push(hours, minutes, seconds);
      setSeconds(0);
      setMinutes(0);
      setHour(0);
      console.log(arrSeconds);
      sendSeconds = secondsCal(arrSeconds);
      console.log("send", sendSeconds);
    } else {
      setBtnCh(true);
    }
    console.log(btnCh);
  };

  return (
    <div className="main">
      <div>
        <h2>
          {hours}:{minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </h2>
      </div>
      <div>
        <h2>
          <span>남은시간 </span>
          {leftHours}:{leftMinutes < 10 ? `0${leftMinutes}` : leftMinutes}:
          {leftSeconds < 10 ? `0${leftSeconds}` : leftSeconds}
        </h2>
      </div>
      <button onClick={BtnClick}>시작</button>
    </div>
  );
};

export default Main;
