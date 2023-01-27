import React, { useState } from "react";
import "./bigButton.css";

export const BigButton = (props) => {

return(
    <>
    <button className="btn" {...props}>{props.children}</button>
    </>
)
}
