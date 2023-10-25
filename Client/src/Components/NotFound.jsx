import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  & h1 {
    font-size: 5rem;
    font-weight: bold;
    margin-bottom: 20px;
    color: crimson;
  }

  & button {
    padding: 10px 20px;
    background-color: transparent;
    border: 1px solid black;
    cursor: pointer;
    color: black;
    border-radius: 5px;
    transition: 0.3s;
    &:hover {
      transform: scale(1.1);
      transition: 0.3s;
      background-color: white;

  }
}

  & > * {
    overflow: visible;
    white-space: wrap;
    text-align: center;
  }
`;

function NotFound() {
  return (
    <Container>
      <h1>Oops !</h1>
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <button type="button" onClick={() => (window.location = "/home")} >Back to Home</button>
    </Container>
  );
}

export default NotFound;
