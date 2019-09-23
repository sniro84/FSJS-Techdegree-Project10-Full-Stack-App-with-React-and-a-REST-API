
import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Header from './components/Header';
import Courses from './components/Courses';

import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
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
            
            <Route exact path="/" component={Courses}/>
            
            
            {/* <UpdateCourse /> */}
            {/* <CreateCourse /> */}
            {/* <UserSignUp /> */}
            {/* <UserSignIn /> */}
            {/* <CourseDetail id="1"/>  */}
          </div>
        </div>
      </BrowserRouter>    
    );
  }
}

export default App;
