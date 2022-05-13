import React, { useState, useEffect } from "react";
import axios from 'axios'
import "./home.css"
import GetItem from "./getItem"

interface inputevent {
    target: {value: string}
}

interface orderedpapers {
    postoffice_id: number,
    ordereruser_id: number,
    papername: string,
    location: string,
    houselocationlong: number,
    houselocationlat: number,
    deliver_id: number,
    days?: {day: string}[]
}

interface responseforgetallpapers {
    papers: orderedpapers[], 
    success: boolean
}

interface daystodeliver {
    monday: boolean,
    tuesday: boolean,
    wednesday: boolean,
    thursday: boolean,
    friday: boolean,
    saturday: boolean,
    sunday: boolean
}

interface dayindexes {
    monday: number,
    tuesday: number,
    wednesday: number,
    thursday: number,
    friday: number,
    saturday: number,
    sunday: number    
}

interface day {
    monday: boolean | undefined,
    tuesday: boolean | undefined,
    wednesday: boolean | undefined,
    thursday: boolean | undefined,
    friday: boolean | undefined,
    saturday: boolean | undefined, 
    sunday: boolean | undefined
}

interface dayspapercanbedelivered {
    postoffice_id: number,
    papername: string,
    day: string,
}

const useGetDayStates: () => (any)[] = () => {
    
    let [monday, setmonday] = useState<boolean>(false)
    let [tuesday, settuesday] = useState<boolean>(false)
    let [wednesday, setwednesday] = useState<boolean>(false)
    let [thursday, setthursday] = useState<boolean>(false)
    let [friday, setfriday] = useState<boolean>(false)
    let [saturday, setsaturday] = useState<boolean>(false)
    let [sunday, setsunday] = useState<boolean>(false)
 
    return [[monday, setmonday, "monday"], [tuesday, settuesday, "tuesday"], [wednesday, setwednesday, "wednesday"],
            [thursday, setthursday, "thursday"], [friday, setfriday, "friday"], [saturday, setsaturday, "saturday"],
            [sunday, setsunday, "sunday"]]
}

const Home: React.FC = () => {

    let [showorderpaperdisplay, toggledisplay] = useState<boolean>(false)
    let daystates = useGetDayStates()
    let daystatesdisabled = useGetDayStates()
    let [papername, setpapername] = useState<string>("")
    let [username, setusername] = useState<string | null>(localStorage.getItem("username"))
    let [password, setpassword] = useState<string | null>(localStorage.getItem("password"))
    let [orderedpapers, setorderedpapers] = useState<orderedpapers[]>([])
    let [dayspapercanbedelivered, setdayspapercanbedelivered] = useState<dayspapercanbedelivered[]>([])

    useEffect(() => {
        (async function () {
            await updatepaper()

            await handlegetalldaysfromserver()
        })()

    }, [])

    const handleshoworderpaperdisplay = () => {
        toggledisplay(true)
    }

    const handlegetalldaysfromserver = async () => {
        await axios.get(`http://localhost:3000/getalldays/${localStorage.getItem("postofficename")}`)
            .then((r: {data: {days: dayspapercanbedelivered[], success: boolean}}) => {
                // setdayspapercanbedelivered(r.data)
                if (r.data.success){
                    setdayspapercanbedelivered(r.data.days)
                }
            })
    }

    const handleorderpaper = () => {

        let days = [{monday: daystates[0][0]}, {tuesday: daystates[1][0]}, {wednesday: daystates[2][0]}, {thursday: daystates[3][0]}, {friday: daystates[4][0]}, {saturday: daystates[5][0]}, {sunday: daystates[6][0]}]

        console.log(dayspapercanbedelivered)

        let paperexists = false

        for (let i = 0; i < dayspapercanbedelivered.length; i++){
            if (dayspapercanbedelivered[i].papername === papername){
                paperexists = true
                break
            }
        }

        console.log(days)

        if (paperexists){
            // axios.post(`https://dry-shore-19751.herokuapp.com/addpaper/${username}/${password}/${papername}`, {
            //     days: days
            // })
            //     .then((r: {data: {success: boolean}}) => {
            //         console.log(r.data)
            //         if (r.data.success){
            //             updatepaper()
            //         }
            //     })
        } else if (!paperexists){
            alert("There has been a error. Please try again.")
        }
    }
        
    const updatepaper = async () => {
        
        await axios.get(`https://dry-shore-19751.herokuapp.com/getallpapers/${username}/${password}`)
            .then((r: {data: {papers: orderedpapers[], success: boolean}}) => {
                console.log(r.data)
                setorderedpapers(r.data.papers)
            })
    }

    
    const handleupdatepapername = async (e: inputevent) => {
        setpapername(e.target.value)
        
        const dayindexes: any = {
            monday: 0, 
            tuesday: 1,
            wednesday: 2,
            thursday: 3,
            friday: 4,
            saturday: 5,
            sunday: 7,
        }

        console.log(dayspapercanbedelivered)

        if (daystatesdisabled[0][0]) daystatesdisabled[0][1](false)
        if (daystatesdisabled[1][0]) daystatesdisabled[1][1](false)
        if (daystatesdisabled[2][0]) daystatesdisabled[2][1](false)
        if (daystatesdisabled[3][0]) daystatesdisabled[3][1](false)
        if (daystatesdisabled[4][0]) daystatesdisabled[4][1](false)
        if (daystatesdisabled[5][0]) daystatesdisabled[5][1](false)
        if (daystatesdisabled[6][0]) daystatesdisabled[6][1](false)


        for (let i = 0; i < dayspapercanbedelivered.length; i++){
            if (dayspapercanbedelivered[i].papername === e.target.value){
                console.log(dayspapercanbedelivered[i].day)
                console.log(dayindexes[dayspapercanbedelivered[i].day])
                console.log(daystatesdisabled[dayindexes[dayspapercanbedelivered[i].day]])
                daystatesdisabled[dayindexes[dayspapercanbedelivered[i].day]][1](true)
            }
        }
    }

    const handleupdatedaystodeliver =  (state: boolean | Function, setstate: boolean | Function) => {
        if (typeof setstate !== "boolean" && typeof state !== "function"){
            setstate(!state)
        }
    }

    const orderpaperdisplay = (
        <>
            <input placeholder="paper name" onChange={handleupdatepapername}/><br/>
            {daystates.map((day: any, index: number) => <div key={index}>
                <input disabled={daystatesdisabled[index][0]} onChange={() => handleupdatedaystodeliver(day[0], day[1])} type="checkbox" checked={day[0]}/>{day[2]}
            </div>)}
            <button onClick={handleorderpaper}>Confirm</button>
        </>
    )

    return <div className="parentcontainer">
        <div className="parentcontainerfororderpaperdisplay">
            {!showorderpaperdisplay && <button onClick={handleshoworderpaperdisplay}>Order paper</button>}
            {showorderpaperdisplay && orderpaperdisplay}
        </div>
        <div className="parentcontainerfororderedpaper">
            {orderedpapers.map((paper: orderedpapers, index: number) => <div key={index} className="containerfororderedpaper">
                <div className="childcontainerfororderedpaper">
                    <span className="spanforpapername">{paper.papername}</span>
                    <button>Suspend the paper</button>
                </div>
                <div className="parentcontainerfordays">
                    {paper.days !== undefined && paper.days.map((day: {day: string}, index: number) => <div className="containerfordays" key={index}>
                        <span>{day.day}</span>
                    </div>)}
                </div>
            </div>)}
        </div>
    </div>
}

export default Home