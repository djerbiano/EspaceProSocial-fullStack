import { useState } from "react";
import styled from "styled-components";
import logo from "../Assets/home-logo.jpg";
import { useNavigate } from "react-router-dom";

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #f2f2f2;
`;

const LogoContainer = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 60vw;
  border-radius: 5%;
`;

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputField = styled.input`
  width: 300px;
  height: 40px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const SubmitButton = styled.input`
  width: 300px;
  height: 40px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #000;
  color: #fff;
  cursor: pointer;
`;

const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Link = styled.a`
  text-decoration: none;
  color: #000;
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;
  &:hover {
    color: #8a8787;
    transform: scale(1.05);
  }
`;
const ErrorMessage = styled.p`
  color: red;
`;

function PageConnexion() {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
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
        sessionStorage.setItem("token", data[2].token);
        sessionStorage.setItem("userId", data[1]._id);
        navigate("/home");
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <PageContainer>
      <LogoContainer>
        <LogoImage src={logo} alt="" />
      </LogoContainer>
      <RegisterContainer>
        <FormContainer onSubmit={handleSubmit} method="post">
          <label htmlFor="email">Email :</label>
          <InputField
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <label htmlFor="password">Mot de passe :</label>
          <InputField
            type="password"
            id="password"
            name="password"
            placeholder="Mot de passe"
            onChange={handleChange}
          />
          <SubmitButton type="submit" value="Se connecter" />
          <LinksContainer>
            <Link href="/Register">S'inscrire</Link>
            <Link href="/ResetPassword">Mot de passe oublié ?</Link>
          </LinksContainer>
          <ErrorMessage>{error ? error.message : ""}</ErrorMessage>
        </FormContainer>
      </RegisterContainer>
    </PageContainer>
  );
}

export default PageConnexion;
