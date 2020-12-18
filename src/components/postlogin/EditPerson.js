import React,{useState} from 'react'
import '../../assets/styles/EditPerson.css'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import * as actions from '../../state/Actions'
import Popup from '../common/Popup';
import {updatePerson} from '../../state/Actions'


const EditPerson =({item,editHandler,updatePerson})=> {
    
    // Fetching data corresponding to id from state and using react hooks
    console.log("id",item)
   
    let current_data = item


    // actions performed on submit

    const [name,setName]=useState(item.name)
    const [id,setId]=useState(item.id)
    const [gender, setGender]= useState(item.gender)
    const [priority,setPriority] = useState(item.priority)
    const [savings,setSavings] = useState(item.savings)
    const [rd,setRd] = useState(item.rd)
    
    const c_gender = gender;
    const [iSaving, setISaving] = useState(savings)
    const [iRd,setIRd]=useState(rd)
    console.log("Rd from edit",iRd)
    const submitHandler =(error)=>{

       
        if(name==="" || gender==="" || priority==='0'){
       
           togglePopup()
       }
       else{
           let payload = {name :name,id:id,gender:gender,priority:priority,savings:savings,rd:rd}
            updatePerson(payload)
            editHandler()
       }
     }  
     // Popup for form validation
     const [isOpen, setIsOpen] = useState(false)
     const togglePopup = () => {
        setIsOpen(!isOpen);
    }
    
        return (
            <>

                {isOpen && <Popup
                    content={<>
                        <b id='logout-message'>Enter All Fields !!! </b>
                        <div className='logout-buttons'>
                            <button onClick={togglePopup} className='button-logout' id='red'>Cancel</button>
                        </div>
                        
                        </>}
                        handleClose={togglePopup}
                />}
            
            <div className='edit'>
            <div className='editContent'>
                <p className='p'>Edit Person</p>
                <div className='edit-fields'>
                    <input type='text' placeholder="Name" onChange={e=>setName(e.target.value)} value={name} required></input>
                    <input type='number' value={id} required min='1'></input>
                    <br/>
                    <label className='gender'>Gender : </label>
                    {(c_gender==='Male')?(<label className='radio_label'><input type='radio' name='gender' className='check' id='male' value='Male' checked onChange={e=>setGender('Male')} ></input>Male<span></span></label>):(<label className='radio_label'><input type='radio' name='gender' className='check' id='male' value='Male' onChange={e=>setGender('Male')} ></input>Male<span></span></label>)}
                    
                    <br></br>
                
                    {(c_gender==='Female')?(<label className='radio_label radio2'><input type='radio' name='gender' checked className='check' id='female' value='Female' onChange={e=>setGender('Female')}></input>Female<span></span></label>):(<label className='radio_label radio2'><input type='radio' name='gender' className='check' id='female' value='Female' onChange={e=>setGender('Female')}></input>Female<span></span></label>)}
                    
                    <br/>
                    <div className='select'>
                        <select name='priority' onChange={e=>setPriority(e.target.value)} value={priority} >
                            <option default value='0'>Priority</option>
                            <option value='Basic' onClick={e=>setPriority('Basic')}>Basic</option>
                            <option value='Advanced' onClick={e=>setPriority('Advanced')} >Advanced</option>
                        </select>   
                    </div>
                    <div className='checkbox'>
                    
                       {(iSaving=='Yes')?(<> <input type="checkbox" id="savings"name="savings" value="savings" checked onChange={()=>setSavings("No")}/> <label for="savings">Savings</label></> ):(<><input type="checkbox" id="savings"    name="savings" value="savings" onChange={()=>setSavings("Yes")} /><label for="savings">Savings</label></>)}
                    
                    
                       {(iRd=='Yes')?(<><input type="checkbox" id="rd" name="rd" value="rd" checked/><label for="rd"  onChange={()=>setRd('No')}>RD</label></>):(<><input type="checkbox" id="rd" name="rd" value="rd" onChange={()=>setRd('Yes')}/><label for="rd" >RD</label></>)}
                    </div>
                    
            
                    <div className='edit-buttons'>
                        <button type='submit' className='buttons' onClick={submitHandler}>Update</button>
                        <button type='submit' className='buttons' style={{backgroundColor: "red"}} onClick={editHandler}>Cancel</button>

                    </div>
                    
                </div>
                
                
            </div>
            
        </div>   
    </>
    )
}

const mapStatetoProps = ({task1})=>{
    return {personList:task1.personList}
}

const mapDispatchtoProps = (dispatch)=>{
    return { updatePerson : (data)=>{dispatch(updatePerson(data))}}
}

export default connect(mapStatetoProps,mapDispatchtoProps)(EditPerson)

