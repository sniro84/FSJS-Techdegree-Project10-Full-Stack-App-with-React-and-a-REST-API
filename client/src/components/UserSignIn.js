import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class UserSignIn extends Component {

    state = {
        email: '',
        password: '',
        errors: []
    };

    handleEmailAddressChange = (e) => {
        this.setState({email: e.target.value});
    }

    handlePasswordChange = (e) => {
        this.setState({password: e.target.value});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { context } = this.props;
        const { from } = this.props.location.state || { from: { pathname: "/" } };
        const { email, password } = this.state;
    
        context.actions.signIn(email,password)
            .then( (userData) => {
                if (userData === null) {
                    this.setState( () => {
                        return {errors: [ 'Sign-in was unsuccessful' ]};
                    });   
                }
                else {
                    this.props.history.push(from);
                    console.log(`SUCCESS! ${userData.emailAddress} is now signed in!`);
                }      
            })
            .catch( (err) => {
                console.log(err);
                this.props.history.push('/error');
            })
           
    }

    handleCancel = (e) => {
        e.preventDefault();
        this.props.history.push("/");  
    }

    render() {
        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign In</h1>

                    {this.state.errors.length > 0 &&
                        <div className="validation-errors">
                            <div>
                                <h2 className="validation--errors--label"> Validation Errors : </h2>
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
                                    id="emailAddress"
                                    name="emailAddress"
                                    type="text"
                                    className=""
                                    placeholder="Email Address"
                                    value={this.state.email}
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
                            <div className="grid-100 pad-bottom">
                                <button className="button" type="submit">Sign In</button>
                                <button className="button button-secondary" onClick={this.handleCancel} > Cancel</button>
                            </div>
                        </form>
                    </div>
                <p>&nbsp;</p>
                <p>
                    Don't have a user account? 
                    <Link to="/signup">Click here</Link> to sign up!
                </p>
                </div>
            </div>
        );
    }
}

export default UserSignIn;

