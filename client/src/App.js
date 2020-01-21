import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/laoyouts/Navbar";
import "./App.css";
import Landing from "./components/laoyouts/Landing";

const App = () => (
  <Router>
    <Fragment>
      <Navbar />
      <Route exact path="/" component={Landing} />
    </Fragment>
  </Router>
);

export default App;
