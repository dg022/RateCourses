import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

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

export default function DiscreteSlider() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Slider
        defaultValue={1}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-custom"
        step={0.5}
        max={5}
        min={1}
        valueLabelDisplay="auto"
        marks={marks}
      />
    </div>
  );
}
