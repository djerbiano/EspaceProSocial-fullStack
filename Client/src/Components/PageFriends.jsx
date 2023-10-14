import styled from "styled-components";
import PictureProfile from "./PictureProfile";
import Header from "./Header";
import Friends from "./Friends";

const ContainerProfile = styled.div`
  width: 100%;
`;

const ContainerFreinds = styled.div`
  width: 100%;
  margin-top: 20px;
  min-height: 60vh;
  box-shadow: 0 0 50px 5px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  display: flex;
  & > * {
    width: 100%;
    min-height:500px;
    display: flex;
    flex-wrap: wrap;
   
    
    & > * {
      margin: 10px  10px;
    }
  }
`;

function PageFriends() {
  return (
    <>
      <Header />
      <ContainerProfile>
        <PictureProfile />
        <ContainerFreinds>
          <Friends />
        </ContainerFreinds>
      </ContainerProfile>
    </>
  );
}

export default PageFriends;
