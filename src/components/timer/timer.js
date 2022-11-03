import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { firebaseConfig } from "../../config/firebaseConfig";
import { getLocation } from "../../util/map";

export const app = initializeApp(firebaseConfig);

const Main = () => {
  let arrSeconds = [],
    arrLeftSeconds = [];
  let sendSeconds = 0,
    sendLeftSeconds = 0;
  const [localLeftTime, setLocalLeftTime] = useState(28800);

  const [leftHours, setLeftHour] = useState(8);
  const [leftMinutes, setLeftMinutes] = useState(0);
  const [leftSeconds, setLeftSeconds] = useState(0);
  const [hours, setHour] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [userHours, setUserHour] = useState(0);
  const [userMinutes, setUserMinutes] = useState(0);
  const [userSeconds, setUserSeconds] = useState(0);
  const [btnCh, setBtnCh] = useState(false);

  const db = getDatabase();
  const userRef = ref(
    db,
    `userInfo/${JSON.parse(localStorage.getItem("user")).uid}`
  );

  // 시, 분, 초 -> 초 변환
  const secondsCal = (e) => {
    return e[0] * 3600 + e[1] * 60 + e[2];
  };

  // 초 -> 시, 분, 초 변환
  const HMSCal = (e) => {
    let Hour = 0,
      Minute = 0,
      Second = 0;
    Hour = e / 3600;
    Minute = (e % 3600) / 60;
    Second = (e % 3600) % 60;
    return [parseInt(Hour), parseInt(Minute), parseInt(Second)];
  };

  useEffect(() => {
    onValue(userRef, (response) => {
      if (response.val().leftTime) {
        setLocalLeftTime(response.val().leftTime);
        const leftTimeArr = HMSCal(response.val().leftTime);
        const workTimeArr = HMSCal(28800 - response.val().leftTime);
        setLeftHour(leftTimeArr[0]);
        setLeftMinutes(leftTimeArr[1]);
        setLeftSeconds(leftTimeArr[2]);
        setHour(workTimeArr[0]);
        setMinutes(workTimeArr[1]);
        setSeconds(workTimeArr[2]);
      } else {
        const leftTimeArr = HMSCal(response.val().leftTime);
        const workTimeArr = HMSCal(28800 - response.val().leftTime);
        setLeftHour(leftTimeArr[0]);
        setLeftMinutes(leftTimeArr[1]);
        setLeftSeconds(leftTimeArr[2]);
        setHour(workTimeArr[0]);
        setMinutes(workTimeArr[1]);
        setSeconds(workTimeArr[2]);
      }
    });

    const countdown = setInterval(() => {
      if (parseInt(seconds) < 60 && btnCh) {
        setSeconds(parseInt(seconds) + 1);
      }

      if (parseInt(seconds) === 59 && parseInt(minutes) === 59) {
        setHour(parseInt(hours) + 1);
        setMinutes(0);
        setSeconds(0);
      } else if (parseInt(seconds) === 59) {
        setMinutes(parseInt(minutes) + 1);
        setSeconds(0);
      }

      if (btnCh) {
        arrSeconds.push(hours, minutes, seconds);
        arrLeftSeconds.push(leftHours, leftMinutes, leftSeconds);
        sendSeconds = secondsCal(arrSeconds);
        sendLeftSeconds = secondsCal(arrLeftSeconds);
        sendLeftSeconds = localLeftTime - 1;
        sendLeftSeconds = sendLeftSeconds - sendSeconds;
        arrLeftSeconds = HMSCal(sendLeftSeconds);
        console.log(arrLeftSeconds);
        console.log(arrSeconds);
        setLeftHour(arrLeftSeconds[0]);
        setLeftMinutes(arrLeftSeconds[1]);
        setLeftSeconds(arrLeftSeconds[2]);
        setHour(arrSeconds[0]);
        setMinutes(arrSeconds[1]);
        setSeconds(arrSeconds[2]);
        arrSeconds = [];
        arrLeftSeconds = [];
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [seconds, btnCh]);

  const BtnClick = () => {
    if (btnCh) {
      setBtnCh(false);
      const localStorageUserData = JSON.parse(localStorage.getItem("user"));
      console.log([leftHours, leftMinutes, leftSeconds].join(":"));
      console.log([userHours, userMinutes, userSeconds].join(":"));

      getLocation().then((response) => {
        set(userRef, {
          name: localStorageUserData.displayName,
          email: localStorageUserData.email,
          profile_picture: localStorageUserData.photoURL,
          space: [response.latitude, response.longitude], // 유저의 현재 위치
          companyCode: localStorage.getItem("userCompany"),
          companyName: localStorage.getItem("companyName"),
          leftTime: secondsCal([leftHours, leftMinutes, leftSeconds]),
          totalWeekTime:
            144000 -
            (28800 - secondsCal([leftHours, leftMinutes, leftSeconds])),
        });
      });
    } else {
      setBtnCh(true);
    }
  };

  return (
    <div className="main">
      <div>
        <h2>
          <span>현재 일한 시간 : </span>
          {hours}:{minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </h2>
      </div>
      <div>
        <h2>
          <span>남은시간 : </span>
          {leftHours}:{leftMinutes < 10 ? `0${leftMinutes}` : leftMinutes}:
          {leftSeconds < 10 ? `0${leftSeconds}` : leftSeconds}
        </h2>
      </div>
      <button onClick={BtnClick}>시작</button>
    </div>
  );
};

export default Main;
