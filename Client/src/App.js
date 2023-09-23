import "./Styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageConnexion from "./Components/PageConnexion";
import PageRegister from "./Components/PageRegister";
import PageResetPassword from "./Components/PageResetPassword";
import PageChangePassword from "./Components/PageChangePassword";
import PageHome from "./Components/PageHome";
import PageProfile from "./Components/PageProfile";
import PageFriends from "./Components/PageFriends";
import PageIntro from "./Components/PageIntro";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<PageConnexion />} />
          <Route path="/Home" element={<PageHome />} />
          <Route path="/Profile" element={<PageProfile />} />
          <Route path="/Amies" element={<PageFriends />} />
          <Route path="/A-propos" element={<PageIntro />} />
          <Route path="/Register" element={<PageRegister />} />
          <Route path="/ResetPassword" element={<PageResetPassword />} />
          <Route path="/ChangePassword" element={<PageChangePassword />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
