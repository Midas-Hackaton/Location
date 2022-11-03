import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Header from "./components/header/login";
import UserInfo from "./components/user/userInfo";
import UserMap from "./components/map/kakaoMap";
import MakeCompany from "./components/company/makeCompany";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/header" element={<Header />} />
      <Route path="/user" element={<UserInfo />} />
      <Route path="/map" element={<UserMap />} />
      <Route path="/company" element={<MakeCompany />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);
