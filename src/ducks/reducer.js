import axios from 'axios';

//CONSTANTS
const SAVE_USER = "SAVE_USER";


//ACTION CREATORS
export function saveUser(){
    return {
        type: SAVE_USER,
        payload: axios.get('/api/currentuser').then( (res) =>{                       
            return res.data;
        }).catch( (err) => {return err.message})
    }

}

//INITIAL STATE
const initialState = {
    user: []
};

//REDUCER
export default function reducer(state = initialState, action) {
    switch(action.type){
        case `${SAVE_USER}_PENDING`:       
        return Object.assign({}, state, {isLoading: true});

        case `${SAVE_USER}_FULFILLED`:        
        return Object.assign({}, state, {isLoading: false, user: action.payload});

        case `${SAVE_USER}_REJECTED`:        
        return Object.assign({}, state, {isLoading: false, didErr: true, errMessage: action.payload});

        default:
        return state;

    }
}