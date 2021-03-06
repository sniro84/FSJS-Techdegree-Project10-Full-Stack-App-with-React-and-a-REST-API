/*****************************************************************************
Treehouse FSJS Techdegree:
Project 10 - Full Stack App with React and a REST API
Name: Snir Holland
Date: 01/10/2019

>>> Component: Courses <<<

Retrieves the list of courses from the REST API, renders a list of courses,
links each course to its respective "Course Detail" screen, and renders a link
to the "Create Course" screen.
******************************************************************************/

import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Courses extends Component {
    
    state = {
        courses: []
    };
    
    componentDidMount() {
        const { context } = this.props;
        context.data.getCourses()
            .then( (data) => this.setState({ courses: data })) // courses have been successfully fetched.
            .catch( (error) => {   // an error has been occoured.
                const path = (error.name === 'notFound') ? "/notfound" : "/error"; 
                this.props.history.push(path);  
            });
    }

    render() {
        const {courses} = this.state; 
        return(
            <div className="bounds">       
                {courses.map( (course) => 
                    <div key={`${course.id}`} className="grid-33" >
                        <Link className="course--module course--link" to={`/courses/${course.id}`}>
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{course.title}</h3>
                        </Link>
                    </div>
                )}
    
                <div className="grid-33">
                    <Link className="course--module course--add--module" to="/courses/create">
                        <h3 className="course--add--title">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
                                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                            </svg>New Course
                        </h3>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Courses;