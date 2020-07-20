
import React from 'react'; 
import SingleReview from './SingleReview';


const ReviewList = (props) => {
  const images = props.list.map(msg => {
    return <SingleReview list={msg} />;
  });

  return <div className="ui  list"> {images}</div>;
};

export default ReviewList;