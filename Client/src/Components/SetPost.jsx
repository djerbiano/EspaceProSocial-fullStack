import styled from "styled-components";
import { useState } from "react";

const ContainerSetPost = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgb(196, 101, 101);
`;

const Form = styled.form``;

const SubmitButton = styled.input`
  width: 20%;
  height: 25px;
  background-color: #d5dce4;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const TextArea = styled.textarea`
  width: 90%;
  height: 100px;
  resize: none;
  background-color: #f5f5f5;
  border: none;
  border-radius: 5px;
`;

const FileInput = styled.input`
  width: 90%;
  height: 25px;
  border-radius: 5px;
`;
const ErrorMessage = styled.p`
  color: red;
`;

function SetPost() {
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    post: "",
    picture: null,
  });

  const handleChange = (e) => {
    setUserId(sessionStorage.getItem("userId"));
    const { name, value } = e.target;

    if (e.target.files && e.target.files.length > 0) {
      const firstFile = e.target.files[0];
      setFormData({
        ...formData,
        [name]: value,
        picture: firstFile,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
        picture: null,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("post", formData.post);
    formDataToSend.append("image", formData.picture);

    fetch(`http://localhost:3000/api/posts/${userId}/post`, {
      method: "POST",
      body: formDataToSend,
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(data.message);
          });
        }
        return res.json();
      })
      .then((data) => {
        window.location.reload();
      })
      .catch((error) => {
        setError(error);
      });
  };
  return (
    <ContainerSetPost>
      <Form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
        <TextArea
          id="myTextArea"
          name="post"
          placeholder="Quoi de neuf ?"
          rows="4"
          cols="50"
          onChange={handleChange}
        ></TextArea>
        <br />
        <FileInput type="file" name="picture" onChange={handleChange} />

        <br />
        <br />
        <SubmitButton type="submit" value="Poster" />
        <ErrorMessage>{error ? error.message : ""}</ErrorMessage>
      </Form>
    </ContainerSetPost>
  );
}

export default SetPost;
