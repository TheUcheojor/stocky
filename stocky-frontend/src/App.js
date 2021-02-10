import React, {useState} from 'react';
import logo from './logo.svg';

import 'sweetalert2/src/sweetalert2.scss'
import './css/main.css'
import './css/overview.css'
import './css/stock-profiles.css'
import './css/support.css'
import './css/settings.css'
import './css/strategy-console.css'
import './css/login-register.css'

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
import SettingsPage from './pages/SettingsPage/SettingsPage'
import StrategyConsolePage from './pages/StrategyConsolePage'

import LoginRegisterPage from './pages/LoginRegisterPage/LoginRegisterPage'

import useUser from './custom_hooks/useUser'
import showMobileNavigationMenu from './support/showMobileNavigationMenu'




function App() {

  const {user, setUser,logoutUser}= useUser();

  if(!user){
    return <LoginRegisterPage setUser={setUser} />
  }

  return (

  

      <Router>
          <div id='header' onClick={showMobileNavigationMenu}> Stocky </div>
          <VerticalNavBar />
          <HorizontalBar name={user.name} logoutUser={logoutUser} />
          <Switch>
                  <Route  path='/'  component={()=>(<OverviewPage email={user.email} />) }  exact  />
                  <Route  path='/about'  component={AboutPage}    />
                  <Route  path='/settings'  component={()=>( <SettingsPage email={user.email} />)}    />
                  <Route  path='/strategy-console'  component={()=>( <StrategyConsolePage email={user.email} />)}    />
                  <Route  path='/stocks/:symbol'  component={({match})=>(<StockPage match={match} email={user.email} />)}    />
                  <Route component={NotFoundPage} />
          </Switch>
                    
          <div id='footer'>Paul Okenne - paulokenne@cmail.carleton.ca</div>
      </Router>
       
  );
}

export default App;
