import { Quote } from "./dto/stocks.dto";

export interface QuoteQuery {
  symbols?: string[];

  update_frequency_milliseconds?: number;

  elements_per_update?: number;
}

export class StocksAPI {
  public static async getQuotes(quoteQuery?: QuoteQuery): Promise<Quote[]> {

    // TODO:  control the frequency that the backend sends updates at
    // const res = await fetch(
    //   `${process.env.API_STOCKS}/stocks/quotes?symbols[]=${quoteQuery?.symbols}&update_frequency_milliseconds=${quoteQuery?.update_frequency_milliseconds}&elements_per_update=${quoteQuery?.elements_per_update}`,
    //   {
    //     method: "GET",
    //   }
    // );

    const res = await fetch(
        "http://localhost:8080/stocks/quotes",
        { method: "GET" }
      );

    const data = await res.json();

    return data;
  }
}
