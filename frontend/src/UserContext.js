import React from 'react';
import { createContext, useContext } from 'react';

export const UserContext = createContext(null);


function userHook(Component){
    return function WrappedComponent(props){
        const msg = useContext(UserContext);
        return <Component {...props} msg = {msg} />
    }
}


 export default userHook;