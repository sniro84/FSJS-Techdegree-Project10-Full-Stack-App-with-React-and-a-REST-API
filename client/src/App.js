
import React, {Component} from 'react';
import Header from './components/Header';
import CourseDetail from './components/CourseDetail';
import './global.css';

class App extends Component {

  render () {
    return (
      <div id="root">
        <div>
          <Header/>
          <CourseDetail id="1"/> 
          {/* <Courses/> */}
          
        </div>
      </div>
    );
  }
}

export default App;
