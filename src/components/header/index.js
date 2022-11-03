import React from "react";
import * as S from "./index.style";
import Login from "./login";
import MainLogo from "../../assets/img/logo/logo.svg";
function Header() {
  return (
    <S.HeaderContainer>
      <S.LogoContainer>
        <img src={MainLogo} alt={"dqw"} />
      </S.LogoContainer>
      <Login />
    </S.HeaderContainer>
  );
}

export default Header;
