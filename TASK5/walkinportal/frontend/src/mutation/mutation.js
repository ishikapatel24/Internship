import { gql } from "@apollo/client";

const SIGNIN_MUTATION = gql`
  mutation Mutation($input: userInput!) {
    sigin(input: $input) {
      First_name
      Last_name
      Email_ID
    }
  }
`;

const APPLY_MUTATION = gql`
  mutation Mutation($input: applyInput) {
    applyJob(input: $input) {
      First_name
    }
  }
`;

const LOGIN_USER = gql`
  mutation Mutation($email: String!, $password: String!, $isRemember: Boolean!) {
  login(email: $email, password: $password, isRemember: $isRemember) {
    token
    user {
      User_ID
      email
    }
  }
}
`;

export { SIGNIN_MUTATION, APPLY_MUTATION, LOGIN_USER };
