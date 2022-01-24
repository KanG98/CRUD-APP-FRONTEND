import axios from "axios"
import { useEffect, useState } from "react"
import { Navigate, useParams } from "react-router-dom"


const api = "http://localhost:8080/api"


export default function CampusEditPage(){
    // contains form to edit campus
    // state: campus info arr

    const [curId, setCurId] = useState()
    const [campusInfo, setCampusInfo] = useState()
    const [newCampusInfo, setNewCampusInfo] = useState()
    const [isSubmitted, setIsSubmitted] = useState(false)
    const params = useParams()

    useEffect(() =>{
        setCurId(params.id)
    }, [])

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

    useEffect(() =>{
        if(campusInfo != undefined){
            document.getElementById("name").value = campusInfo.campus_name;
            document.getElementById("img_url").value = campusInfo.campus_img_url;
            document.getElementById("location").value = campusInfo.campus_location;
            document.getElementById("description").value = campusInfo.campus_description;
            setNewCampusInfo(campusInfo)
        }
    }, [campusInfo])

    function handleNameChange(e){
        setNewCampusInfo(prev => ({...newCampusInfo, campus_name: e.target.value}))
    }

    function handleImgChange(e){
        setNewCampusInfo(prev => ({...newCampusInfo, campus_img_url: e.target.value}))
    }

    function handleLocationChange(e){
        setNewCampusInfo(prev => ({...newCampusInfo, campus_location: e.target.value}))
    }

    function handleDescriptionChange(e){
        setNewCampusInfo(prev => ({...newCampusInfo, campus_description: e.target.value}))
    }

    function handleSubmit(e){
        e.preventDefault()
        if(Object.keys(newCampusInfo).some((key) => key!="campus_description" && newCampusInfo[key] === "")){
            alert("* fields are required")
            console.log(newCampusInfo)
        }else{
            const body = {
                ...newCampusInfo,
                campus_description: newCampusInfo['campus_description'] == "" ? null : newCampusInfo['campus_description']
            }
            axios.put(`${api}/campuses/${params.id}`, body)
            .then(res => console.log(res))
            .then(res => handleIsSubmitted())
            .catch(error => console.log(error))
        }
    }

    function handleIsSubmitted(){
        setIsSubmitted(true)
    }

    if(isSubmitted){
        return <Navigate replace to={`/campuses/${curId}`}/> 
    }

    return (
        <div>
            <p>current campus id {curId}</p>
            <form method="PUT" onSubmit={handleSubmit}>
                <label htmlFor="name">Campus Name&#42;: </label>
                <input type="text" id="name" name="name" onChange={handleNameChange}/>

                <label htmlFor="location">Campus Location&#42;: </label>
                <input type="text" id="location" name="location" onChange={handleLocationChange}/>
                <br></br>
                <label htmlFor="img_url">Img Url&#42;</label>
                <input type="text" id="img_url" name="imgUrl" onChange={handleImgChange}/>
                <label htmlFor="description">Description: </label>
                <input type="text" id="description" name="description" onChange={handleDescriptionChange}/>

                <input type="submit" value="Submit"/>
            </form> 
        </div>
    )
}