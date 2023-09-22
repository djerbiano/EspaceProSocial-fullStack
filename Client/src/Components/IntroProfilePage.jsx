import { useEffect, useState } from "react";
import styled from "styled-components";

const ContainerIntroProfilePage = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-evenly;
    padding: 20px;


`;
function IntroProfilePage() {
  const [id] = useState(sessionStorage.getItem("userId"));
  const [user, setUser] = useState({});
  useEffect(() => {
    fetch(`http://localhost:3000/api/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  return (
    <ContainerIntroProfilePage>
      <h1>Bienvenu {user.userName} !</h1>
      <h3>Email : {user.email}</h3>
      <h3> Né (e) le : {new Date(user.birthday).toLocaleDateString()}</h3>
      <h3>Inscrit le : {new Date(user.createdAt).toLocaleDateString()}</h3>
    </ContainerIntroProfilePage>
  );
}

export default IntroProfilePage;
