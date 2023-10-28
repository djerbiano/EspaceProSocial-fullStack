import styled from "styled-components";
import { useState } from "react";

const ContainerSetPost = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

const Form = styled.form`
  width: 100%;
  padding: 20px;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
`;

const SubmitButton = styled.input`
  width: 15%;
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
  border-radius: 5px;
  padding: 10px;
`;

const FileInput = styled.input`
  width: 90%;
  height: 25px;
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
  const ApiAdresse = process.env.REACT_APP_API_ADRESSE;

  const handleChange = (e) => {
    setUserId(sessionStorage.getItem("userId"));
    const { name, value } = e.target;

    if (error) {
      window.location.reload();
    }

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
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("post", formData.post);
    formDataToSend.append("image", formData.picture);

    fetch(`${ApiAdresse}/api/posts/${userId}/post`, {
      method: "POST",
      body: formDataToSend,
      headers: {
        token: sessionStorage.getItem("token"),
      },
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
        {!error && <SubmitButton type="submit" value="Poster" />}
        <ErrorMessage>{error ? error.message : ""}</ErrorMessage>
      </Form>
    </ContainerSetPost>
  );
}

export default SetPost;
