export const ADD_PERSON = 'ADD_PERSON';
export const EDIT_PERSON = 'EDIT_PERSON';
export const DELETE_PERSON = 'DELETE_PERSON';

export const addPerson = (data)=>({
    type:ADD_PERSON,
    payload:data
}
)

export const deletePerson = (id)=>({
  type:DELETE_PERSON,
  payload:{
    id
}
}
)

export const updatePerson = (payload)=>({
  type:EDIT_PERSON,
  payload:payload
}
)