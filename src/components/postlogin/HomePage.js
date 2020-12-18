import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import HomePageHeader from './HomePageHeader';

function HomePage({Logout,Name}) {
    return (
        <div>
            <HomePageHeader Logout={Logout} Name={Name}/>
          
        </div>
    )
}

export default HomePage
