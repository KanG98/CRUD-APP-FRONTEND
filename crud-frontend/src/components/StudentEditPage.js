import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


const api = "http://localhost:8080/api"

function capitalizeFirstLetter(string) {
    return string.replace(/\b\w/g, l => l.toUpperCase());
  }

export default function StudentEditPage(props){
    
    // contains form to edit student

    // state: student info

    const [curId, setCurId] = useState()
    const [stuInfo, setStuInfo] = useState()
    const [newStuInfo, setNewStuInfo] = useState()
    const params = useParams()

    useEffect(() =>{
        setCurId(params.id)
    }, [])

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

    useEffect(() =>{
        if(stuInfo != undefined){
            document.getElementById("name").value = stuInfo.stu_name;
            document.getElementById("img_url").value = stuInfo.stu_img_url;
            document.getElementById("campus").value = stuInfo.campus;
            document.getElementById("gpa").value = stuInfo.gpa;
            document.getElementById("email").value = stuInfo.email;
            setNewStuInfo(stuInfo)
        }
    }, [stuInfo])

    function handleNameChange(e){
        setNewStuInfo(prev => ({...newStuInfo, stu_name: e.target.value}))
    }

    function handleImgChange(e){
        setNewStuInfo(prev => ({...newStuInfo, stu_img_url: e.target.value}))
    }
    
    function handleCampusChange(e){
        setNewStuInfo(prev => ({...newStuInfo, campus: capitalizeFirstLetter(e.target.value)}))
    }
    
    function handleGPAChange(e){
        document.getElementById('gpa-output').textContent = document.getElementById('gpa').value
        setNewStuInfo(prev => ({...newStuInfo, gpa: e.target.value}))
    }

    function handleEmailChange(e){
        setNewStuInfo(prev => ({...newStuInfo, email: e.target.value}))
    }

    function handleSubmit(e){
        e.preventDefault()
        if(Object.keys(newStuInfo).some((key) => key!="campus" && newStuInfo[key] === "")){
            alert("* fields are required")
            console.log(newStuInfo)
        }
        else{
            const body = {
                ...newStuInfo,
                campus: newStuInfo['campus'] == "" ? null : newStuInfo['campus']
            }
            axios.put(`${api}/students/${params.id}`, body)
                .then(res => console.log(res))
                .catch(error => console.log(error))

        }
    }

    return (
        <div>
            <p>StudentEditPage {curId}</p>
            <form method="PUT" onSubmit={handleSubmit}>
                <label htmlFor="name">Student Name&#42;: </label>
                <input type="text" id="name" name="name" onChange={handleNameChange}/>
                <label htmlFor="img_url">Student Image Url&#42;: </label>
                <input type="text" id="img_url" name="img_url" onChange={handleImgChange}/>
                <br></br>
                <label htmlFor="campus">Student Campus: </label>
                <input type="text" id="campus" name="campus" onChange={handleCampusChange}/>
                <label htmlFor="gpa">GPA&#42;: </label>
                <input type="range" min="0" max="4.0" step="1" id="gpa" name="gpa" onChange={handleGPAChange} />
                <output id="gpa-output">1</output>
                <label htmlFor="email">Email&#42;: </label>
                <input type="text" id="email" name="email" onChange={handleEmailChange}/>

                <input type="submit" value="Submit"/>
            </form> 

        </div>
    )
}