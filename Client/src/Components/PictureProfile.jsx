import { useEffect, useState } from "react";
import styled from "styled-components";

const ContainerPictureProfile = styled.div`
  width: 100%;
  height: 200px;
  margin-top: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContPictureProfile = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 200px;
`;

const ProfilePicture = styled.div`
  width: 5%;
`;

const ProfileImage = styled.img`
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 50%;
  object-fit: cover;
`;

const UpdateProfile = styled.div``;

const UpdateProfileButton = styled.button`
  width: 200px;
  height: 40px;
  border-radius: 5px;
  border: none;
  background-color: #d1cbcb;
  cursor: pointer;
  font-size: 15px;
  font-weight: bold;
  padding: 10px;
  &:hover {
    background-color: #d5dce4;
    box-shadow: 0 0 5px #d5dce4;
    transition: 0.5s;
  }
`;

const ContainerLinks = styled.div`
  display: flex;
  justify-self: center;
  align-items: center;
  width: 100%;
  height: 50%;
`;

const Links = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const Link = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  min-width: 10%;
  border-radius: 5px;
  border: none;
  background-color: #d1cbcb;
  cursor: pointer;
  font-size: 15px;
  font-weight: bold;
  padding: 10px;
  color: black;
  margin-right: 5%;
  &:hover {
    background-color: #d5dce4;
    box-shadow: 0 0 5px #d5dce4;
    transition: 0.5s;
  }
`;
function PictureProfile() {
  const [avatar, setAvatar] = useState("");
  const id = sessionStorage.getItem("userId");
  useEffect(() => {
    fetch(`http://localhost:3000/api/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAvatar(data.avatar);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  return (
    <ContainerPictureProfile>
      <ContPictureProfile>
        <ProfilePicture>
          <ProfileImage src={`http://localhost:3000/${avatar}`} alt={avatar} />
        </ProfilePicture>

        <UpdateProfile>
          <UpdateProfileButton type="button">
            Modifier profile
          </UpdateProfileButton>
        </UpdateProfile>
      </ContPictureProfile>
      <hr width="90%" color="#d5dce4" size="3" />
      <ContainerLinks>
        <Links>
          <Link href="/home">Accueil</Link>
          <Link href="/profile">Mes publications</Link>
          <Link href="/">A propos</Link>
          <Link href="/">Ami(e)s</Link>
        </Links>
      </ContainerLinks>
    </ContainerPictureProfile>
  );
}

export default PictureProfile;
