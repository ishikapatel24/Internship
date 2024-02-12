import style from "../css/jobopeningdetail.module.scss";
import { Link, useParams } from "react-router-dom";
import Navbar from "./Navbar";

export default function Jobhallticket() {
  const tm = useParams();
  // console.log(tm);

  return (
    <>
      <Navbar userLogo={true}/>
      <section className="jobOpeningList">
        <div className={style.jobAppliedContainer}>
          <div className={style.appliedDetails}>
            <div className={style.checkImage}>
              <img
                src="https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes-3/3/31-512.png"
                alt=""
              />
            </div>
            <div className={style.appliedMsg}>
              <p>
                Congratulations ! You have successfully applied for the walk-in
                opportunity
              </p>
            </div>
            <hr />
            <div className={style.dateTime}>
              <div className={style.title}>
                <p>Date & Time of Walk-In :</p>
              </div>
              <div className={style.date}>
                <p>{tm.date}</p>
              </div>
              <div className={style.time}>
                {tm.value === "firstTimeSlot" ? (
                  <p>9:00 AM to 11:00 AM</p>
                ) : (
                  <p>1:00 PM to 3:00 PM</p>
                )}
              </div>
            </div>
            <hr />
            <div className={style.address}>
              <div className={style.title}>Venue of Walk-In :</div>
              <div className={style.venue}>
                Zeus Systems Pvt. Ltd. <br />
                1402, 14th Floor, Tower B, Peninsula Business Park. Ganpatrao
                Kadam Marg <br />
                Lower Parel (W) <br /> Mumbai - 400 013 <br />
                Phone: +91-22-66600000
              </div>
            </div>
            <hr />
            <div className={style.thingsToRemember}>
              <div className={style.title}>
                <p>THINGS TO REMEMBER :</p>
              </div>
              <div className={style.points}>
                <p>
                  - Please report 30 MINUTES prior to your reporting time.{" "}
                  <br />- Download your Hall Ticket from below and carry it with
                  you during your Walk-In.
                </p>
              </div>
            </div>
            <hr />
            <div className={style.DownloadBtn}>
              <button>DOWNLOAD HALL TICKET</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
