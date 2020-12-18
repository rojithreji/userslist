import React from "react";
import '../../assets/styles/PopupList.css'
 
const PopupList = (props) => {
  return (
    <div className="list-popup-box">
      <div className="listbox">
        {props.content}
      </div>
    </div>
  );
};
 
export default PopupList;