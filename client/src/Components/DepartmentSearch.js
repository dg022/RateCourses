import faker from 'faker'
import _ from 'lodash'
import React from 'react'
import { Dropdown } from 'semantic-ui-react'
const Courses = require("./Courses.js"); 












const DropdownExampleSearchSelectionTwo = (props) => {


  const xah_obj_to_map = ( obj => {
    const mp = new Map;
    Object.keys ( obj ). forEach (k => { mp.set(k, obj[k]) });
    return mp;
});

const exposedCampaignOnChange = (e, {value}) => {
  e.persist();
  
  props.chooseDep(e.target.textContent);
  
};

const map =  xah_obj_to_map ( Courses.COURSES )


let keys =  Array.from( map.keys());


 

const addressDefinitions = faker.definitions.address

const stateOptions = _.map(keys, (state, index) => ({
  key: addressDefinitions.state_abbr[index],
  text: state,
  value: addressDefinitions.state_abbr[index],



})



)


  return(
  <Dropdown  onChange={exposedCampaignOnChange} placeholder='Deparment' search selection options={stateOptions} />
  ); 


};

export default DropdownExampleSearchSelectionTwo;
