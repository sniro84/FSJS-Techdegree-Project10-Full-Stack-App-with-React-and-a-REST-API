
import React, {Component} from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';

import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignOut from './components/UserSignOut';
import NotFound from './components/NotFound';
import './global.css';


class App extends Component {

  signIn = () => {
    return true;
  }

  render () {
    return (
      <BrowserRouter>
        <div id="root">
          <div>
            <Header signedIn={this.signIn} />
            <Switch>
              <Route exact path="/" component={Courses}/>
              <Route path="/courses/create" component={CreateCourse} />
              <Route path="/courses/:id/update" render={ (props) => < UpdateCourse {...props} /> } />
              <Route path="/courses/:id" component={CourseDetail} />
              <Route path="/signin" component={UserSignIn} />
              <Route path="/signup" component={UserSignUp} />
              <Route path="/signout" component={UserSignOut} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>    
    );
  }
}

export default App;
