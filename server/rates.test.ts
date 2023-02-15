import { parse } from "./rates";
import { describe, it, expect } from "@jest/globals";

describe("parse", () => {
  it("parses well formated input", () => {
    expect(
      parse(
        [
          "13 Feb 2023 #31",
          "Country|Currency|Amount|Code|Rate",
          "United Kingdom|pound|1|GBP|26.890",
          "USA|dollar|1|USD|22.216",
          "Japan|yen|100|JPY|16.759",
        ].join("\n")
      )
    ).toEqual([
      {
        country: "United Kingdom",
        currency: "pound",
        amount: 1,
        code: "GBP",
        rate: 26.89,
      },
      {
        country: "USA",
        currency: "dollar",
        amount: 1,
        code: "USD",
        rate: 22.216,
      },
      {
        country: "Japan",
        currency: "yen",
        amount: 100,
        code: "JPY",
        rate: 16.759,
      },
    ]);
  });

  it("throws when input is malformed", () => {
    expect(() =>
      parse(
        [
          "13 Feb 2023 #31",
          "Country|Currency|Amount|Code|Rate",
          "United Kingdom|pound|1|missing_column",
        ].join("\n")
      )
    ).toThrow();

    expect(() =>
      parse(
        [
          "13 Feb 2023 #31",
          "Country|Currency|Amount|Code|Rate",
          "United Kingdom|pound|not_a_number|GBP|26.890",
        ].join("\n")
      )
    ).toThrow();
  });
});
