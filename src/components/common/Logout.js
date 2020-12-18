
import React, { useState } from 'react';
import Popup from '../common/Popup';
 
function Logout() {

  const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
 
  return <div>
    <input
      type="button"
      value="Click to Open Popup"
      onClick={togglePopup}
    />

    {isOpen && <Popup
      content={<>
        <b>Do you Want Logout </b>
        <button onClick={togglePopup} className='button'>Cancel</button>
      </>}
      handleClose={togglePopup}
    />}
  </div>
}
 
export default Logout;