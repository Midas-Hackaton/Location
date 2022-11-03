import styled from "styled-components";

export const UserMapContainer = styled.div`
  display: flex;
  margin-top: 30px;
  input {
    padding: 12px;
    color: white;
    background-color: #a284df;
    margin: 5px;
    border: 0;
    border-radius: 8px;
  }
  input::placeholder {
    color: white;
  }
  button {
    padding: 12px;
    color: white;
    background-color: #a284df;
    border: 0;
    border-radius: 8px;
  }
`;

export const Image = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  margin-top: 53px;
  box-shadow: 0 0 40px 20px rgba(0, 234, 51, 0.7);
`

export const Center = styled.div`
  width: 430px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const Name = styled.span`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 50px;
  line-height: 59px;

  color: #000000;
  margin-top: 40px;
`