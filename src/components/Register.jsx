import React,{useState} from 'react';
import {useNavigate} from "react-router-dom"
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBRadio
}
from 'mdb-react-ui-kit';
import axios from 'axios';
import "./Register.css"

function Register() {
    const navigate = useNavigate()
    const [image, setImage]= useState('')
    const [username, setUsername]=useState('')
    const [email,setEmail]=useState('')
    const [password, setPassword]=useState('')

    const handleSubmit=()=>{
        axios.post("http://127.0.0.1:3000/api/users/register/",{
            username:username,
            email:email,
            password:password,
            avatarImage:image
        }).then((res)=> console.log(res)).catch(err=> console.log(err))
    }

  return (
    <MDBContainer fluid md="6">

      <MDBRow className='justify-content-center align-items-center m-5'>

        <MDBCard>
          <MDBCardBody className='px-4'>

            <h3 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5">SignUp/Login</h3>

            <MDBRow>
              <MDBCol >
              <div class="d-flex flex-column align-items-center text-center p-3 py-5">
              <img class="rounded-circle mt-5" width="150px" src={image}/>
              </div>
                <MDBInput wrapperClass='mb-4' label='Username' size='lg' id='form2' type='text' onChange={(event)=> setUsername(event.target.value)}/>
              </MDBCol>
            </MDBRow>


            <MDBRow>

              <MDBCol>
                <MDBInput wrapperClass='mb-4' label='Email' size='lg' id='form4' type='email' onChange={(event)=>setEmail(event.target.value)}/>
              </MDBCol>

              <MDBCol>
                <MDBInput wrapperClass='mb-4' label='password' size='lg' id='form4' type='password' onChange={(event)=> setPassword(event.target.value)}/>
              </MDBCol>
              <MDBInput wrapperClass='mb-4' label='Image link' size='lg' id='form2' type='text' onChange={(event)=> setImage(event.target.value)}/>
            </MDBRow>

            <MDBBtn className='mb-4' size='lg' onClick={()=> navigate("/chat")}>Submit</MDBBtn>

          </MDBCardBody>
        </MDBCard>

      </MDBRow>
    </MDBContainer>
  );
}

export default Register;