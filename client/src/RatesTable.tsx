import { trpc } from "./trpc";
import styled from "styled-components";

const Container = styled.div`
  overflow: scroll;
  max-width: 610px;
  width: 100%;
  justify-self: center;

  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

  @media (min-width: 987px) {
    justify-self: start;
  }
`;

const Table = styled.table`
  width: 100%;
  border-spacing: 0;
  white-space: nowrap;
`;

const Cell = styled.td`
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: 5px 13px;

  &:last-child {
    border-right: none;
  }
`;

const LoadingCell = styled(Cell)`
  text-align: center;
  line-height: 144px;
`;

const Row = styled.tr`
  border-bottom: 1px solid gray;

  tbody &:last-child > td {
    border-bottom: none;
  }
`;

const Head = styled.thead`
  font-weight: 700;
`;

function RatesTable() {
  const rates = trpc.rates.useQuery();

  return (
    <Container>
      <Table>
        <Head>
          <Row>
            <Cell>Country</Cell>
            <Cell>Currency</Cell>
            <Cell>Amount</Cell>
            <Cell>Code</Cell>
            <Cell>Rate</Cell>
          </Row>
        </Head>
        <tbody>
          {rates.data ? (
            rates.data.map((rate) => (
              <Row>
                <Cell>{rate.country}</Cell>
                <Cell>{rate.currency}</Cell>
                <Cell>{rate.amount}</Cell>
                <Cell>{rate.code}</Cell>
                <Cell>{rate.rate}</Cell>
              </Row>
            ))
          ) : (
            <Row>
              <LoadingCell colSpan={5}>Loading…</LoadingCell>
            </Row>
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default RatesTable;
