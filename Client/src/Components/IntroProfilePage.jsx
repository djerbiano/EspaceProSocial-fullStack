import { useEffect, useState } from "react";
import { FaUserCircle, FaMailBulk, FaBirthdayCake } from "react-icons/fa";
import styled from "styled-components";

const ContainerIntroProfilePage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 20px;
  width: 100%;
  height: 100%;
  overflow: visible;
  word-break: break-all;

`;
function IntroProfilePage() {
  const [id] = useState(sessionStorage.getItem("userId"));
  const [user, setUser] = useState({});
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
        setUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
      //eslint-disable-next-line
  }, [id]);
  return (
    <ContainerIntroProfilePage>
      <h3>
        <FaUserCircle /> {user.userName}
      </h3>
      <h3>
        <FaMailBulk /> {user.email}
      </h3>
      <h3>
        <FaBirthdayCake /> {new Date(user.birthday).toLocaleDateString()}
      </h3>
      <h3>Inscrit le : {new Date(user.createdAt).toLocaleDateString()}</h3>
    </ContainerIntroProfilePage>
  );
}

export default IntroProfilePage;
