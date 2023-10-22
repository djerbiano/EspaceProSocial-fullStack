import styled from "styled-components";
import Header from "./Header";
import Posts from "./Posts";
import SetPost from "./SetPost";
import Friends from "./Friends";
import Meteo from "./Meteo";

const ContainerHomePage = styled.div`
  width: 100%;
  margin-top: 15vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
`;

const ContainerSetPost = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
`;
const ContainerLeftComponent = styled.div`
  width: 20vw;
  margin-top: 12vh;
  margin-left: 10px;
  min-height: 60vh;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
 
`;
const ContainerMainComponent = styled.div`
  width: 60vw;
  min-height: 100vh;
  position: absolute;
  top: 0;
`;
const ContainerRightComponent = styled.div`
  width: 15vw;
  min-height: 100vh;
  margin-top: 12vh;
  position: fixed;
  right: 50px;
  top: 0;
  & > * {
    overflow: scroll;
    min-height: 80vh;
    max-height: 80vh;
    width: 100%;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

function PageHome() {
  return (
    <>
      <Header />
      <ContainerHomePage>
        <ContainerLeftComponent>
          <Meteo />
        </ContainerLeftComponent>
        <ContainerMainComponent>
          <ContainerSetPost>
            <SetPost />
          </ContainerSetPost>
          <Posts />
        </ContainerMainComponent>

        <ContainerRightComponent>
          <Friends />
        </ContainerRightComponent>
      </ContainerHomePage>
    </>
  );
}

export default PageHome;
