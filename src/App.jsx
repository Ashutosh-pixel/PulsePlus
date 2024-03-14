import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./component/Layout/NavBar";
import { ThemeSwitcher } from "./component/Toggle/ThemeSwitcher";
import Home from "./component/Pages/Home";
import Cryptocurriencies from "./component/Pages/Cryptocurriencies";
import Exchange from "./component/Pages/Exchange";
import News from "./component/Pages/News";
import CurrencyDetails from "./component/Pages/CurrencyDetails";

function App() {
  return (
    <div>
      <div className=" relative">
        <div className=" absolute right-0 top-4">
          <ThemeSwitcher></ThemeSwitcher>
        </div>
        <div>
          <NavBar></NavBar>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route
          path="/Cryptocurriencies"
          element={<Cryptocurriencies></Cryptocurriencies>}
        ></Route>
        <Route path="/Exchange" element={<Exchange></Exchange>}></Route>
        <Route path="/News" element={<News></News>}></Route>
        <Route
          path="/Cryptocurriencies/:currency"
          element={<CurrencyDetails></CurrencyDetails>}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
