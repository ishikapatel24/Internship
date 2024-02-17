const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { typeDefs } = require("./schema/typeDefs.js");
const { connection } = require("./database/database.js");
const { dateScalar } = require("./customscalar/graphqlscalar.js");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");

const queryAsync = promisify(connection.query).bind(connection);
const SECRET = "my-secret-key";

const verifyToken = (token) => {
  try {
    if (!token) {
      return null;
    }
    return jwt.verify(token, SECRET);
  } catch (error) {
    return null;
  }
};

const authenticateUser = async (email, password) => {
  try {
    const queryparams = [email];
    const query = "SELECT * FROM users WHERE Email_ID = ?";
    const result = await queryAsync(query, queryparams);
    const passquery = "SELECT * FROM user_login WHERE User_ID = ?";
    const passresult = await queryAsync(passquery, [result[0].User_ID]);
    
    if (result[0] != null && password == passresult[0].User_password) {
      return {
        User_ID: result[0].User_ID,
        email,
      };
    }

    return null;
  } catch (error) {
    console.error("Unexpected error:", error);
    throw new Error("Internal Server Error");
  }
};

const generateToken = (user) => {
  const { email, User_ID } = user;
  const token = jwt.sign({ email, User_ID }, SECRET, { expiresIn: "1h" });
  return token;
};

async function getUserCredentials() {
  const query = "SELECT * FROM user_login";
  return await queryAsync(query);
}

// const getUserCredentials = async () => {
//   return new Promise((resolve, reject) => {
//     const query = `
//         SELECT * FROM user_login
//       `;

//     connection.query(query, (error, results) => {
//       if (error) {
//         reject(error);
//       } else {
//         resolve(results);
//       }
//     });
//   });
// };

async function getUserDetails() {
  const query = "SELECT * FROM users";
  return await queryAsync(query);
}

async function getProfessionalQualification() {
  const query = "SELECT * FROM professional_qualification";
  return await queryAsync(query);
}

async function getEducationalQualification() {
  const query = "SELECT * FROM educational_qualification";
  return await queryAsync(query);
}

async function getJobOpening() {
  const query = "SELECT * FROM job_opening";
  return await queryAsync(query);
}

async function getAdditionalDetails() {
  const query = "SELECT * FROM job_openning_additional_details";
  return await queryAsync(query);
}

async function getJobOpeningJobRoleMap() {
  const query = "SELECT * FROM job_opening_job_role_map";
  return await queryAsync(query);
}

async function getJobRole() {
  const query = "SELECT * FROM job_role";
  return await queryAsync(query);
}

async function getapplication() {
  const query = "SELECT * FROM application";
  return await queryAsync(query);
}

async function getJobOpenningTimeSlot() {
  const query = "SELECT * FROM job_openning_time_slot";
  return await queryAsync(query);
}

async function getUserLoginDetails() {
  const query = "SELECT * FROM users";
  return await queryAsync(query);
}

async function getExpertTechnology() {
  const query = "SELECT * FROM user_expert_technology";
  return await queryAsync(query);
}

async function getFamiliarTechnology() {
  const query = "SELECT * FROM  user_familiar_technology";
  return await queryAsync(query);
}

async function getTechnology() {
  const query = "SELECT * FROM  enum_technologies";
  return await queryAsync(query);
}

async function getqualification() {
  const query = "SELECT * FROM  enum_qualification_type";
  return await queryAsync(query);
}

async function getstream() {
  const query = "SELECT * FROM  enum_stream_type";
  return await queryAsync(query);
}

async function getcollege() {
  const query = "SELECT * FROM  enum_college_name";
  return await queryAsync(query);
}

