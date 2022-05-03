import axios from "axios";
import React, { useState } from "react";

interface inputevent {
    target: {value: string}
}

interface responsefromordereruserreq {
    data: {success: boolean, accountexists?: boolean}
}

const Login: React.FC = () => {

    let [username, setusername] = useState("")
    let [password, setpassword] = useState("") 

    const handleupdateusername = (e: inputevent) => {
        setusername(e.target.value)
    }
    
    const handleupdatepassword = (e: inputevent) => {
        setpassword(e.target.value)
    }

    const handlelogin = async () => {

        console.log(`https://dry-shore-19751.herokuapp.com/ordereruser/${username}/${password}`)

        await axios.get(`https://dry-shore-19751.herokuapp.com/ordereruser/${username}/${password}`)
            .then((r: responsefromordereruserreq) => {
                if (r.data.success){
                    if (r.data.accountexists){
                        localStorage.setItem("username", username)
                        localStorage.setItem("password", password)

                        window.location.href = window.location.origin + "/home"
                    }
                }

                console.log(r.data)
            })
    }

    return <div>
        <input onChange={handleupdateusername} placeholder="username"/><br/>
        <input onChange={handleupdatepassword} placeholder="password"/><br/>
        <button onClick={handlelogin}>Confirm</button>
    </div>
}

export default Login