import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { auth } from "../../util/auth/firebase";
import { deleteCookie, getCookie, setCookie } from "../../util/cookie/cookie";
import { useNavigate } from "react-router-dom";
import * as S from "./index.style"
function Login() {
  const navigate = useNavigate();

  const refreshPage = () => {
    navigate(0);
  };

  const [userData, setUserData] = React.useState(null);
  const [isLogin, setisLogin] = React.useState(false);

  function handleGoogleLogin() {
    const provider = new GoogleAuthProvider(); // provider를 구글로 설정
    signInWithPopup(auth, provider) // popup을 이용한 signup
      .then((data) => {
        setUserData(data.user); // user data 설정
        localStorage.setItem("user", JSON.stringify(data.user));
        setCookie("token", data._tokenResponse.oauthAccessToken);
        refreshPage();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleGoogleLogout() {
    localStorage.removeItem("user");
    deleteCookie("token");
    refreshPage();
  }

  React.useEffect(() => {
    try {
      if (
        localStorage.getItem("user").length > 0 &&
        getCookie("token").length > 0
      ) {
        setUserData(JSON.parse(localStorage.getItem("user")));
        setisLogin(true);
        console.log(JSON.parse(localStorage.getItem("user")));
      }
    } catch {
      console.log("로그아웃 상태입니다");
    }
  }, []);

  return (
    <div>
      {isLogin ? (
        <S.LoginContainer>
          <img
            src={userData.photoURL}
            alt="유저의 프사"
            style={{ borderRadius: "50%" }}
          />
          <h2>{userData && userData.displayName}님</h2>
          <button onClick={handleGoogleLogout}>로그아웃</button>
        </S.LoginContainer>
      ) : (
        <button onClick={handleGoogleLogin}>로그인</button>
      )}
    </div>
  );
}

export default Login;
