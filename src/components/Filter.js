import React, {useCallback, useState, useEffect} from "react"
import moment from "moment"

export default function Filter({value = [], onChange}) {
    const [title, setTitle] = useState("")
    const [date, setDate] = useState(null)


    const valueChanged = useCallback((newTitle, newDate) => {
        let newArray
        if(newDate){
            newArray = value.filter((el) => {
                return el.title.includes(newTitle) && 
                moment(new Date(parseInt(el.addedOn))).isSame(newDate, "day")
            });
        }else{
            newArray = value.filter((el) => {
                return el.title.includes(newTitle)
            });
        }
        onChange(newArray)
    }, [value])

    const ClearFilter = async (e) => {
        e.preventDefault()
        setTitle('')
        setDate('')
    }

    useEffect(() => {
        valueChanged(title, date)
    },[title, date, valueChanged])

    return (
        <div>
            <div className=" flex flex-1, flex-row justify-between">
                <p>Filter books by title and date</p>
                <a href="" onClick={ClearFilter}>Clear filter</a>
            </div>
            <div className=" flex flex-1 flex-row my-[10px] w-[100%] space-x-8">
                <input placeholder="Search Title" onChange={(e) => setTitle(e.target.value)} type="text" className="w-[100%] h-[50px] border-[1px] border-black rounded-[50px] p-4"/>
                <input placeholder="Search date" onChange={(e) => setDate(e.target.value)}  type="date" className="w-[100%] h-[50px] border-[1px] border-black rounded-[50px] p-4"/>
            </div>
        </div>
    )
}
  