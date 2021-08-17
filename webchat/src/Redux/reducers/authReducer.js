import { SIGN_IN, SIGN_UP } from "../constants/constants.js";

export const INITIAL_STATE = {
    user=[]
}

export const user = (state=INITIAL_STATE,action)=>{

    switch(action.type){
        case SIGN_IN:
            return{

            }

        case SIGN_UP:
            return{

            }   
            
        default:
            return state;


    }
}