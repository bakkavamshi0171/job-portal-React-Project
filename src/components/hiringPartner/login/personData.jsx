import { createContext, useState } from "react";

export const Logindetails = createContext()

export const  LoginPersonDetailsProvider=({children})=>{
    const [persondetails, setPersonDetails]= useState(null) 

    return(
        <Logindetails.Provider value={{persondetails,setPersonDetails }} >
            {children}
        </Logindetails.Provider>
    )
}