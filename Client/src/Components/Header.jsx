import styled from "styled-components";
import { BiLogOut } from "react-icons/bi";
import logo from "../Assets/logo.png";
import { useEffect, useState } from "react";

const HeaderContainer = styled.nav`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100vw;
  height: 10vh;
  position: fixed;
  top: 0;
  z-index: 1;
  background-color: #f5f5f5;
`;

const LogoContainer = styled.div`
  width: 20%;
`;

const LogoImage = styled.img`
  width: 47%;
`;

const SearchBarContainer = styled.div`
  width: 50%;
`;

const SearchInput = styled.input`
  width: 90%;
  height: 30px;
  border-radius: 5px;
  border: none;
  outline: none;
  padding-left: 10px;
  font-size: 15px;
  font-weight: bold;

  &::placeholder {
    font-size: 15px;
    font-weight: bold;
    text-align: center;
  }

  &:focus {
    outline: none;
    border-radius: 5px;
    border: 1px solid;
    box-shadow: 0 0 5px #d5dce4;
  }
`;

const ProfileContainer = styled.div`
  width: 5%;
  cursor: pointer;
`;

const ProfileImage = styled.img`
  width: 70%;
  aspect-ratio: 1/1;
  border-radius: 50%;
  object-fit: cover;
`;

const LogOutContainer = styled.div`
  cursor: pointer;
`;

const LogOutSpan = styled.span`
  font-size: 2rem;
  color: #27a7fc;
`;
function Header() {
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
    <HeaderContainer>
      <LogoContainer>
        <a href="/">
          <LogoImage src={logo} alt="logo" />
        </a>
      </LogoContainer>
      <SearchBarContainer>
        <form method="get">
          <SearchInput
            type="text"
            placeholder="Rechercher un utilisateur"
            name="search"
          />
        </form>
      </SearchBarContainer>
      <ProfileContainer>
        <a href="/profile">
          <ProfileImage src={`http://localhost:3000/${avatar}`} alt={avatar} />
        </a>
      </ProfileContainer>
      <LogOutContainer>
        <a href="/">
          <LogOutSpan title="logOut">
            <BiLogOut />
          </LogOutSpan>
        </a>
      </LogOutContainer>
    </HeaderContainer>
  );
}

export default Header;
