import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 80px;
  padding: 30px;
  h1 {
    font-size: 80px;
  }
  img {
    margin-right: 50px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  position: relative;
  align-items: center;
  .ballon {
    z-index: 100;
    position: absolute;
    top: -150px;
    left: 180px;
    height: auto;
    padding: 20px;
    background: #ffffff;
    border-radius: 5px;
    border: #7f7f7f solid 1px;
    font-size: 16px;
    text-align: left;
  }
`;

export const MainCompanyContainer = styled.div`
  display: flex;
  padding: 30px;
  justify-content: space-around;
  align-items: center;
  margin-top: 80px;
  h1 {
    font-size: 80px;
  }
  img {
    margin-right: 50px;
  }
  button {
    padding: 20px;
    font-size: 24px;
    background-color: #694aa7;
    color: white;
    font-family: "Pretendard-Regular";
    border-radius: 12px;
    font-weight: bold;
  }
  margin-bottom: 100px;
`;
