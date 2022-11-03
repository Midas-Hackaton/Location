import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from "./App";
import Header from "./components/header/index";
import UserInfo from "./components/user/userInfo";
import UserMap from "./components/map/kakaoMap";
import MakeCompany from "./components/company/makeCompany";
import "./index.css";
const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/user" element={<UserInfo />} />
      <Route path="/map" element={<UserMap />} />
      <Route path="/company" element={<MakeCompany />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);
