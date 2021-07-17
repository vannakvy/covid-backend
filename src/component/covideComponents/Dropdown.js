import React from 'react';
import { Dropdown } from 'semantic-ui-react';
// import 'semantic-ui-css/semantic.min.css';

const DropdownExampleSearchSelection = ({ countryOption, change }) => (
 <Dropdown
  placeholder="World Wide"
  fluid
  search
  selection
  selectOnBlur={false}
  options={countryOption}
  onChange={(e, props) => {
   change(props.value);
  }}
 />
);

export default DropdownExampleSearchSelection;
