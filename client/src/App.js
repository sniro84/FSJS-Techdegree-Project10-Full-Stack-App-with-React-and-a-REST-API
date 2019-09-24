
import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignOut from './components/UserSignOut';
import NotFound from './components/NotFound';
import withContext from './Context';
import './global.css';

const UserSignUpWithContext = withContext(UserSignUp);

class App extends Component {

  signIn = (email,password) => {
    alert(`email : ${email} , password : ${password}`);
  }

  render () {
    return (
      <BrowserRouter>
        <div id="root">
          <div>
            <Header signedIn={true} />
            <Switch>
              <Route exact path="/" component={Courses}/>
              <Route path="/courses/create" component={CreateCourse} />
              <Route path="/courses/:id/update" render={ (props) => < UpdateCourse {...props} /> } />
              <Route path="/courses/:id" component={CourseDetail} />
              <Route path="/signin" render={ (props) => < UserSignIn {...props} signInUser={this.signIn} /> } />
              <Route path="/signup" component={UserSignUpWithContext} />
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
