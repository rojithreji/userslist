import React, { useState } from 'react'
import {BrowserRouter as Router, Switch, Route, useHistory, Redirect} from 'react-router-dom'
import CreateMenu from './components/postlogin/CreateMenu';
import ListMenu from './components/postlogin/ListMenu'
import EditPerson from './components/postlogin/EditPerson'
import Login from './components/prelogin/Login'
import HomePageHeader from './components/postlogin/HomePageHeader';
import ChangePassword from './components/postlogin/ChangePassword';
import HomePageMenu from './components/postlogin/HomePageMenu';
import Product from './components/postlogin/Product'

const App=()=> {
    const history = useHistory()
    const [user,setUser]= useState("")
    const [loggedIn,setLoggedIn] = useState(false)
    const login=(name)=>{
        let u_name=name
        u_name.toUpperCase()
        setLoggedIn(true)
        setUser(u_name)
    }
    window.localStorage.setItem('userName','admin');
    window.localStorage.setItem('password','admin');
    return (
            <div>
            <Router>
                <Switch>
                    <Route path='/' exact><Login login={login} /></Route>
                    {(loggedIn)?(<Route path='/add' exact><HomePageHeader Name={user} /><HomePageMenu/><CreateMenu/></Route>):(<Redirect to="/"/>)}
                    {(loggedIn)?(<Route path='/list' exact><HomePageHeader Name={user}/><HomePageMenu/><ListMenu/></Route>):(<Redirect to="/"/>)}
                    {(loggedIn)?(<Route path='/product' exact ><HomePageHeader Name={user} /><HomePageMenu/><Product/></Route>):(<Redirect to="/"/>)}
                    {(loggedIn)?(<Route path='/changepassword' exact ><HomePageHeader Name={user} /><HomePageMenu/><ChangePassword/></Route>):(<Redirect to="/"/>)}
                </Switch>    

            </Router>
            </div>

    )
}

export default App;
