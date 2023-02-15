import { z } from "zod";
import axios from "axios";

const URL =
  "https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt";

const Rate = z.object({
  country: z.string(),
  currency: z.string(),
  amount: z.number(),
  code: z.string(),
  rate: z.number(),
});

type Rate = z.infer<typeof Rate>;

export function parse(ratesString: string): Rate[] {
  return ratesString
    .split("\n")
    .slice(2, -1) // skip date, header, and last empty line
    .map((rateLineString) => {
      const [country, currency, amountString, code, rateString] =
        rateLineString.split("|");

      const amount = parseFloat(amountString);
      const rate = parseFloat(rateString);

      return Rate.parse({
        country,
        currency,
        amount,
        code,
        rate,
      });
    });
}

export async function fetchRates(): Promise<Rate[]> {
  const response = await axios.get(URL);

  return parse(response.data);
}
