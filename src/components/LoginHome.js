import React,{useState} from 'react'
import '../styles/LoginHome.css'

const LoginHome = ({Login, Error})=> {
    
    const [details, setDetils]=useState({username:"",password:""})
    const submitHandler =(error)=>{
        error.preventDefault()
        Login(details)

    }
const clearfield =()=>{
    setDetils({username:"",password:""})
}
    return (
        <div className='login'>
            <p className='loginHeading' >Login</p>
                <div className='loginForm'>
                    
                    <input type='text' className='username' placeholder='Username' required onChange={e=>setDetils({...details,username:e.target.value})} value={details.username}/>
                    <input type='password' className='password' placeholder='Password' required onChange={e=>setDetils({...details,password:e.target.value})} value={details.password}/>
                </div>
                <button type='submit' className='button'onClick={submitHandler} value='Submit'>Submit</button>
            
            
           
        </div>
    )
}

export default LoginHome;