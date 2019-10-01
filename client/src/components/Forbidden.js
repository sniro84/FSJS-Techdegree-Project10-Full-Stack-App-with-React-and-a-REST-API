/******************************************************************************
Treehouse FSJS Techdegree:
Project 10 - Full Stack App with React and a REST API
Name: Snir Holland
Date: 01/10/2019

>>> Component: Forbidden <<<

Renders a message letting the user know that they can't access the requested page.
********************************************************************************/

import React from 'react';
import {NavLink} from 'react-router-dom';

const Forbidden = (props) => {
    return(
        <div className="bounds">
            <div className="grid-100 pad-bottom">
                <h1>Forbidden access</h1>
                <h2>You are not allowed to access the requested page.</h2>
            </div>
            
            <div className="grid-100 pad-bottom">
                <NavLink activeClassName="button" to="/"> Home </NavLink>
            </div>            
        </div>
    );
}

export default Forbidden;