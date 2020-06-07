import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import App from './App';
import FilmDetails from './components/FilmDetails/FilmDetails';
import NotFound from './components/NotFound/NotFound';
import Logo from './assets/logo.png';




const routing = (
          <Router>
            <div>
                      <Link to="/" className="Logo" >
                            <img src={Logo}  alt="logo"/>
                      </Link>

                  <Switch>
                      <Route path="/" component={App} exact />
                      <Route path="/films/:id" component={FilmDetails} />

                      <Route component={NotFound} />
                  </Switch>
            </div>
          </Router>

)

ReactDOM.render(routing, document.getElementById('root'));
