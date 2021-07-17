import React from "react";
import "./Table.css";
import numeral from "numeral";

function Table({ countries }) {
  return (
    <div className="covid_tables">
      {countries.map((country) => (
        <tr className="tr">
          <td className="td">{country.country}</td>
          <td className="td">
            <strong>{numeral(country.cases).format("0,0")}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
