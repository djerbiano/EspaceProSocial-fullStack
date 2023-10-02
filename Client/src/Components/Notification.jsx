import { useState } from "react";
import styled from "styled-components";
import { FcCheckmark, FcCancel } from "react-icons/fc";

const ContainerNotification = styled.div`
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: red;
  border-radius: 50px;

  & h3 {
    text-align: center;
    color: white;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const ContentNotification = styled.div`
  position: absolute;
  right: 1vw;
  min-width: 300px;
  min-height: 100px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border-radius: 5px;

  & h4 {
    padding: 10px;
  }
`;

const Invitation = styled.div`
  width: 90%;
  height: 50px;
  background-color: #d1cbcb52;
  padding: 10px;
  margin: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;

  & img {
    width: 15%;
    aspect-ratio: 1/1;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
  }

  & p {
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Checkmark = styled(FcCheckmark)`
  font-size: 1.5rem;
  &:hover {
    scale: 1.5;
    transition: ease 0.5s;
  }
`;
const CancelMark = styled(FcCancel)`
  font-size: 1.5rem;
  &:hover {
    scale: 1.5;
    transition: ease 0.5s;
  }
`;
function Notification() {
  const [invitations] = useState(true);
  const [notifications, setNotifications] = useState(false);

  const afficherInvitations = () => {
    setNotifications(!notifications);
  };

  return (
    <>
      {invitations && (
        <>
          <ContainerNotification onClick={afficherInvitations}>
            <h3 title="notifications">1</h3>
          </ContainerNotification>

          {notifications && (
            <ContentNotification>
              <h4>Vous avez été invité par :</h4>
              <Invitation>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  alt=""
                />
                <p>UserName</p>
                <Checkmark />

                <CancelMark />
              </Invitation>
            </ContentNotification>
          )}
        </>
      )}
    </>
  );
}

export default Notification;
