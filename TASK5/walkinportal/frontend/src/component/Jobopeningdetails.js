import style from "../css/jobopeningdetail.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import location from "../image/location.png";
import InstructionalDesigner from "../image/Instructional Designer.png";
import SoftwareQualityEngineer from "../image/Software Quality Engineer.png";
import jobOpening from "../json/jobOpening";
import Navbar from "./Navbar";
import { gql, useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { APPLY_MUTATION } from "../mutation/mutation";

const query = gql`
  query Query($jobOpeningId: String!) {
    getJobOpening(ID: $jobOpeningId) {
      Job_title
      Start_date
      End_date
      Office_location
      Is_expire
      jobOpeningJobRoleMap {
        Package
        jobRole {
          Job_role_name
        }
      }
      additionalDetails {
        General_Instructions
      }
      application {
        jobOpenningTimeSlot {
          Time_slot
        }
      }
    }
  }
`;

export default function Jobopeningdetails() {
  const { id, username } = useParams();

  const navigate = useNavigate();
  const startDate = jobOpening[id].date.startDate;

  const [isOpen, setOpen] = useState(false);
  function preRequisitesDisplay() {
    setOpen(!isOpen);
  }

  const [isJobDetailsOpen, setisJobDetailsOpen] = useState(null);

  const jobInfoDisplay = (index) => {
    setisJobDetailsOpen(index === isJobDetailsOpen ? null : index);
  };

  const objLength = Object.keys(jobOpening[id].jobRoles);
  const jobROlePair = Object.entries(jobOpening[id].jobRoles);
  const jobRole = [];

  for (let i = 0; i < objLength.length; i++) {
    if (jobROlePair[i][0] === "isInstructionalDesigner" && jobROlePair[i][1]) {
      jobRole.push("Instructional Designer");
    } else if (
      jobROlePair[i][0] === "isSoftwareEngineer" &&
      jobROlePair[i][1]
    ) {
      jobRole.push("Software Engineer");
    } else if (
      jobROlePair[i][0] === "isSoftwareQualityEngineer" &&
      jobROlePair[i][1]
    ) {
      jobRole.push("Software Quality Engineer");
    }
  }

  const [timeSlotOption, setTimeSlotOption] = useState("");
  const handleRadioChange = (event) => {
    setTimeSlotOption(event.target.value);
  };

  const [jobRoleOption, setjobRoleOption] = useState({ jobRoleRes: [] });
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    const { jobRoleRes } = jobRoleOption;
    if (checked) {
      setjobRoleOption({
        jobRoleRes: [...jobRoleRes, value],
      });
    } else {
      setjobRoleOption({
        jobRoleRes: jobRoleRes.filter((e) => e !== value),
      });
    }
    // console.log(jobRoleRes);
  };

  const [updatedResume, setUpdatedResume] = useState(null);

  const handleResumeData = (event) => {
    setUpdatedResume(event.target.files[0].name);
  };

  const jobOpeningId = id;
  const { data, error, loading } = useQuery(query, {
    variables: { jobOpeningId },
  });
  
  // Use the useMutation hook without conditions
  const [
    applyUser,
    { data: applyData, loading: applyLoading, error: applyError },
  ] = useMutation(APPLY_MUTATION);
  
  if (loading || applyLoading) {
    return <h1>Loading...</h1>;
  }
  
  if (error) {
    console.log(error);
  }
  const goHallticket = () => {
    // console.log(jobRoleOption.jobRoleRes);
    applyUser({
      variables: {
        input: {
          Username: username,
          Job_Role_Prefernce: jobRoleOption.jobRoleRes,
          Time_Slot: timeSlotOption,
          Job_Opening_ID: parseInt(jobOpeningId),
        },
      },
    });
    navigate(`/jobhallticket/${timeSlotOption}/${startDate}`);
  };
  
  const item = data.getJobOpening[0];

  return (
    <>
      <Navbar userLogo={true} />
      <section className="jobOpeningList">
        <div className={style.jobOpening}>
          <div className={style.jobSection}>
            {item.Is_expire ? (
              <div className={style.expireDay}>Expires in 5 days</div>
            ) : (
              ""
            )}
            <div className={style.title}>
              <div className={style.jobOpeningtitle}>{item.Job_title}</div>

              <button
                className={style.applyBtn}
                disabled={
                  !timeSlotOption || jobRoleOption.jobRoleRes.length === 0
                }
                onClick={goHallticket}
              >
                APPLY
              </button>
            </div>

            <div className={style.dateHeading}>Date & Time :</div>
            <div className={style.dateDetails}>
              <div className={style.dateValue}>
                {item.Start_date} to {item.End_date}
              </div>
              <img src={location} alt="" />
              <div className={style.location}>{item.Office_location}</div>
            </div>

            <div className={style.jobRolesHeading}>Job Roles :</div>

            <div className={style.jobRoles}>
              {item.jobOpeningJobRoleMap.map((jobroles, indexs) => (
                <div key={indexs}>
                  <img src={InstructionalDesigner} alt="" />
                  <div className={style.jobRoleName}>
                    {jobroles.jobRole[0].Job_role_name}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={style.moreInfoBtn}>
            <div className={style.infoTitle}>
              <p>Pre-requisites & Application Process</p>
            </div>
            <div className={style.infoBtn} onClick={preRequisitesDisplay}>
              {isOpen ? (
                <img
                  src="https://www.iconpacks.net/icons/2/free-arrow-down-icon-3101-thumb.png"
                  alt=""
                />
              ) : (
                <img
                  src="https://www.svgrepo.com/show/93813/up-arrow.svg"
                  alt=""
                />
              )}
            </div>
          </div>
          <div className={`${style.jobInfo} ${isOpen ? style.jobToggle : ""}`}>
            <div className={style.generalInfo}>
              <p>General Instruction :</p>
              <p>{item.additionalDetails[0].General_Instructions}</p>
            </div>
            <hr />
            <div className={style.infoForExam}>
              <p>Instructions for the Exam :</p>
              <p>
                - Candidates are requested to log in half an hour prior to the
                exam start time as they would need to capture their image using
                a web camera. By taking this test, you are permitting the
                examination system to capture your video for invigilation
                purposes. <br />
                - Candidates would not be able to appear for the exam if the web
                camera attached to their system is not functional. <br />
                - The web camera of your system must be enabled and must remain
                switched on throughout the examination. In the event of
                non-receipt of a webcam, your examination will be considered
                null and void. <br />
                - Candidate's audio and video will be recorded during the
                examination and will also be monitored by a live proctor. The
                proctor may terminate your exam in case he/she observes any
                malpractice during the exam. <br />
                - Candidates are advised to use their own Laptop/PC with a
                stable internet connection (min 1 Mbps) during the exam. <br />-
                Candidates cannot use an iOS system/device for this exam.
              </p>
            </div>
            <hr />
            <div className={style.minSysReq}>
              <p>Minimum System Requirements :</p>
              <p>
                - Personal Laptop or Desktop computer in working condition with
                good quality camera (you can use Windows 7 and above). <br />
                - The latest version of Google Chrome Browser only. <br />-
                Please note that Internet speed should be minimum 1 Mbps. <br />
                - Do not use a MacBook or iPad for the proctored exam.
              </p>
            </div>
            <hr />
            <div className={style.process}>
              <p>process :</p>
              <p>
                - Every round is an elimination round. Candidates need to clear
                all rounds to get selected.
                <br />
                <br />
                Round I : 4th August, 2018
                <br />
                Aptitude Test : 25 Questions
                <br />
                <br />
                Round II (Interview) : 4th August, 2018.
              </p>
            </div>
          </div>
        </div>

        <div className={style.timeSlotPref}>
          <div className={style.timeSlotPrefTitle}>
            <p>Time Slots & Preferences</p>
          </div>
          <div className={style.timeSlot}>
            <p>Select a Time Slot :</p>
            <div className={style.inp}>
              <input
                type="radio"
                name="time"
                value="9:00 AM to 11:00 AM"
                onChange={handleRadioChange}
              />
              9:00 AM to 11:00 AM
            </div>
            <div className={style.inp}>
              <input
                type="radio"
                name="time"
                value="1:00 PM to 3:00 PM"
                onChange={handleRadioChange}
              />
              1:00 PM to 3:00 PM
            </div>
          </div>
          <hr />
          <div className={style.pref}>
            <p>Select Your Preference :</p>
            {item.jobOpeningJobRoleMap.map((jobroles, indexs) => (
              <div key={indexs} className={style.inp}>
                <input
                  value={jobroles.jobRole[0].Job_role_name}
                  type="checkbox"
                  onChange={handleCheckboxChange}
                />
                {jobroles.jobRole[0].Job_role_name}
              </div>
            ))}
          </div>
          <hr />
          <div className={style.resumeUpload}>
            <label className={style.custom}>
              <div className={style.image}>
                <img
                  src="https://t4.ftcdn.net/jpg/01/64/16/59/360_F_164165971_ELxPPwdwHYEhg4vZ3F4Ej7OmZVzqq4Ov.jpg"
                  alt=""
                />
              </div>
              <input
                type="file"
                name="resumeFile"
                onChange={handleResumeData}
              />
              UPLOAD UPDATED RESUME
            </label>
            <p>{updatedResume}</p>
          </div>
        </div>

        {item.jobOpeningJobRoleMap.map((jobroles, index) => (
          <div className={style.jobDetails} key={index}>
            <div className={style.moreInfoBtn}>
              <div className={style.infoTitle}>
                <p>{jobroles.jobRole[0].Job_role_name}</p>
              </div>
              <div
                className={style.infoBtn}
                onClick={() => jobInfoDisplay(index)}
              >
                {isJobDetailsOpen === index ? (
                  <img
                    src="https://www.iconpacks.net/icons/2/free-arrow-down-icon-3101-thumb.png"
                    alt=""
                  />
                ) : (
                  <img
                    src="https://www.svgrepo.com/show/93813/up-arrow.svg"
                    alt=""
                  />
                )}
              </div>
            </div>
            <div
              className={`${style.jobInfo} ${
                isJobDetailsOpen === index ? style.jobInfoToggle : ""
              }`}
            >
              <div className={style.generalInfo}>
                <p>compensation package :</p>
                <p>Rs. {item.jobOpeningJobRoleMap[index].Package} lpa</p>
              </div>
              <hr />
              <div className={style.roleDescription}>
                <p>Role Description :</p>
                <p>
                  - Generate highly interactive and innovative instructional
                  strategies for e-learning solutions <br />
                  - Develop course structure and learning specifications
                  addressing the requirements of the target audience <br />
                  - Construct appropriate testing strategies to ensure learners'
                  understanding and performance <br />
                  - Address usability issues <br />
                  - Keep abreast of new trends in e-learning <br />
                  - Ensure that the instructional strategies are as per global
                  standards
                  <br />- Prepare instructional design checklists and guidelines{" "}
                  <br />- Check for quality assurance
                </p>
              </div>
              <hr />
              <div className={style.Requirements}>
                <p>Requirements :</p>
                <p>
                  - Experience in creating instructional plans and course maps.
                  <br />
                  - Experience in the use of media like graphics, illustrations,
                  photographs, audio, video, animations, and simulations in
                  instruction <br />
                  - Awareness of different instructional design models and
                  familiarity with instructional and learning theories <br />
                  - Awareness of latest trends in e-learning and instructional
                  design
                  <br />
                  - Strong client consulting/interfacing skills. <br />
                  - Ability to guide clients to focus on specific objectives and
                  teaching points <br />
                  - Strong meeting facilitation, presentation and interpersonal
                  skills
                  <br />
                  - A thorough understanding of the web as an instructional
                  medium
                  <br />- Post graduate degree in Education, Instructional
                  Design, Mass Communication or Journalism
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
