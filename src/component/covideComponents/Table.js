import React from "react";
import "./Table.css";
import numeral from "numeral";

function Table({ district }) {
  return (
    <div className="covid_tables">
      {district?.map((dis) => (
        <tr className="tr">
          <td className="td">{dis.district}</td>
          <td className="td">
            <strong>{numeral(dis.confirmedCase).format("0,0")}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
