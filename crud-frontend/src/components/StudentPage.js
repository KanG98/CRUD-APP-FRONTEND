import React from "react"
import { useEffect, useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import axios from "axios"
import "../InfoPage.css"


const api = "http://localhost:8080/api"

export default function StudentPage(){

    const [curId, setCurId] = useState()
    const [stuInfo, setStuInfo] = useState({
        stu_img_url: "",
        stu_name: "",
        email: "",
        gpa: 0,
        campus: ""
    })
    const[goToEdit, setGoToEdit] = useState(false)
    const params = useParams()


    useEffect(() =>{
        setCurId(params.id)
    }, [params.id])

    useEffect(() => {
        fetch(`${api}/students/byStudentId/${params.id}`,{
                method: "GET",
                mode: 'cors'
            })

            .then(res => {
                if(res.status == 204){
                    alert("Data not exist")
                }
                return res.json()
            })
            .then(res => setStuInfo(res))
            .catch(e => console.log(e))

    }, [curId])

    function handleGoToEdit(){
        setGoToEdit(true)
    }

    function handleDeleteStudent(){
        axios.delete(
            `http://localhost:8080/api/students/${curId}`
           )
        .then()
        // go to home page

        .catch(err => alert(err))
    }

    if (goToEdit) {
        return (<Navigate replace to={`../student/edit/${curId}`}/>)
    }

    return (
    
        <div>
            {console.log(params.id)}

            <nav>sample nav bar</nav>

            <div className="info-section">
                <img src={stuInfo.stu_img_url} />
                <div className="text-info">
                    <p>Student Name: {stuInfo.stu_name}</p>
                    <p>Campus: {stuInfo.campus}</p>
                    <p>GPA: {stuInfo.gpa}</p>
                    <p>Email: {stuInfo.email}</p>
                    <button onClick={handleGoToEdit}>Edit</button>
                    <button onClick={handleDeleteStudent}>Delete Student</button>
                </div>

            </div>



        </div>
    )
}