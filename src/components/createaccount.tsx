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

interface address {
    city: string,
    countryName: string,
    district: string,
    houseNumber: string,
    postalCode: string,
    province: string,
    state: string,
    subdistrict: string,

}

interface quality {
    totalScore: number
}

// interface geolocation {
//     latitude: number,
//     longitude: number
// }

interface infofornewordereruser {
    username: string,
    password: string,
    locationlat: number | undefined,
    locationlong: number | undefined,
    postofficename: string,
}

interface responsefromgeocodingapi {
    address: address
    formattedAddress: string,
    locationType: string,
    quality: quality,
    referencePosition: {latitude: number, longitude: number},
    roadAccessPostion: {latitude: number, longitude: number}
    // referencePosition: geolocation,
    // roadAccessPostion: geolocation
}

interface responsefromnewordereruserreq {
    data: {success: boolean}
}

const Createaccount: React.FC = () => {

    let [username, setusername] = useState<string>("")
    let [password, setpassword] = useState<string>("")
    let [address, setaddress] = useState<string>("")
    let [district, setdistrict] = useState<string>("")
    let [postofficename, setpostofficename] = useState<string>("")
    let [geolocation, setgeolocation] = useState<geolocation>({})
    let [error, seterror] = useState("")
    let [postoffices, setpostoffices] = useState<postoffice[]>([])
    let [potentiallocations, setpotentiallocations] = useState<responsefromgeocodingapi[]>([])
    let [location, setlocation] = useState<responsefromgeocodingapi | null>(null)

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

    const handleupdateaddress = (val: val) => {
        setaddress(val.target.value)
    }

    const handleupdateprovince = (val: val) => {
        setdistrict(val.target.value)
    }

    const handlecreateaccount = async () => {
        // axios.get(`https://api.myptv.com/geocoding/v1/locations/by-text?searchText=${`${location} ${district}`}&apiKey=ZjVmOTA2NmQ5YTZkNDk0NWEzNDQzNTIxOWY0MTdlODc6ZTA5YzNjY2QtN2FjOC00NTA5LWE2NjgtYjA1NGE4Nzg1NGY1`)
        //     .then((r) => {
        //         console.log(r.data)
        //     })
        try {
            if (postofficename !== "" && address !== ""){
                
                let req: infofornewordereruser = {
                    username: username,
                    password: password,
                    locationlat: location?.referencePosition.latitude,
                    locationlong: location?.referencePosition.longitude,
                    postofficename: postofficename,
                }

                // await axios.post(`https://dry-shore-19751.herokuapp.com/newordereruser/${req.username}/${req.password}/${req.locationlat}/${req.locationlong}/${req.postofficename}`, {
                await axios.post(`https://dry-shore-19751.herokuapp.com/newordereruser/${req.username}/${req.password}/${req.locationlat}/${req.locationlong}/${req.postofficename}`, {
                    location: address
                })
                    .then((r: responsefromnewordereruserreq) => {
                        if (!r.data.success){
                            seterror("there has been a issue signing you in please try again")
                        } else if (r.data.success){

                            localStorage.setItem("username", username)
                            localStorage.setItem("password", password)
                            localStorage.setItem("postofficename", postofficename)

                            window.location.href = window.location.origin + "/home"
                        }
                    })
            } else if (postofficename === "") {
                
                await axios.get(`https://dry-shore-19751.herokuapp.com/postofficename/${district}`)
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

                await axios.get(`https://api.myptv.com/geocoding/v1/locations/by-text?searchText=${address}&apiKey=ZjVmOTA2NmQ5YTZkNDk0NWEzNDQzNTIxOWY0MTdlODc6ZTA5YzNjY2QtN2FjOC00NTA5LWE2NjgtYjA1NGE4Nzg1NGY1`)
                    .then((r) => {
                        let response: responsefromgeocodingapi[] = r.data.locations
    
                        setpotentiallocations(response)
                    })
            } if (address !== ""){
                await axios.get(`https://api.myptv.com/geocoding/v1/locations/by-text?searchText=${address}&apiKey=ZjVmOTA2NmQ5YTZkNDk0NWEzNDQzNTIxOWY0MTdlODc6ZTA5YzNjY2QtN2FjOC00NTA5LWE2NjgtYjA1NGE4Nzg1NGY1`)
                    .then((r) => {
                        let response: responsefromgeocodingapi[] = r.data.locations
    
                        setpotentiallocations(response)
                    })
            } else if (address === ""){
                seterror("you haven't entered your address")
            }
            
        } catch (error) {
            console.error(error)
        }
    }

    const handleselectpostoffice = (index: number) => {
        setpostofficename(postoffices[index].postofficename)
    }

    const handleupdatelocation = (index: number) => {
        setlocation(potentiallocations[index])
    }

    return <div>
        <input placeholder="username" onChange={handleupdateusername}/><br/>
        <input placeholder="password" onChange={handleupdatepassword}/><br/>
        {/* <input placeholder="post office name" onChange={handleupdatepostofficename}/><br/> */}
        <input placeholder="address" onChange={handleupdateaddress}/><br/>
        <input placeholder="district" onChange={handleupdateprovince}/><br/>
        {postoffices.length > 0 && <span>
            selecct post office
        </span>}
        {postoffices.map((postoffice, index: number) => <div key={index}>
            <button onClick={() => handleselectpostoffice(index)}>
                {postoffice.postofficename}
            </button>
        </div>)}
        {potentiallocations?.length > 0 && <span>
            select postoffice location
        </span>}
        {potentiallocations?.map((potentiallocation: responsefromgeocodingapi, index: number) => <div key={index}>
            <button onClick={() => handleupdatelocation(index)}>
                {potentiallocation.address.province === "" ? potentiallocation.address.city : potentiallocation.address.province}
            </button>
        </div>)}
        {error}
        <button onClick={handlecreateaccount}>Create account</button>
    </div>
}

export default Createaccount
