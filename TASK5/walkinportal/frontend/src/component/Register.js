import arrow from "../image/arrow.png";
import style from "../css/register.module.css";
import Navbar from "./Navbar";
import Personaldetail from "./Personaldetail";
import Qualification from "./Qualification";
import Review from "./Review";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { SIGNIN_MUTATION } from "../mutation/mutation";

const personalDetailSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneCode: Yup.string().required("Phone Code is required"),
  phoneNumber: Yup.string().required("Phone Number is required"),
  portfoliourl: Yup.string(),
  referralName: Yup.string(),
  jobRoleRes: Yup.array().min(1, "Select at least one job role"),
});

const qualificationDetailSchema = Yup.object().shape({
  percentage: Yup.string().required("Percentage is required"),
  location: Yup.string().required("Loaction is required"),
  otherCollege: Yup.string(),
  isAppearedTest: Yup.string().required("Test Appeared is required"),
  expertOther: Yup.string(),
  familiarOther: Yup.string(),
  applyRole: Yup.string(),
  applicant: Yup.string().required("Applicant Type is required"),

  yearOfExp: Yup.string().when("applicant", {
    is: "experienced",
    then: (schema) => schema.required("Year Of experience is required"),
    otherwise: (schema) => schema,
  }),
  currentCTC: Yup.string().when("applicant", {
    is: "experienced",
    then: (schema) => schema.required("Current CTC is required"),
    otherwise: (schema) => schema,
  }),
  expCTC: Yup.string().when("applicant", {
    is: "experienced",
    then: (schema) => schema.required("Expected CTC is required"),
    otherwise: (schema) => schema,
  }),

  curNoticePeriod: Yup.string().when("applicant", {
    is: "experienced",
    then: (schema) => schema.required("Cureent Notice Period is required"),
    otherwise: (schema) => schema,
  }),
  endNoticePeriod: Yup.string().when("curNoticePeriod", {
    is: "Yes",
    then: (schema) => schema.required("End Notice Period is required"),
    otherwise: (schema) => schema,
  }),
  expertTechnology: Yup.array().when("applicant", {
    is: "experienced",
    then: (schema) => schema.min(1, "Select at least one Technology"),
    otherwise: (schema) => schema,
  }),
});

export default function Register() {
  const { id } = useParams();
  const navigate = useNavigate();

  const goLogin = () => {
    navigate(`/walkinlogin/${id}`);
  };

  const [page, setPage] = useState(0);

  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
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
    qualification: "BE",
    stream: "science",
    college: "LD",
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

  const [signUpUser, { data, loading, error }] =
    useMutation(SIGNIN_MUTATION);
  if (loading) return <h1>Loading...</h1>;
  if (error) return console.log(error);

  const goQualification = (event) => {
    event.preventDefault();
    if (page === 0) {
      personalDetailSchema
        .validate(formData, { abortEarly: false })
        .then(() => {
          setPage((currPage) => currPage + 1);
        })
        .catch((validationErrors) => {
          alert("Please Fill Properly or Mandatory Details");
        });
    } else if (page === 1) {
      qualificationDetailSchema
        .validate(formData, { abortEarly: false })
        .then(() => {
          setPage((currPage) => currPage + 1);
        })
        .catch((validationErrors) => {
          alert("Please Fill Properly or Mandatory Details");
        });
    }
  };

  const goJobOpening = () => {
    signUpUser({
      variables: {
        input: {
          First_name: formData.firstName,
          Last_name: formData.lastName,
          Email_ID: formData.email,
          User_password: formData.password,
          Phone_number: formData.phoneNumber,
          Is_subscribed_to_email: formData.jobUpdate === "no" ? false : true,
          Resume_url: formData.resumeFile,
          Portfolio_url: formData.portfoliourl,
          User_image_url: null,
          Job_role: formData.jobRoleRes,
          Referrer_name: formData.referralName,
          Percentage: formData.percentage,
          Year_of_passing: formData.yearOfPassing,
          College_name: formData.otherCollege,
          College_location: formData.location,
          Qualification_types: formData.qualification,
          Stream_types: formData.stream,
          College_names: formData.college,
          Applicant_type: formData.applicant === "fresher" ? 1 : 2,
          Years_of_experience: formData.yearOfExp,
          Current_ctc: formData.currentCTC,
          Expected_ctc: formData.expCTC,
          Is_currently_on_notice_period:
            formData.curNoticePeriod === "Yes" ? true : false,
          Notice_period_end_date: formData.endNoticePeriod,
          Notice_period_length_in_months: formData.lengthOfNoticePeriod,
          Is_appeared_previously:
            formData.isAppearedTest === "Yes" ? true : false,
          Role_applied_for: formData.applyRole,
          Expert_tech: formData.expertTechnology,
          Familiar_tech: formData.familiarTechnology,
          Other_expert_tech: formData.expertOther,
          Other_familiar_tech: formData.familiarOther
        },
      },
    });
    navigate(`/walkinlogin/${id}`);
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
