import React, {Component} from 'react';
import Data from '../Data';
import {Link} from 'react-router-dom';

class CourseDetail extends Component {

    constructor() {
        super();
        this.data = new Data();
    }

    state = {
        courseDetail: {},
        userDetail: {}
    };

    componentDidMount() {
        this.data.getCourse(this.props.match.params.id)
            .then( (data) => {
                this.setState({ courseDetail: data })
                this.setState({ userDetail: data.User })
            }) 
            .catch( (error) => {
                console.log('Error: failed to fetch data from api', error);
                this.props.history.push("/notfound"); 
            });            
    }

    handleDeleteCourse = () => {
        const { context } = this.props;
        const {emailAddress, password} = context.authenticatedUser;      
        const courseID = this.props.match.params.id;

        this.data.deleteCourse(courseID, emailAddress, password)
            .catch( (error) => {
                console.log('Error: cannot delete course', error);
                this.props.history.push("/notfound");
            });
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
                                <Link 
                                    className="button" 
                                    to={{
                                        pathname: `/courses/${id}/update`,
                                        state: {id,title,description,estimatedTime,materialsNeeded}
                                    }}> Update Course        
                                </Link>
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