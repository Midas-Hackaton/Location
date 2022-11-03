import React from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { firebaseConfig } from "../../config/firebaseConfig";
import { getLocation } from "../../util/map";

export const app = initializeApp(firebaseConfig);

function UserInfo() {
  const db = getDatabase();
  const userRef = ref(
    db,
    `userInfo/${JSON.parse(localStorage.getItem("user")).uid}`
  );

  const getData = () => {
    onValue(userRef, (response) => {
      return response.val();
    });
  };

  const setData = (localStorageUserData) => {
    getLocation().then((response) => {
      set(userRef, {
        name: localStorageUserData.displayName,
        email: localStorageUserData.email,
        profile_picture: localStorageUserData.photoURL,
        space: [response.latitude, response.longitude], // 유저의 현재 위치
      });
    });
  };

  React.useEffect(() => {
    try {
      const localStorageUserData = JSON.parse(localStorage.getItem("user"));
      console.log(localStorageUserData);
      setData(localStorageUserData);
    } catch {
      return console.log("비로그인");
    }
  }, [getData]);

  return <div>유저인포</div>;
}

export default UserInfo;
