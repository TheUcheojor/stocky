import React from 'react';
import logo from './logo.svg';
import './App.css';

import { 
  BrowserRouter as Router,
  Route,
  Switch

} from 'react-router-dom'

import VerticalNavBar from './components/VerticalNavBar'
import HorizontalBar from './components/HorizontalBar'

import OverviewPage from './pages/OverviewPage'
import AboutPage from './pages/AboutPage'
import StockPage from './pages/StockPage'
import NotFoundPage from './pages/NotFoundPage'
import SettingsPage from './pages/SettingsPage'



function App() {
  return (
    <>
      <Router>

          <div id='header'> Stocky </div>
          <VerticalNavBar />
          <HorizontalBar />
          <Switch>
                  <Route  path='/'  component={OverviewPage}  exact  />
                  <Route  path='/about'  component={AboutPage}    />
                  <Route  path='/settings'  component={SettingsPage}    />
                  <Route  path='/stocks/:name'  component={StockPage}    />
                  <Route component={NotFoundPage} />

          </Switch>
          
          <div id='footer'>Paul Okenne - paulokenne@cmail.carleton.ca</div>

      </Router>
       
    </>
  );
}

export default App;
