import React, { useEffect, useState } from 'react'
import {Link,useHistory} from 'react-router-dom';
import '../../assets/styles/ChangePassword.css'
import Popup from '../../components/common/Popup'

const ChangePassword = () => {
    const password = window.localStorage.getItem('password')
    const [currentPassword,setCurrentPassword] = useState("")
    const [newPassword,setNewPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const [error,setError] =useState("")
    const [success,setSuccess]= useState(false)
    const history = useHistory()
    const passwordUpdateHandler = ()=>{
        if(newPassword==""||currentPassword==""||confirmPassword==""){
            setError(...error,"Password cannot be blank !!")
            setStrength("blank")
        }
        else if(newPassword==confirmPassword){
            if(currentPassword==password){
                setSuccess(true)
                window.localStorage.setItem('password',newPassword);
                
                
            }
            else{
                setError(...error,"Enter correct password !!")
                setStrength('blank')
                setNewPassword("")
            }
        }
        else{
            setError(...error,"Password Does'nt Match !!")
            setStrength('blank')
            setNewPassword("")
        }
        setNewPassword('')
    }
  

    const [length,setLength] = useState(false)
    const [alphacaps,setAlphaCaps] = useState(false)
    const [alphasmall,setAlphaSmall] = useState(false)
    const [numeric,setNumeric] = useState(false)
    const [spchar,setSpchar] = useState(false)
    const [strength,setStrength] = useState("blank")
    const [strengthScore,setStrengthScore] = useState(0)
    
    
   
    const passwordStrengthHandler = ()=>{
        setStrength(false)
        
      if(!length && newPassword.length>=8){setLength(true); setStrengthScore(strengthScore+1)}
      
        for(let i=0;i<newPassword.length;i++){
            
            let char = newPassword.charCodeAt(i)
            if(!alphacaps && char >=65 && char <=90){
                setAlphaCaps(true);
                setStrengthScore(strengthScore+1)}
            
            if(!alphasmall && char >=97 && char <=122){
                setAlphaSmall(true);
                setStrengthScore(strengthScore+1)
            }
            if(!numeric && char >=48 && char <=57){
                setNumeric(true);
                setStrengthScore(strengthScore+1)
            }
            if(!spchar && (char >=33 && char <=47 || char >= 58 && char <= 64)){
                setSpchar(true);
                setStrengthScore(strengthScore+1)
            }
            
        }
            
            if(strengthScore==1){setStrength('Poor')}
            if(strengthScore==2){setStrength('Medium')}
            if(strengthScore==3){setStrength('Good')}
            if(length && strengthScore==4){setStrength('Strong')}
                 
    }
    
    const successPopup = ()=>{
        setSuccess(!success)
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
        setStrength("blank")
    }
    const ErrorPopup = ()=>{
        setError("")
    }
    const clear = ()=>{
        setStrength('blank') 
    }
    return (
        <>
        {(error!=="")?(<Popup content={<>
                        <b id='logout-message'>{error}</b> 
                         
                        <div className='logout-buttons'>
                            <button onClick={ErrorPopup} className='button-logout' style={{backgroundColor: "red"}}>OK</button>
                        </div>
                        
                        </>}/>):null}
        {(success)?(<Popup content={
            <>
             <b id='logout-message'>Success :)</b>          
             <div className='logout-buttons'>
                 <button onClick={history.goBack} className='button-logout'>Done</button>
             </div>
             </>
        }/>):null
        }                
        <div className='updatePassword'>
            <div className='updatePasswordContent'>
                   <p className='p'>Change Password</p>
                
                    <div className='updatePassword-fields'>
                        <input type='password' placeholder='Current Password' required id='name' value={currentPassword} onChange={(e)=>setCurrentPassword(e.target.value)}></input>
                        <input type='password' placeholder='New Password' required id='name' value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} onKeyUp={passwordStrengthHandler}></input>
                            <div className={strength}>{(strength=='blank')?(""):(strength)}</div>
                        <input type='password' placeholder='Confirm Password' required id='name' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}></input>
                    </div>
                    <br/>

                    <div className='updatePassword-buttons'>
                                    <button type='submit' className='buttons' onClick={passwordUpdateHandler}>Update</button>
                                    <button type='submit' className='buttons' onClick={history.goBack} style={{backgroundColor: "red"}}>Cancel</button> 
                    </div>
 
            </div>
            
        </div>
        </>
    )
}

export default ChangePassword
