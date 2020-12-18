import React from "react";
import '../../assets/styles/PopupLogin.css'
 
const PopupLogin = (props) => {
  return (
    <div className="login-popup-box">
      <div className="loginbox">
        {props.content}
      </div>
    </div>
  );
};
 
export default PopupLogin;