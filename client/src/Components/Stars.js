import React from 'react';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '45%',
    margin:'0 auto',
    display: 'flex',
    flexDirection: 'column',
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
  },
}));

export default function HalfRating(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
     
      <Rating size="large" name="half-rating-read" defaultValue={props.value} precision={0.1} readOnly />
    </div>
  );
}
