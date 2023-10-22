import styled from "styled-components";

const ContainerDetailsMyCompte = styled.div`
  min-width: 80%;
  min-height: 200px;
  border-radius: 10px;
  padding: 10px;
`;

const Day = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function Datetime() {
  const day = new Date().getDay();
  const dayOfMonth = new Date().getDate();
  const month = new Date().getMonth();
  const years = new Date().getFullYear();

  const day1 = () => {
    const jours = [
      "Dimanche",
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
    ];
    return jours[day];
  };

  return (
    <ContainerDetailsMyCompte>
      <Day>
        <h1>{day1()}</h1>
        <h2>
          {dayOfMonth} / {month + 1} / {years}
        </h2>
      </Day>
    </ContainerDetailsMyCompte>
  );
}

export default Datetime;
