// src/App.js

import React, {Component} from 'react';

class App extends Component {

  state = {
    courses: []
  };

  componentDidMount() {
    fetch('http://localhost:5000/api/courses')
      .then( (res) => res.json() )
      .then( (data) => this.setState({ courses: data }))
      .catch( (error) => console.log('Error: failed to fetch data from api', error)) 
  }

  render () {
    return (
      <div>
        <h1> React App that consumes Restful api </h1>
        <ul>
           {this.state.courses.map( (course) => <li> {course.title}</li>)}
        </ul>
      </div>
    );
  }
}

export default App;
