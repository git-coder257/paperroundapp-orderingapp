import React, { useState, useEffect } from "react";
import axios from 'axios'
import "./home.css"

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

interface day {
    monday: boolean | undefined,
    tuesday: boolean | undefined,
    wednesday: boolean | undefined,
    thursday: boolean | undefined,
    friday: boolean | undefined,
    saturday: boolean | undefined, 
    sunday: boolean | undefined
}

const useGetDayStates: () => (boolean | Function)[] = () => {
    
    let [monday, setmonday] = useState<boolean>(false)
    let [tuesday, settuesday] = useState<boolean>(false)
    let [wednesday, setwednesday] = useState<boolean>(false)
    let [thursday, setthursday] = useState<boolean>(false)
    let [friday, setfriday] = useState<boolean>(false)
    let [saturday, setsaturday] = useState<boolean>(false)
    let [sunday, setsunday] = useState<boolean>(false)
 
    return [monday, setmonday, tuesday, settuesday, wednesday, setwednesday, thursday, setthursday, friday, setfriday, saturday, setsaturday, sunday, setsunday]
}

const Home: React.FC = () => {

    let [showorderpaperdisplay, toggledisplay] = useState<boolean>(false)
    let [papername, setpapername] = useState<string>("")
    let [monday, setmonday, tuesday, settuesday, wednesday, setwednesday, thursday, setthursday, friday, setfriday, saturday, setsaturday, sunday, setsunday] = useGetDayStates()
    let [mondaydisabled, setmondaydisabled, tuesdaydisabled, settuesdaydisabled, wednesdaydisabled, setwednesdaydisabled, thursdaydisabled, setthursdaydisabled, fridaydisabled, setfridaydisabled, saturdaydisabled, setsaturdaydisabled, sundaydisabled, setsundaydisabled] = useGetDayStates()
    let [username, setusername] = useState<string | null>(localStorage.getItem("username"))
    let [password, setpassword] = useState<string | null>(localStorage.getItem("password"))
    let [orderedpapers, setorderedpapers] = useState<orderedpapers[]>([])

    useEffect(() => {
        // (async function() {
        //     await axios.get(`https://dry-shore-19751.herokuapp.com/getallpapers/${username}/${password}`)
        //         .then((r: {data: {papers: orderedpapers[], success: boolean}}) => {
        //             console.log(r.data)
        //             setorderedpapers(r.data.papers)
        //         })
        // })()
        (async function () {
            await updatepaper()

            // toggledisplay(!showorderpaperdisplay)
        })()
    }, [])

    const handleshoworderpaperdisplay = () => {
        toggledisplay(true)
    }

    const handleorderpaper = () => {

        let days = [{monday: monday}, {tuesday: tuesday}, {wednesday: wednesday}, {thursday: thursday}, {friday: friday}, {saturday: saturday}, {sunday: sunday}]

        // for (let i = 0; i < daysrequest.length; i++){
        //     if (typeof daysrequest[i] === "object"){
        //         if (Object.entries(daysrequest)[0][1]){
        //             days.push({key: true})
        //         }
                
        //     }
        // }
        axios.post(`https://dry-shore-19751.herokuapp.com/addpaper/${username}/${password}/${papername}`, {
            days: days
        })
            .then((r: {data: {success: boolean}}) => {
                console.log(r.data)
                if (r.data.success){
                    updatepaper()
                }
            })
    }

    // async function() {
        // }
        
    const updatepaper = async () => {
        
        await axios.get(`https://dry-shore-19751.herokuapp.com/getallpapers/${username}/${password}`)
            .then((r: {data: {papers: orderedpapers[], success: boolean}}) => {
                console.log(r.data)
                setorderedpapers(r.data.papers)
            })
    }

    // const 

    const handleupdatepapername = async (e: inputevent) => {
        setpapername(e.target.value)

        try {
            await axios.get(`https://dry-shore-19751.herokuapp.com/getdaysforpaper/${e.target.value}/${localStorage.getItem("postofficename")}`)
                .then((r) => {
                    for (let i = 0; i < r.data.days.length; i++){
                        console.log(r.data.days[i].day !== 'monday' && typeof mondaydisabled === "boolean" && typeof setmondaydisabled === "function")

                        updatedisabledoptionstrue(r.data.days[i])

                        updatedisabledoptionsfalse(r.data.days[i])
                    }
                    resetdisabledoptions()

                    console.log(r.data.days)
                })
        } catch (error) {
            resetdisabledoptions()
        }
    }

    const handleupdatedaystodeliver =  (state: boolean | Function, setstate: boolean | Function) => {
        if (typeof setstate !== "boolean" && typeof state !== "function"){
            setstate(!state)
        }
    }

    const resetdisabledoptions = () => {
        if (typeof setmondaydisabled === "function" && mondaydisabled === true) setmondaydisabled(false)
        if (typeof settuesdaydisabled === "function" && tuesdaydisabled === true) settuesdaydisabled(false)
        if (typeof setwednesdaydisabled === "function" && wednesdaydisabled === true) setwednesdaydisabled(false)
        if (typeof setthursdaydisabled === "function" && thursdaydisabled === true) setthursdaydisabled(false)
        if (typeof setfridaydisabled === "function" && fridaydisabled === true) setfridaydisabled(false)
        if (typeof setsaturdaydisabled === "function" && saturdaydisabled === true) setsaturdaydisabled(false)
        if (typeof setsundaydisabled === "function" && sundaydisabled === true) setsundaydisabled(false)
    }

    const updatedisabledoptionsfalse = (day: {day: string}) => {
        if (day.day !== 'monday' && typeof mondaydisabled === "boolean" && typeof setmondaydisabled === "function"){
            setmondaydisabled(true)
        } if (day.day !== 'tuesday' && typeof tuesdaydisabled === "boolean" && typeof settuesdaydisabled === "function"){
            settuesdaydisabled(true)
        } if (day.day !== 'wednesday' && typeof wednesdaydisabled === "boolean" && typeof setwednesdaydisabled === "function"){
            setwednesdaydisabled(true)
        } if (day.day !== 'thursday' && typeof thursdaydisabled === "boolean" && typeof setthursdaydisabled === "function"){
            setthursdaydisabled(true)
        } if (day.day !== 'friday' && typeof fridaydisabled === "boolean" && typeof setfridaydisabled === "function"){
            setfridaydisabled(true)
        } if (day.day !== 'saturday' && typeof saturdaydisabled === "boolean" && typeof setsaturdaydisabled === "function"){
            setsaturdaydisabled(true)
        } if (day.day !== 'sunday' && typeof sundaydisabled === "boolean" && typeof setsundaydisabled === "function"){
            setsundaydisabled(true)
        }
    }

    const updatedisabledoptionstrue = (day: {day: string}) => {
        if (day.day === 'monday' && typeof mondaydisabled === "boolean" && typeof setmondaydisabled === "function"){
            setmondaydisabled(false)
        } if (day.day === 'tuesday' && typeof tuesdaydisabled === "boolean" && typeof settuesdaydisabled === "function"){
            settuesdaydisabled(false)
        } if (day.day === 'wednesday' && typeof wednesdaydisabled === "boolean" && typeof setwednesdaydisabled === "function"){
            setwednesdaydisabled(false)
        } if (day.day === 'thursday' && typeof thursdaydisabled === "boolean" && typeof setthursdaydisabled === "function"){
            setthursdaydisabled(false)
        } if (day.day === 'friday' && typeof fridaydisabled === "boolean" && typeof setfridaydisabled === "function"){
            setfridaydisabled(false)
        } if (day.day === 'saturday' && typeof saturdaydisabled === "boolean" && typeof setsaturdaydisabled === "function"){
            setsaturdaydisabled(false)
        } if (day.day === 'sunday' && typeof sundaydisabled === "boolean" && typeof setsundaydisabled === "function"){
            setsundaydisabled(false)
        } 
    }

    const orderpaperdisplay = (
        <>
            <input placeholder="paper name" onChange={handleupdatepapername}/><br/>
            <div>
                <input disabled={typeof mondaydisabled === "boolean" && mondaydisabled} onChange={() => handleupdatedaystodeliver(monday, setmonday)} type="checkbox" checked={typeof monday === "boolean" && monday}/>monday
            </div>
            <div>
                <input disabled={typeof tuesdaydisabled === "boolean" && tuesdaydisabled} onChange={() => handleupdatedaystodeliver(tuesday, settuesday)} type="checkbox" checked={typeof tuesday === "boolean" && tuesday}/>tuesday
            </div>
            <div>
                <input disabled={typeof wednesdaydisabled === "boolean" && wednesdaydisabled} onChange={() => handleupdatedaystodeliver(wednesday, setwednesday)} type="checkbox" checked={typeof wednesday === "boolean" && wednesday}/>wednesday
            </div>
            <div>
                <input disabled={typeof thursdaydisabled === "boolean" && thursdaydisabled} onChange={() => handleupdatedaystodeliver(thursday, setthursday)} type="checkbox" checked={typeof thursday === "boolean" && thursday}/>thursday
            </div>
            <div>
                <input disabled={typeof fridaydisabled === "boolean" && fridaydisabled} onChange={() => handleupdatedaystodeliver(friday, setfriday)} type="checkbox" checked={typeof friday === "boolean" && friday}/>friday
            </div>
            <div>
                <input disabled={typeof saturdaydisabled === "boolean" && saturdaydisabled} onChange={() => handleupdatedaystodeliver(saturday, setsaturday)} type="checkbox" checked={typeof saturday === "boolean" && saturday}/>saturday
            </div>
            <div>
                <input disabled={typeof sundaydisabled === "boolean" && sundaydisabled} onChange={() => handleupdatedaystodeliver(sunday, setsunday)} type="checkbox" checked={typeof sunday === "boolean" && sunday}/>sunday
            </div>
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