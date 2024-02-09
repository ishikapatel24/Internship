import arrow from "../image/arrow.png";
import style from "../css/register.module.css";
import Navbar from "./Navbar";
import Personaldetail from "./Personaldetail";
import Qualification from "./Qualification";
import Review from "./Review";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';

export default function Register() {
  const { id } = useParams();
  const navigate = useNavigate();

  const goJobOpening = () => {
    navigate(`/jobopeningdetails/${id}`);
  };

  const goLogin = () => {
    navigate(`/walkinlogin/${id}`);
  };

  const [page, setPage] = useState(0);

  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneCode: "",
    phoneNumber: "",
    resumeFile: "",
    jobRoleRes: [],
    portfoliourl: "",
    jobUpdate: "no",
    referralName: "",
    percentage: "",
    location: "",
    yearOfPassing: "2020",
    qualification: "B.Tech",
    stream: "science",
    college: "L.D",
    otherCollege: "",
    applicant: "",
    yearOfExp: "",
    currentCTC: "",
    expCTC: "",
    curNoticePeriod: "",
    endNoticePeriod: "",
    lengthOfNoticePeriod: "1",
    isAppearedTest: "",
    expertTechnology: [],
    expertOther: "",
    familiarTechnology: [],
    familiarOther: "",
    applyRole: "",
  });

  const goQualification = (event) => {
    event.preventDefault();
    if (page === 0) {
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.phoneCode ||
        !formData.phoneNumber ||
        !formData.email ||
        !formData.jobRoleRes.length
      )
        alert("Please Fill Mandatory Details");
      else {
        setPage((currPage) => currPage + 1);
      }
    } else if (page === 1) {
      const exp =
        formData.applicant === "experienced"
          ? formData.yearOfExp &&
            formData.expertTechnology.length &&
            formData.currentCTC &&
            formData.expCTC &&
            formData.curNoticePeriod &&
            (formData.curNoticePeriod === "Yes" ? formData.endNoticePeriod : true)
          : true;
      if (
        !formData.percentage ||
        !formData.yearOfPassing ||
        !formData.college ||
        !formData.stream ||
        !formData.qualification ||
        !formData.location ||
        !formData.applicant ||
        !exp ||
        !formData.isAppearedTest ||
        (formData.isAppearedTest==="Yes" ? !formData.applyRole : false)
      )
        alert("Please Fill Mandatory Details");
      else {
        setPage((currPage) => currPage + 1);
      }
    }
  };

  const PageDisplay = () => {
    if (page === 0) {
      return <Personaldetail formData={formData} setformData={setformData} />;
    } else if (page === 1) {
      return <Qualification formData={formData} setformData={setformData} />;
    } else {
      return <Review formData={formData} setformData={setformData} />;
    }
  };

  return (
    <>
      <Navbar userLogo={false} />
      
      <div className={style.registerNavbar}>
        <div className={style.navbarItems}>
          <div className={style.backImg}>
            <img src={arrow} alt="" />
          </div>
          <div className={style.title}>
            <p>Create An Account</p>
          </div>
          <div className={style.btns}>
            <div className={style.cancelBtn}>
              <button onClick={goLogin}>CANCEL</button>
            </div>
            <div className={style.createBtn}>
              <button disabled={page !== 2} onClick={goJobOpening}>
                CREATE
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={style.container}>
        <div className={style.standUpDetails}>
          <div className={style.detailsOverview}>
            {page === 0 ? (
              <div className={style.number}>1</div>
            ) : (
              <div className={style.number}>
                <img
                  src="https://cdn.iconscout.com/icon/free/png-256/free-edit-mode-pencil-tool-change-30495.png"
                  alt=""
                />
              </div>
            )}
            <p>Personal Information</p>
          </div>
          <hr />
          <div className={style.qualifications}>
            {page === 1 ? (
              <div className={style.number}>2</div>
            ) : page > 1 ? (
              <div className={style.number}>
                <img
                  src="https://cdn.iconscout.com/icon/free/png-256/free-edit-mode-pencil-tool-change-30495.png"
                  alt=""
                />
              </div>
            ) : (
              <div
                className={style.number}
                style={{ backgroundColor: "#757575", color: "white" }}
              >
                2
              </div>
            )}
            <p>Qualification</p>
          </div>
          <hr />
          <div className={style.detailsOverview}>
            {page === 2 ? (
              <div className={style.number}>3</div>
            ) : (
              <div
                className={style.number}
                style={{ backgroundColor: "#757575", color: "white" }}
              >
                3
              </div>
            )}
            <p>Review and Proceed</p>
          </div>
        </div>
      </div>
      {PageDisplay()}
      <div className={style.prevBtn}>
        {page !== 0 ? (
          <button
            className={style.previous}
            onClick={() => {
              setPage((currPage) => currPage - 1);
            }}
            style={{ marginRight: "1rem" }}
          >
            Previous
          </button>
        ) : (
          ""
        )}

        {page !== 2 ? (
          <button className={style.previous} onClick={goQualification}>
            Next
          </button>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
