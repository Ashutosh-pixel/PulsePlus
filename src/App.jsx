import "./App.css";
import NavBar from "./component/Layout/NavBar";
import { ThemeSwitcher } from "./component/Toggle/ThemeSwitcher";

function App() {
  return (
    <div>
      <div className=" relative">
        <div className=" absolute right-0 top-4">
          <ThemeSwitcher></ThemeSwitcher>
        </div>
        <div className=" absolute">
          <NavBar></NavBar>
        </div>
      </div>
    </div>
  );
}

export default App;
