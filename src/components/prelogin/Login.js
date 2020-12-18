import React,{useEffect, useState} from 'react'
import {useSelector} from 'react-redux';
import {Link,Route,Redirect,useHistory,BrowserRouter as Router} from 'react-router-dom'
import PopupLogin from '../common/PopupLogin';
import '../../assets/styles/LoginHome.css'
import Input from '../common/Input';
import * as constants from '../../utilities/Constants'
import {clearTextField} from '../../utilities/CommonMethods'

function Login({login}) {

    const [success,setSuccess] = useState(false)
    const [currentUserName,setCurrentUserName] = useState("")
    const [currentPassword, setCurrentPassword]=useState("")
    const userNames =()=> window.localStorage.getItem('Username') || " "
    const [ user,setUser ] = useState(userNames)
    const userName = window.localStorage.getItem('Username')
    const password = window.localStorage.getItem('password')
    const [error, setError] = useState(false)   
    let history = useHistory()
    //Toggle Error

    const [isOpen, setIsOpen] = useState(false);
 
    const togglePopup = () => {
      setIsOpen(!isOpen);
      setError(false)

    }


    
    const submitHandler = ()=>{

        console.log("Users",currentUserName, currentPassword)

        if(currentUserName === userName && currentPassword == password){
            console.log("Success")
            setUser(currentUserName)
            setSuccess(true);
            
            console.log("User",user)
            login(currentUserName.toUpperCase())
        }

        else{
            setError(true)
            setCurrentUserName("")
            setCurrentPassword("")
           
            
        }    
    }
    const logout = ()=>{
        console.log("logout")
        setSuccess(false)
        
      }

      useEffect(()=>{
          window.sessionStorage.setItem('Username',user)
      },[user])
      
    const userNameHandler = (datas)=>{
        setCurrentUserName(datas)
        
    }  
    const passwordHandler = (datas)=>{
        setCurrentPassword(datas)
    } 

    return (
        
        <div className='login'>
            <p className='loginHeading' >Login</p>
                <div className='loginForm'>
                    
                    <Input type='text' id='username' placeHolder='Username' value={currentUserName} parentCallBack={(datas)=>userNameHandler(datas)} />
                    
                    <Input type='password' id='password' placeHolder='Password' value={currentPassword} parentCallBack={(datas)=>passwordHandler(datas)}/>
            
                </div>
               
    <button type='submit' className='button'onClick={submitHandler} value='Submit'>{constants.LOGIN_PAGE.LOGIN_FORM_SUBMIT_BUTTON}</button>
                {(error)?(
                    <PopupLogin
                        content={<>
                        <b id='logout-message'>{constants.LOGIN_PAGE.LOGIN_ERROR_MESSAGE} </b>
                        <div className='logout-buttons'>
                        <button onClick={togglePopup} className='button-logout' id='red'>{constants.LOGIN_PAGE.LOGIN_ERROR_BUTTON}</button>
                        </div>
                        
                        </>}
                        handleClose={togglePopup}
                        />):null}
       {(success)?(history.push("/add")):(history.push("/"))}
        </div>
    )
}

export default Login
