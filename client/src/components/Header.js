import React from 'react';
import {Link} from 'react-router-dom';

const Header = (props) => {
    if (props.signedIn === true) {
        return(
            <div className="header">
                <div className="bounds">
                    <h1 className="header--logo">Courses</h1>
                    <nav>
                        <span>Welcome Joe Smith!</span>
                        <Link className="signout" to="/">Sign Out</Link>
                    </nav>
                </div>
            </div>
        );  
    }
    else {
        return(
            <div className="header">
                <div className="bounds">
                    <h1 className="header--logo">Courses</h1>
                    <nav>
                        <Link className="signup" to="/signup">Sign Up</Link>
                        <Link className="signin" to="/signin">Sign In</Link>
                    </nav>
                </div>
            </div>
        );
    }
}

export default Header;