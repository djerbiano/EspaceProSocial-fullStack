import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const ContainerRegister = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: relative;
`;

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  padding: 20px;
`;

const RegisterForm = styled.form`
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
  height: 40px;
  font-size: 15px;
  background-color: #000;
  color: #fff;
  cursor: pointer;

  border-radius: 15px;
  &:hover {
    transform: scale(1.1);
    transition: 0.2s;
    background-color: #fff;
    color: #000;
    border: none;
  }
`;

const BackLink = styled.a`
  position: absolute;
  top: 40px;
  left: 40px;
  font-size: 2rem;
  color: #000;
  &:hover {
    transform: scale(1.2);
  }
`;

const ModalRegister = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  & span {
    position: absolute;
    top: 20px;
    right: 20px;
    background-color: #fff;
    padding: 10px;
    border-radius: 10px;
    color: red;
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;
  }
`;
const ModalRegisterContent = styled.div`
  background-color: #fff;
  min-width: 300px;
  min-height: 100px;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
function PageRegister() {
  const navigate = useNavigate();
  const [schowModal, setSchowModal] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    userName: "",
    /*birthday: "",*/
    email: "",
    avatar: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (error) {
      window.location.reload();
    }

    if (e.target.files && e.target.files.length > 0) {
      const firstFile = e.target.files[0];
      setFormData({
        ...formData,
        [name]: value,
        avatar: firstFile,
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
    formDataToSend.append("userName", formData.userName);
    /*formDataToSend.append("birthday", formData.birthday);*/
    formDataToSend.append("email", formData.email);
    if (formData.avatar !== "") {
      formDataToSend.append("image", formData.avatar);
    }
    formDataToSend.append("password", formData.password);

    fetch(`http://localhost:3000/api/auth/register`, {
      method: "POST",
      body: formDataToSend,
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            setSchowModal(true);
            throw new Error(data.message);
          });
        }
        return res.json();
      })
      .then((data) => {
        setSchowModal(true);

        setTimeout(() => {
          navigate("/");
        }, 2000);
      })

      .catch((error) => {
        setSchowModal(true);
        setError(error);
      });
  };
  return (
    <ContainerRegister>
      <RegisterContainer>
        <Title>
          <h1>S'inscrire</h1>
        </Title>
        <BackLink href="/">
          <IoMdArrowRoundBack />
        </BackLink>
        <RegisterForm>
          <label htmlFor="userName">Nom d'utilisateur :</label>
          <InputField
            type="text"
            id="userName"
            name="userName"
            placeholder="Nom d'utilisateur"
            onChange={handleChange}
          />
          <label htmlFor="birthday">Date de naissance :</label>
          <InputField
            type="date"
            id="birthday"
            value="2023-01-01"
            onChange={handleChange}
          />
          <label htmlFor="email">Email :</label>
          <InputField
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <label htmlFor="avatar">Photo de profil :</label>
          <InputField
            type="file"
            id="avatar"
            name="avatar"
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
          <SubmitButton
            type="submit"
            value="S'inscrire"
            onClick={handleSubmit}
          />
        </RegisterForm>
      </RegisterContainer>

      {schowModal && (
        <ModalRegister onClick={() => setSchowModal(false)}>
          <ModalRegisterContent>
            <span>X</span>
            <p>{error ? error.message : "Votre compte a été crée"}</p>
          </ModalRegisterContent>
        </ModalRegister>
      )}
    </ContainerRegister>
  );
}

export default PageRegister;
