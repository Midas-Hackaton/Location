import styled from "styled-components";

export const HeaderContainer = styled.div`
  width: 100%;
  height: 100px;
  background-color: #6e42ea;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10%;
  box-sizing: border-box;
`;

export const LogoContainer = styled.div`
  margin-left: 40px;
  cursor: pointer;
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

export const Button_box = styled.button`
  width: 220px;
  height: 50px;
  background: #FFFFFF;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  border: 0;
  outline: 0;
  padding: 0 10px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: space-between;

  transition: 0.3s;
  &:hover {
    transform: scale(1.02);
  }
`

export const Button_span = styled.span`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;

  color: #000000;
`

export const User_box = styled.div`
  display: flex;
  align-items: center;
`

export const Alert_Image = styled.img`
  width: 50px;
  height: 50px;
  cursor: pointer;
  margin-left: 20px;
`

export const User_Image = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 100px;  
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);
  margin-left: 20px;
  cursor: pointer;
`

export const User_Name = styled.span`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;

  color: #000000;
  margin-left: 20px;
`

export const Toggle_box = styled.div`
  width: 110px;
  height: 50px;

  background: #FFFFFF;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.5);
  border-radius: 100px;
  margin-left: 20px;
  cursor: pointer;
  
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;

  color: #000000;
`

export const Triangle = styled.div`
  width: 0;
  height: 0;
  border-top: 20px solid #6E42EA;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;

  transition: 0.3s;
  transform: rotate(${(props) => props.rotate || '0deg' });
`

export const Toggle_menu_box = styled.div`
  width: 150px;
  height: 205px;
  background: #FFFFFF;
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.5);
  border-radius: 30px;
  position: absolute;
  top: 90px;
  right: 13.5%;

  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Toggle_item = styled.div`
  width: 120px;
  height: 40.8px;
  border-bottom: ${(props) => props.bottom || '1px dashed #000000'};
  padding-left: 10px;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;

  color: #000000;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
`