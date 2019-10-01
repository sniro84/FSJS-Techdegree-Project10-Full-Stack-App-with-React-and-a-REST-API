import React from 'react';
import {NavLink} from 'react-router-dom';

const UnhandledError = (props) => {
    return(

        <div className="bounds">
            <div className="grid-100 pad-bottom">
                <h1>OOPS...</h1>
                <h2>An unexpected error has occurred.</h2>
            </div>
            
            <div className="grid-100 pad-bottom">
                <NavLink activeClassName="button" to="/"> Home </NavLink>
            </div>            
        </div>
    );
}

export default UnhandledError;