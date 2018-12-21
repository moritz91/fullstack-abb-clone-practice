// @ts-ignore
import * as React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import {
  updateListingMutation,
  updateListingMutationVariables
} from "../../schemaTypes";

const updateListingMutation = gql`
  mutation updateListingMutation(
    $listingId: String!
    $picture: Upload
    $pictureUrl: String
    $name: String!
    $category: String!
    $description: String!
    $price: Int!
    $beds: Int!
    $guests: Int!
    $latitude: Float!
    $longitude: Float!
    $amenities: [String!]!
  ) {
    updateListing(
      listingId: $listingId
      input: {
        picture: $picture
        pictureUrl: $pictureUrl
        name: $name
        category: $category
        description: $description
        price: $price
        beds: $beds
        guests: $guests
        latitude: $latitude
        longitude: $longitude
        amenities: $amenities
      }
    )
  }
`;

interface Props {
  children: (
    data: {
      updateListing: (variables: updateListingMutationVariables) => void;
    }
  ) => JSX.Element | null;
}

export const UpdateListing: React.SFC<Props> = ({ children }) => (
  <Mutation<updateListingMutation, updateListingMutationVariables>
    mutation={updateListingMutation}
  >
    {(mutate, { client }) =>
      children({
        updateListing: async variables => {
          if (!mutate) {
            return;
          }

          await mutate({
            variables
          });
          await client.resetStore();
        }
      })
    }
  </Mutation>
);
