import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Quote } from "./api/dto/stocks.dto";
import { StocksAPI } from "./api/stocks.api";
export interface Stock {
  symbol: string;
  price: number;
}


const useStyles = makeStyles({
  table: {
    maxWidth: 650,
  },
});

export const DataTable = () => {
  const classes = useStyles();
  const [inputPrice, setInputPrice] = useState<string>("");
  const [frequency, setFrequency] = useState<string>("");

  const [stocks, setStocks] = useState<Quote[]>([]);

  useEffect(() => {
    async function getQuotes() {
      const res = await StocksAPI.getQuotes({update_frequency_milliseconds: parseInt(frequency)});

      // show last 500 elements
      if (res.length > 500) {
        res.slice(res.length - 500);
      }

      console.log("RES, ", res);
      

      setStocks(res);
    }

    getQuotes();
  }, [frequency]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <div style={{ margin: 30 }}>
          <h3>Price Highlight</h3>
          <input
            type="number"
            min="0"
            value={inputPrice}
            onChange={(event) => setInputPrice(event.target.value)}
            placeholder="Type Price"
          />
        </div>
        <div style={{ margin: 30 }}>
          <h3>Frequency Control</h3>
          <input
            type="number"
            min="100"
            value={frequency}
            onChange={(event) => setFrequency(event.target.value)}
            placeholder="Type Frequency"
          />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead style={{ border: "1px", backgroundColor: "grey" }}>
            <TableRow>
              <TableCell style={{ color: "white" }} align="center">
                Symbol
              </TableCell>
              <TableCell style={{ color: "white" }} align="center">
                Price
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ border: "1px" }}>
            {stocks.map((stock: Quote) => (
              <TableRow key={stock.symbol}>
                <TableCell align="center">{stock.symbol}</TableCell>
                <TableCell
                  style={{
                    backgroundColor:
                      stock.price > parseInt(inputPrice)
                        ? "green"
                        : stock.price < parseInt(inputPrice)
                        ? "red"
                        : "",
                  }}
                  align="center"
                >
                  {stock.price}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
