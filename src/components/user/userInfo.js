import React from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { firebaseConfig } from "../../config/firebaseConfig";

export const app = initializeApp(firebaseConfig);

function UserInfo() {
  const db = getDatabase();
  const userRef = ref(
    db,
    `userInfo/${JSON.parse(localStorage.getItem("user")).uid}`
  );

  const getData = () => {
    let data;
    onValue(userRef, (response) => {
      data = response.val();
    });
    return data;
  };

  const setData = (localStorageUserData) => {
    try {
      set(userRef, {
        name: localStorageUserData.displayName,
        email: localStorageUserData.email,
        profile_picture: localStorageUserData.photoURL,
      });
    } catch {
      push(userRef, {
        name: localStorageUserData.displayName,
        email: localStorageUserData.email,
        profile_picture: localStorageUserData.photoURL,
      });
    }
  };

  React.useEffect(() => {
    const localStorageUserData = JSON.parse(localStorage.getItem("user"));
    console.log(localStorageUserData);
    setData(localStorageUserData);
    try {
      console.log(getData());
    } catch (err) {
      console.log(err);
    }
  }, []);

  return <div>유저인포</div>;
}

export default UserInfo;
