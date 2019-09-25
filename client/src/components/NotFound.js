import React from 'react';
import {Redirect} from 'react-router-dom';

const NotFound = (props) => {
    return(
        <div className="bounds">
            <h1>Page Not Found</h1>
            <Redirect to="/notfound" />
        </div>
    );
}

export default NotFound;