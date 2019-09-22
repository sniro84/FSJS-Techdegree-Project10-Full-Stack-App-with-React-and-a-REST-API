import React, {Component} from 'react';

class CourseDetail extends Component {

    state = {
        courseDetail: {},
        userDetail: {}
    };

    getParagraphs = (text) => {
        const originalText = new String(text);
        const paragraphs = originalText.split('\n\n');
        return paragraphs;      
    }

    getMaterials = (text) => {
        let originalText = new String(text);
        originalText = originalText.substring(1);
        const materials = originalText.split('\n*');
        console.log(materials);
        return materials;
    }

    componentDidMount() {
        fetch(`http://localhost:5000/api/courses/${this.props.id}`)
            .then( (res) => res.json() )
            .then( (data) => {
                this.setState({ courseDetail: data })
                this.setState({ userDetail: data.User })
            }) 
            .catch( (error) => console.log('Error: failed to fetch data from api', error)) 
        }

    render() {
        const {id,title,description,estimatedTime,materialsNeeded} = this.state.courseDetail;
        const {firstName, lastName} = this.state.userDetail;
        console.log(description);

        return (
            <div>
                <div className="actions--bar">
                    <div className="bounds">
                        <div className="grid-100">
                            <span>
                                <a className="button" href="update-course.html">Update Course</a>
                                <a className="button" href="#">Delete Course</a>
                            </span>
                            <a className="button button-secondary" href="index.html">Return to List</a>
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
                             {this.getParagraphs(description).map( (paragrpah, index) => {
                                return <p key={index}> {paragrpah} </p>
                            })}
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
                                         {this.getMaterials(materialsNeeded).map( (material, index) => {
                                                return <li key={index}> {material} </li>
                                         })}
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