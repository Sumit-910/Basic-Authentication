import React from 'react';
import {Link} from "react-router-dom";

const Errorpage = () => {
    return (
        <>
            <div className="errorpage">
                <div className="err">
                    <div className="errorn">
                        404
                    </div>
                    <div className="errortxt">
                        We are sorry, page not found
                    </div>
                </div>
                <Link to="/" >Home</Link>
            </div>
        </>
    )
}

export default Errorpage
