import React,{Component} from 'react';

class DeleteCourse extends Component {

    state = {
        confirmTitle: '',
        errors: []
    };

    handleConfirmTitleChange = (e) => {
        this.setState({confirmTitle: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const courseID = this.props.match.params.id;
        const { context } = this.props;
        const {emailAddress} = context.authenticatedUser;
        const password = context.originalPassword;
        const confirmTitle = this.state.confirmTitle;
        const courseTitle = this.props.location.state.title;
        const {errors} = this.state;

        if (confirmTitle === courseTitle) {
            context.data.deleteCourse(courseID, emailAddress, password)
            .then( () => {
                console.log('Course has been successfully deleted.');
                this.setState({ errors : [] });
                setTimeout( () => this.props.history.push("/") , 500);
            })   
            .catch( (error) => {
                console.log('Failed to delete course : ', error);
                this.props.history.push("/notfound");
            });  
        }  
        else {
            if (errors.length > 0)
                errors.pop();
            errors.push(`Course title in the confirmation box doesn't match the target course.`);
            this.setState({errors});
        }
    }

    handleCancel = (e) => {
        e.preventDefault();
        this.props.history.push(`/courses/${this.props.location.state.id}`);
    }

    render () {
        const confirmTitle = this.state.confirmTitle;
        const courseTitle = this.props.location.state.title;

        return (
            <div className="bounds course--detail">
                <h1>Warning!</h1>
                <p>
                    This action will delete the <b> '{this.props.location.state.title}' </b> course.
                    Once it is deleted, it <b> CANNOT </b> be recovered.
                </p>
                <p>
                    Please type the course title below to confirm the deletion:
                </p>

                { (this.state.errors.length > 0) && (courseTitle !== confirmTitle) && 
                    <div className="validation-errors">
                        <h2 className="validation--errors--label"> Validation Errors : </h2>
                        <ul>
                            {this.state.errors.map( (error,index) => {
                                return <li key={index}> {error} </li>
                            })}
                        </ul>     
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
                                value={this.state.confirmTitle}
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