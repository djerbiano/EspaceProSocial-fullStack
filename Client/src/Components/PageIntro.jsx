import styled from "styled-components";
import PictureProfile from "./PictureProfile";
import Header from "./Header";
import IntroProfilePage from "./IntroProfilePage";
import { FaUserEdit } from "react-icons/fa";
import UpdateProfile from "./UpdateProfile";
import { useState } from "react";
const ContainerIntro = styled.div`
  width: 100%;
`;

const Intro = styled.div`
  width: 50%;
  min-height: 300px;
  margin-top: 20px;
  box-shadow: 0 0 50px 5px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  position: relative;
  & button {
    position: absolute;
    top: 20px;
    right: 20px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    color: black;
    &:hover {
      transform: scale(1.3);
      transition: 0.3s;
      border-radius: 5px;
      border: 1px solid black;
      background-color: white;
    }
 
  }

  & > * {
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
    & > * {
      margin: 2% 0;
    }
  }
`;
function PageIntro() {
  const [updateProfile, setUpdateProfile] = useState(false);

  return (
    <>
      <Header />

      {updateProfile ? (
        <UpdateProfile />
      ) : (
        <>
          <PictureProfile />
          <ContainerIntro>
            <Intro>
              <button type="button" onClick={() => setUpdateProfile(true)}>
                <FaUserEdit />
              </button>
              <IntroProfilePage />
            </Intro>
          </ContainerIntro>
        </>
      )}
    </>
  );
}

export default PageIntro;
