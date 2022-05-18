import React, { useState } from "react";
import { useParams,useNavigate } from "react-router-dom";



function Form() {
    let navigate = useNavigate()
    const { index } = useParams();
  console.log(index)
    const candidateArray= JSON.parse(localStorage.getItem('candidate'))? JSON.parse(localStorage.getItem('candidate')):[]

  const [candiate, setCandidate] = useState(candidateArray[index]);
const [validationFlag,setValidationFlag]=useState(false)
  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    skills: "",
    workExp: "",
  });

  function handleChange(e) {
    const { value, name } = e.target;
    setCandidate({ ...candiate, [name]: value });
  }

  function handleExpChange(e) {
    const array = [...candiate.experience];
    let obj1 = array[e.target.id];

    obj1 = { ...obj1, [e.target.name]: e.target.value };
    array[e.target.id] = obj1;
    setCandidate({ ...candiate, experience: array });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("dbsjh")
    validation();
    if(validationFlag){
        candidateArray[index]=candiate
        localStorage.setItem("candidate",JSON.stringify(candidateArray))
        navigate("/")
    }
    
  }

  function handleAddMoreExp(){
      console.log("dsjb")
     const array=[...candiate.experience] 
     array.push( {
        compName: "",
        duration: "",
        res: "",
      })

      setCandidate({ ...candiate,experience:array})
  }


