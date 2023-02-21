import React,{useState, useEffect, useNavigate} from "react";
import "./Chat.css"
import {
    MDBCard,
    MDBCardBody,
    MDBIcon,
    MDBBtn,
    MDBTypography,
    MDBTextArea,
    MDBCardHeader,
  } from "mdb-react-ui-kit";
  import axios from "axios"


export default function ChatMessages ({User, Data,currentUser}){
const [current, getCurrent] = useState("")
const [instance, getInstance]=useState([])
const [messages, setMessages]= useState([])
useEffect(() => {
  axios

    .post("http://127.0.0.1:3000/api/messages/getmsg/", {
      from: User,
      to: currentUser.user._id,
    })
    .then((res) => setMessages(res.data))
    .catch((err) => console.log(err));
}, []);

const filtered = Data.filter(e => {
  return e._id === '63f361c6d640fa40fb91a964';
});
console.log(messages, "messages") 
// console.log(User, "user")
// console.log(Data, "data")
// console.log(filtered, "filtered")
console.log(currentUser.user._id, "the user went to chat messages ")
    return (
        <>
        <MDBTypography listUnStyled className="text-white">
            <li className="d-flex justify-content-between mb-4">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                alt="avatar"
                className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                width="60"
              />
              <MDBCard className="mask-custom">
                <MDBCardHeader
                  className="d-flex justify-content-between p-3"
                  style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}
                >
                  <p className="fw-bold mb-0">Brad Pitt</p>
                  <p className="text-light small mb-0">
                    <MDBIcon far icon="clock" /> 12 mins ago
                  </p>
                </MDBCardHeader>
                <MDBCardBody>
                  <p className="mb-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </MDBCardBody>
              </MDBCard>
            </li>
            <li class="d-flex justify-content-between mb-4">
              <MDBCard className="w-100 mask-custom">
                <MDBCardHeader
                  className="d-flex justify-content-between p-3"
                  style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}
                >
                  <p class="fw-bold mb-0">Lara Croft</p>
                  <p class="text-light small mb-0">
                    <MDBIcon far icon="clock" /> 13 mins ago
                  </p>
                </MDBCardHeader>
                <MDBCardBody>
                  <p className="mb-0">
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium.
                  </p>
                </MDBCardBody>
              </MDBCard>
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
                alt="avatar"
                className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
                width="60"
              />
            </li>
            <li className="d-flex justify-content-between mb-4">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                alt="avatar"
                className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                width="60"
              />
              <MDBCard className="mask-custom">
                <MDBCardHeader
                  className="d-flex justify-content-between p-3"
                  style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}
                >
                  <p className="fw-bold mb-0">Brad Pitt</p>
                  <p className="text-light small mb-0">
                    <MDBIcon far icon="clock" /> 10 mins ago
                  </p>
                </MDBCardHeader>
                <MDBCardBody>
                  <p className="mb-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </MDBCardBody>
              </MDBCard>
            </li>
            <li className="mb-3">
              <MDBTextArea label="Message" id="textAreaExample" rows={4} />
            </li>
            <MDBBtn color="light" size="lg" rounded className="float-end">
              Send
            </MDBBtn>
          </MDBTypography>
        </>
    )
}