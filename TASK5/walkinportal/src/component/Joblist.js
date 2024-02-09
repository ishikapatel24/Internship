import location from "../image/location.png";
import InstructionalDesigner from "../image/Instructional Designer.png";
import SoftwareQualityEngineer from "../image/Software Quality Engineer.png";
import style from "../css/jobdisplay.module.css";
import jobOpening from "../json/jobOpening";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

export default function Joblist() {
  const ind = 1;
  return (
    <>
      <Navbar userLogo={false}/>
      <section className="jobOpeningList">
        {jobOpening.map((item, index) => (
          <div className={style.jobOpening} key={index}>
            {item.isExpireDay ? (
              <div className={style.expireDay}>Expires in 5 days</div>
            ) : (
              ""
            )}

            <div className={style.jobOpeningtitle}>{item.jobOpeningTitle}</div>

            <div className={style.dateHeading}>Date & Time :</div>
            <div className={style.dateDetails}>
              <div className={style.dateValue}>
                {item.date.startDate} to {item.date.endDate}
              </div>
              <img src={location} alt="" />
              <div className={style.location}>{item.officeLocation}</div>
            </div>

            <div className={style.jobRolesHeading}>Job Roles :</div>

            <div className={style.jobRoles}>
              {item.jobRoles.isInstructionalDesigner ? (
                <div>
                  <img src={InstructionalDesigner} alt="" />
                  <div className={style.jobRoleName}>
                    Instructional Designer
                  </div>
                </div>
              ) : (
                ""
              )}

              {item.jobRoles.isSoftwareEngineer ? (
                <div>
                  <img src={InstructionalDesigner} alt="" />
                  <div className={style.jobRoleName}>Software Engineer</div>
                </div>
              ) : (
                ""
              )}

              {item.jobRoles.isSoftwareQualityEngineer ? (
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

            {item.isInternshipOpportunityforMCA ? (
              <div className={style.internshipOpportunity}>
                Internship Opportunity for MCA Students
              </div>
            ) : (
              ""
            )}

            <Link
              to={`/walkinlogin/${index}`}
              style={{ textDecoration: "none" }}
            >
              <button className={style.viewDetails}>VIEW MORE DETAILS</button>
            </Link>
          </div>
        ))}
      </section>
    </>
  );
}
