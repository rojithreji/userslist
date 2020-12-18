import React,{ useState, useCallback,useEffect } from 'react'
import {Link} from 'react-router-dom'
import CreatePerson from './CreateMenu'
import '../../assets/styles/ListMenu.css'
import Popup from '../common/Popup';
import PopupList from '../common/PopupList';
import Input from '../common/Input';
import {useSelector,useDispatch,connect} from 'react-redux'
import * as actions from '../../state/Actions'
import * as constants from '../../utilities/Constants'
import {addPerson,deletePerson} from '../../state/Actions'



const ListMenu=(props)=> {
    
    const dispatch = useDispatch()
    const [data,setData] = useState(props.personList)
    console.log("FRom list menu", data)
    const [isOpen, setIsOpen] = useState(false);
    const [searchResult,setSearchResult] = useState(data)
    const [search,setSearch]=useState("")
    const [clicked,setClicked] = useState("")
    const [isClicked,setIsClicked] = useState(false)

    // Counter for assigning sl no
    let i=1;
    
    // Fetching and setting delete id
    let deleteid = -1;
    let [deleteId,setDeleteId] = useState(deleteid)
    let [name,setName] = useState("")
    
    // Fetching and passing edit data
    
    let editable = false;
    let editno=-1;
    let [editID,setEditId] = useState(editno)
    let [editList,setEditList] = useState(editable)
    
    
    const togglePopup = (id,name) => {
  
        setDeleteId(id)
        setIsOpen(!isOpen);
        setName(name)
        
    }
    useEffect(()=>{
        setSearchResult(props.personList.filter(itm=>(itm.name.toLowerCase().includes(search.toLowerCase()))||(itm.gender.toLowerCase()===search.toLowerCase())||(itm.priority.toLowerCase().includes(search.toLowerCase()))))
    },[search,data,props.personList])
    
    const deleteHandler = (deleteId) =>{
       
            props.deletePerson(deleteId)
            togglePopup()
    }

    
    const editHandler =(id,key)=>{
        editList=!editList   
        setEditList(editList)
        setEditId(id)
        console.log()

        console.log(editList)

    }
    const clickHandler=(item)=>{
       
        setClicked(item)
        setIsClicked(!isClicked)
    }

    const toggleCancel= ()=>{
        setIsClicked(false)
    }

  
    const [savingsColor,setSavingsColor] = useState("")
    console.log(savingsColor)
  return(
        <>
                 
                {/* {(editList)?(<EditPerson item={editID} editHandler={editHandler}/>):null}  */}
            
            {isOpen && <Popup
                    content={<>
                        <b id='logout-message'>{constants.LIST_PAGE.LIST_PAGE_DELETE_MESSAGE} <span style={{color:'red'}}>{name}</span> ? </b>
                        <div className='logout-buttons'>
                    <button className='button-logout' id='red' onClick={()=>{deleteHandler(deleteId)}}>{constants.LIST_PAGE.LIST_PAGE_DELETE_MESSAGE_OK}</button>
                    <button onClick={togglePopup} className='button-logout'>{constants.LIST_PAGE.LIST_PAGE_DELETE_MESSAGE_CANCEL}</button>
                        </div>
                        
                        </>}
                        handleClose={togglePopup}
            />}
            {isClicked && <PopupList
                    content={<>
                    <div className="clickedData">
                        <h3 id='logout-message'><span className='clickedHeading'>{clicked.name}</span> </h3>
                        <p id='logout-message'>ID <span className="clickedItems">{clicked.id}</span> </p><hr/>
                        <p id='logout-message'>Gender <span className="clickedItems">{clicked.gender}</span> </p><hr/>
                        <p id='logout-message'>Priority <span className="clickedItems">{clicked.priority}</span> </p><hr/>
                        <p id='logout-message'>Savings <span className="clickedItems">{clicked.savings}</span> </p><hr/>
                        <p id='logout-message'>RD <span className="clickedItems">{clicked.rd}</span> </p><hr/>
                        </div>    
                        <div className='logout-buttons'>
                                <button onClick={toggleCancel} className='button-logout' id='red'>{constants.LIST_PAGE.LIST_PAGE_DELETE_MESSAGE_CANCEL}</button>
                        </div>
                        
                        </>}
                        handleClose={togglePopup}
            />}
            {(editList)?(<CreatePerson item={editID} editHandler={editHandler}/>):(
            <div className="Table">
                <div className='listHeader'>
                    <div className='listHeader-left'>
                        <p>{constants.LIST_PAGE.LIST_PAGE_HEADING}</p>
                    </div>
                    <div className='listHeader'><input type='text' placeholder="&#xF002; Search for Name and Priority" className='fontAwesome' onChange ={e=>setSearch(e.target.value)}/>
                    </div> 
                </div>
                <div className='listTable'>
                
                    <table>
                        <thead>
                            <th>{constants.TABLE_HEADING.LIST_TABLE_HEADING_1} </th>
                            <th>{constants.TABLE_HEADING.LIST_TABLE_HEADING_2} </th>
                            <th>{constants.TABLE_HEADING.LIST_TABLE_HEADING_3} </th>
                            <th>{constants.TABLE_HEADING.LIST_TABLE_HEADING_4} </th>
                            <th>{constants.TABLE_HEADING.LIST_TABLE_HEADING_5} </th>
                            <th>{constants.TABLE_HEADING.LIST_TABLE_HEADING_6} </th>
                            <th>{constants.TABLE_HEADING.LIST_TABLE_HEADING_7} </th>
                            <th></th>
                            <th></th>
                        </thead>    
                        
                        <tbody className='listTableData'> 
                                {searchResult.map(item=>(

                                            <tr key={item.id} >
                                                <td id='slno' onClick={()=>clickHandler(item)}>{i++}</td>
                                                <td ids='names' onClick={()=>clickHandler(item)}>{item.name}</td>
                                                <td id='id' onClick={()=>clickHandler(item)}>{item.id}</td>
                                                <td id='gender' onClick={()=>clickHandler(item)}>{item.gender}</td>
                                                <td id='priority' onClick={()=>clickHandler(item)}>{item.priority}</td>
                                                <td onClick={()=>clickHandler(item)} style={{color:(item.savings=='Yes')?('red'):(null)}}>{item.savings}</td>
                                                <td id='rd' onClick={()=>clickHandler(item)} style={{color:(item.rd=='Yes')?('red'):(null)}}>{item.rd}</td>
                                                <td id='edit'> <button  className='listGreen' onClick={()=>{editHandler(item)}} >{constants.TABLE_HEADING.LIST_TABLE_HEADING_8}</button></td>
                                                <td id='delete'><button className="listRed" onClick={()=>togglePopup(item.id,item.name)} >{constants.TABLE_HEADING.LIST_TABLE_HEADING_9}</button></td>
            
                                            </tr>
                                       
                                       
                                     
                                    ))}
                                
                            </tbody>
                            
                        
                    </table>
                    </div> 
   
                    
                
                </div>
                
                )}
        </>
    )
}

const mapStatetoProps = ({task1})=>{
    return {personList:task1.personList}
}

const mapDispatchtoProps = (dispatch)=>{
    return { deletePerson : (id)=>{dispatch(deletePerson(id))}}
}

export default connect(mapStatetoProps,mapDispatchtoProps)(ListMenu)
