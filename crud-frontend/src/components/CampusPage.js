import React from "react"
import { useEffect, useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import "../InfoPage.css"


const api = "http://localhost:8080/api"

export default function CampusPage(){

    const [curId, setCurId] = useState()
    const [campusInfo, setCampusInfo] = useState({
        campus_img_url: "",
        campus_name: "",
        campus_location: "",
        campus_description: ""
    })
    const[goToEdit, setGoToEdit] = useState(false)
    const params = useParams()


    useEffect(() =>{
        setCurId(params.id)
    }, [params.id])

    useEffect(() => {
        fetch(`${api}/campuses/${params.id}`,{
                method: "GET",
                mode: 'cors'
            })

            .then(res => {
                if(res.status == 204){
                    alert("Data not exist")
                }
                return res.json()
            })
            .then(res => setCampusInfo(res))
            .catch(e => console.log(e))

    }, [curId])

    function handleGoToEdit(){
        setGoToEdit(true)
    }

    if (goToEdit) {
        return (<Navigate replace to={`../campus/edit/${curId}`}/>)
    }

    return (
    
        <div>

            <nav>sample nav bar</nav>

            <div className="info-section">
                <img src={campusInfo.campus_img_url} />
                <div className="text-info">
                    <p>Campus: {campusInfo.campus_name}</p>
                    <p>Location: {campusInfo.campus_location}</p>
                    <p>Description: {campusInfo.campus_description}</p>
                    <button onClick={handleGoToEdit}>Edit</button>
                </div>

            </div>



        </div>
    )
}