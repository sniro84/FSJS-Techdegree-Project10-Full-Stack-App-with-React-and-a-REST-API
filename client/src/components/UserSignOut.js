import React from 'react';
import {Redirect} from 'react-router-dom';

const UserSignOut = (props) => {
    return(
        // sign out user
        <Redirect to="/" />
    );
}

export default UserSignOut;