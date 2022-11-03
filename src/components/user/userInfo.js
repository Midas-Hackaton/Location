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
    let data;
    onValue(userRef, (response) => {
      data = response.val();
    });
    return data;
  };

  const setData = (localStorageUserData) => {
    getLocation().then((response) => {
      set(userRef, {
        name: localStorageUserData.displayName,
        email: localStorageUserData.email,
        profile_picture: localStorageUserData.photoURL,
        space: {
          lat: response.latitude,
          lng: response.longitude,
        },
      });
    });
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
