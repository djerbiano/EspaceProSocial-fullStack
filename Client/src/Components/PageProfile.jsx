import styled from "styled-components";
import PictureProfile from "./PictureProfile";
import Header from "./Header";
import SetPost from "./SetPost";
import Friends from "./Friends";
import IntroProfilePage from "./IntroProfilePage";
import MyPosts from "./MyPosts";

const ContainerProfile = styled.div`
  width: 100%;
`;
const ContainerIntroAndSetPost = styled.nav`
  width: 100%;
  height: 35vh;
  display: flex;
  margin: 20px 0;
`;

const IntroContent = styled.nav`
  width: 30%;
  
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  margin-right: 10%;
`;

const ContainerFreindsAndPosts = styled.div`
  width: 100%;
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  box-shadow: 0 0 50px 5px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
`;
const ContainerFriends = styled.div`
  width: 300px;
  min-height: 200px;
  max-height: 700px;
  padding: 20px;

  & > * {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const ContainerPosts = styled.div`
  width: 80%;
  
`;
function Profile() {
  return (
    <>
      <Header />
      <ContainerProfile>
        <PictureProfile />
        <ContainerIntroAndSetPost>
          <IntroContent>
            <IntroProfilePage />
          </IntroContent>
          <SetPost />
        </ContainerIntroAndSetPost>
        <ContainerFreindsAndPosts>
          <ContainerFriends>
            <Friends />
          </ContainerFriends>
          <ContainerPosts>
            <MyPosts />
          </ContainerPosts>
        </ContainerFreindsAndPosts>
      </ContainerProfile>
    </>
  );
}

export default Profile;
