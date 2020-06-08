import React from "react";
import ReactDOM from "react-dom";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import App from "./App";
import FilmDetails from "./components/FilmDetails/FilmDetails";
import NotFound from "./components/NotFound/NotFound";
import Stats from "./components/Stats/Stats";

import "./index.scss";
import Logo from "./assets/logo.png";


// Router and Menu

const routing = (
  <Router>
    <div>
      <div className="Menu">
        <img src={Logo} alt="logo" />
        <ul>
          <li>
            <Link to="/" className="Logo">
              Home
            </Link>
          </li>
          <li>
            <Link to="/Stats" className="Stats">
              Stats
            </Link>
          </li>
        </ul>
      </div>
      <Switch>
        <Route path="/" component={App} exact />
        <Route path="/films/:id" component={FilmDetails} />

        <Route path="/Stats/" component={Stats} />

        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));
