import styled from "styled-components";

export const HeaderContainer = styled.div`
  width: 100%;
  background-color: #6e42ea;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
`;

export const LogoContainer = styled.div`
  margin-left: 40px;
`;
export const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  a {
    font-size: 20px;
    color: white;
    margin-right: 30px;
  }
  h2 {
    margin: 0 1rem;
  }
  button {
    height: 50px;
    background-color: #fff;
    border: #6e42ea;
    border-radius: 5px;
  }
`;