const resolvers = {
  Query: {
    async getUserDetails(_, args) {
      const users = await getUserDetails();
      return users.filter((user) => String(user.User_ID) === args.ID);
    },
    async getJobopening(_,__,{user}) {
      // console.log(user);
      // if(!user)
      // {
      //   throw new Error("User not authenticate");
      // }
      const jobLists = await getJobOpening();
      return jobLists;
    },
    async getJobOpening(_, args,{user}) {
      if(!user)
      {
        throw new Error("User not authenticate");
      }
      const jobLists = await getJobOpening();
      return jobLists.filter(
        (jobList) => String(jobList.Job_opening_ID) === args.ID
      );
    },
    async getUserLoginDetails(_, args) {
      const userLoginDetails = await getUserLoginDetails();
      return userLoginDetails.filter(
        (userLoginDetail) => userLoginDetail.Email_ID === args.UserName
      );
    },
    async getCollege() {
      const College = await getcollege();
      return College;
    },
    async getStream() {
      const Stream = await getstream();
      return Stream;
    },
    async getQualification() {
      const Qualification = await getqualification();
      return Qualification;
    },
    async getTechnology() {
      const Technology = await getTechnology();
      return Technology;
    },
    async getqualification(_, args) {
      const quals = await getqualification();
      return quals.filter((qual) => qual.Qualification_type === args.Name);
    },
    async getstream(_, args) {
      const streamNames = await getstream();
      return streamNames.filter(
        (streamName) => streamName.Stream_type === args.Name
      );
    },
    async getcollege(_, args) {
      const collegeNames = await getcollege();
      return collegeNames.filter(
        (collegeName) => collegeName.College_name === args.Name
      );
    },
  },
  UserDetails: {
    async professionalQualification(parent) {
      const profQuals = await getProfessionalQualification();
      return profQuals.filter(
        (profQual) => profQual.User_ID === parent.User_ID
      );
    },
    async educationalQualification(parent) {
      const eduQuals = await getEducationalQualification();
      return eduQuals.filter((eduQual) => eduQual.User_ID === parent.User_ID);
    },
    async userCredentials(parent) {
      const users = await getUserCredentials();
      return users.find((user) => user.User_ID === parent.User_ID);
    },
    async expertTechnology(parent) {
      const techs = await getExpertTechnology();
      return techs.filter((tech) => tech.User_ID === parent.User_ID);
    },
    async familiarTechnology(parent) {
      const technologies = await getFamiliarTechnology();
      return technologies.filter(
        (technology) => technology.User_ID === parent.User_ID
      );
    },
  },
  JobOpening: {
    async additionalDetails(parent) {
      const additionalDetails = await getAdditionalDetails();
      return additionalDetails.filter(
        (additionalDetail) =>
          additionalDetail.Job_opening_ID === parent.Job_opening_ID
      );
    },
    async jobOpeningJobRoleMap(parent) {
      const JobRoleMaps = await getJobOpeningJobRoleMap();
      return JobRoleMaps.filter(
        (JobRoleMap) => JobRoleMap.Job_opening_ID === parent.Job_opening_ID
      );
    },
    async application(parent) {
      const appliactionDetails = await getapplication();
      return appliactionDetails.filter(
        (appliactionDetail) =>
          appliactionDetail.Job_opening_ID === parent.Job_opening_ID
      );
    },
  },
  EducationalQualification: {
    async qualification(parent) {
      const quals = await getqualification();
      return quals.find((qual) => qual.ID === parent.qualification_ID);
    },
    async stream(parent) {
      const streamNames = await getstream();
      return streamNames.find(
        (streamName) => streamName.ID === parent.Stream_ID
      );
    },
    async college(parent) {
      const collegeNames = await getcollege();
      return collegeNames.find(
        (collegeName) => collegeName.ID === parent.College_ID
      );
    },
  },
  JobOpeningJobRoleMap: {
    async jobRole(parent) {
      const JobRoles = await getJobRole();
      return JobRoles.filter((JobRole) => JobRole.ID === parent.Job_role_ID);
    },
  },
  Application: {
    async jobOpenningTimeSlot(parent) {
      const timeSlots = await getJobOpenningTimeSlot();
      // console.log(parent.Time_slot_ID);
      return timeSlots.filter(
        (timeSlot) => timeSlot.ID === parent.Time_slot_ID
      );
    },
  },
  ExpertTechnology: {
    async technology(parent) {
      const technology = await getTechnology();
      return technology.filter(
        (tech) => tech.ID === parent.User_expert_technologies_ID
      );
    },
  },
  FamiliarTechnology: {
    async technology(parent) {
      const technology = await getTechnology();
      return technology.filter(
        (tech) => tech.ID === parent.User_familiar_technologies_ID
      );
    },
  },

  Mutation: {
    async sigin(_, { input }) {
      const {
        User_ID,
        First_name,
        Last_name,
        Email_ID,
        Phone_number,
        Resume_url,
        Portfolio_url,
        Job_role,
        User_image_url,
        Referrer_name,
        Is_subscribed_to_email,
        Percentage,
        Year_of_passing,
        College_name,
        College_location,
        Applicant_type,
        Years_of_experience,
        Current_ctc,
        Expected_ctc,
        Is_currently_on_notice_period,
        Notice_period_end_date,
        Notice_period_length_in_months,
        Is_appeared_previously,
        Role_applied_for,
        College_names,
        Stream_types,
        Qualification_types,
        Expert_tech,
        Familiar_tech,
        Other_expert_tech,
        Other_familiar_tech,
      } = input;

      const Query = `
                INSERT INTO users (User_ID, First_name, Last_name, Email_ID, Phone_number, Resume_url, Portfolio_url, User_image_url, Referrer_name, Is_subscribed_to_email, dt_created, dt_modified)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,NOW(), NOW());
              `;

      await new Promise((resolve, reject) => {
        connection.query(
          Query,
          [
            User_ID,
            First_name,
            Last_name,
            Email_ID,
            Phone_number,
            Resume_url,
            Portfolio_url,
            User_image_url,
            Referrer_name,
            Is_subscribed_to_email,
          ],
          (error) => {
            if (error) reject(error);
            else resolve();
          }
        );
      });

      const getCollegeQuery = `
            SELECT ID FROM enum_college_name WHERE College_name = ?;
          `;
      const [Collegeresult] = await new Promise((resolve, reject) => {
        connection.query(getCollegeQuery, [College_names], (error, results) => {
          if (error) reject(error);
          else resolve(results);
        });
      });

      const getStreamQuery = `
            SELECT ID FROM enum_stream_type WHERE Stream_type = ?;
          `;
      const [streamresult] = await new Promise((resolve, reject) => {
        connection.query(getStreamQuery, [Stream_types], (error, results) => {
          if (error) reject(error);
          else resolve(results);
        });
      });

      const getQualificationQuery = `
            SELECT ID FROM enum_qualification_type WHERE Qualification_type = ?;
          `;
      const [Qualresult] = await new Promise((resolve, reject) => {
        connection.query(
          getQualificationQuery,
          [Qualification_types],
          (error, results) => {
            if (error) reject(error);
            else resolve(results);
          }
        );
      });

      const College_Id = Collegeresult.ID;
      const Stram_Id = streamresult.ID;
      const Qual_Id = Qualresult.ID;

      const eduQuery = `
                INSERT INTO educational_qualification (User_ID, Percentage, Year_of_passing, College_name, College_location, qualification_ID, Stream_ID, College_ID, dt_created, dt_modified)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?,NOW(), NOW());
              `;

      await new Promise((resolve, reject) => {
        connection.query(
          eduQuery,
          [
            User_ID,
            Percentage,
            Year_of_passing,
            College_name,
            College_location,
            Qual_Id,
            Stram_Id,
            College_Id,
          ],
          (error) => {
            if (error) reject(error);
            else resolve();
          }
        );
      });

      const profQuery = `
                INSERT INTO professional_qualification (User_ID, Applicant_type, Years_of_experience, Current_ctc, Expected_ctc, Is_currently_on_notice_period, Notice_period_end_date, Notice_period_length_in_months, Is_appeared_previously, Role_applied_for,dt_created, dt_modified)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,NOW(), NOW());
              `;

      await new Promise((resolve, reject) => {
        connection.query(
          profQuery,
          [
            User_ID,
            Applicant_type,
            Years_of_experience,
            Current_ctc,
            Expected_ctc,
            Is_currently_on_notice_period,
            Notice_period_end_date,
            Notice_period_length_in_months,
            Is_appeared_previously,
            Role_applied_for,
          ],
          (error) => {
            if (error) reject(error);
            else resolve();
          }
        );
      });

      const familiarTechQuery = `
          SELECT ID FROM enum_technologies WHERE Technology_name IN (?);
        `;

      var familiarTech;
      const [familiarTechResults] = await new Promise((resolve, reject) => {
        connection.query(
          familiarTechQuery,
          [Familiar_tech],
          (error, results) => {
            if (error) reject(error);
            else {
              familiarTech = results;
              resolve(results);
            }
          }
        );
      });

      for (const tech_ID of familiarTech) {
        const insertQuery = `
          INSERT INTO user_familiar_technology (User_ID,User_familiar_technologies_ID,User_familiar_technologies_name,Dt_created,Dt_modified) VALUES (? ,? , ?,NOW() ,NOW());
        `;

        await new Promise((resolve, reject) => {
          connection.query(
            insertQuery,
            [User_ID, tech_ID.ID, Other_familiar_tech],
            (error) => {
              if (error) reject(error);
              else resolve();
            }
          );
        });
      }

      const expertTechQuery = `
          SELECT ID FROM enum_technologies WHERE Technology_name IN (?);
        `;

      var expertTech;
      const [expertTechResults] = await new Promise((resolve, reject) => {
        connection.query(expertTechQuery, [Expert_tech], (error, results) => {
          if (error) reject(error);
          else {
            expertTech = results;
            resolve(results);
          }
        });
      });

      for (const tech_ID of expertTech) {
        const insertQuery = `
          INSERT INTO user_expert_technology (User_ID,User_expert_technologies_ID,User_expert_technologies_name,Dt_created,Dt_modified) VALUES (? ,? , ?,NOW() ,NOW());
        `;

        await new Promise((resolve, reject) => {
          connection.query(
            insertQuery,
            [User_ID, tech_ID.ID, Other_expert_tech],
            (error) => {
              if (error) reject(error);
              else resolve();
            }
          );
        });
      }

      const jobRoleQuery = `
          SELECT ID FROM job_role WHERE Job_role_name IN (?);
        `;

      var jobRole;
      const [jobRoleResult] = await new Promise((resolve, reject) => {
        connection.query(jobRoleQuery, [Job_role], (error, results) => {
          if (error) reject(error);
          else {
            jobRole = results;
            resolve(results);
          }
        });
      });

      for (const role of jobRole) {
        const insertQuery = `
          INSERT INTO user_preferred_job_role_map (User_ID,Job_role_ID,Dt_created,Dt_modified) VALUES (? ,? ,NOW() ,NOW());
        `;

        await new Promise((resolve, reject) => {
          connection.query(insertQuery, [User_ID, role.ID], (error) => {
            if (error) reject(error);
            else resolve();
          });
        });
      }
    },

    async applyJob(_, { input }) {
      const {
        Username,
        Time_Slot,
        Job_Opening_ID,
        Job_Role_Prefernce,
        Resume,
      } = input;
      const getUserIDQuery = `
            SELECT User_ID FROM users WHERE Email_ID = ?;
          `;
      const [IDresult] = await new Promise((resolve, reject) => {
        connection.query(getUserIDQuery, [Username], (error, results) => {
          if (error) reject(error);
          else resolve(results);
        });
      });
      // console.log(IDresult.User_ID);

      const jobRoleQuery = `
          SELECT ID FROM job_role WHERE Job_role_name IN (?);
        `;

      var jobRolePref;
      const [jobRoleResult] = await new Promise((resolve, reject) => {
        connection.query(
          jobRoleQuery,
          [Job_Role_Prefernce],
          (error, results) => {
            if (error) reject(error);
            else {
              jobRolePref = results;
              resolve(results);
            }
          }
        );
      });

      const timeSlotQuery = `
          SELECT ID FROM job_openning_time_slot WHERE Time_slot = ?;
        `;

      const [slotResult] = await new Promise((resolve, reject) => {
        connection.query(timeSlotQuery, [Time_Slot], (error, results) => {
          if (error) reject(error);
          else {
            resolve(results);
          }
        });
      });

      const applicationQuery = `
                INSERT INTO application (Job_opening_ID, User_ID, Time_slot_ID, Resume_url, dt_created, dt_modified)
                VALUES (?, ?, ?, ?,NOW(), NOW());
              `;

      await new Promise((resolve, reject) => {
        connection.query(
          applicationQuery,
          [Job_Opening_ID, IDresult.User_ID, slotResult.ID, Resume],
          (error) => {
            if (error) reject(error);
            else resolve();
          }
        );
      });

      const apllicationIDQuery = `
          SELECT ID FROM application WHERE Job_opening_ID = ? && User_ID = ?;
        `;

      const [applicationResult] = await new Promise((resolve, reject) => {
        connection.query(
          apllicationIDQuery,
          [Job_Opening_ID, IDresult.User_ID],
          (error, results) => {
            if (error) reject(error);
            else {
              resolve(results);
            }
          }
        );
      });
      for (const role of jobRolePref) {
        const insertQuery = `
          INSERT INTO application_job_role_preference (Application_ID,Application_job_role_preference_ID,Dt_created,Dt_modified) VALUES (? ,? ,NOW() ,NOW());
        `;

        await new Promise((resolve, reject) => {
          connection.query(
            insertQuery,
            [applicationResult.ID, role.ID],
            (error) => {
              if (error) reject(error);
              else resolve();
            }
          );
        });
      }
    },
    login: async (_, { email, password }) => {
      const user = await authenticateUser(email, password);
      if (!user) {
        throw new Error("Invalid credentials");
      }

      const token = generateToken(user);
      return { token, user };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startserver = async () => {
  try {
    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
      context: ({ req }) => {
        const token = req.headers.authorization || "";
        try {
          const user = verifyToken(token);
          return { user };
        } catch (error) {
          console.error("Token verification failed:", error);
          return {};
        }
      },
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

startserver();

console.log("Server startted at", 4000);
