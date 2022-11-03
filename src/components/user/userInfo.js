import React from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, query, ref, set } from "firebase/database";
import { limit, where } from "firebase/firestore";
import { firebaseConfig } from "../../config/firebaseConfig";
import { getLocation } from "../../util/map";
import { v4 as uuidv4 } from "uuid";

export const app = initializeApp(firebaseConfig);

function UserInfo() {
  const db = getDatabase();
  const [companyCode, setCompanyCode] = React.useState("");
  const [userData, setUserData] = React.useState();
  const userRef = ref(
    db,
    `userInfo/${JSON.parse(localStorage.getItem("user")).uid}`
  );

  const setData = (localStorageUserData) => {
    const companyRef = ref(
      db,
      `company/${localStorage.getItem("userCompany")}`
    );

    onValue(companyRef, (response) => {
      localStorage.setItem("companyName", response.val().companyName);
    });
  };

  const companySubmit = () => {
    localStorage.setItem("userCompany", companyCode);
    alert("회사코드가 등록되었습니다.");
  };

  React.useEffect(() => {
    try {
      const localStorageUserData = JSON.parse(localStorage.getItem("user"));
      setUserData(JSON.parse(localStorage.getItem("user")));
      setData(localStorageUserData);

      getLocation().then((response) => {
        set(userRef, {
          name: localStorageUserData.displayName,
          email: localStorageUserData.email,
          profile_picture: localStorageUserData.photoURL,
          space: [response.latitude, response.longitude], // 유저의 현재 위치
          companyCode: localStorage.getItem("userCompany"),
          companyName: localStorage.getItem("companyName"),
        });
      });
    } catch {
      console.log("비로그인");
    }
  }, []);

  return (
    <div>
      <input
        type="text"
        onChange={(e) => {
          setCompanyCode(e.target.value);
        }}
      />
      {/* <div>{userData.displayName}</div> */}
      <button onClick={companySubmit}>회사정보 등록하기</button>
    </div>
  );
}

export default UserInfo;
