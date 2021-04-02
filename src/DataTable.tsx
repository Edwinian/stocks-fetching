import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

interface Stock {
  symbol: string;
  price: number;
}

const stocks: Stock[] = [
  { symbol: "TSLA", price: 700 },
  { symbol: "AMZN", price: 3000 },
];

if (stocks.length > 500) {
  stocks.slice(stocks.length - 500)
}

const useStyles = makeStyles({
  table: {
    maxWidth: 650,
  },
});

export const DataTable = (props: any) => {
  const classes = useStyles();
  const [inputPrice, setInputPrice] = useState<string>("");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div style={{ margin: 30 }}>
        <h3>Type Price</h3>
        <input
          type="number"
          min = "0"
          value={inputPrice}
          onChange={(event) => setInputPrice(event.target.value)}
          placeholder="Type Price"
        />
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
            {stocks.map((stock) => (
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
