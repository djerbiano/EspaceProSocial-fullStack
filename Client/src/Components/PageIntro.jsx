import styled from "styled-components";
import PictureProfile from "./PictureProfile";
import Header from "./Header";
import IntroProfilePage from "./IntroProfilePage";
import { FaUserEdit } from "react-icons/fa";

const ContainerIntro = styled.div`
  width: 100%;
`;

const Intro = styled.div`
  width: 50%;
  min-height: 300px;
  margin-top: 20px;
  box-shadow: 0 0 50px 5px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  position: relative;
  & a {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 2rem;
    color: #000;
    &:hover {
      color: red;
      cursor: pointer;
      scale: 1.2;
    }
  }

  & > * {
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
    & > * {
      margin: 2% 0;
    }
  }
`;
function PageIntro() {
  return (
    <>
      <Header />
      <PictureProfile />
      <ContainerIntro>
        <Intro>
        
          <a href="/A-propos" title="edit">
            <FaUserEdit />
          </a>
          <IntroProfilePage />
        </Intro>
      </ContainerIntro>
    </>
  );
}

export default PageIntro;
