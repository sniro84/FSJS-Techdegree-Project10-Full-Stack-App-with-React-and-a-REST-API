
import React, {Component} from 'react';
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import './global.css';

class App extends Component {

  render () {
    return (
      <div id="root">
        <div>
          <Header/>
          <UserSignUp />
          {/* <UserSignIn /> */}
          {/* <CourseDetail id="1"/>  */}
          {/* <Courses/> */}
          
        </div>
      </div>
    );
  }
}

export default App;
