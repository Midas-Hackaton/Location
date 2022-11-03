import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../util/auth/firebase";
import { deleteCookie, getCookie, setCookie } from "../../util/cookie/cookie";
import { Link, useNavigate } from "react-router-dom";
import AlertImg from "../../assets/img/logo/alert.png";
import LogoutImg from "../../assets/img/logo/Logout.png";
import GoogleLogo from "../../assets/img/logo/Google_Logo.png";
import * as S from "./index.style";
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

  const Logout_question = () => {
    let answer = window.confirm("정말로 로그아웃 하시겠습니까?");
    if (answer) handleGoogleLogout();
  }

  const [Data, setData] = useState({
    data: '기타',
    rotate: '0deg'
  });

  return (
    <div>
      {isLogin ? (
        <S.User_box>
          <S.Alert_Image src={AlertImg} />
          <S.User_Image onClick={() => navigate('/user')} src={userData.photoURL} alt="유저의 프사" />
          {userData && <S.User_Name>{userData.displayName}</S.User_Name>}
          
          <S.Toggle_box onClick={() => {
            if (Data.rotate == '180deg') {
              setData({...Data, rotate: '0deg'});
            } else {
              setData({...Data, rotate: '180deg'});
            }
          }}>
            {Data.data}
            <S.Triangle rotate={Data.rotate} />
          </S.Toggle_box>

          { Data.rotate == '180deg' &&
            <S.Toggle_menu_box>
              <S.Toggle_item onClick={() => setData({data: '퇴근', rotate: '0deg'})}>퇴근</S.Toggle_item>
              <S.Toggle_item onClick={() => setData({data: '출근 중', rotate: '0deg'})}>출근 중</S.Toggle_item>
              <S.Toggle_item onClick={() => setData({data: '회의 중', rotate: '0deg'})}>회의 중</S.Toggle_item>
              <S.Toggle_item onClick={() => setData({data: '휴식 중', rotate: '0deg'})}>휴식 중</S.Toggle_item>
              <S.Toggle_item bottom='none' onClick={() => setData({data: '기타', rotate: '0deg'})}>기타</S.Toggle_item>
            </S.Toggle_menu_box>
          }
          <S.Alert_Image src={LogoutImg} onClick={() => Logout_question()} alt="로그아웃" />
        </S.User_box>
      ) : (
        <S.Button_box onClick={handleGoogleLogin}>
          <img src={GoogleLogo} width='35px' height='35px' />
          <S.Button_span>Google로 로그인하기</S.Button_span>
        </S.Button_box>
      )}
    </div>
  );
}

export default Login;