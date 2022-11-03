import React from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { firebaseConfig } from "../../config/firebaseConfig";
import { getLocation } from "../../util/map";
import * as S from "./userInfo.style";
import Timer from "../timer/timer";
import MapInfo from "../map/kakaoMap";

export const app = initializeApp(firebaseConfig);

function UserInfo() {
  const db = getDatabase();
  const [companyName, setCompanyName] = React.useState("");
  const [userData, setUserData] = React.useState();
  const userRef = ref(
    db,
    `userInfo/${JSON.parse(localStorage.getItem("user")).uid}`
  );

  const setData = (localStorageUserData) => {
    getLocation().then((response) => {
      set(userRef, {
        name: localStorageUserData.displayName,
        email: localStorageUserData.email,
        profile_picture: localStorageUserData.photoURL,
        space: [response.latitude, response.longitude], // 유저의 현재 위치
        company: localStorage.getItem("userCompany"),
      });
    });
  };

  const companySubmit = () => {
    localStorage.setItem("userCompany", companyName);
    alert("회사코드가 등록되었습니다.");
  };

  React.useEffect(() => {
    try {
      const localStorageUserData = JSON.parse(localStorage.getItem("user"));
      setUserData(JSON.parse(localStorage.getItem("user")));
      console.log(localStorageUserData);
      setData(localStorageUserData);
    } catch {
      return console.log("비로그인");
    }
  }, []);

  return (
    <S.UserMapContainer>
      {localStorage.getItem("userCompany").length < 0 ? (
        <div style={{ marginTop: "10px", marginLeft: "40px" }}>
          <input
            type="text"
            onChange={(e) => {
              setCompanyName(e.target.value);
            }}
            placeholder={`회사의 초대코드 (24자리)`}
          />
          <button onClick={companySubmit}>회사정보 등록하기</button>
        </div>
      ) : (
        <div style={{ marginTop: "150px", marginLeft: "40px" }}>
          <Timer />
        </div>
      )}
      <MapInfo />
    </S.UserMapContainer>
  );
}

export default UserInfo;
