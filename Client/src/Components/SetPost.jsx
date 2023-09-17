import styled from "styled-components";

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

function SetPost() {
  return (
    <ContainerSetPost>
      <Form action="" method="post">
        <TextArea
          id="myTextArea"
          name="textAreaName"
          rows="4"
          cols="50"
        ></TextArea>
        <br />
        <FileInput type="file" name="" id="" />

        <br />
        <br />
        <SubmitButton type="submit" value="Poster" />
      </Form>
    </ContainerSetPost>
  );
}

export default SetPost;
