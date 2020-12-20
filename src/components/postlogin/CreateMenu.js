import React,{useState,Fragment, useEffect} from 'react'
import {Link} from 'react-router-dom'
import '../../assets/styles/CreateMenu.css'
import {connect} from 'react-redux';
import Popup from '../common/Popup'
import * as constants from '../../utilities/Constants'
import {addPerson,updatePerson} from '../../state/Actions'



const CreateMenu= (props)=> {
    
    
    //Popup Message
    let content = ""
    const [formError,setFormError]=useState("")
    const [idError,setIDError]=useState("")
    const [isOpen,setIsOpen]=useState(false)
    const togglePopup = ()=>{
        setIsOpen(!isOpen)
    }

    //popup for success message
    const [isSuccess,setIsSuccess]=useState(false)
    const toggleSuccess = ()=>{
        setIsSuccess(!isSuccess)
    }
   
    let [initialSavings,setInitialSavings] = useState(false)
    let [initialRd,setInitialRd] = useState(false)
    const [name,setName]=useState("")
    const [id,setId]=useState("")
    const [gender, setGender]= useState("")
    const [priority,setPriority] = useState("0")
    let [savings,setSavings] = useState("No")
    let [rd,setRd] = useState("No")

    const rdHandler = ()=>{
        setInitialRd(initialRd=!initialRd)
        initialRd?setRd("Yes"):setRd("No")
        console.log("rddd",rd)
    }
    const savingsHandler = ()=>{
        setInitialSavings(initialSavings=!initialSavings)
        initialSavings?setSavings("Yes"):setSavings("No")
        console.log("save",initialSavings)
    }
    //Edit Section
    const [isEdit,setIsEdit]= useState(false)

    
    
    
    useEffect(()=>{
        (props.item===undefined)?(console.log('test test')):edittest()
    },[props.item])
    

    let duplicate_id=0;
   
 
    const submitHandler =(error)=>{

        idChecker(id)
        if(name==="" || id==="" || gender==="" || priority==='0'){
       
           setFormError("Enter All Fields");
           togglePopup()
       }
       
       else if(duplicate_id === 0){

                let data={name,id,gender,priority,savings,rd}
                isEdit?props.updatePerson(data):props.addPerson(data)
                
                clearfield()
                setFormError("")
                setIDError("")
                toggleSuccess()
       
        }
     }
     const updateHandler =(error)=>{

        if(name==="" || id==="" || gender==="" || priority==='0'){
       
           setFormError("Enter All Fields");
           togglePopup()
       }
       else{

                let data={name,id,gender,priority,savings,rd}
                props.updatePerson(data)
                props.editHandler()
       
        }
     }    

    const idChecker = (c_id)=>{
        props.personList.forEach(person=>{
            if(person.id === c_id){
                duplicate_id=1;
                setIDError("ID Already Taken")
                togglePopup()
                
            }
      })

    }

    const clearfield = ()=>{
        setName("")
        setId("")
        setGender("")
        setPriority("")
        setSavings("")
        setRd("")
    }

const edittest = ()=>{
    setIsEdit(true)
    setName(props.item.name)
    setId(props.item.id)
    setGender(props.item.gender)
    setPriority(props.item.priority)
    setSavings(props.item.savings)
    setRd(props.item.rd)
}


console.log(name)

    return (
        <>
        {isOpen && <Popup
                    content={<>
                        <b id='logout-message'><li style={{fontSize:'12px', color:'red'}}>{idError}</li><li style={{fontSize:'12px'}}>{formError}</li></b> 
                         
                        <div className='logout-buttons' onHover={togglePopup}>
                    <button onClick={togglePopup} className='button-logout' id='red' style={{fontSize:'10px', width:'70px',height:'25px'}}>{constants.CREATE_PAGE.ADD_PERSON_ERROR_BUTTON}</button>
                        </div>
                        
                        </>}
                        handleClose={togglePopup}
                />}
        {isSuccess && <Popup
                    content={<>
                        <b id='logout-message'>{constants.CREATE_PAGE.ADD_PERSON_SUCCESS_MESSAGE}</b> 
                         
                        <div className='logout-buttons'>
                            <button onClick={toggleSuccess} className='button-logout'>Done</button>
                        </div>
                        
                        </>}
                        handleClose={togglePopup}
                />}        
        <div className='create'>
            <div className='createContent'>
                    {isEdit?(<p className='p'>Edit Person</p>):(<p className='p'>{constants.CREATE_PAGE.ADD_PERSON_HEADING}</p>)}
                
                    <div className='create-fields'>
                    <input type='text' placeholder='Name' required id='name' value={name} onChange={(e)=>setName(e.target.value)}></input>
                    {isEdit?(<input type='number' placeholder='ID' required min='1' id='id' value={id}></input>):(<input type='number' placeholder='ID' required min='1' id='id' value={id} onChange={(e)=>setId(e.target.value)}></input>)}
                    <br/>

                    <label className='gender'>{constants.CREATE_PAGE.ADD_PERSON_GENDER} </label>
                    {(gender==='Male')?(<label className='radio_label'><input type='radio' name='gender' className='check' id='male' value='Male' checked onChange={e=>setGender('Male')} ></input>Male<span></span></label>):(<label className='radio_label'><input type='radio' name='gender' className='check' id='male' value='Male' onChange={e=>setGender('Male')} ></input>Male<span></span></label>)}
                    <br></br>
                    {(gender==='Female')?(<label className='radio_label radio2'><input type='radio' name='gender' checked className='check' id='female' value='Female' onChange={e=>setGender('Female')}></input>Female<span></span></label>):(<label className='radio_label radio2'><input type='radio' name='gender' className='check' id='female' value='Female' onChange={e=>setGender('Female')}></input>Female<span></span></label>)}
                    
                    <br/>
                    <div className='select'>
                        <select name='priority' id='select' onChange={e=>setPriority(e.target.value)} value={priority}>
                            <option default value= '0'>Priority</option>
                            <option value='Basic'>Basic</option>
                            <option value='Advanced'>Advanced</option>
                        </select>   
                     </div>
                     <div className='checkbox'>
                        {(savings=='Yes')?(<> <input type="checkbox" id="savings"name="savings" value="savings" checked onChange={()=>setSavings("No")}/> <label for="savings">Savings</label></> ):(<><input type="checkbox" id="savings"    name="savings" value="savings" onChange={()=>setSavings("Yes")} /><label for="savings">Savings</label></>)}
                    
                    
                        {(rd=='Yes')?(<><input type="checkbox" id="rd" name="rd" value="rd" checked onChange={()=>setRd('No')}/><label for="rd"  >RD</label></>):(<><input type="checkbox" id="rd" name="rd" value="rd" onChange={()=>setRd('Yes')}/><label for="rd" >RD</label></>)}
                    </div>
                
                    {isEdit?(<div className='edit-buttons'>
                                    <button type='submit' className='buttons' onClick={updateHandler}>Update</button>
                                    <Link to='/list'><button type='submit' className='buttons' style={{backgroundColor: "red"}} onClick={props.editHandler}>Cancel</button></Link>
                             </div>):
                            (<button type='submit' className='buttons' onClick={submitHandler}>{constants.CREATE_PAGE.ADD_PERSON_SUBMIT_BUTTON}</button>)}
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
    return { addPerson : (data)=>{dispatch(addPerson(data))},
            updatePerson : (data)=>{dispatch(updatePerson(data))}}
    return { }
}

export default connect(mapStatetoProps,mapDispatchtoProps)(CreateMenu)

