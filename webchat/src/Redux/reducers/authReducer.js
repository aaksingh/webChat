import { Cred } from "../constants/constantsTypes";

export const INITIAL_STATE = {
    user=[]
}

export const user = (state=INITIAL_STATE,action)=>{

    switch(action.type){
        case Cred.SIGN_IN:
            return{

            }

        case Cred.SIGN_UP:
            return{

            }   
            
        default:
            return state;


    }
}