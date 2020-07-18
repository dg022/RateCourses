import faker from 'faker'
import _ from 'lodash'
import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import { merge } from 'jquery';
const Courses = require("./Courses.js"); 



const DropdownExampleSearchSelectionTwo = (props) => {

  const exposedCampaignOnChange = (e, {value}) => {
    e.persist();
    
    props.selectCourse(e.target.textContent);
    
  };

  const xah_obj_to_map = ( obj => {
      const mp = new Map;
      Object.keys ( obj ). forEach (k => { mp.set(k, obj[k]) });
      return mp;
  });

  const map =  xah_obj_to_map ( Courses.COURSES )
  
  let keys = map.get(props.chooseCourse); 
  


  const addressDefinitions = faker.definitions.address
  const stateOptions = _.map(keys, (state, index) => ({
    key: addressDefinitions.state_abbr[index],
    text: state,
    value: addressDefinitions.state_abbr[index],
  }))




  return(
  <Dropdown onChange={exposedCampaignOnChange} placeholder='Search Courses' search selection options={stateOptions} />
  );
}

export default DropdownExampleSearchSelectionTwo
