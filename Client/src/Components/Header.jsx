import styled from "styled-components";
import { BiLogOut } from "react-icons/bi";
import logo from "../Assets/logo.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "./Notification";
import LogoVerifiyProfile from "./ReusableComponent/VerifyProfile";

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
  position: relative;
`;

const ProfileImage = styled.img`
  width: 70%;
  aspect-ratio: 1/1;
  border-radius: 50%;
  object-fit: cover;
  
`;

const ContainerNotification = styled.div`
  width: 50px;
  cursor: pointer;
  position: absolute;
  left: 60%;
  bottom: -10px;
`;

const LogOutContainer = styled.div`
  cursor: pointer;
`;

const LogOutSpan = styled.span`
  font-size: 2rem;
  color: #27a7fc;
`;

const SearchResult = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 5px;
  width: 60%;
  max-height: 80%;
  position: absolute;
  top: 10vh;
  box-shadow: 0 0 5px #d5dce4;
  background-color: white;
  overflow: scroll;
  z-index: 1;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SingleProfile = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    scale: 1.01;
    border: 1px solid #d5dce4;
    background-color: #f5f5f5;
  }
  & img {
    width: 50px;
    aspect-ratio: 1/1;
    border-radius: 50%;
    object-fit: cover;
    margin: 10px;
    box-shadow: 0 0 5px #d5dce4;
  }

  & p {
    margin: 10px;
    font-weight: bold;
  }
`;

function Header() {
  const [avatar, setAvatar] = useState("");
  const id = sessionStorage.getItem("userId");
  const [user, setUser] = useState("");
  const [dataSearch, setDataSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/api/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setAvatar(data.avatar);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  useEffect(() => {
    if (user !== "") {
      fetch(`http://localhost:3000/api/users/name/${user}`)
        .then((res) => res.json())
        .then((data) => {
          setDataSearch(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  const handleSearch = (e) => {
    setUser(e.target.value);
  };
  const getUserIdClicked = (id) => {
    navigate(`/singleprofile/${id}`);
    window.location.reload();
  };
  return (
    <>
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
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
              onChange={handleSearch}
            />
          </form>
        </SearchBarContainer>
        <ProfileContainer>
          <a href="/profile">
            <ProfileImage
              src={`http://localhost:3000/${avatar}`}
              alt={avatar}
            />
          </a>
          <ContainerNotification>
            <Notification />
          </ContainerNotification>
        </ProfileContainer>

        <LogOutContainer>
          <a href="/">
            <LogOutSpan title="logOut">
              <BiLogOut />
            </LogOutSpan>
          </a>
        </LogOutContainer>
      </HeaderContainer>
      {dataSearch && user.length > 0 && (
        <SearchResult>
          {dataSearch.length > 0 ? (
            dataSearch.map((user) => (
              <SingleProfile
                key={user._id}
                onClick={() => getUserIdClicked(user._id)}
              >
                <img src={`http://localhost:3000/${user.avatar}`} alt="" />
                <p>
                  {user.userName}
                  {user.verifyProfile && <LogoVerifiyProfile />}
                </p>
              </SingleProfile>
            ))
          ) : (
            <p> Aucun utilisateur trouvé</p>
          )}
        </SearchResult>
      )}
    </>
  );
}

export default Header;
