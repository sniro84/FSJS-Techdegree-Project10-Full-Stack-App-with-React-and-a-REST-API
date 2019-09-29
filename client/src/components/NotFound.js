import React from 'react';

const NotFound = (props) => {
    return(
        <div className="bounds">
            <div className="grid-100 pad-bottom">
                <h1>OOPS...</h1>
                <h2>The requested page can't be found!</h2>
            </div>
            
            <div className="grid-100 pad-bottom">
                <button className="button" onClick={ () => props.history.push("/") }> Home</button>
            </div>            
        </div>
    );
}

export default NotFound;