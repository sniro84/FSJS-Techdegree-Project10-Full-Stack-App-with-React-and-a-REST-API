import React from 'react';

const Header = (props) => {
    if (props.signedIn()) {
        return(
            <div className="header">
                <div className="bounds">
                    <h1 className="header--logo">Courses</h1>
                    <nav>
                        <span>Welcome Joe Smith!</span>
                        <a className="signout" href="index.html">Sign Out</a>
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
                        <a className="signup" href="sign-up.html">Sign Up</a>
                        <a className="signin" href="sign-in.html">Sign In</a>
                    </nav>
                </div>
            </div>
        );
    }
}

export default Header;