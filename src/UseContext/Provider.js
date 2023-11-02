import { Context } from "./ThemeContext";
import axios from "axios";
import { useEffect, useState } from "react";

function Provider({children}) {

    const [isload, setIsLoad] = useState(false);
    const [user, setUser] = useState(null)

    useEffect(() => {
        if (localStorage.getItem('token') != null) {
            let t = localStorage.getItem("token")
            let username = localStorage.getItem("username")
            let token = 'Bearer ' + t;
            
            // Get Data about Account
            axios.get(`/account/get-account?username=${username}`, {headers : {Authorization : token, 'Content-Type': 'application/json'}}) 
                .then(res => {
                    if (res.data != "") {
                      setUser(res.data)
                    } else {
                      localStorage.removeItem('token')
                      localStorage.removeItem('username')
                    }
                })
        }
    }, [isload])

    return ( 
        <Context.Provider value={[isload,setIsLoad,user]}>
            {children}
        </Context.Provider>
     );
}

export default Provider;