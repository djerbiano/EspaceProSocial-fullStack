import styled from "styled-components";
import PictureProfile from "../Components/PictureProfile";
import SetPost from "./SetPost";
import Friends from "./Friends";
import Posts from "./Posts";

const ContainerProfile = styled.div`
  width: 100%;
`;
const ContainerIntroAndSetPost = styled.nav`
  width: 100%;
  height: 35vh;
  display: flex;
  background-color: aqua;
`;

const IntroContent = styled.nav`
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgb(114, 109, 109);
  margin-right: 10%;
`;

const ContainerFreindsAndPosts = styled.div`
  width: 100%;
  display: flex;
  background-color: rgb(116, 216, 216);
`;
function Profile() {
  return (
    <ContainerProfile>
      <PictureProfile />
      <ContainerIntroAndSetPost>
        <IntroContent>
          <h1>userName</h1>
          <p>Date de création</p>
          <p>En ligne</p>
        </IntroContent>
        <SetPost />
      </ContainerIntroAndSetPost>
      <ContainerFreindsAndPosts>
        <Friends />
        <Posts />
      </ContainerFreindsAndPosts>
    </ContainerProfile>
  );
}

export default Profile;
