import React, { Component } from "react";

import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
const DatePickerTwo = ({ranges, setRange}) => {
 
  const handleSelect = (ranges) => {
    
    setRange({
      startDate: ranges.selection.startDate,
      endDate: ranges.selection.endDate,
    });
  };

  const selectionRange = {
    startDate: ranges.startDate,
    endDate: ranges.endDate,
    key: "selection",
  };

  const ran = {
    startDate: ranges.startDate,
    endDate: ranges.endDate,
  };

  return (
    <DateRangePicker
      showSelectionPreview={true}
      showDateDisplay={true}
      ranges={[selectionRange]}
      onChange={handleSelect}
      showMonthAndYearPickers={true}
      showSelectionPreview={true}
      showPreview={true}
      editableDateInputs={true}
      // color="#721f9c"
      // rangeColors={[" #0f0c29"]}
      preview={ran}
    />
  );
};

export default DatePickerTwo;

// items.save({
//   name: "example",
//   created_at: ISODate("2010-04-30T00:00:00.000Z")
// })
// items.find({
//   created_at: {
//       $gte: ISODate("2010-04-29T00:00:00.000Z"),
//       $lt: ISODate("2010-05-01T00:00:00.000Z")
//   }
// })
// => { "_id" : ObjectId("4c0791e2b9ec877893f3363b"), "name" : "example", "created_at" : "Sun May 30 2010 00:00:00 GMT+0300 (EEST)" }