console.log(validationFlag)
console.log(error)
  function renderExpCard(index1,prev) {
    return (
      <div class="card mx-3 mt-3">
        <div class="card-body">
          <h6 class="card-title text-muted mb-3">
            Experience #{index1 + 1}
            <a href="#" class="float-end text-danger fw-normal">
              Remove
            </a>
          </h6>
          <div class="row g-3">
            <div class="col-6">
              <label class="form-label">Company Name</label>
              <input
                id={index1}
                type="text"
                value={prev.compName}
                class="form-control"
                name="compName"
                onChange={(e) => handleExpChange(e)}
              />
            </div>
            <div class="col-6">
              <label class="form-label">
                Duration <span class="text-muted">(in months)</span>
              </label>
              <input
              value={prev.duration}
                type="number"
                class="form-control"
                id={index1}
                name="duration"
                onChange={(e) => handleExpChange(e)}
              />
            </div>
            <div class="col-12">
              <label class="form-label">Describe your responsibilities</label>
              <textarea
                class="form-control"
                name="res"
                value={prev.res}
                id={index1}
                onChange={(e) => handleExpChange(e)}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function validation() {

    console.log("djb")
      const flag=false;
    let sampleError = {...error};
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(!candiate.email || regex.test(candiate.email) === false){
      sampleError.email = "email is invalid";
      
    } else {
        
      sampleError.email = "";
    }

    if (!candiate.firstName) {
    
      sampleError.firstName = "firstname is required";
    }else{

        sampleError.firstName = "";

    }

    if (!candiate.lastName) {
       

      sampleError.lastName = "lastname is required";
    }else{
        sampleError.lastName = "";

    }
    if (!candiate.gender) {
      sampleError.gender = "gender is required";
    }else{
        sampleError.gender = "";

    }

    if (!candiate.skills.length >= 3) {
      sampleError.skills = "please provide more than 2 skills";
    }

    if (candiate.experience.length >= 2 || candiate.experience.length <= 5) {
     
        for(let a=0;a<candiate.experience.length;a++){
            if(!candiate.experience[a].compName ||!candiate.experience[a].duration  || !candiate.experience[a].res  ){
                sampleError.experience="please fill all fields from  experience section"
            }else{
                sampleError.experience=""  
            }
        }


    }


    if(!sampleError.firstName && !sampleError.lastName && !sampleError.email && !sampleError.skills && !sampleError.experience){
        setValidationFlag(true)
    }else{
        setValidationFlag(false)

    }

    setError(sampleError);
    console.log(sampleError)
  }


  function handleCheckboxChange(e) {
    const array = candiate.skills;
    if (e.target.checked) {
      array.push(e.target.value);
    } else {
      let index = array.indexOf(e.target.value);
      array.splice(index, 1);
    }

    setCandidate({ ...candiate, skills: array });
  }

  console.log(candiate);

  return (
    <div>
      <div class="container my-4">
        <main>
          <div class="py-5 text-center">
            <h2>Add Candidate</h2>
          </div>

          <div class="row g-5">
            <div class="col-md-7 col-lg-8 ms-auto me-auto">
              <h4 class="mb-3">Basic Info</h4>
              <div class="row g-3">
                <div class="col-sm-6">
                  <label class="form-label">First name</label>
                  <input
                    type="text"
                    value={candiate.firstName}
                    name="firstName"
                    onChange={handleChange}
                    class="form-control"
                  />
                  <span>{error.firstName && error.firstName}</span>
                </div>

                <div class="col-sm-6">
                  <label class="form-label">Last name</label>
                  <input
                    value={candiate.lastName}
                    name="lastName"
                    onChange={handleChange}
                    type="text"
                    class="form-control"
                  />
                </div>
                <span>{error.lastName && error.lastName}</span>
                <div class="col-12">
                  <label class="form-label">Gender</label>
                  <div>
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        name="gender"
                        value="male"
                        onChange={handleChange}
                        type="radio"
                      />
                      <label class="form-check-label">Male</label>
                      
                    </div>
                    <div class="form-check form-check-inline">
                      <input
                        name="gender"
                        value="female"
                        onChange={handleChange}
                        class="form-check-input"
                        type="radio"
                      />
                      <label class="form-check-label">Female</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input
                        name="gender"
                        value="other"
                        onChange={handleChange}
                        class="form-check-input"
                        type="radio"
                      />
                      <label class="form-check-label">Other</label>
                    </div>
                  </div>
                  <span>{error.gender && error.gender}</span>

                </div>

                <div class="col-12">
                  <label class="form-label">Email</label>
                  <input
                    type="email"
                    value={candiate.email}
                    name="email"
                    onChange={handleChange}
                    class="form-control"
                    placeholder="you@example.com"
                  />
                   <span>{error.email && error.email}</span>
                </div>

                <div class="col-12">
                  <label class="form-label">Address</label>
                  <textarea
                    value={candiate.address}
                    name="address"
                    onChange={handleChange}
                    class="form-control"
                    placeholder="1234 Main St"
                  ></textarea>
                </div>

                <div class="col-md-5">
                  <label class="form-label">Country</label>
                  <select
                    class="form-select"
                    name="country "
                    onClick={handleChange}
                  >
                    <option value="">Choose...</option>
                    <option>India</option>
                    <option>United States</option>
                  </select>
                </div>

                <div class="col-md-4">
                  <label class="form-label">State</label>
                  <select
                    class="form-select"
                    name="state "
                    onClick={handleChange}
                  >
                    <option value="">Choose...</option>
                    <option>Maharashtra</option>
                    <option>Karnataka</option>
                  </select>
                </div>

                <div class="col-md-3">
                  <label class="form-label">Pin / Zip</label>
                  <input
                    name="pin"
                    value={candiate.pin}
                    onChange={handleChange}
                    type="text"
                    class="form-control"
                  />
                </div>
              </div>

              <hr class="my-4" />

              <h4 class="mb-3">Professional Info</h4>

              <div class="row g-3">
                <div class="col-12">
                  <label class="form-label">
                    Choose your skills
                    <span class="small text-muted">(min 3 skills)</span>
                  </label>
                  <div class="mb-3">
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value="Angular"
                        onChange={handleCheckboxChange}
                      />
                      <label class="form-check-label">Angular</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value="React"
                        onChange={handleCheckboxChange}
                      />
                      <label class="form-check-label" value="React">
                        React
                      </label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value="Node.JS"
                        onChange={handleCheckboxChange}
                      />
                      <label class="form-check-label" value="Node.JS">
                        Node.JS
                      </label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value="JavaScript"
                        onChange={handleCheckboxChange}
                      />
                      <label class="form-check-label" value="JavaScript">
                        JavaScript
                      </label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value="Flutter"
                        onChange={handleCheckboxChange}
                      />
                      <label class="form-check-label" value="Flutter">
                        Flutter
                      </label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value="Java"
                        onChange={handleCheckboxChange}
                      />
                      <label class="form-check-label" value="Java">
                        Java
                      </label>
                    </div>
                    <span>{error.skills && error.skills}</span>
                  </div>
                </div>
              </div>

              <div class="row gy-3">
                <div class="col-12">
                  <label class="form-label">
                    <strong>
                      Experience
                      <span class="small text-muted">(min 2, max 5 items)</span>
                    </strong>
                  </label>
                  <span>{error.experience && error.experience}</span>
                  {candiate.experience.map((prev, index) => {
                    console.log(index);
                    return renderExpCard(index,prev);
                  })}

                  <button class="d-block mt-3" onClick={handleAddMoreExp}>
                    Add more experience
                  </button>
                </div>
              </div>

              <hr class="my-4" />

              <button
                class="btn btn-primary"
                onClick={handleSubmit}
                type="submit"
              >
                Save Candidate
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Form;
