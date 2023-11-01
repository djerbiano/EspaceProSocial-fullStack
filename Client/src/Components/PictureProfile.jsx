import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import Loader from "./Loader";

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
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 70px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

const ContainerName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & svg {
    margin-bottom: 20px;
  }
`;

const UpdateProfile = styled.div``;

const UpdateProfileButton = styled.button`
  width: 200px;
  height: 40px;
  border-radius: 5px;
  border: none;
  background-color: #31c1e3;
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

const Link2 = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  min-width: 10%;
  border-radius: 5px;
  border: none;
  background-color: #31c1e3;
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

const DeleteMyCompte = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  min-width: 10%;
  border-radius: 5px;
  border: none;
  background-color: #31c1e3;
  cursor: pointer;
  font-size: 15px;
  font-weight: bold;
  padding: 10px;
  color: black;
  margin-right: 5%;
  &:hover {
    background-color: red;
    box-shadow: 0 0 5px #d5dce4;
    transition: 0.5s;
  }
`;

const Modal = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  width: 50%;
  height: 50%;
  background-color: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 20px;
`;

const ModalButton = styled.button`
  width: 100px;
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
function PictureProfile() {
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [schowModal, setSchowModal] = useState(false);
  const id = sessionStorage.getItem("userId");
  const navigate = useNavigate();
  const verifyProfile = userInfo.verifyProfile;
  const ApiAdresse = process.env.REACT_APP_URL_SERVER;
  const handleUpdateProfileClick = () => {
    navigate("/A-propos");
  };

  const showModal = () => {
    setSchowModal(true);
  };

  // Supprimer mon compte
  const handleDeleteCompteClick = () => {
    setLoading(true);
    fetch(`${ApiAdresse}/api/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: sessionStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // User information
  useEffect(() => {
    fetch(`${ApiAdresse}/api/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: sessionStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAvatar(data.avatar);
        setUserInfo(data);
      })
      .catch((error) => {
        console.log(error);
      });
      // eslint-disable-next-line
  }, [id]);
  return (
    <ContainerPictureProfile>
      <ContPictureProfile>
        <ProfilePicture>
          <ProfileImage src={`${ApiAdresse}/images/${avatar}`} alt="" />
          <ContainerName>
            <h3>{userInfo.userName}</h3>
            {verifyProfile && (
              <svg
                fill="blue"
                viewBox="0 0 12 13"
                width="2em"
                height="1em"
                title="Compte vérifié"
              >
                <title>Compte vérifié</title>
                <g transform="translate(-98 -917)">
                  <path d="m106.853 922.354-3.5 3.5a.499.499 0 0 1-.706 0l-1.5-1.5a.5.5 0 1 1 .706-.708l1.147 1.147 3.147-3.147a.5.5 0 1 1 .706.708m3.078 2.295-.589-1.149.588-1.15a.633.633 0 0 0-.219-.82l-1.085-.7-.065-1.287a.627.627 0 0 0-.6-.603l-1.29-.066-.703-1.087a.636.636 0 0 0-.82-.217l-1.148.588-1.15-.588a.631.631 0 0 0-.82.22l-.701 1.085-1.289.065a.626.626 0 0 0-.6.6l-.066 1.29-1.088.702a.634.634 0 0 0-.216.82l.588 1.149-.588 1.15a.632.632 0 0 0 .219.819l1.085.701.065 1.286c.014.33.274.59.6.604l1.29.065.703 1.088c.177.27.53.362.82.216l1.148-.588 1.15.589a.629.629 0 0 0 .82-.22l.701-1.085 1.286-.064a.627.627 0 0 0 .604-.601l.065-1.29 1.088-.703a.633.633 0 0 0 .216-.819"></path>
                </g>
              </svg>
            )}
          </ContainerName>
        </ProfilePicture>

        <UpdateProfile>
          <UpdateProfileButton type="button" onClick={handleUpdateProfileClick}>
            Modifier profile
          </UpdateProfileButton>
        </UpdateProfile>
      </ContPictureProfile>
      <hr width="90%" color="#d5dce4" size="3" />
      <ContainerLinks>
        <Links>
          <Link2 to="/Home">Accueil</Link2>
          <Link2 to="/Profile">Mes publications</Link2>
          <Link2 to="/A-propos">A propos</Link2>
          <Link2 to="/Amies">Ami(e)s</Link2>
          <DeleteMyCompte onClick={showModal}>
            Supprimer mon compte
          </DeleteMyCompte>
        </Links>
      </ContainerLinks>
      {schowModal && (
        <Modal>
          <ModalContent>
            <h1>Supprimer mon compte</h1>
            <p> Voulez-vous vraiment supprimer votre compte ?</p>
            <p>Cette action est irréversible</p>
            <ModalButton type="button" onClick={handleDeleteCompteClick}>
              Oui
            </ModalButton>
            <ModalButton
              type="button"
              onClick={() => {
                setSchowModal(false);
              }}
            >
              Non
            </ModalButton>
          </ModalContent>
        </Modal>
      )}
      {loading && <Loader />}
    </ContainerPictureProfile>
  );
}

export default PictureProfile;
