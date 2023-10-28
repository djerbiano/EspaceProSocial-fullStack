import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FcCheckmark, FcCancel } from "react-icons/fc";

const ContainerNotification = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: green;
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
  max-height: 50vh;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border-radius: 5px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }

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
  const navigate = useNavigate();
  const [counterNotifications, setCounterNotifications] = useState(0);
  const [invitations, setInvitations] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [receivedInvitations, setReceivedInvitations] = useState([]);
  const currentUser = sessionStorage.getItem("userId");
  const ApiAdresse = process.env.REACT_APP_API_ADRESSE;
  const afficherInvitations = () => {
    setNotifications(!notifications);
  };

  // receivedInvitations list
  useEffect(() => {
    fetch(
      `${ApiAdresse}/api/friends/${sessionStorage.getItem("userId")}`,
      {
        method: "GET",
        headers: {
          token: sessionStorage.getItem("token"),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.receivedInvitations.length > 0) {
          setInvitations(true);
          setReceivedInvitations(data.receivedInvitations);
        }
        setCounterNotifications(data.receivedInvitations.length);
      })
      .catch((error) => {
        console.log(error);
      });
      // eslint-disable-next-line
  }, []);

  //Accepter une invitation
  const accepterInvitation = (idClicked) => {
    fetch(`${ApiAdresse}/api/invitations/${currentUser}/${idClicked}`, {
      method: "PUT",
      headers: {
        token: sessionStorage.getItem("token"),
      },
    })
      .then(() => {
        // Mise à jour de receivedInvitations en filtrant l'invitation acceptée
        setReceivedInvitations((prevInvitations) =>
          prevInvitations.filter((invitation) => invitation.id !== idClicked)
        );

        setCounterNotifications((prevCounter) => prevCounter - 1);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //refuser une invitation
  const refuserInvitation = (idClicked) => {
    fetch(`${ApiAdresse}/api/invitations/${currentUser}/${idClicked}`, {
      method: "DELETE",
      headers: {
        token: sessionStorage.getItem("token"),
      },
    })
      .then(() => {
        // mise à jour de receivedInvitations en filtrant l'invitation refusée
        setReceivedInvitations((prevInvitations) =>
          prevInvitations.filter((invitation) => invitation.id !== idClicked)
        );

        setCounterNotifications((prevCounter) => prevCounter - 1);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // cacher le composant des notifications
  useEffect(() => {
    if (counterNotifications === 0) {
      setInvitations(false);
    }
  }, [counterNotifications]);

  // consulter le profil d'une invitation
  const viewProfile = (id) => {
    navigate(`/singleprofile/${id}`);
    window.location.reload();
  };

  return (
    <>
      {invitations && (
        <>
          <ContainerNotification onClick={afficherInvitations}>
            <h3 title="notifications">{counterNotifications}</h3>
          </ContainerNotification>

          {notifications && (
            <ContentNotification>
              <h4>Vous avez été invité par :</h4>
              {receivedInvitations.map((invitation) => (
                <Invitation key={invitation.id}>
                  <img
                    src={`${ApiAdresse}/images/${invitation.avatar}`}
                    alt="avatar"
                    onClick={() => viewProfile(invitation.id)}
                  />
                  <p onClick={() => viewProfile(invitation.id)}>
                    {invitation.userName}
                  </p>

                  <Checkmark
                    onClick={() => accepterInvitation(invitation.id)}
                  />
                  <CancelMark
                    onClick={() => refuserInvitation(invitation.id)}
                  />
                </Invitation>
              ))}
            </ContentNotification>
          )}
        </>
      )}
    </>
  );
}

export default Notification;
