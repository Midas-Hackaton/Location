import React from "react";
import * as S from "./index.style";
import Login from "./login";
import MainLogo from "../../assets/img/logo/logo.svg";
import { Link } from "react-router-dom";
function Header() {
  return (
    <S.HeaderContainer>
      <Link to={"/"}>
        <S.LogoContainer>
          <img src={MainLogo} alt={"dqw"} />
        </S.LogoContainer>
      </Link>
      <Login />
    </S.HeaderContainer>
  );
}

export default Header;
