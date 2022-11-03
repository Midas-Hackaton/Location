import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { firebaseConfig } from "../../config/firebaseConfig";
import { getLocation } from "../../util/map";

export const app = initializeApp(firebaseConfig);

const Main = () => {
  const [leftHours, setLeftHour] = useState(0); // 남은 일 시간
  const [leftMinutes, setLeftMinutes] = useState(0);
  const [leftSeconds, setLeftSeconds] = useState(0);

  const [hours, setHour] = useState(0); // 현재 일한 시간
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

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
      console.log(response.val().leftTime);
      console.log(HMSCal(response.val().leftTime));
      const leftTimeArr = HMSCal(response.val().leftTime);
      setLeftHour(leftTimeArr[0]);
      setLeftMinutes(leftTimeArr[1]);
      setLeftSeconds(leftTimeArr[2]);
    });

    const countdown = setInterval(() => {
      if (parseInt(seconds) > 0) {
        setSeconds(parseInt(seconds) - 1);
      }
      if (parseInt(seconds) === 0) {
        if (parseInt(minutes) === 0) {
          clearInterval(countdown);
        } else {
          setMinutes(parseInt(minutes) - 1);
          setSeconds(59);
        }
      }

      if (btnCh) {
        setLeftSeconds(seconds - 1);
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [seconds, btnCh]);

  const BtnClick = () => {
    if (btnCh) {
      setBtnCh(false);
      const localStorageUserData = JSON.parse(localStorage.getItem("user"));

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
