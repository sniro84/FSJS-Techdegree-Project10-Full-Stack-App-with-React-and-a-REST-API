import React,{Component} from 'react';
import {Link} from 'react-router-dom';

class UserSignUp extends Component {

    state = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        confirmPassword:''
    };

    handleFirstNameChange = (e) => {
        this.setState({firstName: e.target.value})
    } 

    handleLastNameChange = (e) => {
        this.setState({lastName: e.target.value})
    }

    handleEmailAddressChange = (e) => {
        this.setState({emailAddress: e.target.value})
    }

    handlePasswordChange = (e) => {
        this.setState({password: e.target.value})
    }

    handleConfirmPasswordChange = (e) => {
        this.setState({confirmPassword: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        alert(`first: ${this.state.firstName} last: ${this.state.lastName} `);
        const url = `http://localhost:5000/api/users`;
        return fetch(url , {
            method: 'POST',
            body: {
                "firstName":  this.state.firstName,
                "lastName": this.state.lastName,
                "emailAddress": this.state.emailAddress,
                "password":  this.state.password
            },
            headers: {'Content-Type': 'application/json'}
        })
         .then( (res) => res.json() )
         .catch( (error) => console.log('Error: cannot create user', error) )   
    }

    handleCancel = (e) => {
        e.preventDefault();
        this.props.history.push("/"); 
    }

    render() {
        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <input 
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    className=""
                                    placeholder="First Name"
                                    value={this.state.firstName}
                                    onChange={this.handleFirstNameChange}
                                 />
                            </div>
                            <div>
                                <input 
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    className=""
                                    placeholder="Last Name"
                                    value={this.state.lastName}
                                    onChange={this.handleLastNameChange}
                                />
                            </div>
                            <div>
                                <input 
                                    id="emailAddress"
                                    name="emailAddress"
                                    type="text"
                                    className=""
                                    placeholder="Email Address"
                                    value={this.state.emailAddress}
                                    onChange={this.handleEmailAddressChange}
                                />
                            </div>
                            <div>
                                <input 
                                    id="password"
                                    name="password"
                                    type="password"
                                    className=""
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={this.handlePasswordChange}
                                />
                            </div>
                            <div>
                                <input 
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    className=""
                                    placeholder="Confirm Password"
                                    value={this.state.confirmPassword}
                                    onChange={this.handleConfirmPasswordChange}
                                />
                            </div>
                            <div className="grid-100 pad-bottom">
                                <button className="button" type="submit">Sign Up</button>
                                <button className="button button-secondary" onClick={this.handleCancel} >Cancel</button></div>
                        </form>
                    </div>
                <p>&nbsp;</p>
                <p>Already have a user account? 
                    <Link to="/signin">Click here</Link> to sign in!
                </p>
                </div>
            </div>
        );
    }
}

export default UserSignUp;

