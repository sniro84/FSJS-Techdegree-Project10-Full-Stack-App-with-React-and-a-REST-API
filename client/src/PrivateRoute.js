/************************************************************************
Treehouse FSJS Techdegree:
Project 10 - Full Stack App with React and a REST API
Name: Snir Holland
Date: 01/10/2019

>>> PrivateRoute.js  <<<

A higher-order component (HOC) that is used to configure protected 
routes (i.e. routes that require authentication).
************************************************************************/

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context';

export default ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      { context => (
        <Route
          {...rest}
          render={(props) => context.authenticatedUser 
            ? (<Component {...props} />)   // an authenticated user exists --> render component
            : (<Redirect to={{   // an authenticated user doesn't exist --> redirect to Sign-In screen
              pathname: "/signin",
              state: { from: props.location }
            }} />)  
          }
        />
      )}
    </Consumer>
  );
};