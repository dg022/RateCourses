
import React  from 'react'; 
import ReactDOM from 'react-dom'; 

import App from './App'; 


import { BrowserRouter, Route, Switch } from "react-router-dom";

const rootElement = document.getElementById("root");

ReactDOM.render(
	 <BrowserRouter>
       <Switch>
        <Route exact path="/" component={App} />
      </Switch>
      </BrowserRouter>,
      rootElement
);


