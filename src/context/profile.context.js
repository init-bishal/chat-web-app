import { createContext, useContext, useEffect, useState } from "react";
import { auth ,database} from "../misc/firebase";

const profileContext=createContext()
export const ProfileProvider=({children})=>{
    const [profile,setProfile]=useState(null)
    const [isLoading,setIsLoading]=useState(true)
    // we gonna use useEffect to get the user from the firebase when the component mounts
    useEffect(()=>{
        let userRef ;
        // it allow us to subscribe to currently signed in user inside firebase
        // onAuthStateChange returns  a unsubscribe function
        const authUnSub=auth.onAuthStateChanged(authObj=>{
            if (authObj) // if authObj exist then the user is signed in
            {
                // to put a real time subscription we need to use on
                // whenever our data at this path changes the callback will be called
                userRef=database.ref(`/profile/${authObj.uid}`)
                userRef.on('value',(snap)=>{
                    // snap.val() -> it will give us data from the database in the form of js object
                    const {name,createAt}=snap.val()
                    //settig the profile value
                    const data={
                        name:name, 
                        createAt:createAt,
                        uid:authObj.uid, 
                        email:authObj.email, 
                        
                    }
                    setProfile(data)
                    setIsLoading(false)

                })
            }
            else{// or else the user is not signed in
                setProfile(null)
                setIsLoading(false)
                if(userRef)
                {
                    userRef.off()
                }
            }
        })
        return ()=>{
            authUnSub()
            if(userRef)
            {
                userRef.off()
            }
        }
    },
    [])  

    return (
        // in order to pass a value as a context we need to pass as prop to provider component
    <profileContext.Provider value={{profile, isLoading}}> 
        {children}
    </profileContext.Provider>
    )
}
// wrapper for profile context 
export const useProfile=()=>useContext(profileContext)