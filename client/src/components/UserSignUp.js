import React,{Component} from 'react';
import {Link} from 'react-router-dom';

class UserSignUp extends Component {

    state = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        confirmPassword:'',
        errors: []
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
        const { context } = this.props;
        const {firstName,lastName,emailAddress,password} = this.state;
        const user = {firstName,lastName,emailAddress,password}; 

        context.data.createUser(user)
            .then( (errors) => {
                if (errors.length) 
                    this.setState({errors});
                else if(this.state.password !== this.state.confirmPassword) {
                    this.setState({
                        errors: [...this.state.errors, "Please confirm your password." ]
                      });
                }
                else
                    console.log(`${emailAddress} is successfully signed up and authenticated!`);    
            })
            .catch( (error) => {
                console.log(error);
                this.props.history.push('/error');
            });
            
              
    }

    handleCancel = (e) => {
        e.preventDefault();
        this.props.history.push("/"); 
    }

    render() {
        const {firstName,lastName,emailAddress,password,confirmPassword} = this.state;
        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>

                    {this.state.errors.length > 0 &&
                        <div className="errors">
                            <div>
                                <h2> Validation Errors : </h2>
                                <ul>
                                    {this.state.errors.map( (error,index) => {
                                        return <li key={index}> {error} </li>
                                    })}
                                </ul>       
                            </div>             
                        </div>
                    }
                
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <input 
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    className=""
                                    placeholder="First Name"
                                    value={firstName}
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
                                    value={lastName}
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
                                    value={emailAddress}
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
                                    value={password}
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
                                    value={confirmPassword}
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

