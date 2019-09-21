
import React, {Component} from 'react';
import Header from './components/Header';
import Courses from './components/Courses';
import './global.css';

class App extends Component {

  state = {
    courses: []
  };

  // componentDidMount() {
  //   fetch('http://localhost:5000/api/courses')
  //     .then( (res) => res.json() )
  //     .then( (data) => this.setState({ courses: data }))
  //     .catch( (error) => console.log('Error: failed to fetch data from api', error)) 
  // }

  render () {
    return (
      <div id="root">
        <div>
          <Header/>
          <hr></hr>
          <Courses/>
          {/* <ul>
           {this.state.courses.map( (course) => <li> {course.title} </li>)}
          </ul> */}
        </div>
      </div>
    );
  }
}

export default App;
