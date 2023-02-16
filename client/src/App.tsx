import styled from "styled-components";
import Converter from "./Converter";
import RatesTable from "./RatesTable";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  padding: 34px;
  gap: 34px;

  @media (min-width: 987px) {
    grid-template-columns: 1fr 1fr;
    padding: 55px;
    gap: 55px;
  }
`;

function App() {
  return (
    <Container>
      <Converter />
      <RatesTable />
    </Container>
  );
}

export default App;
