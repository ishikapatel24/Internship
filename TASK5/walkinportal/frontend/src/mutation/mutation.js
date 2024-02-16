import { gql } from "@apollo/client";

const SIGNIN_MUTATION=gql`
mutation Mutation($input: userInput!) {
  sigin(input: $input) {
    Last_name
    User_image_url
    Is_subscribed_to_email
    Portfolio_url
    Resume_url
  }
}`

const APPLY_MUTATION=gql`
mutation Mutation($input: applyInput) {
  applyJob(input: $input) {
    First_name
  }
}`

export { SIGNIN_MUTATION , APPLY_MUTATION}