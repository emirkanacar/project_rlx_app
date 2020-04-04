import React from 'react';
import { Switch, Route } from 'react-router-dom';
import '../assets/Theme.css';
/*
 * Import Components
 */
import Home from "./Pages/Home";
import SinglePostPage from "./Pages/SinglePostPage";
import authLogin from  './Pages/authLogin';
import authRegister from './Pages/authRegister';
import authLogout from './Pages/authLogout';

function App() {
  return (
      <div>
          <Switch>
              <Route exact path={'/'} component={Home} />
              <Route path={'/post/:post_id'} component={SinglePostPage} />
              <Route path={'/auth/login'} component={authLogin} />
              <Route path={'/auth/register'} component={authRegister} />
              <Route path={'/auth/logout'} component={authLogout} />
          </Switch>
      </div>
  );
}


export default App;
