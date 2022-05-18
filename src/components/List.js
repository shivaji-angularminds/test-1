import React,{useState} from 'react'
import { Link } from "react-router-dom";


function List() {

const candidate =JSON.parse(localStorage.getItem("candidate"));

const [candidateArray,setCandidateArray]=useState(candidate)

// function calculateExp(prev){
//     prev.experience.reduce((total, currentValue)=>{
//         return total+currentValue
//     })
// }

function handleDelete(index){
console.log("sadbajhb")
    const array=[...candidateArray]
   let hello= array.splice(index,1)
   console.log(array)
   localStorage.setItem("candidate",JSON.stringify(array))

setCandidateArray([...array])
}

if(!candidate){
    return(
        <div class="py-5">
                <h2>
                    please Add Candidate 
                    <button class="btn btn-primary float-end"> <Link to="/add">Add Candidate</Link> </button>
                </h2>
            </div>
    )
}
  return (
    <div>
        <div class="container my-4">
        <main>
            <div class="py-5">
                <h2>
                    Candidates List
                    <button class="btn btn-primary float-end"><Link to="/add">Add Candidate</Link></button>
                </h2>
            </div>

            <div class="row">
                <div class="col-12 ms-auto me-auto">
                    <div class="card">
                        <div class="card-body">
                            <table class="table">
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Number of Skills</th>
                                    <th>Total Work Experience (in months)</th>
                                    <th>Actions</th>
                                </tr>
                                {candidate.map((prev,index)=>{
                                    console.log(index)
                                    return(
                                        <tr>
                                        <td>{index+1}</td>
                                        <td>{prev.firstName +" "+prev.lastName }</td>
                                        <td>{prev.email}</td>
                                        <td>{prev.skills.length}</td>
                                        <td>{30}</td>
                                        
                                        <td>
                                            <button ><Link to={`/edit/${index}`}  params={ {index: index}} >Edit</Link> </button>
                                            <button class="text-danger ms-2" onClick={(index)=>handleDelete(index)} >Delete</button>
                                        </td>
                                    </tr>
                                    )
                                })}
                               
                               
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
    </div>
  )
}

export default List