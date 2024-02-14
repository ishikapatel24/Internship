const typeDefs = `#graphql
    type UserCredentials {
    ID: Int!
    User_ID: Int!
    User_password: String!
    }

    type UserDetails {
        ID:ID!
        User_ID: Int!
        First_name: String!
        Last_name: String!
        Email_ID: String!
        Phone_number: String!
        Resume_url: String
        Portfolio_url: String
        User_image_url: String
        Is_subscribed_to_email: Boolean
        professionalQualification: [ProfessionalQualification!]!
        educationalQualification: [EducationalQualification!]!
        userCredentials: UserCredentials
        expertTechnology: [ExpertTechnology!]!
        familiarTechnology: [FamiliarTechnology!]!
    }

    type EducationalQualification {
        ID:ID!
        User_ID: Int!
        Percentage: String!
        Year_of_passing: Int!
        College_name: String
        College_location: String!
        qualification_ID: Int!
        Stream_ID: Int!
        College_ID: Int!
        qualification: EnumQualificationType!
        stream: EnumStreamName!
        college: EnumCollegeName!
    }

    type ProfessionalQualification {
        ID:ID!
        User_ID: Int!
        Applicant_type: Int!
        Years_of_experience: Int
        Current_ctc: Int
        Expected_ctc: Int
        Is_currently_on_notice_period: Boolean
        Notice_period_end_date: String
        Notice_period_length_in_months: Int
        Is_appeared_previously: Boolean!
        Role_applied_for: String
    }

    type EnumTechnologies {
        ID:ID!
        Technology_name: String!
    }

    type EnumCollegeName {
        ID:ID!
        College_name: String!
    }

    type EnumStreamName {
        ID:ID!
        Stream_type: String!
    }

    type EnumQualificationType {
        ID:ID!
        Qualification_type: String!
    }

    type ExpertTechnology {
        ID: ID!
        User_ID: Int!
        User_expert_technologies_ID: Int!
        User_expert_technologies_Name: String
        technology: [EnumTechnologies!]!
    }
    
    type FamiliarTechnology {
        ID: ID!
        User_ID: Int!
        User_familiar_technologies_ID: Int!
        User_familiar_technologies_Name: String
        technology: [EnumTechnologies!]!
    }

    type JobOpening {
        Job_opening_ID: ID!
        Job_title: String!
        Start_date: String!
        End_date: String!
        Office_location: String!
        Is_internship_opportunity_for_mca: Boolean!
        additionalDetails: [JobOpenningAdditionalDetails!]!
        jobOpeningJobRoleMap: [JobOpeningJobRoleMap!]!
        application: [Application!]!
    }

    type JobOpenningAdditionalDetails{
        ID: ID!
        Job_opening_ID: Int!
        General_Instructions: String!
        Exam_Instructions: String!
        System_Requirements: String!
        Process: String!
        Venue_of_walk_in: String!
    }

    type JobRole{
        ID: ID!
        Job_role_name: String!
        Job_role_image_url: String!
        Job_role_description: String!
        Job_role_requirement: String!
    }

    type JobOpeningJobRoleMap{
        ID: ID!
        Job_opening_ID: Int!
        Job_role_ID: Int!
        jobRole:[JobRole!]!
    }

    type JobOpenningTimeSlot{
        ID: ID!
        Time_slot_start: String!
        Time_slot_end: String!
    }

    type Application{
        ID: ID!
        Job_opening_ID: Int!
        User_ID: Int!
        Time_slot_ID: Int!
        jobOpenningTimeSlot: [JobOpenningTimeSlot!]!
    }
    
    type Query {
        getUserCredentials : [UserCredentials]
        getUserDetails(ID:Int!) : [UserDetails]
        getJobOpening(ID:Int!) : [JobOpening]
        getUserLoginDetails(UserName:String!) : [UserDetails]
    }`;

module.exports = { typeDefs };

// getUserCredentials(ID:Int!) : [UserCredentials]
