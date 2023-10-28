import styled from "styled-components";
import { BiLogOut } from "react-icons/bi";
import logo from "../Assets/logo.png";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
  color: red;
  & > :hover {
    scale: 1.4;
    transition: 0.3s;
  }
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
  const ApiAdresse = process.env.REACT_APP_API_ADRESSE;
  useEffect(() => {
    fetch(`${ApiAdresse}/api/users/${id}`, {
      method: "GET",
      headers: {
        token: sessionStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAvatar(data.avatar);
      })
      .catch((error) => {
        console.log(error);
      });
      //eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (user !== "") {
      fetch(`${ApiAdresse}/api/users/name/${user}/${id}`, {
        method: "GET",
        headers: {
          token: sessionStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setDataSearch(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleSearch = (e) => {
    setUser(e.target.value);
  };
  const getUserIdClicked = (id) => {
    navigate(`/singleprofile/${id}`);
    window.location.reload();
  };

  const logOut = () => {
    sessionStorage.clear();
  };
  return (
    <>
      <HeaderContainer>
        <LogoContainer>
          <Link to="/home">
            <LogoImage src={logo} alt="logo" title="Home" />
          </Link>
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
          <Link to="/profile">
            <ProfileImage
              src={`${ApiAdresse}/images/${avatar}`}
              alt={avatar}
            />
          </Link>
          <ContainerNotification>
            <Notification />
          </ContainerNotification>
        </ProfileContainer>

        <LogOutContainer>
          <Link to="/" onClick={logOut}>
            <LogOutSpan title="logOut">
              <BiLogOut />
            </LogOutSpan>
          </Link>
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
                <img src={`${ApiAdresse}/images/${user.avatar}`} alt="" />
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
