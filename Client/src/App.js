import { Analytics } from "@vercel/analytics/react";
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageConnexion from "./Components/PageConnexion";
import PageRegister from "./Components/PageRegister";
import PageChangePassword from "./Components/PageChangePassword";
import PageHome from "./Components/PageHome";
import PageProfile from "./Components/PageProfile";
import PageFriends from "./Components/PageFriends";
import PageIntro from "./Components/PageIntro";
import SingleProfile from "./Components/SingleProfile";
import NotFound from "./Components/NotFound";
import PrivateRoute from "./utils/PrivateRoute";
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

          <Route element={<PrivateRoute />}>
            <Route path="/Home" element={<PageHome />} exact />
            <Route path="/Profile" element={<PageProfile />} exact />
            <Route path="/Amies" element={<PageFriends />} exact />
            <Route path="/A-propos" element={<PageIntro />} exact />
            <Route
              path="/ChangePassword"
              element={<PageChangePassword />}
              exact
            />
            <Route
              path="/SingleProfile/:id"
              element={<SingleProfile />}
              exact
            />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="/Register" element={<PageRegister />} />
        </Routes>
        <Analytics />
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;
