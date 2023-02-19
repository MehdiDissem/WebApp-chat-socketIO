import React, { useContext } from "react";
import "./Chat.css"
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBBtn,
  MDBTypography,
  MDBTextArea,
  MDBCardHeader,
} from "mdb-react-ui-kit";
import { Context } from "../Context";
import ChatMessages from "./ChatMessages";
export default function Chat({data}) {

  const {user,users}=useContext(Context)
  console.log(data, "from chat")

  return (
    
    <MDBContainer fluid className="py-5 gradient-custom">
      {/* Start of the list */}
      <MDBRow>
        <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
          <h5 className="font-weight-bold mb-3 text-center text-white">
            Members
          </h5>

          <MDBCard className="mask-custom">
            <MDBCardBody>
              <MDBTypography listUnStyled className="mb-0">
                {data.map(e=>{
                  return(
                    <>
                    <li
                  className="p-2 border-bottom"
                  style={{
                    borderBottom: "1px solid rgba(255,255,255,.3) !important",
                  }}
                >
                  <a
                    href="#!"
                    className="d-flex justify-content-between link-light"
                  >
                    <div className="d-flex flex-row">
                      <img
                        src={e.avatarImage}
                        alt="avatar"
                        className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                        width="60"
                      />
                      <div className="pt-1">
                        <p className="fw-bold mb-0">{e.username}</p>
                        <p className="small text-white">
                          {e.email}
                        </p>
                      </div>
                    </div>
                    <div className="pt-1">
                      <p className="small mb-1 text-white">Just now</p>
                      <span className="badge bg-danger float-end">1</span>
                    </div>
                  </a>
                </li>
                    </>
                  )
                })}
              </MDBTypography>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
{/* End of the list */}
        <MDBCol md="6" lg="7" xl="8">
          <ChatMessages/>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}