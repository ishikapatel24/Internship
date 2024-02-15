import { gql } from "@apollo/client";

export const YOUR_SIGNIN_MUTATION=gql`
mutation Mutation($input: userInput!) {
  sigin(input: $input) {
    Last_name
    User_image_url
    Is_subscribed_to_email
    Portfolio_url
    Resume_url
  }
}`