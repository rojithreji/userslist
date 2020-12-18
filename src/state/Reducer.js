import {ADD_PERSON,DELETE_PERSON,EDIT_PERSON} from './Actions';

const initialState ={personList : [{name:'Rojith',id:'1',gender:'Male',priority:'Advanced',savings:'Yes',rd:'No'},
                                    {name:"Nevin", id:'2',gender:'Male',priority:'Advanced',savings:'No',rd:'No'},
                                    {name:"Roy", id:'3',gender:'Male',priority:'Basic',savings:'No',rd:'Yes'},
                                    {name:"Riya", id:'4',gender:'Female',priority:'Advanced',savings:'Yes',rd:'Yes'},
                                    {name:"Rakesh", id:'5',gender:'Male',priority:'Basic',savings:'No',rd:'No'},
                                    {name:"Rahul", id:'6',gender:'Female',priority:'Advanced',savings:'No',rd:'Yes'},
                                    {name:"Ranjith", id:'7',gender:'Male',priority:'Basic',savings:'Yes',rd:'No'},]
                    
                   
                    } 

let slno = 0;

const reducer = (state=initialState, action)=>{
    switch(action.type){
        case ADD_PERSON:
        {
            
            return{...state,personList:[...state.personList,action.payload]}
        }
        case DELETE_PERSON:
            {
                const deleted = state.personList.filter(person => person.id !== action.payload.id)
                return {...state,personList:deleted} 
            }
        case EDIT_PERSON:
            {
                return {
                    ...state,
                    personList: state.personList.map((content,i)=>
                        content.id === action.payload.id ? {...content,name:action.payload.name,id:action.payload.id,gender:action.payload.gender,priority:action.payload.priority,savings:action.payload.savings,rd:action.payload.rd}:content
                    )
                }
            
            }    
        default:
            return state;
    }
}



export default reducer;