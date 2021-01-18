import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import AssetCartographyView from './view/AssetCartographyView';
import HomeView from './view/HomeView';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import AssetEvaluationView from './view/AssetEvaluationView';
import ThreatEvaluationView from './view/ThreadEvaluationView';
import ResultTableView from "./view/ResultTableView";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={HomeView}/>
      <Route exact path='/asset-cart' component={AssetCartographyView}/>
      <Route exact path='/asset-eval' component={AssetEvaluationView}/>
      <Route exact path='/threat-eval' component={ThreatEvaluationView}/>
      <Route exact path='/results' component={ResultTableView}/>
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
