import React from 'react';
import logo from './logo.svg';

import './css/main.css'
import './css/overview.css'
import './css/stock-profiles.css'
import './css/support.css'
import './css/settings.css'

import { 
  BrowserRouter as Router,
  Route,
  Switch

} from 'react-router-dom'

import VerticalNavBar from './components/VerticalNavBar'
import HorizontalBar from './components/HorizontalBar'

import OverviewPage from './pages/OverviewPage/OverviewPage'
import AboutPage from './pages/AboutPage'
import StockPage from './pages/StockPage'
import NotFoundPage from './pages/NotFoundPage'
import SettingsPage from './pages/SettingsPage'

import 'react-notifications/lib/notifications.css';

import {NotificationContainer, NotificationManager} from 'react-notifications';


function App() {
  return (
    <>
      <Router>

          <div id='header'> Stocky </div>
          <VerticalNavBar />
          <HorizontalBar />
          <Switch>
                  <Route  path='/'  component={()=>(<OverviewPage email='paul@gmail.com' />) }  exact  />
                  <Route  path='/about'  component={AboutPage}    />
                  <Route  path='/settings'  component={SettingsPage}    />
                  <Route  path='/stocks/:symbol'  component={({match})=>(<StockPage match={match} email='paul@gmail.com' />)}    />
                  <Route component={NotFoundPage} />

          </Switch>
                    
          <div id='footer'>Paul Okenne - paulokenne@cmail.carleton.ca</div>
          <NotificationContainer/>
      </Router>
       
    </>
  );
}

export default App;
