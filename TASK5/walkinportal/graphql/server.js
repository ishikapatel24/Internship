const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { typeDefs } = require("./schema/typeDefs.js");
const { connection } = require("./database/database.js");
const { dateScalar } = require("./customscalar/graphqlscalar.js");
const { promisify } = require("util");

const queryAsync = promisify(connection.query).bind(connection);

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
    async getJobopening() {
      const jobLists = await getJobOpening();
      return jobLists;
    },
    async getJobOpening(_, args) {
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
        User_image_url,
        Referrer_name,
        Is_subscribed_to_email,
        Percentage,
        Year_of_passing,
        College_name,
        College_location,
        qualification_ID,
        Stream_ID,
        College_ID,
        Applicant_type,
        Years_of_experience,
        Current_ctc,
        Expected_ctc,
        Is_currently_on_notice_period,
        Notice_period_end_date,
        Notice_period_length_in_months,
        Is_appeared_previously,
        Role_applied_for,
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
            qualification_ID,
            Stream_ID,
            College_ID,
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
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

startserver();

console.log("Server startted at", 4000);
