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

interface postoffice {
    user_id: number,
    username?: string,
    password?: string,
    postofficename: string
}

const Createaccount: React.FC = () => {

    let [username, setusername] = useState<string>("")
    let [password, setpassword] = useState<string>("")
    let [location, setlocation] = useState<string>("")
    let [district, setdistrict] = useState<string>("")
    let [postofficename, setpostofficename] = useState<string>("")
    let [geolocation, setgeolocation] = useState<geolocation>({})
    let [error, seterror] = useState("")
    let [postoffices, setpostoffices] = useState<postoffice[]>([])

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

    // const handleupdatepostofficename = (val: val) => {
    //     setpostofficename(val.target.value)
    // }

    const handleupdatelocation = (val: val) => {
        setlocation(val.target.value)
    }

    const handleupdateprovince = (val: val) => {
        setdistrict(val.target.value)
    }

    const handlecreateaccount = async () => {
        // axios.get(`https://api.myptv.com/geocoding/v1/locations/by-text?searchText=${`${location} ${district}`}&apiKey=ZjVmOTA2NmQ5YTZkNDk0NWEzNDQzNTIxOWY0MTdlODc6ZTA5YzNjY2QtN2FjOC00NTA5LWE2NjgtYjA1NGE4Nzg1NGY1`)
        //     .then((r) => {
        //         console.log(r.data)
        //     })

        axios.get(`http://localhost:3000/postofficename/${district}`)
            .then((r) => {
                // console.log(r.data)
                if (r.data.success){

                    let response: postoffice[] = r.data.postoffices

                    for (let i = 0; i < response.length; i++){
                        delete response[i].password
                        delete response[i].username
                    }

                    setpostoffices(response)
                }
            })
        
        
    }

    const handleselectpostoffice = (index: number) => {
        setpostofficename(postoffices[index].postofficename)
    }

    return <div>
        <input placeholder="username" onChange={handleupdateusername}/><br/>
        <input placeholder="password" onChange={handleupdatepassword}/><br/>
        {/* <input placeholder="post office name" onChange={handleupdatepostofficename}/><br/> */}
        <input placeholder="address" onChange={handleupdatelocation}/><br/>
        <input placeholder="district" onChange={handleupdateprovince}/><br/>
        {postoffices.length > 0 && <span>selecct post office</span>}
        {postoffices.map((postoffice, index: number) => <div key={index}>
            <button onClick={() => handleselectpostoffice(index)}>
                {postoffice.postofficename}
            </button>
        </div>)}
        <button onClick={handlecreateaccount}>Create account</button>
    </div>
}

export default Createaccount