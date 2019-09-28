import React,{Component} from 'react';

class UpdateCourse extends Component {

    state = {
        title: this.props.location.state.title,
        description: this.props.location.state.description,
        estimatedTime: this.props.location.state.estimatedTime,
        materialsNeeded: this.props.location.state.title.materialsNeeded,
        errors: []
    };

    handleTitleChange = (e) => {
        this.setState({title: e.target.value})
    }

    handleDescriptionChange = (e) => {
        this.setState({description: e.target.value})
    }

    handleEstimatedTimeChange = (e) => {
        this.setState({estimatedTime: e.target.value})
    }

    handleMaterialsNeededChange = (e) => {
        this.setState({materialsNeeded: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {title,description,estimatedTime,materialsNeeded} = this.state;
        const courseID = this.props.location.state.id;
        const { context } = this.props;
        const emailAddress = context.authenticatedUser.emailAddress;
        const userId = context.authenticatedUser.id;
        const password = context.originalPassword;
        const body = {userId,title,description,estimatedTime,materialsNeeded}

        context.data.updateCourse(courseID, body, emailAddress, password)
            .then( (errors) => {
                if (errors.length) 
                    this.setState({errors});   
                else {
                    this.props.history.push("/");
                    console.log('Course has been successfully updated.');          
                }
            })
            .catch( (error) => {
                console.log(error);
                this.props.history.push('/error');
            });  
    }

    handleCancel = (e) => {
        e.preventDefault();
        this.props.history.push(`/courses/${this.props.location.state.id}`);
    }

    render () {
        const { context } = this.props;
        const {firstName,lastName} = context.authenticatedUser;
        return (
            <div className="bounds course--detail">
                <h1>Update Course</h1>

                {this.state.errors.length > 0 &&
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
                    <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <input 
                                id="title"
                                name="title"
                                type="text"
                                className="input-title course--title--input"
                                placeholder="Course title..."
                                value={this.state.title}
                                onChange={this.handleTitleChange}
                            />        
                            <p>By {firstName} {lastName} </p>
                        </div>
                        <div className="course--description">
                            <textarea 
                                id="description" 
                                name="description" 
                                className=""
                                placeholder="Course description..."
                                value={this.state.description}
                                onChange={this.handleDescriptionChange}
                            />  
                        </div>
                    </div>
                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <input
                                        id="estimatedTime"
                                        name="estimatedTime"
                                        type="text"
                                        className="course--time--input"
                                        placeholder="Hours"
                                        value={(this.state.estimatedTime) ? this.state.estimatedTime : ""}
                                        onChange={this.handleEstimatedTimeChange}
                                    />        
                                    
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <textarea 
                                        id="materialsNeeded"
                                        name="materialsNeeded"
                                        className=""
                                        placeholder="List materials..."
                                        value={(this.state.materialsNeeded) ? this.state.materialsNeeded : ""}
                                        onChange={this.handleMaterialsNeededChange}
                                    />
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="grid-100 pad-bottom">
                        <button className="button" type="submit">Update Course</button>
                        <button className="button button-secondary" onClick={this.handleCancel} >Cancel</button>
                    </div>
                </form>  
            </div>
        );
    }
}

export default UpdateCourse;