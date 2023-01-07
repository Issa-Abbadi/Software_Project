import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./profile.css";

import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import { Avatar } from "@mui/material";
import { Form } from "formik";

function Profile() {

  return (
    <>
      <section style={{ backgroundColor: "#eee", direction: "rtl",  }}>
        <MDBContainer className="py-5">
          {/* <MDBRow>
            <MDBCol>
              <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
                <MDBBreadcrumbItem>
                  <a href="/">الرئيسية</a>
                </MDBBreadcrumbItem>
              </MDBBreadcrumb>
            </MDBCol>
          </MDBRow> */}

          <MDBRow>
            <MDBCol lg="4">
              
              <MDBCard className="mb-4">
                <MDBCardBody className="text-center">
                  <Avatar
                    src={JSON.parse(localStorage.getItem("Profile")).imageUrl}
                    referrerpolicy="no-referrer"
                    alt="avatar"
                    class="inside"
                    style={{
                      width: "50%",
                      height: "50%",
                      marginRight: "25%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    fluid
                  />

                  {/* <p className="text-muted mb-1">Full Stack Developer</p>
                  <p className="text-muted mb-4">Bay Area, San Francisco, CA</p> */}
                  <div className="Cont">
                    {/* <input type="file" class="inputFile" accept="image/*,.jpg,.png"/> */}
                    
                    <button variant="primary" class="changeImg">تغيير الصوره</button>
                  </div>
                </MDBCardBody>
              </MDBCard>

              {/* <MDBCard className="mb-4 mb-lg-0">
                <MDBCardBody className="p-0">
                  <MDBListGroup flush className="rounded-3">
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <MDBIcon fas icon="globe fa-lg text-warning" />
                      <MDBCardText>https://mdbootstrap.com</MDBCardText>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <MDBIcon
                        fab
                        icon="github fa-lg"
                        style={{ color: "#333333" }}
                      />
                      <MDBCardText>mdbootstrap</MDBCardText>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <MDBIcon
                        fab
                        icon="twitter fa-lg"
                        style={{ color: "#55acee" }}
                      />
                      <MDBCardText>@mdbootstrap</MDBCardText>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <MDBIcon
                        fab
                        icon="instagram fa-lg"
                        style={{ color: "#ac2bac" }}
                      />
                      <MDBCardText>mdbootstrap</MDBCardText>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <MDBIcon
                        fab
                        icon="facebook fa-lg"
                        style={{ color: "#3b5998" }}
                      />
                      <MDBCardText>mdbootstrap</MDBCardText>
                    </MDBListGroupItem>
                  </MDBListGroup>
                </MDBCardBody>
              </MDBCard> */}
            </MDBCol>
            
            <MDBCol lg="8">
              <MDBCard className="mb-4">
                <MDBCardBody >
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>الاسم</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {JSON.parse(localStorage.getItem("Profile")).name}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>البريد الإلكتروني</MDBCardText>
                    </MDBCol>
                    {/* <MDBCol>
                      <MDBCardText></MDBCardText>
                    </MDBCol> */}
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {JSON.parse(localStorage.getItem("Profile")).email}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  {/* <MDBCol>
                      <MDBCardText>رقم الهاتف</MDBCardText>
                    </MDBCol>
                    <hr />
                    <MDBCol>
                      <MDBCardText>العنوان</MDBCardText>
                    </MDBCol> */}
                  {/* <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Phone</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        (097) 234-5678
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Mobile</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        (098) 765-4321
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Address</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        Bay Area, San Francisco, CA
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow> */}
                </MDBCardBody>

                </MDBCard>
              <MDBCard>
                <span class="change-accountInfo">تغيير معلومات الحساب</span>
                <hr/>

                  <a href="/forget-pass" class="change-email">تغيير كلمة السر</a>
                  <a href=""  class="change-email">تغيير معلومات الدفع</a>
              </MDBCard>
              
              <MDBCard style={{"margin-top":"3%"}}>
              <span class="change-accountInfo"> قوائمي</span>
              <hr />
                  <a href="/wishList" class="change-email">قائمة الرغبات</a>
              </MDBCard>   
             

            </MDBCol>
           
          </MDBRow>

        </MDBContainer>

      </section>
    </>
  );
}

export default Profile;
