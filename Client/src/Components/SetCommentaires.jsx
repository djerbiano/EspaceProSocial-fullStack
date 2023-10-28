import styled from "styled-components";
import { useState } from "react";

const ContainerCommentaires = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 20px;
    border-radius: 5px;
  }

  & textarea {
    width: 70%;
    min-height: 50px;
    resize: none;
    background-color: #f5f5f5;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 20px;
  }

  & input {
    width: 15%;
    height: 25px;
    background-color: #d5dce4;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`;

function Commentaires(props) {
  const currentUser = sessionStorage.getItem("userId");
  const postId = props.postId;
  const [newCommentaire, setNewCommentaire] = useState({
    comments: "",
    author: currentUser,
    post: postId,
  });
  const ApiAdresse = process.env.REACT_APP_API_ADRESSE;

  const handleCommentaireChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setNewCommentaire({
      ...newCommentaire,
      [name]: value,
      author: currentUser,
      post: postId,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("comments", newCommentaire.comments);
    formDataToSend.append("author", newCommentaire.author);
    formDataToSend.append("post", newCommentaire.post);

    fetch(`${ApiAdresse}/api/comments/${currentUser}/post/${postId}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: sessionStorage.getItem("token"),
      },
      body: JSON.stringify(Object.fromEntries(formDataToSend)),
    }).then((res) => {
      res
        .json()
        .then((data) => {
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };
  return (
    <ContainerCommentaires>
      <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
        <textarea
          placeholder="Votre commentaire"
          name="comments"
          value={newCommentaire.comments}
          onChange={handleCommentaireChange}
        ></textarea>
        <input type="submit" value="Envoyer" />
      </form>
    </ContainerCommentaires>
  );
}

export default Commentaires;
