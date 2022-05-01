import axios from "axios";
import React, { useState, useEffect } from "react";

interface target {
    value: string
}

interface val {
    target: target
}

interface geolocation {
    latitude?: number,
    longitude?: number
}

const Createaccount: React.FC = () => {

    let [username, setusername] = useState("")
    let [password, setpassword] = useState("")
    let [location, setlocation] = useState("")
    let [province, setprovince] = useState("")
    let [postofficename, setpostofficename] = useState("")
    let [geolocation, setgeolocation] = useState<geolocation>({})

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function(position) {
            setgeolocation({latitude: position.coords.latitude, longitude: position.coords.longitude})
        });
    }, [])

    const handleupdateusername = (val: val) => {
        setusername(val.target.value)
    }

    const handleupdatepassword = (val: val) => {
        setpassword(val.target.value)
    }

    const handleupdatepostofficename = (val: val) => {
        setpostofficename(val.target.value)
    }

    const handleupdatelocation = (val: val) => {
        setlocation(val.target.value)
    }

    const handleupdateprovince = (val: val) => {
        setprovince(val.target.value)
    }

    const handlecreateaccount = async () => {
        // console.log()
        axios.get(`https://api.myptv.com/geocoding/v1/locations/by-text?searchText=${location}&apiKey=ZjVmOTA2NmQ5YTZkNDk0NWEzNDQzNTIxOWY0MTdlODc6ZTA5YzNjY2QtN2FjOC00NTA5LWE2NjgtYjA1NGE4Nzg1NGY1`)
            .then((r) => {
                console.log(r.data)
            })
    }

    return <div>
        <input placeholder="username" onChange={handleupdateusername}/><br/>
        <input placeholder="password" onChange={handleupdatepassword}/><br/>
        <input placeholder="post office name" onChange={handleupdatepostofficename}/><br/>
        <input placeholder="address" onChange={handleupdatelocation}/><br/>
        <input placeholder="province" onChange={handleupdateprovince}/><br/>
        <button onClick={handlecreateaccount}>Create account</button>
    </div>
}

export default Createaccount