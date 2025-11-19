import React from "react";

function Header({ title }) {
    return (
        <div className="box" id="heading">
        <h1>{title}</h1>
        </div>
    );
}

export default Header;
