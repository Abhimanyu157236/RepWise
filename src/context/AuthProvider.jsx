import React from 'react';
import { useContext, useState, useEffect,createContext } from 'react';
import { account } from '../../service/appwrite';

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const[user,setUser] = useState(null)

    const logOut = async()=>{
        try {
          
        await account.deleteSessions()
        setUser(null) 
        console.log("logout") 

        } catch (error) {
            console.log("logout error",error)
        }
    }


    useEffect(()=>{
      
        const getUser = async() =>{
            try {
                const res = await account.get()
                setUser(res)
            } catch (error) {
                setUser(null)
            }
        }

        getUser()
    },[])

  return (
    <AuthContext.Provider value={{user,setUser,logOut}}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = ()=>{
    return useContext(AuthContext)
}

export default AuthProvider;

