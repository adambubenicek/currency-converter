import { useCallback, useEffect, useState } from "react";
import type { Rate } from "server/rates";
import { trpc } from "./trpc";
import styled from "styled-components";

const Container = styled.div`
  max-width: 377px;
  justify-self: center;

  @media (min-width: 987px) {
    justify-self: end;
  }
`;

const Input = styled.input`
  display: block;
  width: 100%;
  text-align: right;
  height: 34px;
  padding: 0 13px;
  border: none;
  border-right: 1px solid rgba(0, 0, 0, 0.2);

  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 89px;
  align-items: center;
`;

const RowBordered = styled(Row)`
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
`;

const Arrow = styled.p`
  text-align: right;
  padding: 13px;
`;

const Label = styled.p`
  display: block;
  padding: 0 13px;
`;

const OutputValue = styled.p`
  text-align: right;
  padding: 0 13px;
  line-height: 34px;
  border-right: 1px solid rgba(0, 0, 0, 0.2);
`;

const OutputSelect = styled.select`
  display: block;
  padding: 0 13px;
  width: 100%;
  background-color: white;
  border: none;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 34px;
`;

function Converter() {
  const rates = trpc.rates.useQuery();

  const [rate, setRate] = useState<Rate | null>();
  const [amount, setAmount] = useState(0);

  // Pick the first received rate automatically
  useEffect(() => {
    if (rates.data && rates.data[0]) {
      setRate(rates.data[0]);
    }
  }, [rates.data]);

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let newAmount = parseFloat(e.target.value);

      if (isNaN(newAmount)) newAmount = 0;

      setAmount(newAmount);
    },
    [setAmount]
  );

  const handleSelect = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (rates.data) {
        const newRate = rates.data.find((rate) => rate.code === e.target.value);

        if (newRate) {
          setRate(newRate);
        }
      }
    },
    [rates.data, setRate]
  );

  const convertedAmount = rate
    ? ((amount * rate.amount) / rate.rate).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : "—";

  return (
    <Container>
      <RowBordered>
        <Input type="number" value={amount.toString()} onChange={handleInput} />
        <Label>CZK</Label>
      </RowBordered>
      <Row>
        <Arrow>↓</Arrow>
      </Row>
      <RowBordered>
        <OutputValue>{convertedAmount}</OutputValue>
        {rates.data ? (
          <OutputSelect
            value={rate ? rate.code : undefined}
            onChange={handleSelect}
            disabled={!rates.data}
          >
            {rates.data &&
              rates.data.map((rate) => (
                <option value={rate.code} key={rate.code}>
                  {rate.code}
                </option>
              ))}
          </OutputSelect>
        ) : (
          <Label>…</Label>
        )}
      </RowBordered>
    </Container>
  );
}

export default Converter;
