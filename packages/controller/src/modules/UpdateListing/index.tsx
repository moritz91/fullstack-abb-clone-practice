// @ts-ignore
import * as React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
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

export interface WithUpdateListing {
  updateListing: (variables: updateListingMutationVariables) => void;
}

export const withUpdateListing = graphql<
  any,
  updateListingMutation,
  updateListingMutationVariables,
  WithUpdateListing
>(updateListingMutation, {
  props: ({ mutate }) => ({
    updateListing: async variables => {
      if (!mutate) {
        return;
      }

      const response = await mutate({
        variables
      });

      console.log(response);
    }
  })
});
