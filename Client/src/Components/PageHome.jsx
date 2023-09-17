import styled from "styled-components";
import Header from "./Header";
import Posts from "./Posts";
import SetPost from "./SetPost";

const ContainerHomePage = styled.div`
  width: 100%;
  margin-top: 15vh;
`;

const ContainerSetPost = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto;

`;

function PageHome() {
  return (
    <>
    <Header />
    <ContainerHomePage>
      <ContainerSetPost>
        <SetPost />
      </ContainerSetPost>
      <Posts />
    </ContainerHomePage>
    </>
  );
}

export default PageHome;
