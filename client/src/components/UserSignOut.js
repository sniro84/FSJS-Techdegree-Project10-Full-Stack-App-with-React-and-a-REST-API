/************************************************************************
Treehouse FSJS Techdegree:
Project 10 - Full Stack App with React and a REST API
Name: Snir Holland
Date: 01/10/2019

>>> Component: UserSignOut <<<

Signs out the authenticated user and redirects the user to the 
default route (i.e. the list of courses).
************************************************************************/

import React from 'react';
import {Redirect} from 'react-router-dom';

const UserSignOut = ({context}) => {
    context.actions.signOut();
    return(
        <Redirect to="/" />
    );
}

export default UserSignOut;