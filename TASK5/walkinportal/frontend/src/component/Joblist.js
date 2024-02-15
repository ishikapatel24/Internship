import location from "../image/location.png";
import InstructionalDesigner from "../image/Instructional Designer.png";
import SoftwareQualityEngineer from "../image/Software Quality Engineer.png";
import style from "../css/jobdisplay.module.css";
import jobOpening from "../json/jobOpening";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { gql, useQuery } from "@apollo/client";

const query = gql`
  query Query {
    getJobopening {
      Job_opening_ID
      Job_title
      Start_date
      End_date
      Office_location
      Is_internship_opportunity_for_mca
      Is_expire
      jobOpeningJobRoleMap {
        jobRole {
          Job_role_name
        }
      }
    }
  }
`;

export default function Joblist() {
  const ind = 1;
  const { data, loading } = useQuery(query);
  if (loading) return <h1>Loading...</h1>;
  // console.log(data.getJobopening[0]);
  return (
    <>
      <Navbar userLogo={false} />
      <section className="jobOpeningList">
        {data.getJobopening.map((item, index) => (
          <div className={style.jobOpening} key={index}>
            {item.Is_expire ? (
              <div className={style.expireDay}>Expires in 5 days</div>
            ) : (
              ""
            )}
            <div className={style.jobOpeningtitle}>{item.Job_title}</div>
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

            {item.Is_internship_opportunity_for_mca ? (
              <div className={style.internshipOpportunity}>
                Internship Opportunity for MCA Students
              </div>
            ) : (
              ""
            )}
            <Link
              to={`/walkinlogin/${index+1}`}
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
