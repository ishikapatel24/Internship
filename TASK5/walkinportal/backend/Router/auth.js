const express = require("express");
const router = express.Router();
const connection = require("../Database/database").connection;
const SECRET = "my-secret-key";
var jwt = require("jsonwebtoken");
const { authenticate } = require("../Controller/authentication");
require("dotenv");

router.post("/userLoginAuth", function (req, res) {
  const { email, password } = req.body;
  const queryparams = [email];
  const query =
    "select * from user_login where User_ID = (select User_ID from users where Email_ID = 'ishikapatel@gmail.com' )";
  connection.query(query, queryparams, (err, result) => {
    if (err) console.log("error occured");
    if (result[0] != null && password === result[0].User_password) {
      const token = jwt.sign({ email, userId: result[0].User_ID }, SECRET, {
        expiresIn: "1h",
      });
      const user = {
        id: result[0].User_ID,
        token,
      };
      console.log("Successfully login");
      res.send(token);
    } else {
      res.status(401).send("Unauthorized");
    }
  });
});

router.get("/userLoginAuth", authenticate, (req, res) => {
  let sql = "select * from user_login";

  connection.query(sql, (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});

router.get("/jobList", authenticate, (req, res) => {
  let sql = `select j1.Job_opening_ID,j1.Job_title,j1.Start_date,j1.End_date,j1.Office_location,j1.Is_internship_opportunity_for_mca,j3.Job_role_name,j3.Job_role_image_url 
    FROM job_opening as j1 
    INNER JOIN job_opening_job_role_map as j2 
    on j1.Job_opening_ID=j2.Job_opening_ID 
    INNER JOIN job_role as j3 
    on j3.ID=j2.Job_role_ID order by j1.Job_opening_ID;`;
  connection.query(sql, (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});

router.get("/jobList/:id", authenticate, (req, res) => {
  connection.query(
    `
    select j1.Job_opening_ID,j1.Job_title,j1.Start_date,j1.End_date,j1.Office_location,j1.Is_internship_opportunity_for_mca,j3.Job_role_name,j3.Job_role_image_url 
    FROM job_opening as j1 
    INNER JOIN job_opening_job_role_map as j2 
    on j1.Job_opening_ID=j2.Job_opening_ID 
    INNER JOIN job_role as j3 
    on j3.ID=j2.Job_role_ID 
    where j1.Job_opening_ID='${req.params.id}';

    select j1.Job_opening_ID,j2.General_Instructions,j2.Exam_Instructions,j2.System_Requirements,j2.Process
    FROM job_opening as j1
    INNER JOIN job_openning_additional_details as j2
    on j1.Job_opening_ID=j2.Job_opening_ID
    where j1.Job_opening_ID='${req.params.id}';

    select j2.Job_opening_ID,j3.Job_role_name,j2.Package,j3.Job_role_description,j3.Job_role_requirement from
    job_opening_job_role_map as j2
    INNER JOIN job_role as j3
    on j2.Job_role_ID=j3.ID 
    where j2.Job_opening_ID='${req.params.id}';

  `,
    (err, result) => {
      if (err) {console.log(err);}
      else if (result.length === 0) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
      const [
        listingDetails,
        timeSlots,
        preRequisitesApplicationProcess
      ] = result;

      console.log(listingDetails);
      console.log(timeSlots);
      console.log(preRequisitesApplicationProcess);

      const responseData = {
        listing_display: listingDetails,
        timeSlots: timeSlots,
        preRequisitesApplicationProcess: preRequisitesApplicationProcess
      };

      res.json(responseData);
    }
  );
});

module.exports = router;
