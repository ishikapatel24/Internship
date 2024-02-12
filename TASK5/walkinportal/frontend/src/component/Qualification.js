import { useState } from "react";
import style from "../css/qualification.module.css";
import Register from "./Register";

export default function Qualification({ formData, setformData }) {
  
  function handleData(e) {
    const { name, value, type, checked } = e.target;
    const { expertTechnology, familiarTechnology } = formData;
    if (type === "checkbox" && name === "expertTechnology") {
      setformData({
        ...formData,
        [name]: checked
          ? [...expertTechnology, value]
          : expertTechnology.filter((e) => e !== value),
      });
    } else if (type === "checkbox" && name === "familiarTechnology") {
      setformData({
        ...formData,
        [name]: checked
          ? [...familiarTechnology, value]
          : familiarTechnology.filter((e) => e !== value),
      });
    } else
      setformData({
        ...formData,
        [name]: value,
      });
    // console.log(formData);
  }

  return (
    <>
      <form action="" className={style.section}>
        <div className={style.qualificationsInfo}>
          <div className={style.eduTitle}>
            <div className={style.title}>
              <p>Educational Qualifications</p>
            </div>
            <div className={style.img}>
              <img
                src="https://www.iconpacks.net/icons/2/free-arrow-down-icon-3101-thumb.png"
                alt=""
              />
            </div>
          </div>
          <div className={style.eduQualification}>
            <div className={style.inp}>
              <p>Aggregate Percentage*</p>
              <div className={style.eduQualificationDetail}>
                <input
                  type="text"
                  placeholder=""
                  name="percentage"
                  value={formData.percentage}
                  onChange={handleData}
                />
              </div>
            </div>
            <div className={style.inp}>
              <p>Year of Passing*</p>
              <div className={style.eduQualificationDetail}>
                <select
                  name="yearOfPassing"
                  id=""
                  onChange={handleData}
                  value={formData.yearOfPassing}
                >
                  <option value="2020">2020</option>
                  <option value="2022">2022</option>
                  <option value="2024">2024</option>
                </select>
              </div>
            </div>
            <div className={style.eduDetail}>
              <div className={style.gridDiv}>
                <p>Qualification*</p>
                <div className={style.eduInfo}>
                  <select name="qualification" id="" onChange={handleData} value={formData.qualification}>
                    <option
                      value="B.Tech"
                    >
                      B.Tech
                    </option>
                    <option
                      value="BCA"
                    >
                      BCA
                    </option>
                    <option
                      value="MCA"
                    >
                      MCA
                    </option>
                  </select>
                </div>
              </div>
              <div className={style.gridDiv}>
                <p>Stream*</p>
                <div className={style.eduInfo}>
                  <select name="stream" id="" onChange={handleData} value={formData.stream}>
                    <option
                      value="science"
                    >
                      science
                    </option>
                    <option
                      value="commerce"
                    >
                      commerce
                    </option>
                    <option value="arts" >
                      arts
                    </option>
                  </select>
                </div>
              </div>
              <div className={style.gridDiv}>
                <p>College*</p>
                <div className={style.eduInfo}>
                  <select name="college" id="" onChange={handleData} value={formData.college}>
                    <option value="L.D" >
                      L.D
                    </option>
                    <option value="L.J">
                      L.J
                    </option>
                    <option value="L.M">
                      L.M
                    </option>
                  </select>
                </div>
              </div>
              <div className={`${style.gridDiv} ${style.Other}`}>
                <p>If others, please enter your college name</p>
                <div className={style.eduInfo}>
                  <input
                    type="text"
                    placeholder=""
                    name="otherCollege"
                    value={formData.otherCollege}
                    onChange={handleData}
                  />
                </div>
              </div>
            </div>
            <div className={style.inpLast}>
              <p>Where is your college located?*</p>
              <div className={style.eduQualificationDetail}>
                <input
                  type="text"
                  placeholder=""
                  name="location"
                  value={formData.location}
                  onChange={handleData}
                />
              </div>
            </div>
          </div>
          <div className={style.profTitle}>
            <div className={style.title}>
              <p>Professional Qualifications</p>
            </div>
            <div className={style.img}>
              <img
                src="https://www.iconpacks.net/icons/2/free-arrow-down-icon-3101-thumb.png"
                alt=""
              />
            </div>
          </div>
          <div className={style.profQualification}>
            <div className={style.inpLast}>
              <p>Applicant Type</p>
              <div className={style.profQualificationDetailRadio}>
                <input
                  type="radio"
                  name="applicant"
                  value="fresher"
                  checked={formData.applicant === "fresher"}
                  onChange={handleData}
                />
                &nbsp;&nbsp;Fresher
                <input
                  type="radio"
                  name="applicant"
                  value="experienced"
                  checked={formData.applicant === "experienced"}
                  onChange={handleData}
                />
                &nbsp;&nbsp;Experienced
              </div>
            </div>
          </div>
          <div className={style.profQualificationExp}>
            {formData.applicant === "experienced" ? (
              <>
                <div className={style.inp}>
                  <p>Years of Experience*</p>
                  <div className={style.profQualificationDetail}>
                    <input
                      type="text"
                      name="yearOfExp"
                      value={formData.yearOfExp}
                      onChange={handleData}
                    />
                  </div>
                </div>
                <div className={style.inp}>
                  <p>Current CTC* (In Rupees)</p>
                  <div className={style.profQualificationDetail}>
                    <input
                      type="text"
                      name="currentCTC"
                      value={formData.currentCTC}
                      onChange={handleData}
                    />
                  </div>
                </div>
                <div className={style.inp}>
                  <p>Expected CTC* (In Rupees)</p>
                  <div className={style.profQualificationDetail}>
                    <input
                      type="text"
                      name="expCTC"
                      value={formData.expCTC}
                      onChange={handleData}
                    />
                  </div>
                </div>
                <div className={style.expertiseTechnology}>
                  <p className={style.technologyTitle}>
                    Select All The Technologies You Expertise In*
                  </p>
                  <div className={style.technologyCheckbox}>
                    <div className={style.cheboxes}>
                      <input
                        type="checkbox"
                        name="expertTechnology"
                        value="Javascript"
                        checked={
                          formData.expertTechnology.filter(
                            (e) => e === "Javascript"
                          ).length === 1
                        }
                        onChange={handleData}
                      />
                      &nbsp;Javascript
                    </div>
                    <div className={style.cheboxes}>
                      <input
                        type="checkbox"
                        name="expertTechnology"
                        value="AngularJS"
                        checked={
                          formData.expertTechnology.filter(
                            (e) => e === "AngularJS"
                          ).length === 1
                        }
                        onChange={handleData}
                      />
                      &nbsp;Angular JS
                    </div>
                    <div className={style.cheboxes}>
                      <input
                        type="checkbox"
                        name="expertTechnology"
                        value="React"
                        checked={
                          formData.expertTechnology.filter((e) => e === "React")
                            .length === 1
                        }
                        onChange={handleData}
                      />
                      &nbsp;React
                    </div>
                    <div className={style.cheboxes}>
                      <input
                        type="checkbox"
                        name="expertTechnology"
                        value="NodeJS"
                        checked={
                          formData.expertTechnology.filter(
                            (e) => e === "NodeJS"
                          ).length === 1
                        }
                        onChange={handleData}
                      />
                      &nbsp;Node JS
                    </div>
                    <div className={style.cheboxes}>
                      <input
                        type="checkbox"
                        name="expertTechnology"
                        value="Others"
                        checked={
                          formData.expertTechnology.filter(
                            (e) => e === "Others"
                          ).length === 1
                        }
                        onChange={handleData}
                      />
                      &nbsp;Others
                    </div>
                  </div>
                  <p className={style.other}>If others, please mention</p>
                  <div className={style.technology}>
                    <input
                      type="text"
                      value={formData.expertOther}
                      name="expertOther"
                      onChange={handleData}
                    />
                  </div>
                </div>
              </>
            ) : (
              ""
            )}

            <div className={style.familiarTechnology}>
              <p className={style.technologyTitle}>
                Select All The Technologies You are familiar In
              </p>
              <div className={style.technologyCheckbox}>
                <div className={style.cheboxes}>
                  <input
                    type="checkbox"
                    name="familiarTechnology"
                    value="Javascript"
                    checked={
                      formData.familiarTechnology.filter(
                        (e) => e === "Javascript"
                      ).length === 1
                    }
                    onChange={handleData}
                  />
                  &nbsp;Javascript
                </div>
                <div className={style.cheboxes}>
                  <input
                    type="checkbox"
                    name="familiarTechnology"
                    value="AngularJS"
                    checked={
                      formData.familiarTechnology.filter(
                        (e) => e === "AngularJS"
                      ).length === 1
                    }
                    onChange={handleData}
                  />
                  &nbsp;Angular JS
                </div>
                <div className={style.cheboxes}>
                  <input
                    type="checkbox"
                    name="familiarTechnology"
                    value="React"
                    checked={
                      formData.familiarTechnology.filter((e) => e === "React")
                        .length === 1
                    }
                    onChange={handleData}
                  />
                  &nbsp;React
                </div>
                <div className={style.cheboxes}>
                  <input
                    type="checkbox"
                    name="familiarTechnology"
                    value="NodeJS"
                    checked={
                      formData.familiarTechnology.filter((e) => e === "NodeJS")
                        .length === 1
                    }
                    onChange={handleData}
                  />
                  &nbsp;Node JS
                </div>
                <div className={style.cheboxes}>
                  <input
                    type="checkbox"
                    name="familiarTechnology"
                    value="Others"
                    checked={
                      formData.familiarTechnology.filter((e) => e === "Others")
                        .length === 1
                    }
                    onChange={handleData}
                  />
                  &nbsp;Others
                </div>
              </div>
              <p className={style.other}>If others, please mention</p>
              <div className={style.technology}>
                <input
                  type="text"
                  value={formData.familiarOther}
                  name="familiarOther"
                  onChange={handleData}
                />
              </div>
            </div>

            {formData.applicant === "experienced" ? (
              <>
                <div className={style.noticePeriodDiv}>
                  <div className={style.isNoticePeriod}>
                    <p>Are you currently on notice period?*</p>
                    <div className={style.profQualificationDetailRadio}>
                      <input
                        type="radio"
                        name="curNoticePeriod"
                        value="Yes"
                        checked={formData.curNoticePeriod === "Yes"}
                        onChange={handleData}
                      />
                      &nbsp;&nbsp;Yes
                      <input
                        type="radio"
                        name="curNoticePeriod"
                        value="No"
                        checked={formData.curNoticePeriod === "No"}
                        onChange={handleData}
                      />
                      &nbsp;&nbsp;No
                    </div>
                  </div>
                  <div className={style.noticePeriod}>
                    <div className={style.noticePeriodInfo}>
                      <p>If Yes, when will your notice period end?*</p>
                      <div className={style.profQualificationDetail}>
                        <input
                          type="text"
                          value={formData.endNoticePeriod}
                          name="endNoticePeriod"
                          onChange={handleData}
                        />
                      </div>
                    </div>
                    <div className={style.noticePeriodInfo}>
                      <p>
                        How long is your notice period?* (Mention in months)
                      </p>
                      <div className={style.profQualificationDetail}>
                        <select
                          name="lengthOfNoticePeriod"
                          id=""
                          onChange={handleData}
                          value={formData.lengthOfNoticePeriod}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}

            <div className={style.testDetail}>
              <div className={style.isTest}>
                <p>
                  Have You Appeared For Any Test By Zeus in the past 12 months?*
                </p>
                <div className={style.profQualificationDetailRadio}>
                  <input
                    type="radio"
                    value="Yes"
                    name="isAppearedTest"
                    checked={formData.isAppearedTest === "Yes"}
                    onChange={handleData}
                  />
                  &nbsp;&nbsp;Yes
                  <input
                    type="radio"
                    value="No"
                    name="isAppearedTest"
                    checked={formData.isAppearedTest === "No"}
                    onChange={handleData}
                  />
                  &nbsp;&nbsp;No
                </div>
              </div>

              {formData.isAppearedTest === "Yes" ? (
                <div className={style.inpLast}>
                  <p>If Yes, which role did you apply for?</p>
                  <div className={style.profQualificationDetail}>
                    <input
                      type="text"
                      name="applyRole"
                      value={formData.applyRole}
                      onChange={handleData}
                    />
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
