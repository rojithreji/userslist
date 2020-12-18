import React from "react";
import '../../assets/styles/PopupProduct.css'
 
const Popup1 = (props) => {
  return (
    <div className="product-popup-box">
      <div className="productbox">
        {props.content}
      </div>
    </div>
  );
};
 
export default Popup1;