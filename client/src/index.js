
import React  from 'react'; 
import ReactDOM from 'react-dom'; 

import App from './App'; 
import Feedback from './Feedback';

import { BrowserRouter, Route, Switch } from "react-router-dom";

const rootElement = document.getElementById("root");

ReactDOM.render(
	 <BrowserRouter>
       <Switch>
        <Route exact path="/" component={App} />
        <Route path="/page2" component={Feedback} />
      </Switch>
      </BrowserRouter>,
      rootElement
);


