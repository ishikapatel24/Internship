import style from "../css/personaldetail.module.css";
// import Register from "./Register";
import preview from "../image/preview.png";

export default function Personaldetail({ formData, setformData }) {
  function handleData(e) {
    const { name, value, type, checked, files } = e.target;
    const { jobRoleRes } = formData;
    if (name === "jobUpdate")
      setformData({ ...formData, [name]: checked ? value : "no" });
    else if (type === "file")
      setformData({ ...formData, [name]: files[0].name });
    else {
      setformData({
        ...formData,
        [name]:
          type === "checkbox" && name === "jobRoleRes"
            ? checked
              ? [...jobRoleRes, value]
              : jobRoleRes.filter((event) => event !== value)
            : value,
      });
    }
  }

  function hide() {
    var x = document.getElementById("passwordInput");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  return (
    <>
      <div className={style.component}>
        <form action="" className={style.form}>
          <div className={style.basicDetails}>
            <div className={style.nameDetails}>
              <div className={style.inp}>
                <p>First Name*</p>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleData}
                />
              </div>
              <div className={style.inp}>
                <p>Last Name*</p>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleData}
                />
              </div>
              <div className={style.inp}>
                <p>Email*</p>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleData}
                />
              </div>
              <div className={style.inp}>
                <p>Password*</p>
                <input
                  type="password"
                  name="password"
                  id="passwordInput"
                  value={formData.password}
                  onChange={handleData}
                />
                <img src={preview} onClick={hide} />
              </div>
              <div className={style.PhoneNumber}>
                <p>Phone Number*</p>
                <div className={style.number}>
                  <p>+</p>
                  <input
                    type="text"
                    name="phoneCode"
                    value={formData.phoneCode}
                    onChange={handleData}
                  />
                  &nbsp;&nbsp;
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleData}
                  />
                </div>
              </div>
              <div className={style.resumeUpload}>
                {/* <button>UPLOAD UPDATED RESUME</button> */}
                <label className={style.custom}>
                  <div className={style.image}>
                    <img
                      src="https://t4.ftcdn.net/jpg/01/64/16/59/360_F_164165971_ELxPPwdwHYEhg4vZ3F4Ej7OmZVzqq4Ov.jpg"
                      alt=""
                    />
                  </div>
                  <input type="file" name="resumeFile" onChange={handleData} />
                  UPLOAD RESUME
                </label>
                <p>{formData.resumeFile}</p>
              </div>
              <div className={style.inp}>
                <p>Enter Portfolio URL (if any)</p>
                <input
                  type="text"
                  name="portfoliourl"
                  value={formData.portfoliourl}
                  onChange={handleData}
                />
              </div>
              <div className={style.pref}>
                <p>Select Your Preference* :</p>
                <div className={style.checkInp}>
                  <input
                    type="checkbox"
                    name="jobRoleRes"
                    value="Instructional Designer"
                    checked={
                      formData.jobRoleRes.filter(
                        (e) => e === "Instructional Designer"
                      ).length === 1
                    }
                    onChange={handleData}
                  />
                  &nbsp;Instructional Designer
                </div>
                <div className={style.checkInp}>
                  <input
                    type="checkbox"
                    name="jobRoleRes"
                    value="Software Engineer"
                    checked={
                      formData.jobRoleRes.filter(
                        (e) => e === "Software Engineer"
                      ).length === 1
                    }
                    onChange={handleData}
                  />
                  &nbsp;Software Engineer
                </div>
                <div className={style.checkInp}>
                  <input
                    type="checkbox"
                    name="jobRoleRes"
                    value="Software Quality Engineer"
                    checked={
                      formData.jobRoleRes.filter(
                        (e) => e === "Software Quality Engineer"
                      ).length === 1
                    }
                    onChange={handleData}
                  />
                  &nbsp;Software Quality Engineer
                </div>
              </div>
              <div className={style.inp}>
                <p>
                  If You Are Registering Via A Referral, Please Mention Full
                  Name Of The Employee Who Referred You
                </p>
                <input
                  type="text"
                  name="referralName"
                  value={formData.referralName}
                  onChange={handleData}
                />
              </div>
              <div className={style.checkBox}>
                <input
                  type="checkbox"
                  name="jobUpdate"
                  value="yes"
                  checked={formData.jobUpdate === "yes"}
                  onChange={handleData}
                />
                &nbsp;Send me job related updates via mail
              </div>
            </div>
            <div className={style.imageDetails}>
              <div className={style.personalImg}>
                <img
                  src="https://cdn.icon-icons.com/icons2/3250/PNG/512/person_circle_filled_icon_202012.png"
                  alt=""
                />
              </div>
              <div className={style.updateImg}>
                <button>UPLOAD DISPLAY PICTURE</button>
                <p>Max. image size: 5 MB</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
