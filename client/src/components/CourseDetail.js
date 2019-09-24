import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class CourseDetail extends Component {

    state = {
        courseDetail: {},
        userDetail: {}
    };

    handleDeleteCourse = () => {
        const url = `http://localhost:5000/api/courses/${this.props.match.params.id}`;
        return fetch(url , {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
           
        })
         .then( (res) => res.json() )
         .catch( (error) => console.log('Error: cannot delete course', error) )
    }

    componentDidMount() {
        fetch(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
            .then( (res) => res.json() )
            .then( (data) => {
                this.setState({ courseDetail: data })
                this.setState({ userDetail: data.User })
            }) 
            .catch( (error) => console.log('Error: failed to fetch data from api', error)) 
        }

    render() {
        let id = this.props.match.params.id;
        const {title,description,estimatedTime,materialsNeeded} = this.state.courseDetail;
        const {firstName, lastName} = this.state.userDetail;

        return (
            <div>
                <div className="actions--bar">
                    <div className="bounds">
                        <div className="grid-100">
                            <span>
                                <Link className="button" to={{pathname: `/courses/${id}/update`,state: {id,title,description,estimatedTime,materialsNeeded} }}>Update Course</Link>
                                <Link className="button" onClick={this.handleDeleteCourse} to="/">Delete Course</Link>
                            </span>
                            <Link className="button button-secondary" to="/">Return to List</Link>
                        </div>
                    </div>
                </div>

                <div className="bounds course--detail">
                    <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{title}</h3>
                            <p>By {firstName} {lastName} </p>
                        </div>

                        <div className="course--description">
                             <p> {description} </p>
                        </div>                  
                    </div>

                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <h3> {estimatedTime} </h3>
                                </li>

                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <ul>
                                         <li> {materialsNeeded} </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>   
        );
    }
}

export default CourseDetail;