import faker from 'faker'
import _ from 'lodash'
import React from 'react'
import { Dropdown } from 'semantic-ui-react'
const Courses = require("./Courses.js"); 

const xah_obj_to_map = ( obj => {
    const mp = new Map;
    Object.keys ( obj ). forEach (k => { mp.set(k, obj[k]) });
    return mp;
});


const map =  xah_obj_to_map ( Courses.COURSES )
let keys = Array.from( map.keys() );
console.log(keys)

 

const addressDefinitions = faker.definitions.address
console.log(addressDefinitions.state)
const stateOptions = _.map(keys, (state, index) => ({
  key: addressDefinitions.state_abbr[index],
  text: state,
  value: addressDefinitions.state_abbr[index],
}))

const DropdownExampleSearchSelectionTwo = () => (
  <Dropdown placeholder='Search Courses' search selection options={stateOptions} />
)

export default DropdownExampleSearchSelectionTwo
