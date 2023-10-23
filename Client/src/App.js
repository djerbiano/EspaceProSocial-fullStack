import { Analytics } from "@vercel/analytics/react";
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageConnexion from "./Components/PageConnexion";
import PageRegister from "./Components/PageRegister";
import PageResetPassword from "./Components/PageResetPassword";
import PageChangePassword from "./Components/PageChangePassword";
import PageHome from "./Components/PageHome";
import PageProfile from "./Components/PageProfile";
import PageFriends from "./Components/PageFriends";
import PageIntro from "./Components/PageIntro";
import SingleProfile from "./Components/SingleProfile";
const AppContainer = styled.div`
  width: 80vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

function App() {
  return (
    <BrowserRouter>
      <AppContainer>
        <Routes>
          <Route path="/" element={<PageConnexion />} />
          <Route path="/Home" element={<PageHome />} />
          <Route path="/Profile" element={<PageProfile />} />
          <Route path="/Amies" element={<PageFriends />} />
          <Route path="/A-propos" element={<PageIntro />} />
          <Route path="/Register" element={<PageRegister />} />
          <Route path="/ResetPassword" element={<PageResetPassword />} />
          <Route path="/ChangePassword" element={<PageChangePassword />} />
          <Route path="/SingleProfile/:id" element={<SingleProfile />} />
          <Route path="*" element={<PageConnexion />} />
        </Routes>
        <Analytics />
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;
