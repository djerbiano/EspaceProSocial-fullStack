import styled from "styled-components";
const ContainerPost = styled.div`
  width: 100%;
  min-height: 200px;
  background-color: aqua;
  margin: 20px;
  padding: 20px;
`;
function Post() {
  return <ContainerPost>OnePost</ContainerPost>;
}

export default Post;
