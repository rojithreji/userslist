import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import '../../assets/styles/HomePageMenu.css'
import * as constants from '../../utilities/Constants'

function HomePageMenu() {
    const [active,setActive] =useState(1)
    const activeHandler = (index)=>{
        setActive(index)
    }
    return (
        <div className='homePageMenu'>
        
            <div className={(active==1)?'menuItem active':'menuItem'} onClick={()=>{setActive(1)}}><Link to='/add'>{constants.MENU_HEADING.MENU_HEADING_1}</Link></div>
            <div className={(active==2)?'menuItem active':'menuItem'} onClick={()=>{setActive(2)}}><Link to='/list'>{constants.MENU_HEADING.MENU_HEADING_2}</Link></div>
            <div className={(active==3)?'menuItem active':'menuItem'} onClick={()=>{setActive(3)}}><Link to='/product'>{constants.MENU_HEADING.MENU_HEADING_3}</Link></div>    
            
        </div>
    )
}

export default HomePageMenu
