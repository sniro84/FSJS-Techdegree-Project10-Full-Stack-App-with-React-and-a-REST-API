/******************************************************************************
Treehouse FSJS Techdegree:
Project 10 - Full Stack App with React and a REST API
Name: Snir Holland
Date: 01/10/2019

>>> Component: DeleteCourse <<<

Renders a warning screen to warn the user before the course is deleted. The warning
screen contains a "Delete Course" button that when clicked sends a DELETE request
to the REST API's /api/courses/:id route, a text field to confirm the course's title
before deletion takes place and a "Cancel" button that returns the user to the
"Course Detail" screen.
********************************************************************************/

import React,{Component} from 'react';

class DeleteCourse extends Component {

    componentDidMount() {
        const { context } = this.props;
        const pathID = this.props.match.params.id;
        const authUserID = context.authenticatedUser.id;
        context.data.getCourse(pathID)
            .then( (data) => {  
                if (authUserID !== data.User.id)  // authenticated user doesn't own the course 
                    this.props.history.push("/forbidden");
                else  // authenticated user owns the course 
                    this.setState({courseTitle: data.title});

            }) 
            .catch( (error) => {    // errors have been found
                const path = (error.name === 'notFound') ? "/notfound" : "/error";
                this.props.history.push(path); 
            });                   
    }

    state = {
        courseTitle: '',
        confirmTitle: '',
        error: '' 
    };

    // a method that respond to changes in the component state.
    handleConfirmTitleChange = (e) => {
        this.setState({confirmTitle: e.target.value})
    }

    // this method respond to the "Delete Course" button click event handler.
    handleSubmit = (e) => {
        e.preventDefault();
        const courseID = this.props.match.params.id;
        const { context } = this.props;
        const {emailAddress} = context.authenticatedUser;
        const password = context.originalPassword;
        const {confirmTitle,courseTitle} = this.state;
        

        if (confirmTitle === courseTitle) {  // title in the text field match the title of the course.
            context.data.deleteCourse(courseID, emailAddress, password)
            .then( () => {   // course has been successfully deleted.  
                console.log('Course has been successfully deleted.');
                this.setState({ error: '' });
                this.props.history.push("/");
            })   
            .catch( (error) => {   // errors have been found.
                const path = (error.name === 'notFound') ? "/notfound" : "/error";
                this.props.history.push(path); 
            });  
        }  
        else { // title in the text field doesn't match the title of the course.
            const message = `Course title in the confirmation box doesn't match the target course's title.`;
            this.setState({error: message }); 
        }       
    }

    // this method redirects back to the home page (list of courses)
    handleCancel = (e) => {
        e.preventDefault();
        const pathID = this.props.match.params.id;
        this.props.history.push(`/courses/${pathID}`);
    }

    render () {
        const {confirmTitle,courseTitle,error} = this.state;
        
        return (
            <div className="bounds course--detail">
                <h1>Warning!</h1>
                <p>
                    This action will delete the <b> '{courseTitle}' </b> course.
                    Once it is deleted, it <b> CANNOT </b> be recovered.
                </p>
                <p>
                    Please type the course title below to confirm the deletion:
                </p>

                {/* Confirmation error will be showed only if user tries to send an incorrect course title */}
                { (error !== '') && (courseTitle !== confirmTitle) && 
                    <div className="validation-errors">
                        <h3> {error} </h3>    
                    </div>
                }
 
                <form onSubmit={this.handleSubmit}>
                    <div className="grid">
                        <div className="course--title">
                            <input
                                id="title" 
                                name="title" 
                                className="input-title course--title--input"
                                placeholder="Confirm title..."
                                value={confirmTitle}
                                onChange={this.handleConfirmTitleChange}
                            />  
                        </div>
                    </div>
                    
                    <div className="grid-100 pad-bottom">
                        <button className="button" type="submit"> Delete Course</button>
                        <button className="button button-secondary" onClick={this.handleCancel} >Cancel</button>
                    </div>
                </form>  
            </div>
        );
    }
}

export default DeleteCourse;