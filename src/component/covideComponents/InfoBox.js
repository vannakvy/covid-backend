import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";

function InfoBox({ title, cases, total, active, isRed, ...props }) {
  return (
    <Card 
      onClick={props.onClick}
      className={`infoBox ${active && "infoBox--selected"} ${
        isRed && "infoBox--red"
      }`}
    >
      <CardContent>
        {/* <Typography  variant="h5" color="textSecondary" gutterBottom >
          
          {title}
        </Typography> */}
        <h4 className="infoBox_font">{title}</h4>
        <h3 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>
          {cases}
        </h3>

        <Typography as="" className=" infoBox_font" color="textSecondary">
        សរុប {total} 
        </Typography>
     
      </CardContent>
    </Card>
  );
}

export default InfoBox;