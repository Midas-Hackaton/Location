import React from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { firebaseConfig } from "../../config/firebaseConfig";

export const app = initializeApp(firebaseConfig);

function UserInfo() {
  const db = getDatabase();
  const [companyCode, setCompanyCode] = React.useState("");
  const [userData, setUserData] = React.useState();
  const userRef = ref(
    db,
    `userInfo/${JSON.parse(localStorage.getItem("user")).uid}`
  );

  const setData = () => {
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
    const localStorageUserData = JSON.parse(localStorage.getItem("user"));
    setUserData(localStorageUserData);
    setData();
  }, []);

  return (
    <div>
      <input
        type="text"
        onChange={(e) => {
          setCompanyCode(e.target.value);
        }}
      />
      <button onClick={companySubmit}>회사정보 등록하기</button>
    </div>
  );
}

export default UserInfo;
