import React from 'react';

const Forbidden = (props) => {
    return(
        <div className="bounds">
            <div className="grid-100 pad-bottom">
                <h1>Forbidden access</h1>
                <h2>You are not allowed to access the requested page.</h2>
            </div>
            
            <div className="grid-100 pad-bottom">
                <button className="button" onClick={ () => props.history.push("/") }> Home</button>
            </div>            
        </div>
    );
}

export default Forbidden;