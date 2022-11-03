import React from "react";
import { Link } from "react-router-dom";
import { getCookie } from "./util/cookie/cookie";
import * as S from "./App.style";
import Clock from "./assets/img/main/clock.svg";
import Company from "./assets/img/main/company.svg";
function App() {
  const [isCompany, setIsCompany] = React.useState(false);
  const [isCompanyBallon, setIsCompanyBallon] = React.useState(false);

  const [companyName, setCompanyName] = React.useState("");

  // React.useEffect(() => {
  //   setIsCompany(localStorage.getItem("userCompany").length == 0 && getCookie("token"));
  // }, []);

  return (
    <>
      <S.MainCompanyContainer>
        <div>
          <h1>회사가 없으신가요?</h1>
          <h1 style={{ textDecoration: "underline" }}>
            회사에 들어가시거나 <br /> 만드세요!
          </h1>
          <S.ButtonContainer>
            {isCompanyBallon ? (
              <div className="ballon">
                <div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <h2 style={{ marginRight: "20px" }}>회사 이름</h2>
                    <input
                      type="text"
                      style={{
                        width: "150px",
                        padding: "5px",
                      }}
                      onChange={(e) => {
                        setCompanyName(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <button>만들기</button>
                </div>
              </div>
            ) : (
              <></>
            )}
            <button
              onClick={() => {
                setIsCompanyBallon(!isCompanyBallon);
              }}
            >
              회사 만들기
            </button>
            <Link to={"/user"}>
              <button>회사 참여하기</button>
            </Link>
          </S.ButtonContainer>
        </div>
        <img src={Company} alt="" />
      </S.MainCompanyContainer>
      <S.MainContainer>
        <div>
          <h1>
            모두를 위한 <br /> 유연근무제
          </h1>
          <h1 style={{ textDecoration: "underline" }}>지금 시작하세요</h1>
        </div>
        <img src={Clock} alt="" />
      </S.MainContainer>
    </>
  );
}

export default App;
