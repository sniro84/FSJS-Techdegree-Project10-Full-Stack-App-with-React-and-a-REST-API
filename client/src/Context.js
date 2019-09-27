import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

const Context = React.createContext(); 

export class Provider extends Component {

  state = {
      authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
      originalPassword : Cookies.get('originalPassword') || ''
  };  

  constructor() {
    super();
    this.data = new Data();
  }

  render() {
    const { authenticatedUser,originalPassword} = this.state;

    const value = {
        authenticatedUser,
        originalPassword,
        data: this.data,
        actions: { 
            signIn: this.signIn,
            signOut: this.signOut
        }
    };

    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

  signIn = async (emailAddress, password) => {
    this.setState({originalPassword: password});
    const userData = await this.data.getUser(emailAddress,password);
    if (userData !== null) {
        this.setState( () => {
            return {
                authenticatedUser: userData
            };
        });
        Cookies.set('authenticatedUser',JSON.stringify(userData), { expires: 1 });
        Cookies.set('originalPassword',password,{expires: 1});
    }
    return userData;
  }

  signOut = () => {
    this.setState({ 
      authenticatedUser: null,
      originalPassword: ''
    });
    Cookies.remove('authenticatedUser');
    Cookies.remove('originalPassword');
  }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}