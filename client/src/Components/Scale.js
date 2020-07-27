import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";




const DiscreteSlider = (props) => {
    const useStyles = makeStyles(theme => ({
        root: {
          width: 300
        },
        margin: {
          height: theme.spacing(2)
        }
      }));
      
      
      
      
      const marks = [
        {
          value: 1,
          label: "Hard"
        },
        {
          value: 2,
          label: ""
        },
        {
          value: 3,
          label: "Average"
        },
        {
          value: 4,
          label: ""
        },
        {
          value: 5,
          label: "Total Bird"
        }
      ];
      



    function valuetext(value) {
        return `${value}`;
      }
    
    const classes = useStyles();
    const handleSliderChange = (event, newValue)=> {
    // Here, what we want to do, call a deeply nested call back function, which then notifies all the components of the new time
    props.Difficulty(newValue); 
  };

  return (
    <div className={classes.root}>
      <Slider
        defaultValue={()=> props.dval!=null?props.dval:console.log(props.dval) }
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-custom"
        step={0.5}
        max={5}
        min={1}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        marks={marks}
      />
    </div>
  );
}


export default DiscreteSlider;