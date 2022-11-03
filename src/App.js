import { auth } from "./util/auth/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { setCookie, getCookie, deleteCookie } from "./util/cookie";
import React from "react";

function App() {
  const [userData, setUserData] = useState(null);
  const [isLogin, setisLogin] = useState(false);

  function handleGoogleLogin() {
    const provider = new GoogleAuthProvider(); // provider를 구글로 설정
    signInWithPopup(auth, provider) // popup을 이용한 signup
      .then((data) => {
        setUserData(data.user); // user data 설정
        localStorage.setItem("user", JSON.stringify(data.user));
        setCookie("token", data._tokenResponse.oauthAccessToken);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleGoogleLogout() {
    localStorage.removeItem("user");
    deleteCookie("token");
  }

  React.useEffect(() => {
    if (
      localStorage.getItem("user").length > 0 &&
      getCookie("token").length > 0
    ) {
      setUserData(JSON.parse(localStorage.getItem("user")));
      setisLogin(true);
      console.log(JSON.parse(localStorage.getItem("user")));
    }
    console.log(
      localStorage.getItem("user").length > 0 && getCookie("token").length > 0
    );
  }, []);

  return (
    <div>
      {isLogin ? (
        <div>
          <button onClick={handleGoogleLogout}>Logout</button>
          <img src={userData.photoURL} alt="유저의 프사" />
          {userData && userData.displayName}
        </div>
      ) : (
        <button onClick={handleGoogleLogin}>Login</button>
      )}
    </div>
  );
}

export default App;
