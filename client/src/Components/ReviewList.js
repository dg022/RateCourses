
import React from 'react'; 
import SingleReview from './SingleReview';
import "./Review.css";


const ReviewList = (props) => {
  const images = props.list.map(msg => {
    return <SingleReview list={msg} />;
  });

  return <div id="Review"className="ui items "> {images}</div>;
};


export default ReviewList;