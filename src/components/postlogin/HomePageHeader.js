import React,{useState} from 'react';
import {useHistory} from 'react-router-dom'
import '../../assets/styles/HomePageHeader.css'
import {Link} from 'react-router-dom'
import logo from '../../assets/images/logo.png';
import Popup from '../common/Popup';
import * as constants from '../../utilities/Constants'

const HomePageHeader = ({Logout})=> {

    const [isOpen, setIsOpen] = useState(false);
    const history = useHistory()
    const togglePopup = () => {
      setIsOpen(!isOpen);
    }

    
    const logoutHandler =(e)=>{
        history.push("/")
    }

    return (
        <div className='header'>
            <div className='header-left'>
                <div className='header-image'><img src={logo}></img></div>
            </div>
            
            <div className="header-right">
                <div className='header-text'>
                    <p className='user-name'></p>
                
                    </div>  
                
                    <div class="dropdown">
                     <span class="dropbtn">{window.sessionStorage.getItem('Username').toUpperCase()}</span><span className='arrow'>V</span> 
                        <div class="dropdown-content">
                            <a href="#" onClick={togglePopup}>Logout</a>
                            <Link to="/changepassword">Change Password</Link>
                        </div>
                        
                    </div>
                    
                    {isOpen && <Popup
                        content={<>
                            <b id='logout-message'>{constants.LOGOUT.LOGOUT_MESSAGE} </b>
                            <div className='logout-buttons'>
                                <button onClick={logoutHandler} className='button-logout' id='red'>{constants.LOGOUT.LOGOUT_CONFIRM}</button>
                                <button onClick={togglePopup} className='button-logout'>{constants.LOGOUT.LOGOUT_CANCEL}</button>
                            </div>
                            
                            </>}
                            handleClose={togglePopup}
                            />} 
                
            </div>
            
            
            
            
           
            
            
        </div>
    )
}

export default HomePageHeader














// import React from 'react';
// import '../styles/HomePageHeader.css'
// import logo from '../assets/logo.png';
// import Logout1 from './Logout';

// const HomePageHeader = ({Logout,Name})=> {

    
    
//     const logoutHandler =(e)=>{
//         Logout();
//     }


//     return (
//         <div id='header'>
//             <div id='header-image'><img src={logo}></img></div>
//             <div id='header-text'>
//                 <p id='user-name'>{Name} </p>
//             </div>
//             <div>
//                  <button id='logout' onClick={logoutHandler}>Logout</button>
//             </div>
            
//         </div>
//     )
// }

// export default HomePageHeader
