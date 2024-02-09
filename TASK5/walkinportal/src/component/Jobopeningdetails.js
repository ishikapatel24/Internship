import style from "../css/jobopeningdetail.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import location from "../image/location.png";
import InstructionalDesigner from "../image/Instructional Designer.png";
import SoftwareQualityEngineer from "../image/Software Quality Engineer.png";
import jobOpening from "../json/jobOpening";
import Navbar from "./Navbar";

export default function Jobopeningdetails() {
  const { id } = useParams();
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
    // console.log(jobRoleRes.length);
  };

  const goHallticket = () => {
    navigate(`/jobhallticket/${timeSlotOption}/${startDate}`);
  };

  const [updatedResume, setUpdatedResume] = useState(null);

  const handleResumeData = (event) => {
    setUpdatedResume(event.target.files[0].name);
  };

  return (
    <>
      <Navbar userLogo={true} />
      <section className="jobOpeningList">
        <div className={style.jobOpening}>
          <div className={style.jobSection}>
            {/* {props.isExpireDay ? (
            <div className={style.expireDay}>Expires in 5 days</div>
          ) : (
            ""
          )} */}
            <div className={style.title}>
              <div className={style.jobOpeningtitle}>
                {jobOpening[id].jobOpeningTitle}
              </div>

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
                {jobOpening[id].date.startDate} to {jobOpening[id].date.endDate}
              </div>
              <img src={location} alt="" />
              <div className={style.location}>
                {jobOpening[id].officeLocation}
              </div>
            </div>

            <div className={style.jobRolesHeading}>Job Roles :</div>

            <div className={style.jobRoles}>
              {jobOpening[id].jobRoles.isInstructionalDesigner ? (
                <div>
                  <img src={InstructionalDesigner} alt="" />
                  <div className={style.jobRoleName}>
                    Instructional Designer
                  </div>
                </div>
              ) : (
                ""
              )}

              {jobOpening[id].jobRoles.isSoftwareEngineer ? (
                <div>
                  <img src={InstructionalDesigner} alt="" />
                  <div className={style.jobRoleName}>Software Engineer</div>
                </div>
              ) : (
                ""
              )}

              {jobOpening[id].jobRoles.isSoftwareQualityEngineer ? (
                <div>
                  <img src={SoftwareQualityEngineer} alt="" />
                  <div className={style.jobRoleName}>
                    Software Quality Engineer
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>

            {jobOpening[id].isInternshipOpportunityforMCA ? (
              <div className={style.internshipOpportunity}>
                Internship Opportunity for MCA Students
              </div>
            ) : (
              ""
            )}

            {/* <button className={style.viewDetails}>VIEW MORE DETAILS</button> */}
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
              <p>
                - We have a two-year indemnity for permanent candidates. We will
                provide training to the selected candidates. <br />- Candidates
                who have appeared for any test held by Zeus Learning in the past
                12 months will not be allowed to appear for this recruitment
                test.
              </p>
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
                value="firstTimeSlot"
                onChange={handleRadioChange}
              />
              9:00 AM to 11:00 AM
            </div>
            <div className={style.inp}>
              <input
                type="radio"
                name="time"
                value="secondTimeSlot"
                onChange={handleRadioChange}
              />
              1:00 PM to 3:00 PM
            </div>
          </div>
          <hr />
          <div className={style.pref}>
            <p>Select Your Preference :</p>
            {/* <div className={style.inp}>
              <input
                type="checkbox"
                name="roles"
                value="ID"
                onChange={handleCheckboxChange}
              />
              Instructional Designer
            </div>
            <div className={style.inp}>
              <input
                type="checkbox"
                name="roles"
                value="SE"
                onChange={handleCheckboxChange}
              />
              Software Engineer
            </div>
            <div className={style.inp}>
              <input
                type="checkbox"
                name="roles"
                value="SQE"
                onChange={handleCheckboxChange}
              />
              Software Quality Engineer
            </div> */}
            {jobRole.map((item, index) => (
              <div key={index} className={style.inp}>
                <input
                  value={item}
                  type="checkbox"
                  onChange={handleCheckboxChange}
                />
                {item}
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
              <input type="file" name="resumeFile" onChange={handleResumeData} />
              UPLOAD UPDATED RESUME
            </label>
            <p>{updatedResume}</p>
          </div>
        </div>

        {jobRole.map((item, index) => (
          <div className={style.jobDetails} key={index}>
            <div className={style.moreInfoBtn}>
              <div className={style.infoTitle}>
                <p>{jobRole[index]}</p>
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
                <p>Rs. 5,00,000 lpa</p>
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